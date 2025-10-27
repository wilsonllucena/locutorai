import { NextResponse } from "next/server"
import { connectMongo } from "@/lib/db"
import { ProjectModel } from "@/lib/models/project"
import { CACHE_CONFIG, ERROR_MESSAGES } from "@/lib/constants"

// Revalidar a cada X segundos
export const revalidate = CACHE_CONFIG.PROJECTS_REVALIDATE

// Permitir cache dinâmico
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectMongo()
    const projects = await ProjectModel.find({})
      .sort({ createdAt: -1 })
      .limit(CACHE_CONFIG.MAX_PROJECTS)
    
    return NextResponse.json(
      projects.map((project: any) => ({
        id: project._id.toString(),
        title: project.title,
        script: project.script,
        voiceUrl: project.voiceUrl,
        musicUrl: project.musicUrl,
        status: project.status,
        createdAt: project.createdAt.toISOString()
      })),
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return NextResponse.json({ 
      error: ERROR_MESSAGES.FETCH_PROJECTS_FAILED,
      details: error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR
    }, { status: 500 })
  }
}
