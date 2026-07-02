import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import StylesCatalog from "@/components/sections/StylesCatalog";
import Technologies from "@/components/sections/Technologies";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import { sections } from "@/config/sections";
import type { SectionId } from "@/config/sections";

const sectionComponents: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  about: About,
  benefits: Benefits,
  styles: StylesCatalog,
  technologies: Technologies,
  process: Process,
  portfolio: Portfolio,
  testimonials: Testimonials,
  contacts: ContactForm,
};

export default function Home() {
  return (
    <>
      <Header scrollContainerId="snap-container" />
      <main id="snap-container" className="snap-container">
        {sections.map(({ id }) => {
          const Component = sectionComponents[id];
          return (
            <section
              key={id}
              id={id}
              className={`snap-section ${id === "hero" ? "snap-section-hero" : ""} ${id === "styles" ? "overflow-hidden p-0! justify-stretch!" : ""}`}
            >
              <Component />
            </section>
          );
        })}
      </main>
    </>
  );
}
