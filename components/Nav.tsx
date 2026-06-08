"use client";

import { useEffect, useState } from "react";
import { resto } from "@/lib/data";
import CircularBadge from "@/components/CircularBadge";

const links = [
  { href: "#chef", label: "La maison" },
  { href: "#carte", label: "Carte" },
  { href: "#ambiance", label: "Ambiance" },
  { href: "#reserver", label: "Réservation" },
  { href: "#avis", label: "Avis" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-cream/95"
      style={{
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        boxShadow: scrolled ? "0 6px 24px -18px rgba(42,33,26,0.6)" : "none",
      }}
    >
      {/* ---- Ligne 1 : badge · logo centré · réserver + burger ---- */}
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 grid grid-cols-[1fr_auto_1fr] items-center h-[78px] sm:h-[88px]">
        {/* Gauche : tampon circulaire */}
        <div className="justify-self-start hidden sm:block">
          <CircularBadge
            top="Trattoria · Fresca"
            bottom="Asnières · Franco-Italienne"
            center={<span className="font-script text-base text-rosso leading-none">LB</span>}
            size={66}
            fontSize={6}
            letterSpacing={0.6}
          />
        </div>

        {/* Centre : logo */}
        <a href="#top" className="justify-self-center flex flex-col items-center leading-none">
          <span className="font-script text-3xl sm:text-[2.6rem] text-rosso leading-none">
            {resto.name}
          </span>
          <span className="font-display text-[0.5rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.26em] text-rosso mt-1">
            {resto.tagline}
          </span>
        </a>

        {/* Droite : réserver + burger */}
        <div className="justify-self-end flex items-center gap-3">
          <a href="#reserver" className="btn btn-verde hidden sm:inline-flex">
            Réserver
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-2"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span
              className="block h-[2px] w-6 bg-ink transition-transform"
              style={{ transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }}
            />
            <span
              className="block h-[2px] w-6 bg-ink transition-opacity"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-6 bg-ink transition-transform"
              style={{ transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* ---- Ligne 2 : nav centrée (desktop) ---- */}
      <nav className="hidden md:flex items-center justify-center gap-8 border-t border-line py-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="link-u font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink hover:text-rosso transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* ---- Panneau déroulant (mobile / burger) ---- */}
      <div
        className="overflow-hidden transition-all duration-500 bg-cream/97 backdrop-blur"
        style={{ maxHeight: open ? "440px" : "0px" }}
      >
        <nav className="px-6 py-6 flex flex-col gap-5 border-t border-line">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-ink"
            >
              {l.label}
            </a>
          ))}
          <a href="#reserver" onClick={() => setOpen(false)} className="btn btn-verde mt-2 justify-center">
            Réserver une table
          </a>
        </nav>
      </div>
    </header>
  );
}
