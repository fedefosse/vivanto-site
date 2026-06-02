import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Vivanto",
  description: "Política de privacidad y tratamiento de datos personales de Vivanto S.A.S.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://vivanto.co/privacity",
  },
};

export default function PrivacityPage() {
  return (
    <main
      style={{
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0e1216",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <a
          href="https://vivanto.co"
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          Vivanto
        </a>
      </header>

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
          }}
        >
          Política de Privacidad
        </h1>
        <p style={{ color: "#666", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          Última actualización: 2 de junio de 2025
        </p>

        <Section title="1. Responsable del Tratamiento">
          <p>
            <strong>Vivanto S.A.S.</strong> (en adelante "Vivanto"), identificada con NIT en proceso de
            consolidación, con domicilio en Av. 30 de Agosto #68-157, Pereira, Risaralda, Colombia, es
            responsable del tratamiento de los datos personales recolectados a través del sitio web{" "}
            <a href="https://vivanto.co" style={{ color: "#4476a0" }}>vivanto.co</a> y sus canales digitales.
          </p>
          <p>
            Correo de contacto para asuntos de privacidad:{" "}
            <a href="mailto:hola@vivanto.co" style={{ color: "#4476a0" }}>hola@vivanto.co</a>
          </p>
        </Section>

        <Section title="2. Datos Personales que Recopilamos">
          <p>Podemos recopilar las siguientes categorías de datos:</p>
          <ul>
            <li>
              <strong>Datos de contacto:</strong> nombre, correo electrónico, número de teléfono, ciudad,
              cuando el usuario los suministra voluntariamente a través de formularios de contacto o
              cotización.
            </li>
            <li>
              <strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo, sistema operativo,
              navegador, páginas visitadas, tiempo de sesión y fuente de referencia, recopilados
              automáticamente mediante cookies y tecnologías similares.
            </li>
            <li>
              <strong>Datos de interacción publicitaria:</strong> información sobre interacciones con
              anuncios de Meta (Facebook e Instagram) recogida a través del Píxel de Meta, incluyendo
              eventos de visita a página, búsquedas y formularios completados.
            </li>
          </ul>
          <p>
            No recopilamos datos sensibles (salud, biometría, origen racial o étnico, creencias religiosas
            o afiliación política) a través de nuestros canales digitales.
          </p>
        </Section>

        <Section title="3. Finalidad del Tratamiento">
          <p>Los datos son utilizados para:</p>
          <ul>
            <li>Responder solicitudes de cotización y contacto.</li>
            <li>Enviar comunicaciones comerciales y actualizaciones sobre nuestros servicios, cuando el usuario ha dado su consentimiento.</li>
            <li>Mejorar la experiencia de navegación en el sitio web.</li>
            <li>Medir el rendimiento de campañas publicitarias (incluyendo Meta Ads y Google Ads).</li>
            <li>Cumplir obligaciones legales aplicables.</li>
            <li>Análisis estadístico y mejora continua de nuestros servicios.</li>
          </ul>
        </Section>

        <Section title="4. Base Legal del Tratamiento">
          <p>El tratamiento de datos se fundamenta en:</p>
          <ul>
            <li><strong>Consentimiento:</strong> para comunicaciones de marketing y uso de cookies no esenciales.</li>
            <li><strong>Ejecución de relación precontractual o contractual:</strong> para responder solicitudes de cotización y prestación de servicios.</li>
            <li><strong>Interés legítimo:</strong> para análisis de rendimiento web y mejora de servicios.</li>
            <li><strong>Cumplimiento de obligaciones legales:</strong> cuando así lo exija la normativa colombiana vigente.</li>
          </ul>
        </Section>

        <Section title="5. Transferencia y Compartición de Datos">
          <p>
            Vivanto puede compartir datos personales con terceros en las siguientes circunstancias:
          </p>
          <ul>
            <li>
              <strong>Meta Platforms (Facebook/Instagram):</strong> mediante el Píxel de Meta para medir
              el rendimiento de anuncios y crear audiencias personalizadas. Meta actúa como encargado
              independiente del tratamiento bajo sus propias políticas de privacidad.{" "}
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" style={{ color: "#4476a0" }}>
                Ver política de Meta
              </a>.
            </li>
            <li>
              <strong>Google LLC:</strong> mediante Google Tag Manager y Google Analytics 4 para análisis
              de tráfico y medición de rendimiento.{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#4476a0" }}>
                Ver política de Google
              </a>.
            </li>
            <li>
              <strong>Proveedores de hosting:</strong> Vercel Inc., para el alojamiento y distribución
              del sitio web.
            </li>
          </ul>
          <p>
            No vendemos ni cedemos datos personales a terceros con fines comerciales propios distintos a
            los descritos en esta política.
          </p>
        </Section>

        <Section title="6. Cookies y Tecnologías de Seguimiento">
          <p>
            Nuestro sitio utiliza cookies y tecnologías similares. Puedes clasificarlas así:
          </p>
          <ul>
            <li>
              <strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio.
            </li>
            <li>
              <strong>Cookies analíticas:</strong> Google Analytics 4 para entender cómo los usuarios
              interactúan con el sitio.
            </li>
            <li>
              <strong>Cookies publicitarias:</strong> Píxel de Meta para medir la efectividad de
              campañas en Facebook e Instagram.
            </li>
          </ul>
          <p>
            Puedes controlar o eliminar cookies desde la configuración de tu navegador. Ten en cuenta
            que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
          </p>
        </Section>

        <Section title="7. Derechos del Titular">
          <p>
            De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Colombia), el titular de los
            datos tiene derecho a:
          </p>
          <ul>
            <li><strong>Conocer</strong> los datos personales que Vivanto tiene sobre él.</li>
            <li><strong>Actualizar</strong> datos inexactos o incompletos.</li>
            <li><strong>Rectificar</strong> datos erróneos.</li>
            <li><strong>Suprimir</strong> datos cuando no exista obligación legal de conservarlos.</li>
            <li><strong>Revocar</strong> el consentimiento otorgado para el tratamiento.</li>
            <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
          <p>
            Para ejercer estos derechos, escríbenos a{" "}
            <a href="mailto:hola@vivanto.co" style={{ color: "#4476a0" }}>hola@vivanto.co</a> con el
            asunto "Derechos HABEAS DATA". Atenderemos tu solicitud en un plazo máximo de 15 días hábiles.
          </p>
        </Section>

        <Section title="8. Conservación de Datos">
          <p>
            Los datos de contacto se conservan mientras exista una relación comercial activa o por el
            tiempo necesario para cumplir las finalidades descritas. Los datos de navegación y cookies
            analíticas se conservan por un máximo de 26 meses. Los datos requeridos por obligación legal
            se conservan por el tiempo que exija la normativa aplicable.
          </p>
        </Section>

        <Section title="9. Seguridad">
          <p>
            Vivanto implementa medidas técnicas y organizativas razonables para proteger los datos
            personales contra acceso no autorizado, pérdida, alteración o divulgación. Sin embargo,
            ninguna transmisión por Internet es completamente segura, por lo que no podemos garantizar
            seguridad absoluta.
          </p>
        </Section>

        <Section title="10. Cambios a esta Política">
          <p>
            Vivanto puede actualizar esta Política de Privacidad periódicamente. Los cambios se
            publicarán en esta página con la fecha de actualización. El uso continuado del sitio web
            tras la publicación de cambios implica la aceptación de la política actualizada.
          </p>
        </Section>

        <Section title="11. Contacto">
          <p>
            Para cualquier consulta relacionada con esta Política de Privacidad o el tratamiento de tus
            datos personales:
          </p>
          <ul>
            <li><strong>Empresa:</strong> Vivanto S.A.S.</li>
            <li><strong>Dirección:</strong> Av. 30 de Agosto #68-157, Pereira, Risaralda, Colombia</li>
            <li>
              <strong>Correo:</strong>{" "}
              <a href="mailto:hola@vivanto.co" style={{ color: "#4476a0" }}>hola@vivanto.co</a>
            </li>
            <li>
              <strong>Teléfono:</strong>{" "}
              <a href="tel:+573143543254" style={{ color: "#4476a0" }}>+57 314 354 3254</a>
            </li>
          </ul>
        </Section>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0e1216",
          color: "#aaa",
          textAlign: "center",
          padding: "1.5rem 2rem",
          fontSize: "0.85rem",
        }}
      >
        © {new Date().getFullYear()} Vivanto S.A.S. — Todos los derechos reservados.
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        marginBottom: "2.5rem",
        paddingBottom: "2.5rem",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: "1rem",
          color: "#0a0a0a",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "#333",
        }}
      >
        {children}
      </div>
    </section>
  );
}
