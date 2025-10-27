"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { AUDIO_CONFIG } from "@/lib/constants"

interface AudioPreviewProps {
  voiceUrl: string
  musicUrl: string
}

export function AudioPreview({ voiceUrl, musicUrl }: AudioPreviewProps) {
  const voiceRef = useRef<HTMLAudioElement | null>(null)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const voiceAudio = voiceRef.current
    const musicAudio = musicRef.current

    if (!voiceAudio || !musicAudio) return

    // Verificar se os áudios foram carregados
    const checkLoaded = () => {
      if (voiceAudio.readyState >= 2 && musicAudio.readyState >= 2) {
        setIsLoading(false)
      }
    }

    // Handlers de erro
    const handleError = (e: Event) => {
      console.error("Erro ao carregar áudio:", e)
      setError("Não foi possível carregar o áudio")
      setIsLoading(false)
      setIsPlaying(false)
    }

    // Atualizar progresso
    const handleTimeUpdate = () => {
      if (voiceAudio.duration) {
        setProgress((voiceAudio.currentTime / voiceAudio.duration) * 100)
      }
    }

    voiceAudio.addEventListener("loadeddata", checkLoaded)
    musicAudio.addEventListener("loadeddata", checkLoaded)
    voiceAudio.addEventListener("error", handleError)
    musicAudio.addEventListener("error", handleError)
    voiceAudio.addEventListener("timeupdate", handleTimeUpdate)

    checkLoaded()

    return () => {
      voiceAudio.pause()
      musicAudio.pause()
      voiceAudio.removeEventListener("loadeddata", checkLoaded)
      musicAudio.removeEventListener("loadeddata", checkLoaded)
      voiceAudio.removeEventListener("error", handleError)
      musicAudio.removeEventListener("error", handleError)
      voiceAudio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [voiceUrl, musicUrl])

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
      setProgress(0)
    } else {
      try {
        setError(null)
        voiceRef.current.volume = AUDIO_CONFIG.VOICE_VOLUME
        musicRef.current.volume = AUDIO_CONFIG.MUSIC_VOLUME
        
        // Sincronizar o início dos dois áudios
        await Promise.all([
          voiceRef.current.play(),
          musicRef.current.play()
        ])
        
        setIsPlaying(true)
      } catch (err) {
        console.error("Erro ao reproduzir áudio:", err)
        setError("Não foi possível reproduzir o áudio")
        setIsPlaying(false)
      }
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    if (voiceRef.current) voiceRef.current.currentTime = 0
    if (musicRef.current) musicRef.current.currentTime = 0
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-slate-700">Prévia com trilha de fundo</p>
        <p className="text-xs text-slate-500">Aperte play para ouvir voz e música misturadas em tempo real</p>
        
        {error && (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600">
            {error}
          </div>
        )}
        
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Button 
              onClick={togglePlayback} 
              className="w-32"
              disabled={isLoading || !!error}
            >
              {isLoading ? "Carregando..." : isPlaying ? "Pausar" : "Ouvir"}
            </Button>
            <span className="text-xs text-slate-500">
              {isLoading ? "Preparando áudio..." : "Ajuste o volume direto no seu dispositivo"}
            </span>
          </div>
          
          {isPlaying && (
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
              <div 
                className="h-full bg-brand-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
      
      <audio 
        ref={voiceRef} 
        src={voiceUrl} 
        preload="auto" 
        onEnded={handleEnded}
      />
      <audio 
        ref={musicRef} 
        src={musicUrl} 
        preload="auto" 
        onEnded={handleEnded}
      />
    </div>
  )
}
