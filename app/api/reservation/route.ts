import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Réservation de table (démo) — valide la demande et renvoie une référence.
 * Rien n'est persisté (projet concept). En production : enregistrer en base,
 * notifier la salle et envoyer une confirmation au client.
 */

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  covers: z.number().int().min(1).max(12),
  name: z.string().min(2, "Nom trop court"),
  phone: z.string().min(8, "Téléphone invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  note: z.string().max(500).optional().or(z.literal("")),
});

function reference(seed: string): string {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = (h * 33) ^ seed.charCodeAt(i);
  return `ML-${(h >>> 0).toString(36).toUpperCase().slice(0, 5)}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, date, time, covers } = parsed.data;
  return NextResponse.json(
    {
      ok: true,
      reference: reference(`${name}|${date}|${time}|${covers}`),
      message: "Table réservée. À très bientôt à la Maison Lavigne.",
    },
    { status: 201 },
  );
}
