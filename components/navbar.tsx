import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-full bg-brand-600 px-2 py-1 text-xs uppercase tracking-wide text-white">LocutorAI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="#recursos" className="transition hover:text-slate-900">
            Recursos
          </Link>
          <Link href="#fluxo" className="transition hover:text-slate-900">
            Como funciona
          </Link>
          <Link href="#faq" className="transition hover:text-slate-900">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/studio" className="hidden text-sm font-semibold text-slate-600 md:inline-flex">
            Entrar no estúdio
          </Link>
          <Link href="/studio" className={cn(buttonVariants(), "justify-center")}>
            Começar agora
          </Link>
        </div>
      </div>
    </header>
  )
}
