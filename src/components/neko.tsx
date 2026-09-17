"use client";

import { useEffect } from "react";

type NekoInstance = {
  start: () => void;
  stop: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    createNeko?: (options?: Record<string, unknown>) => NekoInstance;
    neko?: NekoInstance;
  }
}

export default function Neko() {
  useEffect(() => {
    let neko: NekoInstance | undefined;

    const start = () => {
      if (window.createNeko && !neko) {
        neko = window.createNeko();
      }
    };

    const existing = document.getElementById("neko-js");

    if (window.createNeko) {
      start();
    } else if (existing) {
      existing.addEventListener("load", start);
    } else {
      const script = document.createElement("script");
      script.id = "neko-js";
      script.src = "/neko.js";
      script.async = true;
      script.onload = start;
      document.body.appendChild(script);
    }

    return () => {
      neko?.destroy();
      neko = undefined;
    };
  }, []);

  return null;
}