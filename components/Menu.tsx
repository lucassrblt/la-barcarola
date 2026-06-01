"use client";

import { useMemo, useState } from "react";
import { menu, categories, dietTags, type DietTag } from "@/lib/data";

const eur = (n: number) => `${n} €`;

export default function Menu() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Entrées");
  const [diets, setDiets] = useState<DietTag[]>([]);

  const toggleDiet = (t: DietTag) =>
    setDiets((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t]));

  const dishes = useMemo(
    () =>
      menu.filter(
        (d) =>
          d.category === cat &&
          diets.every((t) => d.tags.includes(t)),
      ),
    [cat, diets],
  );

  const countFor = (c: (typeof categories)[number]) =>
    menu.filter((d) => d.category === c && diets.every((t) => d.tags.includes(t))).length;

  return (
    <div>
      {/* Onglets catégories */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-5">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-2 font-display text-sm font-medium transition-all duration-300"
              style={{
                color: active ? "var(--cream)" : "var(--ink)",
                backgroundColor: active ? "var(--wine)" : "transparent",
                border: `1px solid ${active ? "var(--wine)" : "var(--line)"}`,
                borderRadius: "2px",
              }}
            >
              {c}
              <span className="ml-2 opacity-60">{countFor(c)}</span>
            </button>
          );
        })}
      </div>

      {/* Filtres régime */}
      <div className="flex flex-wrap items-center gap-2 mt-5">
        <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft mr-1">
          Filtrer :
        </span>
        {dietTags.map((t) => {
          const active = diets.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleDiet(t)}
              className="tag transition-all duration-200"
              style={{
                backgroundColor: active ? "var(--paprika)" : "transparent",
                color: active ? "var(--cream)" : "var(--ink-soft)",
                borderColor: active ? "var(--paprika)" : "var(--line)",
              }}
            >
              {t}
            </button>
          );
        })}
        {diets.length > 0 && (
          <button
            onClick={() => setDiets([])}
            className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-paprika ml-1 link-u"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Plats */}
      <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-1">
        {dishes.length === 0 && (
          <p className="font-body italic text-ink-soft py-8">
            Aucun plat ne correspond à ces filtres dans cette catégorie.
          </p>
        )}
        {dishes.map((d) => (
          <div
            key={d.id}
            className="py-4 border-b border-line/70 flex items-baseline gap-3 group"
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-display text-xl font-semibold text-ink">{d.name}</h4>
                {d.signature && (
                  <span className="font-display text-[0.55rem] font-bold uppercase tracking-[0.1em] text-paprika border border-paprika rounded-full px-2 py-0.5">
                    Signature
                  </span>
                )}
                {d.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-1 font-body text-ink-soft leading-snug">{d.desc}</p>
            </div>
            <div
              className="shrink-0 border-b border-dotted border-ink-soft/40 flex-1 mx-1 self-end mb-2 hidden sm:block"
              aria-hidden
            />
            <span className="font-display text-lg font-semibold text-wine shrink-0">
              {eur(d.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
