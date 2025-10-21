import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://vivanto.co"),
  title: {
    default: "Vivanto | Diseño, Construcción y Tecnología",
    template: "%s | Vivanto",
  },
  description:
    "Diseñamos, construimos y conectamos espacios que viven contigo.",
  keywords: [
    "remodelaciones Pereira",
    "muebles a medida",
    "domótica",
    "obras civiles",
    "Eje Cafetero",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://vivanto.co",
    siteName: "Vivanto",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Diseñamos, construimos y conectamos espacios que viven contigo.",
    images: [
      { url: "/logo-vivanto.png", width: 1200, height: 630, alt: "Vivanto" },
      { url: "/og.jpg", width: 1200, height: 630, alt: "Vivanto" }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Diseñamos, construimos y conectamos espacios que viven contigo.",
    images: ["/logo-vivanto.png", "/og.jpg"],
  },
  alternates: {
    canonical: "https://vivanto.co",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0e1216",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0e1216" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vivanto",
              url: "https://vivanto.co",
              logo: "https://vivanto.co/logo-vivanto.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pereira",
                addressRegion: "Risaralda",
                addressCountry: "CO",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+57-3000000000",
                  contactType: "customer service",
                  areaServed: "CO",
                  availableLanguage: ["es"],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}