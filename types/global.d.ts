declare const process: {
  env: Record<string, string | undefined>
}

declare const global: typeof globalThis & {
  mongooseCache?: {
    conn: typeof import("mongoose") | null
    promise: Promise<typeof import("mongoose")> | null
  }
}
