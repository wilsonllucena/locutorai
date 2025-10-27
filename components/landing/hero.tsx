import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Locuções com IA em minutos
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Transforme textos em experiências sonoras com qualidade profissional
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            Escolha vozes realistas, adicione trilhas sonoras imersivas e exporte locuções prontas para campanhas, vídeos e podcasts.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/studio"
              className={cn(buttonVariants({ size: "lg" }), "justify-center")}
            >
              Criar minha locução
            </Link>
            <Link
              href="#demo"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "justify-center")}
            >
              Ver demonstração
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-6 text-sm text-slate-500">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-slate-900">+20K</span>
              <span>Locuções geradas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-slate-900">98%</span>
              <span>Avaliação positiva</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-slate-900">3x</span>
              <span>Mais rápido que estúdios tradicionais</span>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="absolute -left-6 top-8 h-20 w-20 rounded-full bg-brand-200/60 blur-2xl" />
            <div className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/70 blur-3xl" />
            <div className="relative flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Pré-visualização</p>
              <h2 className="text-2xl font-semibold text-slate-900">Campanha Nova Coleção</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Aproveite frete grátis e condições especiais para garantir os looks da temporada.
              </p>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Voz</span>
                  <span className="font-medium text-slate-900">Aurora</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Trilha</span>
                  <span className="font-medium text-slate-900">LoFi Dreams</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 flex-1 rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 opacity-80" />
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white">
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
