import { Mail, MessageCircle, Phone } from "lucide-react";
import { contacts, navigation } from "@/src/content/constants";
import { PrivacyDialog } from "@/src/features/privacy/PrivacyDialog";
import { Brand } from "@/src/shared/ui/Brand";
import { Container } from "@/src/shared/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr_.8fr]">
          <div><Brand /><p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">Система управления производством для заводов, фабрик и логистических центров Узбекистана.</p></div>
          <div><h3 className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Навигация</h3><nav className="mt-4 grid gap-3">{navigation.map((item) => <a key={item.href} href={item.href} className="text-sm text-slate-600 transition hover:text-blue-600">{item.label}</a>)}</nav></div>
          <div><h3 className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Связаться</h3><div className="mt-4 grid gap-3 text-sm text-slate-600"><a href={`tel:${contacts.phoneHref}`} className="inline-flex items-center gap-2 hover:text-blue-600"><Phone className="size-4" />{contacts.phone}</a><a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-2 hover:text-blue-600"><Mail className="size-4" />{contacts.email}</a><a href={`https://t.me/${contacts.telegramUsername}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-blue-600"><MessageCircle className="size-4" />{contacts.telegram}</a></div></div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 PROMSYS. Все права защищены.</span><PrivacyDialog /></div>
      </Container>
    </footer>
  );
}
