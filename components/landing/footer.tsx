import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} LocutorAI. Todos os direitos reservados.</span>
        <div className="flex items-center gap-6">
          <Link href="#">Termos</Link>
          <Link href="#">Privacidade</Link>
          <Link href="mailto:contato@locutor.ai">Contato</Link>
        </div>
      </div>
    </footer>
  )
}
