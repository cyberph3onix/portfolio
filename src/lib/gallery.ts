import fs from "node:fs";
import path from "node:path";

export type GalleryImage = { src: string; alt: string };

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/**
 * Every image dropped into /public/gallery shows up automatically.
 * The file name becomes the caption: "hexafalls-team-photo.jpg" -> "Hexafalls team photo".
 * Files are listed in name order, so prefix with 01-, 02-... to control the order.
 */
export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => {
      const name = path
        .basename(f, path.extname(f))
        .replace(/^\d+[-_ ]*/, "")
        .replace(/[-_]+/g, " ")
        .trim();
      return {
        src: `/gallery/${encodeURIComponent(f)}`,
        alt: name ? name.charAt(0).toUpperCase() + name.slice(1) : "Gallery photo",
      };
    });
}
