/** Smooth scroll to a section inside the snap container */
export function scrollToSection(
  sectionId: string,
  containerId = "snap-container"
): void {
  const container = document.getElementById(containerId);
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (container) {
    const scrollPaddingTop =
      parseFloat(getComputedStyle(container).scrollPaddingTop) || 0;
    const top = Math.max(0, section.offsetTop - scrollPaddingTop);
    container.scrollTo({ top, behavior: "smooth" });
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
