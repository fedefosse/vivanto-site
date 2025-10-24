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
    "Diseñamos, construimos y conectamos espacios con precisión arquitectónica y tecnología avanzada. Especialistas en remodelaciones, mobiliario a medida y proyectos empresariales en el Eje Cafetero.",
  keywords: [
    "vivanto",
    "maderas vivanto",
    "remodelaciones Pereira",
    "muebles a medida",
    "obras civiles",
    "arquitectura interior",
    "automatización",
    "Eje Cafetero",
    "diseño de interiores",
    "vivanto construcción",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://vivanto.co",
    siteName: "Vivanto",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Transformamos espacios con diseño, precisión y tecnología. Proyectos integrales de construcción y mobiliario en Colombia.",
    images: [
      { url: "https://vivanto.co/logo-vivanto.png", width: 1200, height: 630, alt: "Vivanto Logo" },
      { url: "/og.jpg", width: 1200, height: 630, alt: "Vivanto preview" }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivanto | Diseño, Construcción y Tecnología",
    description:
      "Expertos en diseño, mobiliario y obras civiles. Innovamos en construcción y domótica en el Eje Cafetero.",
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
        <meta property="og:title" content="Vivanto | Diseño, Construcción y Tecnología" />
        <meta property="og:description" content="Diseñamos, construimos y conectamos espacios con precisión arquitectónica y tecnología avanzada." />
        <meta property="og:image" content="https://vivanto.co/logo-vivanto.png" />
        <meta property="og:url" content="https://vivanto.co" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vivanto | Diseño, Construcción y Tecnología" />
        <meta name="twitter:description" content="Expertos en diseño, mobiliario y obras civiles. Innovamos en construcción y domótica." />
        <meta name="twitter:image" content="https://vivanto.co/og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vivanto S.A.S.",
              url: "https://vivanto.co",
              logo: "https://vivanto.co/logo-vivanto.png",
              sameAs: [
                "https://www.instagram.com/vivanto.co",
                "https://www.facebook.com/vivanto.co",
                "https://www.linkedin.com/company/vivanto",
                "https://www.youtube.com/@vivanto",
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