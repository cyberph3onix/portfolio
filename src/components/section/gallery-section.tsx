import GalleryReel from "@/components/gallery-reel";
import { getGalleryImages } from "@/lib/gallery";
import Link from "next/link";

export default function GallerySection() {
  const images = getGalleryImages();

  return (
    <section id="gallery" className="flex flex-col gap-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Gallery</h2>
          <p className="text-sm text-muted-foreground">
            Captured memories and experiences
          </p>
        </div>
        {images.length > 0 && (
          <Link
            href="/gallery"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </Link>
        )}
      </div>
      {images.length > 0 ? (
        <GalleryReel images={images} />
      ) : (
        <p className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
          Photos coming soon.
        </p>
      )}
    </section>
  );
}
