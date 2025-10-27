/**
 * Constantes da aplicação
 */

// Limites de caracteres
export const LIMITS = {
  TITLE_MIN: 3,
  TITLE_MAX: 200,
  SCRIPT_MIN: 20,
  SCRIPT_MAX: 10000,
} as const

// Status de projetos
export const PROJECT_STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]

// Vozes válidas do OpenAI TTS
export const OPENAI_VOICES = [
  "alloy",
  "echo", 
  "fable",
  "onyx",
  "nova",
  "shimmer"
] as const

export type OpenAIVoice = typeof OPENAI_VOICES[number]

// Modelos do OpenAI
export const OPENAI_MODELS = {
  TTS: "tts-1",
  TTS_HD: "tts-1-hd",
} as const

// Configurações de áudio
export const AUDIO_CONFIG = {
  VOICE_VOLUME: 1.0,
  MUSIC_VOLUME: 0.35,
  FORMAT: "wav",
  SAMPLE_RATE: 24000,
} as const

// Configurações de cache e revalidação
export const CACHE_CONFIG = {
  PROJECTS_REVALIDATE: 10, // segundos
  MAX_PROJECTS: 20,
} as const

// Configurações do MongoDB
export const DB_CONFIG = {
  MAX_POOL_SIZE: 10,
  SERVER_SELECTION_TIMEOUT: 5000,
  SOCKET_TIMEOUT: 45000,
} as const

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  INVALID_DATA: "Dados inválidos",
  VOICE_NOT_FOUND: "Voz não encontrada",
  MUSIC_NOT_FOUND: "Trilha não encontrada",
  GENERATION_FAILED: "Não foi possível gerar a locução",
  FETCH_PROJECTS_FAILED: "Falha ao buscar projetos",
  MONGODB_URI_MISSING: "MONGODB_URI não está configurada. Adicione no arquivo .env",
  OPENAI_KEY_MISSING: "OPENAI_API_KEY não configurada. Usando voz de amostra.",
  UNEXPECTED_ERROR: "Erro inesperado",
} as const

// Rotas da API
export const API_ROUTES = {
  GENERATE: "/api/generate",
  PROJECTS: "/api/projects",
} as const

// Diretórios
export const DIRECTORIES = {
  PUBLIC_GENERATED: "public/generated",
  GENERATED_PATH: "/generated",
} as const

