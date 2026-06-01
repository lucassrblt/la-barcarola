import { NextRequest, NextResponse } from "next/server";

/**
 * Disponibilités de table (démo) — génère des créneaux stables pour une date donnée,
 * selon le service (midi / soir) et le nombre de couverts. Pas de base de données :
 * la disponibilité est dérivée de façon déterministe pour une démo cohérente.
 */

// Services par jour de semaine : liste de [début, fin] en heures.
const SERVICES: Record<number, [number, number][]> = {
  0: [[12, 15]], // dimanche : midi
  1: [], // lundi : fermé
  2: [[12, 14], [19, 22]],
  3: [[12, 14], [19, 22]],
  4: [[12, 14], [19, 22]],
  5: [[12, 14], [19, 23]],
  6: [[12, 14], [19, 23]],
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const covers = Math.min(12, Math.max(1, Number(searchParams.get("covers")) || 2));

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date invalide" }, { status: 400 });
  }

  const d = new Date(date + "T12:00:00");
  const services = SERVICES[d.getDay()] ?? [];
  if (services.length === 0) {
    return NextResponse.json({ date, closed: true, services: [] });
  }

  // Les grandes tablées ont moins de créneaux libres.
  const pressure = covers >= 7 ? 60 : covers >= 5 ? 48 : 34;

  const out = services.map(([start, end], idx) => {
    const slots: { time: string; available: boolean }[] = [];
    for (let h = start; h < end; h++) {
      for (const m of [0, 30]) {
        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const seed = hash(`${date}|${time}|${covers}`);
        slots.push({ time, available: seed % 100 > pressure });
      }
    }
    return { label: idx === 0 ? "Midi" : "Soir", slots };
  });

  return NextResponse.json({ date, covers, closed: false, services: out });
}
