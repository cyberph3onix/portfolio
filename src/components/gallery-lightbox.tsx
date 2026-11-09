"use client";

import type { GalleryImage } from "@/lib/gallery";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen focus view: the photo large, caption underneath.
 * Portalled to <body> so it sits above the dock and the cat.
 */
export function GalleryLightbox({
  images,
  index,
  onClose,
  onStep,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, onClose, onStep]);

  if (typeof document === "undefined") return null;

  const img = index === null ? null : images[index];

  return createPortal(
    <AnimatePresence>
      {img && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(1);
                }}
                aria-label="Next photo"
                className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
          <motion.figure
            key={img.src}
            className="flex max-h-full max-w-5xl flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-[76vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="text-center">
              <p className="text-base font-medium text-white">{img.alt}</p>
              <p className="mt-0.5 text-xs text-white/60">
                {index + 1} / {images.length}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
