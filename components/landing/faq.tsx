const items = [
  {
    question: "Posso usar minhas próprias trilhas sonoras?",
    answer: "Sim, faça upload de arquivos WAV ou MP3 direto no estúdio e eles serão armazenados junto aos seus projetos."
  },
  {
    question: "Como funciona a cobrança?",
    answer: "Planos flexíveis com créditos mensais por minuto de áudio gerado e possibilidade de compra avulsa conforme a demanda."
  },
  {
    question: "O que acontece se a geração falhar?",
    answer: "O sistema tenta novamente automaticamente e você nunca paga por áudios que não ficaram prontos."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Dúvidas frequentes</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Informações essenciais para começar a criar locuções com IA agora mesmo.
          </p>
        </div>
        <div className="flex flex-col divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-slate-50">
          {items.map(item => (
            <div key={item.question} className="space-y-3 px-8 py-6">
              <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
              <p className="text-base leading-relaxed text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
