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
      { url: "https://vivanto.co/logo-vivanto.png", width: 1200, height: 630, alt: "Vivanto Logo" },
      { url: "/og.jpg", width: 1200, height: 630, alt: "Vivanto preview" }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivanto | Construcción, Diseño e Inteligencia Artificial",
    description:
      "Diseño, construcción y tecnología: desde mobiliario y obras civiles hasta software e IA que automatiza procesos empresariales.",
    images: ["https://vivanto.co/logo-vivanto.png", "https://vivanto.co/og.jpg"],
  },
  alternates: {
    canonical: "https://vivanto.co/",
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
        <link rel="canonical" href="https://vivanto.co/" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0e1216" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vivanto S.A.S." />
        <meta name="google-site-verification" content="" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Vivanto | Construcción, Diseño e Inteligencia Artificial" />
        <meta property="og:description" content="Un grupo, dos mundos: diseñamos y construimos espacios, y desarrollamos software e IA que hace más eficientes a las empresas." />
        <meta property="og:image" content="https://vivanto.co/logo-vivanto.png" />
        <meta property="og:url" content="https://vivanto.co" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vivanto | Construcción, Diseño e Inteligencia Artificial" />
        <meta name="twitter:description" content="Diseño, construcción y tecnología: desde mobiliario y obras civiles hasta software e IA que automatiza procesos empresariales." />
        <meta name="twitter:image" content="https://vivanto.co/og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vivanto S.A.S.",
              legalName: "Vivanto S.A.S.",
              description:
                "Vivanto es un grupo empresarial colombiano con cuatro líneas de negocio: diseño y fabricación de mobiliario a medida (Maderas), obras civiles y remodelación (Construcciones), desarrollo de software y agentes de inteligencia artificial que automatizan procesos de negocio (Vivanto Smart), y soluciones integrales para compañías (Empresas).",
              url: "https://vivanto.co",
              logo: "https://vivanto.co/logo-vivanto.png",
              sameAs: [
                "https://www.instagram.com/vivanto.co",
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