import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const title = "LumenArt — индивидуальный дизайнерский свет, изготовление и монтаж";

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
        alt: "LumenArt — индивидуальный дизайнерский свет",
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
    streetAddress: "ул. Примерная, 1",
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
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
