/** Smooth scroll to a section inside the snap container */
export function scrollToSection(
  sectionId: string,
  containerId = "snap-container"
): void {
  const container = document.getElementById(containerId);
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (container) {
    const containerTop = container.getBoundingClientRect().top;
    const sectionTop = section.getBoundingClientRect().top;
    const targetScroll = container.scrollTop + (sectionTop - containerTop);
    container.scrollTo({ top: targetScroll, behavior: "smooth" });
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Returns true if href is an in-page section anchor */
export function isSectionHash(href: string): boolean {
  return href.startsWith("#") && href.length > 1;
}

export function sectionIdFromHash(href: string): string {
  return href.slice(1);
}
