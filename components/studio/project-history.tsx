"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioPreview } from "@/components/studio/audio-preview"

interface ProjectItem {
  id: string
  title: string
  script: string
  voiceUrl: string
  musicUrl: string
  status: string
  createdAt: string
}

interface HighlightedProject {
  id: string
  title: string
  script: string
  voiceUrl: string
  musicUrl: string
  status: string
}

interface ProjectHistoryProps {
  highlightedProject?: HighlightedProject | null
}

export function ProjectHistory({ highlightedProject }: ProjectHistoryProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([])

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    }
    loadProjects()
  }, [highlightedProject])

  return (
    <div className="flex flex-col gap-6">
      {highlightedProject && (
        <Card className="border-brand-200 bg-brand-50/60">
          <CardHeader>
            <CardTitle className="text-brand-700">Locução pronta</CardTitle>
            <CardDescription className="text-brand-600">
              Ouça a combinação da voz escolhida com a trilha selecionada
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-slate-600">{highlightedProject.title}</span>
              <p className="text-sm leading-relaxed text-slate-600">{highlightedProject.script}</p>
            </div>
            <AudioPreview voiceUrl={highlightedProject.voiceUrl} musicUrl={highlightedProject.musicUrl} />
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Histórico recente</h3>
        <div className="flex flex-col gap-4">
          {projects.length === 0 && <p className="text-sm text-slate-500">Nenhuma locução gerada ainda.</p>}
          {projects.map(project => (
            <Card key={project.id} className="border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base text-slate-900">{project.title}</CardTitle>
                  <CardDescription>{new Date(project.createdAt).toLocaleString("pt-BR")}</CardDescription>
                </div>
                <Badge variant={project.status === "completed" ? "success" : project.status === "failed" ? "destructive" : "warning"}>
                  {project.status === "completed" ? "Concluído" : project.status === "failed" ? "Falhou" : "Processando"}
                </Badge>
              </CardHeader>
              <CardContent className="gap-3">
                <p className="max-h-24 overflow-y-auto text-sm leading-relaxed text-slate-600">{project.script}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
