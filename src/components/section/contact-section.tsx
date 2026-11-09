import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Have a project, an internship or a research idea in mind? Send me an
          email and I&apos;ll get back to you as soon as I can.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="rounded-xl bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Send an Email
          </Link>
          <Link
            href="/resume"
            className="rounded-xl border bg-background px-4 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            View Resume
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          {(["GitHub", "LinkedIn", "X"] as const).map((k) => (
            <Link
              key={k}
              href={DATA.contact.social[k].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {k}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

