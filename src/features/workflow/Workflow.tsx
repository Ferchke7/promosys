import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/src/content/constants";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";

export function Workflow() {
  return (
    <section className="section-pad overflow-hidden bg-[#eef4f9]">
      <Container>
        <Reveal><SectionHeading eyebrow="Сквозной процесс" title="От заказа до отгрузки — без разрывов." description="Каждый этап передаёт данные следующему автоматически. Команды работают синхронно, а руководитель видит статус в моменте." /></Reveal>
        <Reveal className="relative mt-14">
          <div className="workflow-line absolute left-[8%] right-[8%] top-[58px] hidden h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent lg:block" aria-hidden="true" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {workflowSteps.map((step, index) => (
              <div key={step.number} className="group relative rounded-[24px] border border-white/80 bg-white/75 p-5 shadow-[0_12px_35px_rgba(15,23,42,.045)] backdrop-blur">
                <div className="relative z-10 flex items-center justify-between lg:block">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#071426] text-cyan-300 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:bg-blue-600"><Icon name={step.icon} className="size-5" /></span>
                  {index < workflowSteps.length - 1 && <ArrowRight className="size-4 text-blue-300 lg:hidden" />}
                </div>
                <div className="mt-6"><span className="font-mono text-[9px] font-bold tracking-[.2em] text-blue-600">{step.number} / {step.label}</span><h3 className="mt-2 font-bold tracking-[-.02em] text-[#071426]">{step.title}</h3></div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
