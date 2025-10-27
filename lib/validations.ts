import { z } from "zod"

/**
 * Schema de validação para criação de projeto
 */
export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Título é obrigatório" })
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres")
    .trim(),
  script: z
    .string({ required_error: "Script é obrigatório" })
    .min(20, "Script deve ter no mínimo 20 caracteres")
    .max(10000, "Script deve ter no máximo 10000 caracteres")
    .trim(),
  voiceId: z
    .string({ required_error: "Voz é obrigatória" })
    .min(1, "Selecione uma voz")
    .trim(),
  musicId: z
    .string({ required_error: "Música é obrigatória" })
    .min(1, "Selecione uma música")
    .trim()
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

/**
 * Valida se uma string é um ID MongoDB válido
 */
export function isValidMongoId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

/**
 * Valida se uma URL é válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Sanitiza texto removendo caracteres perigosos
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, "") // Remove < e >
    .replace(/\s+/g, " ") // Normaliza espaços
}

/**
 * Valida se a variável de ambiente está configurada
 */
export function validateEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Variável de ambiente ${key} não está configurada`)
  }
  return value
}

/**
 * Formata duração em segundos para formato legível
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

/**
 * Trunca texto adicionando reticências se necessário
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + "..."
}

