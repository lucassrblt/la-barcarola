"use client";

import { useEffect, useMemo, useState } from "react";

type Slot = { time: string; available: boolean };
type Service = { label: string; slots: Slot[] };

function nextDays(n: number) {
  const out: { iso: string; label: string; weekday: string }[] = [];
  const base = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      iso,
      weekday: d.toLocaleDateString("fr-FR", { weekday: "short" }),
      label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    });
  }
  return out;
}

export default function ReservationForm() {
  const days = useMemo(() => nextDays(14), []);
  const [covers, setCovers] = useState(2);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [services, setServices] = useState<Service[] | null>(null);
  const [closed, setClosed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    setTime(null);
    fetch(`/api/availability?date=${date}&covers=${covers}`)
      .then((r) => r.json())
      .then((d) => {
        setServices(d.services ?? []);
        setClosed(Boolean(d.closed));
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [date, covers]);

  async function submit() {
    const e: Record<string, string> = {};
    if (!date || !time) e.time = "Choisissez une date et un créneau.";
    if (form.name.trim().length < 2) e.name = "Indiquez votre nom.";
    if (form.phone.trim().length < 8) e.phone = "Téléphone invalide.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, covers, ...form }),
      });
      const data = await res.json();
      if (res.ok) setReference(data.reference);
      else setErrors(data.issues ?? { name: "Une erreur est survenue." });
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="bg-cream text-ink border border-line p-8 sm:p-12 rounded-sm text-center">
        <div className="flex justify-center mb-5">
          <div className="stamp">
            <span>
              <b>Grazie</b>
              <small>à presto</small>
            </span>
          </div>
        </div>
        <span className="eyebrow">Table réservée</span>
        <p className="font-script text-5xl text-rosso mt-2">Grazie mille&nbsp;!</p>
        <p className="mt-4 font-body text-lg text-ink-soft max-w-sm mx-auto leading-relaxed">
          {covers} couvert{covers > 1 ? "s" : ""}, le{" "}
          {date &&
            new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
          à {time}.
        </p>
        <div className="mt-6 inline-block border border-rosso rounded-sm px-6 py-3">
          <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            Référence
          </span>
          <span className="block font-display text-3xl font-bold text-rosso">{reference}</span>
        </div>
        <p className="mt-6 font-display text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-soft/70">
          Démo — aucune donnée enregistrée
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream border border-line rounded-sm p-6 sm:p-8">
      {/* Couverts */}
      <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Nombre de couverts
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCovers(n)}
            className="w-10 h-10 font-display font-semibold transition-all duration-200"
            style={{
              border: `1px solid ${covers === n ? "var(--verde)" : "var(--line)"}`,
              backgroundColor: covers === n ? "var(--verde)" : "transparent",
              color: covers === n ? "var(--cream)" : "var(--ink)",
              borderRadius: "2px",
            }}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setCovers(9)}
          className="px-3 h-10 font-display text-sm font-semibold transition-all"
          style={{
            border: `1px solid ${covers >= 9 ? "var(--verde)" : "var(--line)"}`,
            backgroundColor: covers >= 9 ? "var(--verde)" : "transparent",
            color: covers >= 9 ? "var(--cream)" : "var(--ink)",
            borderRadius: "2px",
          }}
        >
          9+
        </button>
      </div>

      {/* Date */}
      <span className="mt-6 block font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Date
      </span>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {days.map((d) => {
          const active = d.iso === date;
          return (
            <button
              key={d.iso}
              onClick={() => setDate(d.iso)}
              className="shrink-0 w-[62px] py-2 text-center transition-all duration-200"
              style={{
                border: `1px solid ${active ? "var(--rosso)" : "var(--line)"}`,
                backgroundColor: active ? "rgba(200,71,47,0.1)" : "transparent",
                borderRadius: "2px",
              }}
            >
              <span className="block font-display text-[0.58rem] uppercase tracking-[0.1em] text-ink-soft">
                {d.weekday}
              </span>
              <span className="block font-display text-base font-semibold text-ink mt-0.5">
                {d.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Créneaux */}
      {date && (
        <div className="mt-5">
          {loading && (
            <p className="font-display text-xs uppercase tracking-[0.14em] text-ink-soft animate-pulse">
              Recherche…
            </p>
          )}
          {!loading && closed && (
            <p className="font-display text-xs uppercase tracking-[0.14em] text-rosso">
              Fermé ce jour-là — choisissez une autre date.
            </p>
          )}
          {!loading &&
            !closed &&
            services?.map((s) => (
              <div key={s.label} className="mb-4">
                <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Service · {s.label}
                </span>
                <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {s.slots.map((sl) => (
                    <button
                      key={s.label + sl.time}
                      disabled={!sl.available}
                      onClick={() => setTime(sl.time)}
                      className="py-2 font-display text-sm font-medium transition-all duration-200 disabled:opacity-25 disabled:line-through"
                      style={{
                        border: `1px solid ${time === sl.time ? "var(--rosso)" : "var(--line)"}`,
                        backgroundColor: time === sl.time ? "var(--rosso)" : "transparent",
                        color: time === sl.time ? "var(--cream)" : "var(--ink)",
                        borderRadius: "2px",
                      }}
                    >
                      {sl.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Coordonnées */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {(
          [
            { k: "name", label: "Nom", type: "text", ph: "Camille Martin" },
            { k: "phone", label: "Téléphone", type: "tel", ph: "06 12 34 56 78" },
          ] as const
        ).map((f) => (
          <label key={f.k} className="block">
            <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              {f.label}
            </span>
            <input
              type={f.type}
              value={form[f.k]}
              placeholder={f.ph}
              onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
              className="mt-1.5 w-full bg-transparent border border-line rounded-sm px-3 py-2.5 text-ink outline-none focus:border-rosso transition-colors"
            />
            {errors[f.k] && (
              <span className="mt-1 block font-display text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-rosso">
                {errors[f.k]}
              </span>
            )}
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Une demande particulière ? (optionnel)
          </span>
          <input
            type="text"
            value={form.note}
            placeholder="Allergie, occasion, accès PMR…"
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="mt-1.5 w-full bg-transparent border border-line rounded-sm px-3 py-2.5 text-ink outline-none focus:border-rosso transition-colors"
          />
        </label>
      </div>

      {errors.time && (
        <p className="mt-3 font-display text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-rosso">
          {errors.time}
        </p>
      )}

      <button
        onClick={submit}
        disabled={submitting}
        className="btn mt-6 w-full justify-center"
      >
        {submitting ? "Envoi…" : "Confirmer ma réservation"}
      </button>
    </div>
  );
}
