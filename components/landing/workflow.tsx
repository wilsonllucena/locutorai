const steps = [
  {
    number: "01",
    title: "Escreva ou importe o roteiro",
    description: "Cole o texto ou conecte-se ao seu CMS para sincronizar automaticamente roteiros e atualizações."
  },
  {
    number: "02",
    title: "Personalize voz e trilha",
    description: "Escolha vozes sintéticas, regule velocidade, tom e combine com trilhas com volume balanceado."
  },
  {
    number: "03",
    title: "Gere e compartilhe",
    description: "Baixe em MP3 ou WAV, publique direto nas redes ou envie para aprovação da equipe."
  }
]

export function Workflow() {
  return (
    <section id="fluxo" className="bg-slate-50 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Um fluxo intuitivo para acelerar a produção</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
            Menos cliques, mais criação. Em poucos minutos você transforma ideias em locuções prontas para engajar seu público.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(step => (
            <div key={step.number} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">{step.number}</span>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="text-base leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
