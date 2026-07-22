import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import DocumentBootstrapScripts from "@/components/DocumentBootstrapScripts";
import ThemeProvider from "@/components/ThemeProvider";
import ViewportHeightSync from "@/components/ViewportHeightSync";
import { SITE, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

/** Запасной гротеск, пока не добавлены woff2 Magistral в public/fonts/ */
const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo",
  display: "swap",
});

const title =
  "LumenArt: индивидуальный дизайнерский свет, изготовление и монтаж";

export const metadata: Metadata = {
  title,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "LumenArt",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LumenArt: индивидуальный дизайнерский свет",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE_DESCRIPTION,
  telephone: SITE.phoneRaw,
  email: SITE.email,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressRegion: "Московская область",
    addressCountry: "RU",
  },
  priceRange: "$$",
  image: `${SITE_URL}/og-image.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={exo2.variable} suppressHydrationWarning>
      <head>
        {/* Theme + --app-vh before paint; React 19–safe via DocumentBootstrapScripts */}
        <DocumentBootstrapScripts />
        {/* application/ld+json is a data block — no React 19 script warning */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <ViewportHeightSync />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
