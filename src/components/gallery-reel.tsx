"use client";

import type { GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GalleryLightbox } from "./gallery-lightbox";

// Album-style variety: different shapes, tilts and vertical offsets.
const LOOKS = [
  { aspect: "aspect-[4/5]", rotate: -2.5, y: 14 },
  { aspect: "aspect-square", rotate: 1.5, y: -22 },
  { aspect: "aspect-[3/4]", rotate: -1, y: 20 },
  { aspect: "aspect-[5/4]", rotate: 2.5, y: -10 },
  { aspect: "aspect-[4/5]", rotate: 0.5, y: 26 },
  { aspect: "aspect-[1/1]", rotate: -2, y: -18 },
];

export default function GalleryReel({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0); // how far the row must travel (px)
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () =>
      setDist(Math.max(0, row.scrollWidth - document.documentElement.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);

  const cards = images.map((img, i) => {
    const look = LOOKS[i % LOOKS.length];
    return (
      <button
        key={img.src}
        type="button"
        onClick={() => setOpen(i)}
        aria-label={`Open ${img.alt}`}
        style={{
          transform: reduced ? undefined : `translateY(${look.y}px) rotate(${look.rotate}deg)`,
        }}
        className={cn(
          "group relative h-[42vh] min-h-[220px] max-h-[420px] shrink-0 overflow-hidden rounded-2xl border bg-muted shadow-lg transition-transform duration-300 hover:z-10 hover:!scale-105 hover:!rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          look.aspect
        )}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 640px) 320px, 70vw"
          className="object-cover"
        />
      </button>
    );
  });

  const padding =
    "px-[max(1.5rem,calc((100vw-42rem)/2))]"; // line up with the page column

  return (
    <>
      {reduced ? (
        // Reduced motion: a plain horizontally scrollable strip.
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto py-6">
          <div ref={rowRef} className={cn("flex w-max items-center gap-5", padding)}>
            {cards}
          </div>
        </div>
      ) : (
        <div
          ref={sectionRef}
          className="relative left-1/2 w-screen -translate-x-1/2"
          style={{ height: dist > 0 ? `calc(100vh + ${dist}px)` : undefined }}
        >
          <div
            className={cn(
              "flex flex-col justify-center gap-8 overflow-hidden",
              dist > 0 ? "sticky top-0 h-screen pb-20" : "py-6"
            )}
          >
            <motion.div
              ref={rowRef}
              style={{ x }}
              className={cn("flex w-max items-center gap-5", padding)}
            >
              {cards}
            </motion.div>
            <p className={cn("text-xs text-muted-foreground", padding)}>
              {dist > 0 ? "Keep scrolling" : ""}
              {dist > 0 ? " · " : ""}
              <Link href="/gallery" className="underline underline-offset-4 hover:text-foreground">
                View all photos
              </Link>
            </p>
          </div>
        </div>
      )}
      <GalleryLightbox images={images} index={open} onClose={close} onStep={step} />
    </>
  );
}
