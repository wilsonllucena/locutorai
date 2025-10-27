import audioSamples from "./audio-samples.json"

const musicSamples = audioSamples.music as Record<string, string>

export const musicTracks = [
  {
    id: "lofi-dreams",
    name: "LoFi Dreams",
    description: "Batida suave para narrativas relaxantes",
    url: musicSamples["lofi-dreams"]
  },
  {
    id: "uplift",
    name: "Uplift",
    description: "Trilha motivacional para campanhas publicitárias",
    url: musicSamples.uplift
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Ritmo eletrônico moderno para lançamentos de produto",
    url: musicSamples.pulse
  }
]

export type MusicOption = (typeof musicTracks)[number]
