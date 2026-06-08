"use client";

import { useMemo, useState } from "react";
import { menu, type Dish } from "@/lib/data";

const eur = (n: number) => `${n} €`;

/* Aperçu : on n'affiche jamais plus de 5 plats à la fois (le reste via
   « Voir la carte complète »). */
const MAX_VISIBLE = 5;

/* Onglets fidèles au mock : catégories FR + régimes, dans une seule barre. */
const filters: { label: string; match: (d: Dish) => boolean }[] = [
  { label: "Tout", match: () => true },
  { label: "Pizzas", match: (d) => d.category === "Pizze" },
  { label: "Pâtes", match: (d) => d.category === "Pasta" },
  { label: "Viandes", match: (d) => d.category === "Secondi" },
  { label: "Halal", match: (d) => d.tags.includes("Halal") },
  { label: "Végétarien", match: (d) => d.tags.includes("Végétarien") },
];

export default function Menu() {
  const [active, setActive] = useState(1); // "Pizzas" par défaut (aperçu court)

  const dishes = useMemo(() => menu.filter(filters[active].match), [active]);
  const visible = dishes.slice(0, MAX_VISIBLE);

  return (
    <div>
      {/* Onglets texte soulignés */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-line pb-4">
        {filters.map((f, i) => {
          const on = i === active;
          return (
            <button
              key={f.label}
              onClick={() => setActive(i)}
              className="relative pb-1 font-display text-[0.82rem] font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ color: on ? "var(--rosso)" : "var(--ink)" }}
            >
              {f.label}
              <span
                className="absolute left-0 -bottom-[1px] h-[2px] bg-rosso transition-all duration-300"
                style={{ width: on ? "100%" : "0%" }}
              />
            </button>
          );
        })}
      </div>

      {/* Liste des plats (padding droit sur xl pour laisser place à la pizza) */}
      <div key={active} className="fade-rise mt-6 xl:pr-40">
        {dishes.length === 0 && (
          <p className="font-body italic text-ink-soft py-8 text-center">
            Aucun plat ne correspond à ce filtre.
          </p>
        )}
        {visible.map((d, i) => (
          <div
            key={d.id}
            className="py-4"
            style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
          >
            <div className="flex items-baseline gap-2 flex-wrap">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.02em] text-ink">
                {d.name}
              </h4>
              {d.signature && (
                <span className="font-display text-[0.5rem] font-bold uppercase tracking-[0.1em] text-rosso border border-rosso rounded-full px-2 py-0.5">
                  Signature
                </span>
              )}
            </div>
            <p className="mt-1 font-body text-ink-soft leading-snug">{d.desc}</p>
            <span className="mt-1.5 block font-display text-base font-bold text-rosso">
              {eur(d.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
