"use client"

import { useState, useTransition } from "react"
import { type FieldErrors, type Resolver, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { musicTracks } from "@/lib/music"
import { voices } from "@/lib/voices"

const formSchema = z.object({
  title: z.string().min(3, "Informe um título"),
  script: z.string().min(40, "Escreva pelo menos 40 caracteres"),
  voiceId: z.string({ required_error: "Escolha uma voz" }),
  musicId: z.string({ required_error: "Escolha uma trilha" })
})

type FormValues = z.infer<typeof formSchema>

const resolver: Resolver<FormValues> = async values => {
  const result = formSchema.safeParse(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }

  const fieldErrors = result.error.issues.reduce((acc, issue) => {
    const field = issue.path[0]
    if (!field) {
      return acc
    }
    acc[field as keyof FormValues] = {
      type: issue.code,
      message: issue.message
    }
    return acc
  }, {} as Record<keyof FormValues, { type: string; message: string }>)

  return { values: {}, errors: fieldErrors as FieldErrors<FormValues> }
}


interface CreateVoiceFormProps {
  onSuccess: (project: {
    id: string
    title: string
    script: string
    voiceUrl: string
    musicUrl: string
    status: string
  }) => void
}

export function CreateVoiceForm({ onSuccess }: CreateVoiceFormProps) {
  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      title: "Nova locução",
      script: "Apresente seu produto com uma narrativa envolvente. Destaque benefícios, chame para a ação e mantenha o ritmo da história.",
      voiceId: voices[0]?.id ?? "",
      musicId: musicTracks[0]?.id ?? ""
    }
  })
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleSubmit(values: FormValues) {
    setError(null)
    setSuccess(null)
    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
        if (!response.ok) {
          throw new Error("Falha ao gerar a locução")
        }
        const data = await response.json()
        onSuccess(data)
        setSuccess("Locução gerada com sucesso")
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro inesperado"
        setError(message)
      }
    })
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Ex: Lançamento de campanha" {...form.register("title")} />
          {form.formState.errors.title && <span className="text-sm text-rose-500">{form.formState.errors.title.message}</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="script">Texto para locução</Label>
          <Textarea id="script" rows={8} placeholder="Digite ou cole o script" {...form.register("script")} />
          {form.formState.errors.script && <span className="text-sm text-rose-500">{form.formState.errors.script.message}</span>}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Voz de IA</Label>
            <select
              id="voiceId"
              {...form.register("voiceId")}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {voices.map(voice => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
            {form.formState.errors.voiceId && <span className="text-sm text-rose-500">{form.formState.errors.voiceId.message}</span>}
          </div>
          <div className="space-y-2">
            <Label>Trilha de fundo</Label>
            <select
              id="musicId"
              {...form.register("musicId")}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {musicTracks.map(track => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
            </select>
            {form.formState.errors.musicId && <span className="text-sm text-rose-500">{form.formState.errors.musicId.message}</span>}
          </div>
        </div>
      </div>
      {error && <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}
      {success && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">{success}</div>}
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "Gerando locução..." : "Gerar locução com IA"}
      </Button>
    </form>
  )
}
