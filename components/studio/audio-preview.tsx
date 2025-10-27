"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface AudioPreviewProps {
  voiceUrl: string
  musicUrl: string
}

export function AudioPreview({ voiceUrl, musicUrl }: AudioPreviewProps) {
  const voiceRef = useRef<HTMLAudioElement | null>(null)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      voiceRef.current?.pause()
      musicRef.current?.pause()
    }
  }, [])

  async function togglePlayback() {
    if (!voiceRef.current || !musicRef.current) {
      return
    }
    if (isPlaying) {
      voiceRef.current.pause()
      musicRef.current.pause()
      voiceRef.current.currentTime = 0
      musicRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      try {
        voiceRef.current.volume = 1
        musicRef.current.volume = 0.35
        await Promise.all([voiceRef.current.play(), musicRef.current.play()])
        setIsPlaying(true)
      } catch (error) {
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-slate-700">Prévia com trilha de fundo</p>
        <p className="text-xs text-slate-500">Aperte play para ouvir voz e música misturadas em tempo real</p>
        <div className="mt-4 flex items-center gap-3">
          <Button onClick={togglePlayback} className="w-32">
            {isPlaying ? "Reproduzindo" : "Ouvir"}
          </Button>
          <span className="text-xs text-slate-500">Ajuste o volume direto no seu dispositivo</span>
        </div>
      </div>
      <audio ref={voiceRef} src={voiceUrl} preload="auto" onEnded={() => setIsPlaying(false)} />
      <audio ref={musicRef} src={musicUrl} preload="auto" onEnded={() => setIsPlaying(false)} />
    </div>
  )
}
