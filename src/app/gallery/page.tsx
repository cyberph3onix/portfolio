import BlurFade from "@/components/magicui/blur-fade";
import { GalleryGrid } from "@/components/gallery-grid";
import { getGalleryImages } from "@/lib/gallery";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Captured memories and experiences.",
};

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <main className="flex flex-col gap-8">
      <BlurFade delay={0.04}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden /> Home
        </Link>
      </BlurFade>
      <BlurFade delay={0.08}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Gallery
          </h1>
          <p className="text-muted-foreground">
            Captured memories and experiences.
          </p>
        </div>
      </BlurFade>
      <BlurFade delay={0.12}>
        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
            No photos yet. Check back soon.
          </p>
        )}
      </BlurFade>
    </main>
  );
}
