import mongoose from "mongoose"

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: Cached
}

let cache = globalWithMongoose.mongooseCache

if (!cache) {
  cache = { conn: null, promise: null }
  globalWithMongoose.mongooseCache = cache
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI não configurada")
  }
  if (cache.conn) {
    return cache.conn
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false })
  }
  cache.conn = await cache.promise
  return cache.conn
}
