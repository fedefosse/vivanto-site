import "./globals.css";
export const metadata = {
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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
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