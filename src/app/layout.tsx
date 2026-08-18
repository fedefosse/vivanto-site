import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://vivanto.co"),
  title: {
    default: "Vivanto | Construcción, Diseño e Inteligencia Artificial",
    template: "%s | Vivanto",
  },
  description:
    "Grupo empresarial colombiano: diseño y construcción de espacios (Maderas, Construcciones) y software e IA que automatiza empresas (Vivanto Smart).",
  keywords: [
    "vivanto",
    "vivanto smart",
    "maderas vivanto",
    "vivanto construcción",
    "remodelaciones Pereira",
    "muebles a medida",
    "obras civiles",
    "arquitectura interior",
    "diseño de interiores",
    "inteligencia artificial para empresas",
    "automatización de procesos",
    "agentes de IA",
    "desarrollo de software",
    "Eje Cafetero",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://vivanto.co",
    siteName: "Vivanto",
    title: "Vivanto | Construcción, Diseño e Inteligencia Artificial",
    description:
      "Un grupo, dos mundos: diseñamos y construimos espacios, y desarrollamos software e IA que hace más eficientes a las empresas.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Vivanto — Construimos espacios. Automatizamos empresas." },
      { url: "/images/logo-vivanto.png", width: 500, height: 500, alt: "Logo Vivanto" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivanto | Construcción, Diseño e Inteligencia Artificial",
    description:
      "Diseño, construcción y tecnología: desde mobiliario y obras civiles hasta software e IA que automatiza procesos empresariales.",
    images: ["/og.jpg", "/images/logo-vivanto.png"],
  },
  alternates: {
    canonical: "https://vivanto.co/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
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
    <html lang="es-CO">
      <head>
        {/* Nota: favicons, apple-touch-icon, manifest, canonical, theme-color, og:*
            y twitter:* ya los genera automáticamente el Metadata API de Next.js
            (arriba). No se repiten aquí a propósito para evitar tags duplicados. */}
        <meta name="author" content="Vivanto S.A.S." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://vivanto.co/#organization",
              name: "Vivanto S.A.S.",
              legalName: "Vivanto S.A.S.",
              description:
                "Vivanto es un grupo empresarial colombiano con cuatro líneas de negocio: diseño y fabricación de mobiliario a medida (Maderas), obras civiles y remodelación (Construcciones), desarrollo de software y agentes de inteligencia artificial que automatizan procesos de negocio (Vivanto Smart), y soluciones integrales para compañías (Empresas).",
              url: "https://vivanto.co",
              logo: "https://vivanto.co/images/logo-vivanto.png",
              sameAs: [
                "https://www.instagram.com/vivantogroup",
                "https://www.facebook.com/vivanto.co",
                "https://www.linkedin.com/company/vivanto",
                "https://www.youtube.com/@vivanto",
              ],
              department: [
                {
                  "@type": "Organization",
                  name: "Vivanto Maderas",
                  description: "Diseño y fabricación de mobiliario a medida.",
                  url: "https://maderas.vivanto.co",
                },
                {
                  "@type": "Organization",
                  name: "Vivanto Construcciones",
                  description: "Obras civiles, remodelaciones y proyectos arquitectónicos.",
                  url: "https://construcciones.vivanto.co",
                },
                {
                  "@type": "Organization",
                  name: "Vivanto Smart",
                  description:
                    "Agencia de agentes de inteligencia artificial y automatización de procesos para empresas: facturación, contabilidad, atención al cliente por WhatsApp y agendamiento.",
                  url: "https://smart.vivanto.co",
                  sameAs: "https://smart.vivanto.co/#organization",
                },
                {
                  "@type": "Organization",
                  name: "Vivanto Empresas",
                  description: "Soluciones integrales para compañías.",
                  url: "https://empresas.vivanto.co",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. 30 de Agosto #68-157",
                addressLocality: "Pereira",
                addressRegion: "Risaralda",
                postalCode: "660001",
                addressCountry: "CO",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+57-3143543254",
                  contactType: "customer service",
                  areaServed: "CO",
                  availableLanguage: ["es"],
                },
              ],
            }),
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MNR25VQ3');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNR25VQ3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}