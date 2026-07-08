import Image from "next/image";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";
import CtaButton from "@/components/ui/CtaButton";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AudienceSplit() {
  return (
    <SectionFrame>
      <SectionHeading
        title="С кем мы работаем"
        subtitle="Два формата сотрудничества — одинаково высокий стандарт исполнения"
        align="left"
      />
      <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        {AUDIENCE_SEGMENTS.map((segment, index) => (
          <FadeUp key={segment.id} delay={0.08 + index * 0.08}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-background-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_24px_48px_-24px_rgba(198,161,91,0.35)] sm:rounded-[2rem]">
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
                <div className="audience-blob-mask absolute inset-0">
                  <Image
                    src={segment.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                  {segment.title}
                </h3>
                <p className="mb-6 flex-1 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {segment.description}
                </p>
                <CtaButton href={segment.href} className="w-fit">
                  {segment.cta}
                </CtaButton>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </SectionFrame>
  );
}
