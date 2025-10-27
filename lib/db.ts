import mongoose from "mongoose"
import { DB_CONFIG, ERROR_MESSAGES } from "./constants"

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: Cached
}

let cache: Cached = globalWithMongoose.mongooseCache || { conn: null, promise: null }

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = cache
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    throw new Error(ERROR_MESSAGES.MONGODB_URI_MISSING)
  }

  // Se já existe uma conexão ativa, retorná-la
  if (cache.conn) {
    if (mongoose.connection.readyState === 1) {
      return cache.conn
    }
    // Se a conexão está fechada, limpar o cache
    cache.conn = null
    cache.promise = null
  }

  // Se não há uma promessa pendente, criar uma nova conexão
  if (!cache.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: DB_CONFIG.MAX_POOL_SIZE,
      serverSelectionTimeoutMS: DB_CONFIG.SERVER_SELECTION_TIMEOUT,
      socketTimeoutMS: DB_CONFIG.SOCKET_TIMEOUT,
    }
    
    cache.promise = mongoose.connect(uri, options)
      .then((mongoose) => {
        console.log("Conectado ao MongoDB com sucesso")
        return mongoose
      })
      .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error)
        // Limpar o cache em caso de erro
        cache.promise = null
        throw error
      })
  }

  try {
    cache.conn = await cache.promise
    return cache.conn
  } catch (error) {
    cache.promise = null
    throw error
  }
}
