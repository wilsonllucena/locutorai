import { createWriteStream } from "fs"
import { mkdir, stat } from "fs/promises"
import path from "path"

export async function ensureDir(dir: string) {
  try {
    await stat(dir)
  } catch (error) {
    await mkdir(dir, { recursive: true })
  }
}

export async function saveBufferToFile(buffer: Buffer, filename: string) {
  const outputDir = path.join(process.cwd(), "public", "generated")
  await ensureDir(outputDir)
  const filePath = path.join(outputDir, filename)
  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(filePath)
    stream.on("finish", resolve)
    stream.on("error", reject)
    stream.end(buffer)
  })
  return `/generated/${filename}`
}
