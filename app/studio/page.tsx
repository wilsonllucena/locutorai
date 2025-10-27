import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { StudioClient } from "./studio-client"

export const metadata: Metadata = {
  title: "LocutorAI Estúdio",
  description: "Produza locuções com vozes de IA e trilhas sonoras integradas"
}

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6">
        <StudioClient />
      </main>
    </div>
  )
}
