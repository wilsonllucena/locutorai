import audioSamples from "./audio-samples.json"

const voiceSamples = audioSamples.voices as Record<string, string>

export const voices = [
  {
    id: "aurora",
    name: "Aurora",
    description: "Voz feminina calorosa e envolvente",
    sampleUrl: voiceSamples.aurora
  },
  {
    id: "neon",
    name: "Neon",
    description: "Timbre neutro com dicção cristalina",
    sampleUrl: voiceSamples.neon
  },
  {
    id: "ritmo",
    name: "Ritmo",
    description: "Voz masculina energética com pegada comercial",
    sampleUrl: voiceSamples.ritmo
  }
]

export type VoiceOption = (typeof voices)[number]
