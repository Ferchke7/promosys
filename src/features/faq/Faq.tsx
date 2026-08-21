"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/src/content/constants";
import { Container } from "@/src/shared/ui/Container";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";

export function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-[#f8fafc]">
      <Container>
        <Reveal><SectionHeading eyebrow="FAQ" title="Коротко о главном." description="Ответы на вопросы, которые чаще всего возникают перед первой встречей." /></Reveal>
        <div className="mt-14 border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.question} className="border-b border-slate-200">
                <button type="button" className="flex w-full items-center justify-between gap-5 py-7 text-left sm:py-8" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setActiveIndex(isOpen ? -1 : index)}>
                  <span className="flex items-start gap-4 sm:gap-8"><span className="pt-1 font-mono text-[10px] font-bold text-blue-600">0{index + 1}</span><span className="text-lg font-bold tracking-[-.025em] text-[#071426] sm:text-xl">{faq.question}</span></span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white"><Plus className={`size-4 transition duration-300 ${isOpen ? "rotate-45" : ""}`} /></span>
                </button>
                <AnimatePresence initial={false}>{isOpen && <motion.div id={`faq-panel-${index}`} initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reducedMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="max-w-3xl pb-8 pl-10 text-base leading-7 text-slate-600 sm:pl-[4.5rem]">{faq.answer}</p></motion.div>}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
