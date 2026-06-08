"use client";

import { useMemo, useState } from "react";

/* Créneaux fixes (démo) — services midi & soir. */
const TIMES = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

function nextDays(n: number) {
  const out: { iso: string; label: string }[] = [];
  const base = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const label =
      i === 0
        ? "Aujourd'hui"
        : i === 1
          ? "Demain"
          : d.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
    out.push({ iso, label });
  }
  return out;
}

const fieldCls =
  "bg-cream text-ink border border-line rounded-sm px-3 py-2.5 font-display text-sm font-semibold outline-none focus:border-verde transition-colors";

export default function Reserve() {
  const days = useMemo(() => nextDays(14), []);
  const [covers, setCovers] = useState(2);
  const [date, setDate] = useState(days[0].iso);
  const [time, setTime] = useState("19:30");
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  async function confirm() {
    if (form.name.trim().length < 2 || form.phone.trim().length < 8) {
      setError("Indiquez votre nom et un téléphone valide.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, covers, ...form }),
      });
      const data = await res.json();
      if (res.ok) setReference(data.reference);
      else setError("Une erreur est survenue, réessayez.");
    } catch {
      setError("Connexion impossible, réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    const d = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return (
      <div className="border border-line-cream rounded-sm p-6 bg-rosso-bright/40">
        <p className="font-script text-4xl text-cream leading-none">Grazie mille !</p>
        <p className="mt-3 font-body text-cream/90">
          {covers} couvert{covers > 1 ? "s" : ""}, le {d} à {time}.
        </p>
        <p className="mt-3 font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cream/70">
          Référence
        </p>
        <p className="font-display text-2xl font-bold text-cream">{reference}</p>
        <p className="mt-3 font-display text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
          Démo — aucune donnée enregistrée
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Étape 1 : couverts / date / heure */}
      <div className="flex flex-wrap items-stretch gap-3">
        <select
          aria-label="Couverts"
          value={covers}
          onChange={(e) => setCovers(Number(e.target.value))}
          className={fieldCls}
        >
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} pers.
            </option>
          ))}
        </select>
        <select
          aria-label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldCls}
        >
          {days.map((d) => (
            <option key={d.iso} value={d.iso}>
              {d.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Heure"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={fieldCls}
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {step === 1 && (
          <button onClick={() => setStep(2)} className="btn btn-verde">
            Réserver
          </button>
        )}
      </div>

      {/* Étape 2 : coordonnées */}
      {step === 2 && (
        <div className="mt-3 flex flex-wrap items-stretch gap-3">
          <input
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`${fieldCls} flex-1 min-w-[140px] font-body normal-case`}
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`${fieldCls} flex-1 min-w-[140px] font-body normal-case`}
          />
          <button onClick={confirm} disabled={submitting} className="btn btn-verde">
            {submitting ? "Envoi…" : "Confirmer"}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 font-display text-[0.62rem] font-bold uppercase tracking-[0.08em] text-cream bg-rosso-bright/60 inline-block px-2 py-1 rounded-sm">
          {error}
        </p>
      )}
    </div>
  );
}
