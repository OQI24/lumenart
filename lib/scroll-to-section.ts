/** Smooth scroll to a section inside the snap container */
export function scrollToSection(
  sectionId: string,
  containerId = "snap-container",
): void {
  const container = document.getElementById(containerId);
  const section = document.getElementById(sectionId);
  if (!section) return;

  document.documentElement.dataset.programmaticScroll = "1";

  const finish = () => {
    delete document.documentElement.dataset.programmaticScroll;
  };

  if (container) {
    const prevSnap = container.style.scrollSnapType;
    container.style.scrollSnapType = "none";

    const scrollPaddingTop =
      parseFloat(getComputedStyle(container).scrollPaddingTop) || 0;
    const top = Math.max(0, section.offsetTop - scrollPaddingTop);

    container.scrollTo({ top, behavior: "smooth" });

    let finished = false;
    const restore = () => {
      if (finished) return;
      finished = true;
      container.style.scrollSnapType = prevSnap;
      finish();
    };

    container.addEventListener("scrollend", restore, { once: true });
    window.setTimeout(restore, 1200);
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(finish, 900);
}

/** Returns true if href is an in-page section anchor */
export function isSectionHash(href: string): boolean {
  return href.startsWith("#") && href.length > 1;
}

export function sectionIdFromHash(href: string): string {
  return href.slice(1);
}
