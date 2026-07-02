import { TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  return (
    <div className="container-main">
      <SectionHeading
        title="Отзывы клиентов"
        subtitle="Что говорят о нас архитекторы, дизайнеры и владельцы объектов"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
        {TESTIMONIALS.map((item) => (
          <blockquote
            key={item.id}
            className="bento-card flex min-h-[370px] flex-col justify-between rounded-3xl p-9 sm:min-h-[390px] sm:p-10 lg:min-h-[420px] lg:p-12"
          >
            <div>
              <svg
                className="mb-6 text-gold/40 lg:mb-8"
                width="52"
                height="39"
                viewBox="0 0 32 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 24V14.4C0 6.4 4.8 0 12 0v4.8C8 4.8 4.8 8 4.8 12H12V24H0zm20 0V14.4C20 6.4 24.8 0 32 0v4.8C28 4.8 24.8 8 24.8 12H32V24H20z" />
              </svg>
              <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl lg:leading-relaxed">
                {item.quote}
              </p>
            </div>
            <footer className="mt-10 border-t border-white/5 pt-6 lg:mt-12 lg:pt-8">
              <cite className="not-italic">
                <span className="block text-lg font-semibold text-foreground lg:text-xl">
                  {item.author}
                </span>
                <span className="mt-2 block text-base text-gold lg:text-lg">{item.role}</span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
