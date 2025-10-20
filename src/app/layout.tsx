import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
    url: "http://localhost:3000",
    siteName: "Vivanto",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Diseñamos, construimos y conectamos espacios que viven contigo.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Diseñamos, construimos y conectamos espacios que viven contigo.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico?v=2",
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
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0e1216" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vivanto",
              url: "http://localhost:3000",
              logo: "http://localhost:3000/og.jpg",
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
      <body>{children}</body>
    </html>
  );
}