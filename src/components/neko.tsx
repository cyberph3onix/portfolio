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
    BehaviorMode?: { CHASE_MOUSE: unknown };
  }
}

export default function Neko() {
  useEffect(() => {
    let neko: NekoInstance | undefined;

    const start = () => {
      if (window.createNeko && !neko) {
        neko = window.createNeko({
          behaviorMode: window.BehaviorMode?.CHASE_MOUSE,
          allowBehaviorChange: false,
          speed: 50,
          // Phones have no cursor: park the cat bottom-right, above the dock,
          // and let it chase your finger when you touch the screen.
          ...(window.matchMedia("(pointer: coarse)").matches
            ? {
                startX: window.innerWidth - 48,
                startY: window.innerHeight - 112,
              }
            : {}),
        });
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