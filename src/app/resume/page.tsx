import BlurFade from "@/components/magicui/blur-fade";
import { RESUME_PDF } from "@/data/resume";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Shreshta Raaj Gupta.",
};

export default function ResumePage() {
  return (
    <main className="flex flex-col gap-6">
      <BlurFade delay={0.04}>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden /> Home
          </Link>
        </div>
      </BlurFade>
      <BlurFade delay={0.08}>
        <div
          data-neko-avoid
          className="flex flex-col items-center gap-3 rounded-xl border p-8 text-center md:hidden"
        >
          <p className="text-sm text-muted-foreground">
            Inline PDF preview isn&apos;t reliable on phones, so open the resume
            directly instead.
          </p>
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open PDF
          </a>
        </div>
        <object
          data-neko-avoid
          data={`${RESUME_PDF}#view=FitH`}
          type="application/pdf"
          className="hidden h-[80vh] w-full rounded-xl border md:block"
          aria-label="Resume PDF"
        >
          <p className="p-6 text-sm text-muted-foreground">
            Your browser can&apos;t display PDFs inline.{" "}
            <a href={RESUME_PDF} className="underline">
              Open the resume directly
            </a>
            .
          </p>
        </object>
      </BlurFade>
    </main>
  );
}
