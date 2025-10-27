import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioLines, Music4, Sparkles } from "lucide-react"

const items = [
  {
    icon: Sparkles,
    title: "Vozes realistas",
    description: "Modelos de IA multilíngues treinados para manter emoção, ritmo e pronúncia precisa."
  },
  {
    icon: Music4,
    title: "Mixagem inteligente",
    description: "Combine sua locução com trilhas otimizadas automaticamente para volume, equalização e duração."
  },
  {
    icon: AudioLines,
    title: "Exportação em lote",
    description: "Gere pacotes completos em diferentes formatos de áudio e compartilhe com a equipe em segundos."
  }
]

export function Features() {
  return (
    <section id="recursos" className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="mx-auto" variant="default">
            Plataforma completa
          </Badge>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Tudo que você precisa para narrativas sonoras memoráveis</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
            Substitua dezenas de ferramentas por um fluxo conectado que entrega locuções prontas para publicação em minutos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(feature => (
            <Card key={feature.title} className="relative overflow-hidden border-none bg-slate-50/60 p-8">
              <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-brand-100" />
              <CardHeader className="gap-4">
                <feature.icon className="h-10 w-10 text-brand-600" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base text-slate-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
