
 "use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// Helpers para renderizar solo el slide actual y sus vecinos (mejor rendimiento)
const wrap = (i: number, len: number) => (i + len) % len;
const window3 = (i: number, len: number) => [wrap(i - 1, len), i, wrap(i + 1, len)];

export default function VivantoWireframe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const maxY = useRef(0);
  const isTouching = useRef(false);
  const [active, setActive] = useState<"" | "maderas" | "construcciones" | "smart" | "empresas">("");
  const [hovered, setHovered] = useState<"" | "maderas" | "construcciones" | "smart" | "empresas">("");

  const COLORS = {
    maderas: "#7a844f",        // verde oliva
    construcciones: "#c16a3a", // naranja óxido
    smart: "#4476a0",          // azul tech
    empresas: "#b8a13a",        // dorado
  } as const;

  const DIVISION_LOGOS: Record<keyof typeof COLORS, string> = {
    maderas: "/images/logo-maderas.png",
    construcciones: "/images/logo-construcciones.png",
    smart: "/images/logo-smart.png",
    empresas: "/images/logo-empresas.png",
  };


  // Utilidades para detectar imágenes reales preservando el orden exacto (1,2,3,...)
  const EXTS = ["jpg", "jpeg", "png", "webp"] as const;

  const imageExists = (src: string) =>
    new Promise<boolean>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

  // Resuelve hero1.(jpg|jpeg|png|webp), hero2...(en ese orden), etc.
  const resolveNumberedImages = async (
    prefix: string,
    max: number,
    basePath = "/images"
  ): Promise<string[]> => {
    const out: string[] = [];
    for (let i = 1; i <= max; i++) {
      let picked: string | null = null;
      for (const ext of EXTS) {
        const candidate = `${basePath}/${prefix}${i}.${ext}`;
        // esperamos hasta confirmar si existe
        // al elegir el primero válido por índice evitamos duplicados por caché
        // y respetamos el orden exacto 1..N
        // eslint-disable-next-line no-await-in-loop
        if (await imageExists(candidate)) {
          picked = candidate;
          break;
        }
      }
      if (picked) out.push(picked);
    }
    return out;
  };


  // Estados con las fuentes finales detectadas
  const [heroSources, setHeroSources] = useState<string[]>([]);
  const [idSources, setIdSources] = useState<string[]>([]);
  const [confianzaSources, setConfianzaSources] = useState<string[]>([]);

  // Detecta la primera extensión existente (jpg/jpeg/png/webp) para una ruta sin extensión
  const tryExts = async (pathNoExt: string) => {
    for (const ext of EXTS) {
      const candidate = `${pathNoExt}.${ext}`;
      // eslint-disable-next-line no-await-in-loop
      if (await imageExists(candidate)) return candidate;
    }
    return "";
  };

  const [divisionCovers, setDivisionCovers] = useState<
    Record<"maderas" | "construcciones" | "smart" | "empresas", string>
  >({ maderas: "", construcciones: "", smart: "", empresas: "" });

  useEffect(() => {
    (async () => {
      const keys: ("maderas" | "construcciones" | "smart" | "empresas")[] = [
        "maderas",
        "construcciones",
        "smart",
        "empresas",
      ];
      const entries = await Promise.all(
        keys.map(async (k) => [k, await tryExts(`/images/divisiones/${k}-cover`)] as const)
      );
      setDivisionCovers(Object.fromEntries(entries) as any);
    })();
  }, []);

  // Valida una lista de candidatos simple, manteniendo orden y evitando duplicados exactos
  const loadOrderedImages = async (candidates: string[]) => {
    const checks = await Promise.all(candidates.map(imageExists));
    const seen = new Set<string>();
    const list: string[] = [];
    candidates.forEach((src, idx) => {
      if (checks[idx] && !seen.has(src)) {
        seen.add(src);
        list.push(src);
      }
    });
    return list;
  };

  // Carga inicial de listas válidas, preservando el orden
  useEffect(() => {
    (async () => {
      const numbered = await resolveNumberedImages("hero", 10, "/images");
      const withFallback = await loadOrderedImages([...numbered, "/images/hero.jpg"]);
      if (withFallback.length) setHeroSources(withFallback);
    })();
    (async () => {
      const numbered = await resolveNumberedImages("proceso", 10, "/images");
      const withFallback = await loadOrderedImages([...numbered, "/images/proceso.jpg"]);
      if (withFallback.length) setIdSources(withFallback);
    })();
    (async () => {
      const numbered = await resolveNumberedImages("confianza-", 20, "/images/confianza");
      const withFallback = await loadOrderedImages([...numbered]);
      if (withFallback.length) setConfianzaSources(withFallback);
    })();
  }, []);

  const [heroIndex, setHeroIndex] = useState(0);
  const [idIndex, setIdIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [idPaused, setIdPaused] = useState(false);

  // --- Cases Carousel State ---
  const [casesPaused, setCasesPaused] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [cases, setCases] = useState<{ src: string; alt: string; tag: "maderas" | "construcciones" | "smart" | "empresas" }[]>([]);

  // Lightbox state for cases (use index to avoid stale src issues)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [zoom, setZoom] = useState(1);
  const [portalMounted, setPortalMounted] = useState(false);

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % Math.max(1, cases.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + Math.max(1, cases.length)) % Math.max(1, cases.length));
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.1));
      if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(1, z - 0.1));
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, cases.length]);

  // Carga automática de casos por patrón nombre+número (e.g., maderas-1.jpg, construcciones-2.webp, etc.)
  useEffect(() => {
    (async () => {
      const tags: ("maderas" | "construcciones" | "smart" | "empresas")[] = [
        "maderas",
        "construcciones",
        "smart",
        "empresas",
      ];
      const assembled: { src: string; alt: string; tag: "maderas" | "construcciones" | "smart" | "empresas" }[] = [];

      for (const tag of tags) {
        // Buscar hasta 10 por si acaso; sólo añadirá las que existan y mantendrá el orden 1..N
        // Ejemplo de ruta final: /images/casos/maderas-1.jpg
        // Reutilizamos resolveNumberedImages con prefijo `${tag}-`
        // eslint-disable-next-line no-await-in-loop
        const found = await resolveNumberedImages(`${tag}-`, 10, "/images/casos");
        found.forEach((src, i) => {
          assembled.push({ src, alt: `${tag} ${i + 1}`, tag });
        });
      }

      setCases(assembled);
      setCaseIndex(0);
    })();
  }, []);

  // Autoplay de casos con pausa en hover
  useEffect(() => {
    if (casesPaused || cases.length <= 1) return;
    const t = setInterval(() => setCaseIndex((i) => (i + 1) % cases.length), 4500);
    return () => clearInterval(t);
  }, [casesPaused, cases.length]);

  // Auto avance HERO cada 5s con pausa en hover
  useEffect(() => {
    if (heroPaused || heroSources.length <= 1) return;
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSources.length);
    }, 5000);
    return () => clearInterval(t);
  }, [heroPaused, heroSources.length]);

  // Auto avance IDENTIDAD cada 6s con pausa en hover
  useEffect(() => {
    if (idPaused || idSources.length <= 1) return;
    const t = setInterval(() => {
      setIdIndex((i) => (i + 1) % idSources.length);
    }, 6000);
    return () => clearInterval(t);
  }, [idPaused, idSources.length]);

  // Reinicia índices si cambia la longitud de las listas
  useEffect(() => { setHeroIndex(0); }, [heroSources.length]);
  useEffect(() => { setIdIndex(0); }, [idSources.length]);

  // Forzar inicio arriba en recargas y desactivar restauración automática
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // Cuando navegamos por anclas internas, calcula el desplazamiento objetivo
  const scrollToId = (hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const offset = 88; // alto del header fijo
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, left: 0, behavior: "smooth" });
  };

  const Btn = (
    id: keyof typeof COLORS,
    label: string,
    href: string,
    theme: "dark" | "light" = "dark"
  ) => {
    const c = COLORS[id];
    const isActive = active === id;
    const isHover = hovered === id;

    // Base colors depending on theme
    const baseBorder = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)";
    const baseText = theme === "dark" ? "#ffffff" : "#111111";

    const bg = isActive || isHover ? c : "transparent";
    const br = isActive || isHover ? c : baseBorder;
    const tx = isActive || isHover ? "#ffffff" : baseText;

    return (
      <a
        key={id}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setActive(id);
          scrollToId(href);
          // opcional: no dejar hash en la URL
          if (window.history.replaceState) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered("")}
        onTouchStart={() => setHovered(id)}
        onTouchEnd={() => setHovered("")}
        className="px-6 py-3 rounded-full border transition shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
        style={{ backgroundColor: bg, borderColor: br, color: tx }}
      >
        {label}
      </a>
    );
  };

  // --- Scroll nativo con barra visible ---
  useEffect(() => {
    // Asegura barra de scroll visible y sin alturas forzadas
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overflow = "auto";
    document.body.style.height = "";
  }, []);

  // --- Reveal on scroll (IntersectionObserver) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (!("IntersectionObserver" in window) || !els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="w-full bg-white text-neutral-900">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-[999]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative mt-4 h-14 md:h-16 flex items-center justify-between rounded-[28px] border border-white/40 bg-white/20 backdrop-blur-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] ring-1 ring-black/5 supports-[backdrop-filter]:bg-white/15 transition-all duration-500">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/40 to-white/10" />
            <a
              href="#"
              role="button"
              aria-label="Ir al inicio"
              className="flex items-center gap-2 pl-3 cursor-pointer select-none bg-transparent border-0 pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                if (window.history.replaceState) {
                  window.history.replaceState(null, "", window.location.pathname);
                }
              }}
              onKeyDown={(e) => {
                // Soporta Enter y Espacio como activadores
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  if (window.history.replaceState) {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }
              }}
              tabIndex={0}
            >
              <img
                src="/images/logo-vivanto.png"
                alt="Logo Vivanto"
                className="h-10 md:h-12 w-auto object-contain"
                loading="eager"
                decoding="async"
                style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.22))" }}
                draggable={false}
              />
              <span className="font-medium tracking-wide">VIVANTO</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm pr-3 text-neutral-900">
              <a
                href="#maderas"
                className="transition-colors"
                style={{ color: hovered === "maderas" ? COLORS.maderas : undefined }}
                onMouseEnter={() => setHovered("maderas")}
                onMouseLeave={() => setHovered("")}
                onClick={(e) => {
                  e.preventDefault();
                  setActive("maderas");
                  scrollToId("#maderas");
                  if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
                }}
              >
                Maderas
              </a>
              <a
                href="#construcciones"
                className="transition-colors"
                style={{ color: hovered === "construcciones" ? COLORS.construcciones : undefined }}
                onMouseEnter={() => setHovered("construcciones")}
                onMouseLeave={() => setHovered("")}
                onClick={(e) => {
                  e.preventDefault();
                  setActive("construcciones");
                  scrollToId("#construcciones");
                  if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
                }}
              >
                Construcciones
              </a>
              <a
                href="#smart"
                className="transition-colors"
                style={{ color: hovered === "smart" ? COLORS.smart : undefined }}
                onMouseEnter={() => setHovered("smart")}
                onMouseLeave={() => setHovered("")}
                onClick={(e) => {
                  e.preventDefault();
                  setActive("smart");
                  scrollToId("#smart");
                  if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
                }}
              >
                Smart
              </a>
              <a
                href="#empresas"
                className="transition-colors"
                style={{ color: hovered === "empresas" ? COLORS.empresas : undefined }}
                onMouseEnter={() => setHovered("empresas")}
                onMouseLeave={() => setHovered("")}
                onClick={(e) => {
                  e.preventDefault();
                  setActive("empresas");
                  scrollToId("#empresas");
                  if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
                }}
              >
                Empresas
              </a>
              <a className="px-4 py-1.5 rounded-full bg-neutral-900 text-white" href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#contacto");
                  if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
                }}
              >
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </header>
      <div ref={containerRef} className="min-h-screen">

      {/* HERO FULL-BLEED */}
      <section className="relative pt-20 md:pt-24">
        <div className="relative w-full h-[92vh] overflow-hidden">
          {/* Slider HERO (fade) */}
          <div
            className="absolute inset-0"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
          >
            {heroSources.length > 0 &&
              window3(heroIndex, heroSources.length).map((idx) => (
                <Image
                  key={idx}
                  src={heroSources[idx]}
                  alt={`Hero ${idx + 1}`}
                  fill
                  sizes="100vw"
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "low"}
                  quality={80}
                  className="object-cover object-center transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: heroIndex === idx ? 1 : 0, willChange: "opacity" }}
                />
              ))}
          </div>
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              Diseñamos, construimos y conectamos
              <br className="hidden md:block" />
              espacios que viven contigo.
            </h1>
            <p className="mt-5 text-white/80 md:text-xl">
              Minimalismo, precisión y tecnología aplicados a tu espacio.
            </p>

            {/* Botones con colores corporativos */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {Btn("maderas", "MADERAS", "#maderas", "dark")}
              {Btn("construcciones", "CONSTRUCCIONES", "#construcciones", "dark")}
              {Btn("smart", "SMART", "#smart", "dark")}
              {Btn("empresas", "EMPRESAS", "#empresas", "dark")}
            </div>

            {/* Dots HERO */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSources.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a slide ${i + 1}`}
                  onClick={() => setHeroIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${heroIndex === i ? "w-6 bg-white" : "w-3 bg-white/60"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Indicador scroll minimal (ultra-compacto) */}
        <div className="mt-1 flex justify-center">
          <div className="h-1 w-px bg-neutral-300 rounded-full" />
        </div>
      </section>

{/* IDENTIDAD / QUÉ HACEMOS */}
<section className="bg-white text-neutral-900 fade-in">
  <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center gap-10">
    {/* Imagen o video de proceso */}
    <div className="flex-1">
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-lg aspect-[16/10] md:aspect-[4/3]"
        onMouseEnter={() => setIdPaused(true)}
        onMouseLeave={() => setIdPaused(false)}
      >
        {idSources.length > 0 &&
          window3(idIndex, idSources.length).map((idx) => (
            <Image
              key={idx}
              src={idSources[idx]}
              alt={`Proceso ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
              fetchPriority={idx === 0 ? "high" : "low"}
              quality={80}
              className="object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: idIndex === idx ? 1 : 0, willChange: "opacity" }}
            />
          ))}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {idSources.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a imagen ${i + 1}`}
            onClick={() => setIdIndex(i)}
            className={`h-1.5 rounded-full transition-all ${idIndex === i ? "w-6 bg-neutral-800" : "w-3 bg-neutral-400"}`}
          />
        ))}
      </div>
    </div>

    {/* Texto descriptivo */}
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-semibold mb-6">
        Diseño, precisión y tecnología <br /> en cada proyecto.
      </h2>
      <p className="text-neutral-700 mb-6">
        En Vivanto combinamos el arte del diseño con la ingeniería funcional.  
        Desde muebles personalizados hasta obras civiles completas, conectamos cada detalle con tecnología moderna.
      </p>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {Btn("maderas", "MADERAS", "#maderas", "light")}
        {Btn("construcciones", "CONSTRUCCIONES", "#construcciones", "light")}
        {Btn("smart", "SMART", "#smart", "light")}
        {Btn("empresas", "EMPRESAS", "#empresas", "light")}
      </div>
    </div>
  </div>
</section>

      {/* DIVISIONES */}
      <section className="mt-16 md:mt-24" id="divisiones">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            { id: "maderas", title: "MADERAS", desc: "Diseño y precisión en cada pieza." },
            { id: "construcciones", title: "CONSTRUCCIONES", desc: "Obras que transforman espacios." },
            { id: "smart", title: "SMART", desc: "Tecnología que vive contigo." },
            { id: "empresas", title: "EMPRESAS", desc: "Soluciones integrales para compañías." },
          ].map((b) => (
            <a
              key={b.id}
              id={b.id}
              href={`#${b.id}-detalle`}
              className="group relative rounded-3xl overflow-hidden border border-neutral-200/70 bg-white hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] transition scroll-mt-[88px]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={divisionCovers[b.id as keyof typeof COLORS] || `/images/divisiones/${b.id}-cover.jpg`}
                  alt={`${b.title} – portada`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 relative pr-28 md:pr-32">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-medium">{b.title}</h3>
                  <div className="text-neutral-500 group-hover:text-neutral-900 transition mr-0">Explorar →</div>
                </div>
                <p className="mt-2 text-neutral-600">{b.desc}</p>

                {/* Sello de división dentro del área de contenido */}
                <img
                  src={DIVISION_LOGOS[b.id as keyof typeof COLORS]}
                  alt=""
                  aria-hidden
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="pointer-events-none absolute bottom-4 right-4 h-20 md:h-24 object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* INSPIRACIÓN VIVANTO (antes Casos) */}
      <section className="mt-20 md:mt-28">
        {/* Título centrado dentro del ancho de contenido */}
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Inspiración Vivanto</h2>
        </div>

        {/* Contenedor full-bleed (borde a borde) */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div
            className="relative overflow-hidden border-y border-neutral-200/70 bg-white"
            onMouseEnter={() => setCasesPaused(true)}
            onMouseLeave={() => setCasesPaused(false)}
          >
            {/* Alto responsivo del visor */}
            <div className="relative h-[58vh] md:h-[66vh] lg:h-[72vh] max-h-[920px] min-h-[320px]">
              {cases.length > 0 &&
                window3(caseIndex, cases.length).map((idx) => (
                  <Image
                    key={idx}
                    src={cases[idx].src}
                    alt={cases[idx].alt}
                    fill
                    sizes="100vw"
                    priority={idx === 0}
                    fetchPriority={idx === 0 ? "high" : "low"}
                    quality={80}
                    className="object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-zoom-in"
                    style={{ opacity: caseIndex === idx ? 1 : 0 }}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setZoom(1);
                      setLightboxOpen(true);
                    }}
                  />
                ))}

              {/* etiqueta de división + color corporativo (enlace clickeable) */}
              {!!cases.length && (
                <a
                  href={`#${cases[caseIndex].tag}`}
                  className="absolute left-4 bottom-4 md:left-6 md:bottom-6 cursor-pointer group"
                  tabIndex={0}
                  aria-label={`Ir a sección ${cases[caseIndex].tag}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-sm md:text-base font-medium shadow-lg transition duration-200 group-hover:brightness-110 group-hover:opacity-90"
                    style={{ backgroundColor: COLORS[cases[caseIndex].tag] }}
                  >
                    {cases[caseIndex].tag.toUpperCase()}
                  </div>
                </a>
              )}

              {/* Dots + flechas */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <div className="hidden md:flex gap-2 mr-4">
                  {cases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCaseIndex(i)}
                      aria-label={`Ir al caso ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${caseIndex === i ? "w-6 bg-neutral-900" : "w-3 bg-neutral-400"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCaseIndex(i => (i - 1 + cases.length) % cases.length)}
                  className="px-3 py-1.5 rounded-full border border-neutral-300 bg-white/80 backdrop-blur hover:bg-neutral-900 hover:text-white transition"
                  aria-label="Anterior"
                >
                  ◀
                </button>
                <button
                  onClick={() => setCaseIndex(i => (i + 1) % cases.length)}
                  className="px-3 py-1.5 rounded-full border border-neutral-300 bg-white/80 backdrop-blur hover:bg-neutral-900 hover:text-white transition"
                  aria-label="Siguiente"
                >
                  ▶
                </button>
              </div>

              {/* Hint: click para ampliar */}
              <div className="absolute top-4 right-4 text-xs md:text-sm bg-black/40 text-white px-2 py-1 rounded-full">
                Click para ampliar
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {portalMounted && lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative overflow-hidden"
              style={{ width: "min(95vw, 1400px)", height: "min(90vh, 90vh)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {cases.length > 0 && (
                <Image
                  src={cases[lightboxIndex]?.src || ""}
                  alt={cases[lightboxIndex]?.alt || "Vista ampliada"}
                  fill
                  sizes="95vw"
                  className="object-contain select-none"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "center center", willChange: "transform" }}
                  priority
                />
              )}

              {/* Nav arrows */}
              {cases.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/80 backdrop-blur hover:bg-white"
                    onClick={() => setLightboxIndex((i) => (i - 1 + cases.length) % cases.length)}
                    aria-label="Anterior"
                  >
                    ◀
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/80 backdrop-blur hover:bg-white"
                    onClick={() => setLightboxIndex((i) => (i + 1) % cases.length)}
                    aria-label="Siguiente"
                  >
                    ▶
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Ir a ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${lightboxIndex === i ? "w-6 bg-white" : "w-3 bg-white/60"}`}
                  />
                ))}
              </div>

              {/* Zoom + Close */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  className="px-3 py-2 rounded-full bg-white/80 backdrop-blur text-sm hover:bg-white"
                  onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
                  aria-label="Alejar"
                >
                  −
                </button>
                <button
                  className="px-3 py-2 rounded-full bg-white/80 backdrop-blur text-sm hover:bg-white"
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(2)))}
                  aria-label="Acercar"
                >
                  +
                </button>
                <button
                  className="px-3 py-2 rounded-full bg-white/80 backdrop-blur text-sm hover:bg-white"
                  onClick={() => setZoom(1)}
                  aria-label="Restablecer"
                >
                  100%
                </button>
                <button
                  className="px-3 py-2 rounded-full bg-white/80 backdrop-blur text-sm hover:bg-white"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Cerrar"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      }


      {/* COMPROMISO VIVANTO (versión impactante) */}
      <section className="relative mt-24 md:mt-32 text-neutral-900">
        {/* fondo sutil con degradado y textura */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.06),transparent)]" />
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-white/90">
              ¿Por qué elegir a Vivanto?
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              Cero estrés. Resultados que se sienten.
            </h2>
            <p className="mt-4 text-neutral-600 md:text-lg max-w-3xl mx-auto">
              Te acompañamos de principio a fin para que tu proyecto avance sin sorpresas:
              presupuesto claro, fechas firmes y calidad medible. Tú disfrutas el proceso, nosotros
              nos encargamos del resto.
            </p>
          </div>

          {/* 3 pilares – cards con presencia */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Garantía escrita */}
            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.25)] transition">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl grid place-items-center bg-neutral-900 text-white text-2xl shadow-md">🛡️</div>
                <h3 className="text-xl font-semibold">Garantía escrita</h3>
              </div>
              <p className="mt-3 text-neutral-700">
                Cada entrega queda respaldada por documento de garantía y un plan de servicio real.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-800">
                <li>✔ Cobertura de instalación y ajustes.</li>
                <li>✔ Visita técnica sin costo ante cualquier novedad.</li>
                <li>✔ Evidencias y actas de cierre firmadas.</li>
              </ul>
            </div>

            {/* Fechas y control */}
            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.25)] transition">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl grid place-items-center bg-neutral-900 text-white text-2xl shadow-md">⏱️</div>
                <h3 className="text-xl font-semibold">Fechas que se cumplen</h3>
              </div>
              <p className="mt-3 text-neutral-700">
                Cronograma visible y seguimiento semanal por WhatsApp o correo.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-800">
                <li>✔ Hitos claros de Diseño → Producción → Instalación.</li>
                <li>✔ Reportes con fotos del avance.</li>
                <li>✔ Un responsable único de principio a fin.</li>
              </ul>
            </div>

            {/* Calidad y estándares */}
            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.25)] transition">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl grid place-items-center bg-neutral-900 text-white text-2xl shadow-md">🏗️</div>
                <h3 className="text-xl font-semibold">Calidad que perdura</h3>
              </div>
              <p className="mt-3 text-neutral-700">
                Materiales certificados y ensamblaje con estándares industriales.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-800">
                <li>✔ Control de calidad por etapas.</li>
                <li>✔ Normas eléctricas y de seguridad.</li>
                <li>✔ Preparado para domótica y redes.</li>
              </ul>
            </div>
          </div>

          {/* Mini pruebas de confianza */}
          <div className="mt-10 grid gap-3 md:grid-cols-3 text-sm text-neutral-700">
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 flex items-center justify-center gap-2">
              <span>📄</span> Cotización clara y sin letra pequeña
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 flex items-center justify-center gap-2">
              <span>🧰</span> Servicio post–instalación incluido
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 flex items-center justify-center gap-2">
              <span>🧭</span> Acompañamiento de un responsable único
            </div>
          </div>

          {/* CTA dual */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="#contacto"
              className="px-7 py-3 rounded-full border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:border-neutral-900 active:bg-neutral-900 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#contacto') as HTMLElement | null;
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Quiero cotizar mi proyecto
            </a>
            <a
              href="#divisiones"
              className="px-7 py-3 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:border-neutral-900 active:bg-neutral-900 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 transition"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#divisiones') as HTMLElement | null;
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Ver lo que podemos hacer
            </a>
          </div>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO — CÓMO TRABAJAMOS */}
      <section className="relative py-16 md:py-20 mt-20 md:mt-28 overflow-hidden text-white bg-[#0e1216]">
        {/* fondo degradado oscuro persistente */}
        <div aria-hidden className="absolute inset-0 z-0 bg-gradient-to-b from-[#0e1216] via-[#12171c] to-[#0e1216]" />
        {/* shimmer suave horizontal por encima del degradado */}
        <div aria-hidden className="pointer-events-none absolute -inset-x-1 top-0 h-full opacity-[0.06] shimmer z-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
            Nuestro proceso
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-10">
            Así construimos tu proyecto ideal
          </h2>

          <div className="relative grid md:grid-cols-4 gap-8 md:gap-10">
            {[
              { icon: "💬", title: "Descubrimiento", desc: "Escuchamos tus ideas y necesidades para definir el alcance real del proyecto." },
              { icon: "📐", title: "Diseño", desc: "Creamos planos, renders y soluciones personalizadas con precisión y estilo." },
              { icon: "🏗️", title: "Producción", desc: "Fabricamos con tecnología avanzada garantizando calidad y cumplimiento." },
              { icon: "🔑", title: "Instalación", desc: "Coordinamos el montaje final, ajustes y entrega lista para disfrutar." },
            ].map((step, i) => (
              <div
                key={i}
                className="reveal-on-scroll group relative rounded-3xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] p-6 md:p-8 transition will-change-transform"
                style={{ transitionDelay: `${120 * i}ms` }}
              >
                <div className="text-4xl mb-3 float-slow">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm md:text-base">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#contacto"
              className="px-8 py-3 rounded-full bg-white text-neutral-900 font-medium shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] hover:bg-neutral-200 transition"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#contacto') as HTMLElement | null;
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Comienza tu proyecto hoy
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="relative mt-20 md:mt-32 mb-24">
        {/* fondo sutil premium */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.05),transparent)]" />
        <div className="mx-auto max-w-4xl px-4">
          <div className="reveal-on-scroll rounded-[28px] border border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 md:px-10 py-10 md:py-14 text-center shadow-[0_20px_80px_-30px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight">Tu espacio empieza hoy.</h2>
            <p className="mt-3 text-neutral-600 md:text-lg">Diseña. Construye. Conecta. Vive.</p>

            <div className="mt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://wa.me/573115457195?text=Hola%20Vivanto,%20quiero%20cotizar%20mi%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 transition shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="tel:+573115457195"
                className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:border-neutral-900 active:bg-neutral-900 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 transition"
              >
                Llamar ahora
              </a>
              <a
                href="#agenda"
                className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:border-neutral-900 active:bg-neutral-900 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 transition"
              >
                Agendar visita técnica
              </a>
            </div>

            <p className="mt-4 text-sm text-neutral-500">
              Respuesta media &lt; 1 hora. También en{" "}
              <a href="mailto:hola@vivanto.co" className="underline hover:text-neutral-800">
                hola@vivanto.co
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo-vivanto.png" alt="Vivanto" className="h-6 opacity-60" />
            <span className="text-sm text-neutral-500">© {new Date().getFullYear()} Vivanto</span>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-4">
            <a href="#maderas" className="hover:text-neutral-800">Maderas</a>
            <a href="#construcciones" className="hover:text-neutral-800">Construcciones</a>
            <a href="#smart" className="hover:text-neutral-800">Smart</a>
            <a href="#empresas" className="hover:text-neutral-800">Empresas</a>
            <a href="#contacto" className="hover:text-neutral-800">Contacto</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* Reveal on scroll */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(14px) scale(0.98);
          transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: none;
        }

        /* Floating icon */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .float-slow {
          animation: float 6s ease-in-out infinite;
        }

        /* Shimmer background band */
        @keyframes shimmerMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerMove 16s linear infinite;
          mask-image: radial-gradient(60% 40% at 50% 50%, black 20%, transparent 70%);
        }

        /* Respectar prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll { transition: none; transform: none; opacity: 1; }
          .float-slow { animation: none; }
          .shimmer { animation: none; }
        }
      `}</style>
      </div>
    </div>
  );
}