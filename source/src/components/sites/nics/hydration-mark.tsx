"use client";

import { useEffect } from "react";

// Signals public/sites/nics/motion.js that React has finished hydrating, so the
// plain-JS motion layer can start changing attributes without tripping hydration checks.
export function HydrationMark() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
    window.dispatchEvent(new Event("nics:hydrated"));
  }, []);
  return null;
}
