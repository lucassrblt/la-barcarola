"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global (Lenis) + défilement doux vers les ancres de la nav.
 * Désactivé si l'utilisateur préfère réduire les animations.
 * Ne rend rien : Lenis pilote le scroll de la fenêtre.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Défilement doux vers les ancres internes, en compensant le header fixe.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!link) return;
      const hash = link.getAttribute("href") || "";
      if (hash.length < 2) {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector("header");
      const offset = -((header?.offsetHeight ?? 0) + 8);
      lenis.scrollTo(target as HTMLElement, { offset });
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
