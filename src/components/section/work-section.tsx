/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { DATA } from "@/data/resume";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    const initials = alt
      .replace(/\(.*?\)/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <div className="size-8 md:size-10 border rounded-full shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center text-[10px] md:text-xs font-semibold text-muted-foreground">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none ${src.includes("stellar") ? "dark:invert" : ""}`}
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  return (
    <div className="flex flex-col gap-8">
      {DATA.work.map((work) => (
        <div key={work.company} className="flex items-center gap-x-3 justify-between">
          <div className="flex items-center gap-x-3 flex-1 min-w-0">
            <LogoImage src={work.logoUrl} alt={work.company} />
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <div className="font-semibold leading-none">{work.company}</div>
              <div className="font-sans text-sm text-muted-foreground">
                {work.title}
                {work.location ? ` · ${work.location}` : ""}
              </div>
            </div>
          </div>
          <div className="text-xs tabular-nums text-muted-foreground text-right flex-none">
            {[work.start, work.end].filter(Boolean).join(" - ")}
          </div>
        </div>
      ))}
    </div>
  );
}
