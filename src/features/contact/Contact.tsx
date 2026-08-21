"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Building2, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { contacts } from "@/src/content/constants";
import { buildTelegramUrl, formatUzbekPhone, validateLeadForm } from "@/src/shared/lib/lead-form";
import type { LeadFormData, LeadFormErrors } from "@/src/shared/types/content";
import { Container } from "@/src/shared/ui/Container";

const initialForm: LeadFormData = { name: "", company: "", phone: "+998 ", consent: false };

export function Contact() {
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(form);
    setErrors(nextErrors);
    setStatus("");
    if (Object.keys(nextErrors).length) return;

    const telegramUrl = buildTelegramUrl(contacts.telegramUsername, form);
    const opened = window.open(telegramUrl, "_blank", "noopener,noreferrer");
    setStatus(opened ? "Telegram открыт — нажмите «Отправить», чтобы передать заявку." : "Разрешите всплывающие окна и попробуйте ещё раз.");
  };

  return (
    <section id="contacts" className="contact-shell relative overflow-hidden bg-[#071426] py-20 text-white sm:py-28">
      <div className="absolute -left-20 bottom-[-12rem] size-[32rem] rounded-full bg-blue-600/25 blur-[140px]" aria-hidden="true" />
      <div className="absolute -right-20 top-[-12rem] size-[34rem] rounded-full bg-cyan-400/15 blur-[140px]" aria-hidden="true" />
      <Container className="relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300"><span className="size-1.5 rounded-full bg-cyan-300" />Начнём с разговора</span>
          <h2 className="mt-6 text-balance text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Покажем, где производство теряет деньги.</h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">Оставьте контакты. На первой встрече разберём ваши процессы и предложим реалистичный сценарий автоматизации.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <a href={`tel:${contacts.phoneHref}`} className="contact-link"><Phone className="size-4" /><span><small>Телефон</small>{contacts.phone}</span></a>
            <a href={`mailto:${contacts.email}`} className="contact-link"><Mail className="size-4" /><span><small>Email</small>{contacts.email}</span></a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs text-white/45"><ShieldCheck className="size-4 text-emerald-300" />Ваши данные используются только для связи по заявке.</div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-[34px] border border-white/15 bg-white/[.08] p-5 shadow-[0_35px_100px_rgba(0,0,0,.25)] backdrop-blur-2xl sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4"><div><span className="font-mono text-[9px] font-bold uppercase tracking-[.17em] text-cyan-300">Запросить демо</span><h3 className="mt-2 text-2xl font-bold tracking-[-.035em]">Расскажите о предприятии</h3></div><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#ff7a1a] text-white"><MessageCircle className="size-5" /></span></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ваше имя" error={errors.name}><input type="text" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Азиз" className="form-input" aria-invalid={Boolean(errors.name)} /></Field>
            <Field label="Компания" error={errors.company}><div className="relative"><Building2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" /><input type="text" autoComplete="organization" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="Название предприятия" className="form-input pl-11" aria-invalid={Boolean(errors.company)} /></div></Field>
          </div>
          <div className="mt-4"><Field label="Номер телефона" error={errors.phone}><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: formatUzbekPhone(event.target.value) })} className="form-input font-mono" aria-invalid={Boolean(errors.phone)} /></Field></div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-white/55"><input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-0.5 size-4 rounded border-white/20 bg-white/10 accent-[#22d3ee]" /><span>Я согласен на обработку данных для связи по заявке. {errors.consent && <strong className="block font-medium text-orange-300">{errors.consent}</strong>}</span></label>
          <button type="submit" className="group mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff7a1a] px-6 font-bold text-white shadow-[0_18px_45px_rgba(255,122,26,.24)] transition hover:-translate-y-0.5 hover:bg-[#ff8c35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><span>Отправить в Telegram</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
          {status && <p role="status" className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.07] px-4 py-3 text-sm text-cyan-100">{status}</p>}
        </form>
      </Container>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold text-white/65">{label}</span>{children}{error && <span className="mt-1.5 block text-xs text-orange-300">{error}</span>}</label>;
}
