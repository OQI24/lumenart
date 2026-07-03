import { TESTIMONIALS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

const chapter = SECTION_CHAPTERS.testimonials!;

export default function Testimonials() {
  return (
    <SectionFrame>
      <SectionHeading
        title="Отзывы клиентов"
        subtitle="Что говорят о нас архитекторы, дизайнеры и владельцы объектов"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0">
        {TESTIMONIALS.map((item, index) => (
          <FadeUp
            key={item.id}
            delay={index * 0.1}
            className="w-[85vw] shrink-0 snap-center sm:w-[70vw] lg:w-auto"
          >
            <blockquote className="bento-card flex h-full min-h-[380px] flex-col justify-between rounded-[2rem] p-9 sm:min-h-[400px] sm:p-10 lg:min-h-[440px] lg:p-12">
              <div>
                <svg
                  className="mb-8 text-gold/35 lg:mb-10"
                  width="56"
                  height="42"
                  viewBox="0 0 32 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 24V14.4C0 6.4 4.8 0 12 0v4.8C8 4.8 4.8 8 4.8 12H12V24H0zm20 0V14.4C20 6.4 24.8 0 32 0v4.8C28 4.8 24.8 8 24.8 12H32V24H20z" />
                </svg>
                <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl lg:leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <footer className="mt-10 border-t border-white/5 pt-7 lg:mt-12 lg:pt-8">
                <cite className="not-italic">
                  <span className="block text-xl font-semibold text-foreground lg:text-2xl">
                    {item.author}
                  </span>
                  <span className="mt-2 block text-base text-gold lg:text-lg">{item.role}</span>
                </cite>
              </footer>
            </blockquote>
          </FadeUp>
        ))}
      </div>
    </SectionFrame>
  );
}
