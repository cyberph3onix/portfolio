"use client";

import type { GalleryImage } from "@/lib/gallery";
import Image from "next/image";
import { useCallback, useState } from "react";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open ${img.alt}`}
            className="group relative aspect-square overflow-hidden rounded-xl border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 640px) 220px, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <GalleryLightbox images={images} index={open} onClose={close} onStep={step} />
    </>
  );
}
