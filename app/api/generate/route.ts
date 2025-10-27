import { NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import crypto from "crypto"
import { connectMongo } from "@/lib/db"
import { ProjectModel } from "@/lib/models/project"
import { musicTracks } from "@/lib/music"
import { saveBufferToFile } from "@/lib/audio"
import { voices } from "@/lib/voices"

const requestSchema = z.object({
  title: z.string().min(3),
  script: z.string().min(20),
  voiceId: z.string(),
  musicId: z.string()
})

export async function POST(request: Request) {
  const payload = await request.json()
  const parseResult = requestSchema.safeParse(payload)

  if (!parseResult.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
  }

  const { title, script, voiceId, musicId } = parseResult.data
  const voice = voices.find(item => item.id === voiceId)
  const music = musicTracks.find(item => item.id === musicId)

  if (!voice || !music) {
    return NextResponse.json({ error: "Configuração de voz ou trilha não encontrada" }, { status: 400 })
  }

  await connectMongo()

  const project = await ProjectModel.create({
    title,
    script,
    voiceId,
    voiceName: voice.name,
    musicId,
    musicName: music.name,
    voiceUrl: voice.sampleUrl,
    musicUrl: music.url,
    status: "processing"
  })

  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (apiKey) {
      const openai = new OpenAI({ apiKey })
      const response = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: voice.id,
        input: script,
        format: "wav"
      })
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `voice-${voice.id}-${crypto.randomUUID()}.wav`
      const storedPath = await saveBufferToFile(buffer, filename)
      project.voiceUrl = storedPath
    }

    project.status = "completed"
    await project.save()

    return NextResponse.json({
      id: project._id.toString(),
      title: project.title,
      script: project.script,
      voiceUrl: project.voiceUrl,
      musicUrl: project.musicUrl,
      status: project.status
    })
  } catch (error) {
    project.status = "failed"
    project.error = error instanceof Error ? error.message : "Falha inesperada"
    await project.save()
    return NextResponse.json({ error: "Não foi possível gerar a locução" }, { status: 500 })
  }
}
