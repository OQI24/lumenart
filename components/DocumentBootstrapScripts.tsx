"use client";

/**
 * Inline bootstrap scripts that must run during HTML parse (FOUC / --app-vh).
 *
 * React 19 warns on executable <script> during client render. Next’s recommended
 * pattern: text/javascript on SSR (browser executes), text/plain on client
 * (no re-exec, no overlay warning). suppressHydrationWarning covers the type flip.
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */

const THEME_BOOTSTRAP = `(function(){var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.add(d?"dark":"light")})();`;

const VIEWPORT_BOOTSTRAP = `(function(){var h=window.visualViewport&&window.visualViewport.height||window.innerHeight;var id="app-layout-vars";var el=document.getElementById(id);if(!el){el=document.createElement("style");el.id=id;document.head.appendChild(el)}el.textContent=":root{--app-vh:"+h+"px}"})();`;

function InlineBootstrapScript({
  id,
  html,
}: {
  id: string;
  html: string;
}) {
  return (
    <script
      id={id}
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function DocumentBootstrapScripts() {
  return (
    <>
      <InlineBootstrapScript id="lumenart-theme-bootstrap" html={THEME_BOOTSTRAP} />
      <InlineBootstrapScript
        id="lumenart-viewport-bootstrap"
        html={VIEWPORT_BOOTSTRAP}
      />
    </>
  );
}
