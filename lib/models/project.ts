import { Schema, models, model, Document } from "mongoose"

export interface IProject extends Document {
  title: string
  script: string
  voiceId: string
  voiceName: string
  musicId: string
  musicName: string
  voiceUrl: string
  musicUrl: string
  status: "processing" | "completed" | "failed"
  error?: string
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    title: { 
      type: String, 
      required: [true, "Título é obrigatório"],
      trim: true,
      minlength: [3, "Título deve ter no mínimo 3 caracteres"],
      maxlength: [200, "Título deve ter no máximo 200 caracteres"]
    },
    script: { 
      type: String, 
      required: [true, "Script é obrigatório"],
      trim: true,
      minlength: [20, "Script deve ter no mínimo 20 caracteres"],
      maxlength: [10000, "Script deve ter no máximo 10000 caracteres"]
    },
    voiceId: { 
      type: String, 
      required: [true, "ID da voz é obrigatório"],
      trim: true
    },
    voiceName: { 
      type: String, 
      required: [true, "Nome da voz é obrigatório"],
      trim: true
    },
    musicId: { 
      type: String, 
      required: [true, "ID da música é obrigatório"],
      trim: true
    },
    musicName: { 
      type: String, 
      required: [true, "Nome da música é obrigatório"],
      trim: true
    },
    voiceUrl: { 
      type: String, 
      required: [true, "URL da voz é obrigatória"],
      trim: true
    },
    musicUrl: { 
      type: String, 
      required: [true, "URL da música é obrigatória"],
      trim: true
    },
    status: { 
      type: String, 
      enum: {
        values: ["processing", "completed", "failed"],
        message: "Status deve ser: processing, completed ou failed"
      },
      default: "processing",
      index: true
    },
    error: { 
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "projects"
  }
)

// Índices para melhorar performance de queries
projectSchema.index({ createdAt: -1 })
projectSchema.index({ status: 1, createdAt: -1 })

// Método virtual para verificar se o projeto está completo
projectSchema.virtual("isCompleted").get(function() {
  return this.status === "completed"
})

// Método para serialização JSON
projectSchema.set("toJSON", {
  virtuals: true,
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

export const ProjectModel = (models.Project as any) || model<IProject>("Project", projectSchema)
