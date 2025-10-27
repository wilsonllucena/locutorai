import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "LocutorAI",
  description: "Crie locuções envolventes com vozes de IA e trilhas sonoras personalizadas"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-slate-50 text-slate-900 antialiased")}>{children}</body>
    </html>
  )
}
