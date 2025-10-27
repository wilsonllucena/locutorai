import { Schema, models, model } from "mongoose"

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    script: { type: String, required: true },
    voiceId: { type: String, required: true },
    voiceName: { type: String, required: true },
    musicId: { type: String, required: true },
    musicName: { type: String, required: true },
    voiceUrl: { type: String, required: true },
    musicUrl: { type: String, required: true },
    status: { type: String, enum: ["processing", "completed", "failed"], default: "processing" },
    error: { type: String }
  },
  {
    timestamps: true
  }
)

export const ProjectModel = models.Project || model("Project", projectSchema)
export type ProjectDocument = typeof ProjectModel extends infer M
  ? M extends { prototype: infer P }
    ? P
    : never
  : never
