"use client";

import Image from "next/image";
import { useState } from "react";

export default function VivantoWireframe() {
  const inspiracionImages = [
    "/images/casos/maderas-1.png",
    "/images/casos/maderas-2.png",
    "/images/casos/maderas-3.jpg",
    "/images/casos/maderas-4.png",
  ];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div>
      {/* DIVISIONES */}
      {divisiones.map((b) => (
        <div key={b.id} className="card">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={`/images/divisiones/${b.id}-cover.jpg`}
              alt={`${b.title} – portada`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              priority={b.id === "maderas"}
            />
          </div>
          {/* other card content */}
        </div>
      ))}

      {/* Inspiración Vivanto */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-200/70 bg-white">
        <div className="grid grid-flow-col auto-cols-[80%] md:auto-cols-[40%] gap-4 p-4">
          {inspiracionImages.map((src, i) => (
            <button
              key={src}
              type="button"
              className="relative h-56 md:h-72 rounded-2xl overflow-hidden group"
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={src}
                alt={`Inspiración ${i + 1}`}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform"
                sizes="(min-width:1024px) 40vw, 80vw"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className="relative w-full max-w-6xl h-[70vh]">
            <Image
              src={inspiracionImages[lightboxIndex]}
              alt={`Inspiración ampliada ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex + inspiracionImages.length - 1) %
                      inspiracionImages.length
                  );
                }}
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % inspiracionImages.length);
                }}
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}