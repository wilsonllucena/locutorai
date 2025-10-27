import { NextResponse } from "next/server"
import OpenAI from "openai"
import crypto from "crypto"
import { connectMongo } from "@/lib/db"
import { ProjectModel } from "@/lib/models/project"
import { musicTracks } from "@/lib/music"
import { saveBufferToFile } from "@/lib/audio"
import { voices } from "@/lib/voices"
import { createProjectSchema } from "@/lib/validations"
import { 
  OPENAI_VOICES, 
  OPENAI_MODELS, 
  ERROR_MESSAGES,
  PROJECT_STATUS,
  type OpenAIVoice 
} from "@/lib/constants"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const parseResult = createProjectSchema.safeParse(payload)

    if (!parseResult.success) {
      console.error("Erro de validação:", parseResult.error.issues)
      return NextResponse.json({ 
        error: ERROR_MESSAGES.INVALID_DATA, 
        details: parseResult.error.issues 
      }, { status: 400 })
    }

    const { title, script, voiceId, musicId } = parseResult.data
    const voice = voices.find(item => item.id === voiceId)
    const music = musicTracks.find(item => item.id === musicId)

    if (!voice) {
      console.error("Voz não encontrada:", voiceId)
      return NextResponse.json({ error: ERROR_MESSAGES.VOICE_NOT_FOUND }, { status: 400 })
    }

    if (!music) {
      console.error("Trilha não encontrada:", musicId)
      return NextResponse.json({ error: ERROR_MESSAGES.MUSIC_NOT_FOUND }, { status: 400 })
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
      status: PROJECT_STATUS.PROCESSING
    })

    try {
      const apiKey = process.env.OPENAI_API_KEY

      if (!apiKey) {
        console.warn(ERROR_MESSAGES.OPENAI_KEY_MISSING)
        project.status = PROJECT_STATUS.COMPLETED
        await project.save()
        
        return NextResponse.json({
          id: project._id.toString(),
          title: project.title,
          script: project.script,
          voiceUrl: project.voiceUrl,
          musicUrl: project.musicUrl,
          status: project.status
        })
      }

      const openai = new OpenAI({ apiKey })
      
      // Validar que a voz é compatível com a API do OpenAI
      const openaiVoice = (OPENAI_VOICES as readonly string[]).includes(voice.id) 
        ? (voice.id as OpenAIVoice)
        : "alloy"
      
      if (!OPENAI_VOICES.includes(openaiVoice)) {
        console.warn(`Voz ${voice.id} não é válida para OpenAI. Usando 'alloy' como padrão.`)
      }

      const response = await openai.audio.speech.create({
        model: OPENAI_MODELS.TTS,
        voice: openaiVoice,
        input: script,
        response_format: "wav"
      })
      
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `voice-${voice.id}-${crypto.randomUUID()}.wav`
      const storedPath = await saveBufferToFile(buffer, filename)
      project.voiceUrl = storedPath

      project.status = PROJECT_STATUS.COMPLETED
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
      console.error("Erro ao gerar locução:", error)
      project.status = PROJECT_STATUS.FAILED
      project.error = error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR
      await project.save()
      
      return NextResponse.json({ 
        error: ERROR_MESSAGES.GENERATION_FAILED,
        details: error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro crítico na API:", error)
    return NextResponse.json({ 
      error: ERROR_MESSAGES.UNEXPECTED_ERROR,
      details: error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR
    }, { status: 500 })
  }
}
