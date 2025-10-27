"use client"

import { useState } from "react"
import { CreateVoiceForm } from "@/components/studio/create-voice-form"
import { ProjectHistory } from "@/components/studio/project-history"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"
import { musicTracks } from "@/lib/music"
import { voices } from "@/lib/voices"

interface ProjectData {
  id: string
  title: string
  script: string
  voiceUrl: string
  musicUrl: string
  status: string
}

export function StudioClient() {
  const [highlightedProject, setHighlightedProject] = useState<ProjectData | null>(null)

  return (
    <ErrorBoundary>
      <div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-2">
              <Badge variant="default" className="w-fit">Estúdio LocutorAI</Badge>
              <h1 className="text-3xl font-semibold text-slate-900">Monte sua locução personalizada</h1>
              <p className="text-sm leading-relaxed text-slate-600">
                Ajuste voz, roteiro e trilha para entregar uma narrativa perfeita para campanhas, vídeos e materiais educacionais.
              </p>
            </div>
            <div className="mt-8">
              <ErrorBoundary>
                <CreateVoiceForm
                  onSuccess={project => {
                    setHighlightedProject(project)
                  }}
                />
              </ErrorBoundary>
            </div>
          </div>
          <ErrorBoundary>
            <ProjectHistory highlightedProject={highlightedProject} />
          </ErrorBoundary>
        </div>
        <aside className="flex flex-col gap-6">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="gap-2">
              <CardTitle>Biblioteca de vozes</CardTitle>
              <CardDescription>Pré-visualize timbres e escolha a voz que combina com seu roteiro</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              {voices.map(voice => (
                <div key={voice.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 px-4 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600 uppercase">
                    {voice.name.slice(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{voice.name}</span>
                    <span className="text-xs text-slate-500">{voice.description}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white">
            <CardHeader className="gap-2">
              <CardTitle>Trilhas de fundo</CardTitle>
              <CardDescription>Selecione atmosferas sonoras que reforçam a mensagem da sua campanha</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              {musicTracks.map(track => (
                <div key={track.id} className="flex flex-col gap-1 rounded-2xl border border-slate-200/80 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-900">{track.name}</span>
                  <span className="text-xs text-slate-500">{track.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </ErrorBoundary>
  )
}
