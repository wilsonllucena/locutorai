import { NextResponse } from "next/server"
import { connectMongo } from "@/lib/db"
import { ProjectModel } from "@/lib/models/project"

export async function GET() {
  await connectMongo()
  const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).limit(20)
  return NextResponse.json(
    projects.map(project => ({
      id: project._id.toString(),
      title: project.title,
      script: project.script,
      voiceUrl: project.voiceUrl,
      musicUrl: project.musicUrl,
      status: project.status,
      createdAt: project.createdAt.toISOString()
    }))
  )
}
