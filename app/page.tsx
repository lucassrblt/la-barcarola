import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Menu from "@/components/Menu";
import ReservationForm from "@/components/ReservationForm";
import { chef, ambiance, hours, reviews, resto, menu } from "@/lib/data";

const signatures = menu.filter((d) => d.signature);

export default function Home() {
  return (
    <div id="top" className="flex flex-col flex-1">
      <Nav />

      {/* ============ HERO (bloc bordeaux) ============ */}
      <section className="relative min-h-screen flex items-end bg-wine text-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(90% 70% at 85% 10%, rgba(200,71,47,0.28), transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(184,138,62,0.22), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] w-full px-5 sm:px-8 pb-16 pt-32 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="reveal eyebrow" style={{ animationDelay: "0.05s" }}>
              {resto.tagline} · Bordeaux — depuis {resto.est}
            </div>
            <h1 className="mt-5 display-xl">
              <span className="reveal block" style={{ animationDelay: "0.12s" }}>
                Maison
              </span>
              <span
                className="reveal block"
                style={{ animationDelay: "0.22s", color: "var(--paprika)" }}
              >
                Lavigne
              </span>
            </h1>
            <p
              className="reveal mt-7 max-w-lg font-body text-lg sm:text-xl text-cream/85 leading-relaxed"
              style={{ animationDelay: "0.34s" }}
            >
              <span className="serif-accent">« On cuisine ce que le marché donne. »</span>{" "}
              Une carte courte qui tourne chaque semaine, une belle cave, et
              l'envie simple de bien recevoir.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "0.46s" }}
            >
              <a href="#reserver" className="btn">
                Réserver une table
              </a>
              <a href="#carte" className="btn btn-ghost text-cream">
                Voir la carte
              </a>
            </div>
          </div>

          <div className="reveal lg:col-span-4" style={{ animationDelay: "0.4s" }}>
            <div className="dish-slot aspect-[4/5] w-full rounded-sm" data-label="La salle · Bordeaux" />
            <div className="mt-3 flex justify-between font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cream/70">
              <span>{resto.address.split(",")[0]}</span>
              <span className="text-paprika">★ 4,8 · 540 avis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BANDEAU ============ */}
      <div className="bg-paprika text-cream">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-sm font-medium text-center">
          <span>🍷 Cave de 120 références</span>
          <span className="opacity-50">·</span>
          <span>🥖 Produits du marché des Capucins</span>
          <span className="opacity-50">·</span>
          <span>🌿 Options végé & sans gluten</span>
        </div>
      </div>

      {/* ============ CARTE ============ */}
      <section id="carte" className="px-5 sm:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="eyebrow">01</span>
              <h2 className="display-md text-ink">La carte</h2>
              <span className="flex-1 rule self-center" />
              <span className="hidden sm:block font-body italic text-ink-soft">
                Susceptible d'évoluer au gré du marché
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Menu />
          </Reveal>
        </div>
      </section>

      {/* ============ CHEF + SIGNATURES ============ */}
      <section id="chef" className="px-5 sm:px-8 py-24 sm:py-32 bg-cream-2/50 border-y border-line">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="dish-slot aspect-[4/5] w-full rounded-sm" data-label="En cuisine" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <span className="eyebrow">La maison</span>
              <p className="display-lg text-ink mt-4">{chef.name}</p>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-paprika mt-1">
                {chef.role}
              </p>
              <p className="mt-5 font-body text-lg text-ink-soft leading-relaxed max-w-xl">
                {chef.bio}
              </p>

              <div className="mt-8">
                <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Les incontournables
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {signatures.map((d) => (
                    <span
                      key={d.id}
                      className="font-body italic text-ink border border-line rounded-full px-4 py-1.5"
                    >
                      {d.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ AMBIANCE ============ */}
      <section id="ambiance" className="px-5 sm:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="eyebrow">02</span>
              <h2 className="display-md text-ink">L'ambiance</h2>
              <span className="flex-1 rule self-center" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ambiance.map((a, i) => (
              <Reveal key={a} delay={i * 50}>
                <div
                  className="dish-slot w-full rounded-sm"
                  style={{ aspectRatio: i % 5 === 0 ? "1 / 1.3" : "1 / 1" }}
                  data-label={a}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RÉSERVATION ============ */}
      <section id="reserver" className="px-5 sm:px-8 py-24 sm:py-32 bg-cream-2/50 border-y border-line">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">03 — Réservation</span>
              <h2 className="display-lg text-ink mt-4">
                À table.
              </h2>
              <p className="mt-5 font-body text-ink-soft leading-relaxed">
                Réservez en quelques secondes. Pour les groupes de plus de 8,
                appelez-nous directement, on s'organise.
              </p>
              <dl className="mt-9 space-y-4">
                {[
                  ["Adresse", resto.address],
                  ["Téléphone", resto.phone],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-3">
                    <dt className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      {k}
                    </dt>
                    <dd className="font-body text-ink mt-1">{v}</dd>
                  </div>
                ))}
                <div className="border-t border-line pt-3">
                  <dt className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Horaires
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between font-body text-sm text-ink">
                        <span>{h.day}</span>
                        <span className="text-ink-soft">{h.value}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <ReservationForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ AVIS ============ */}
      <section id="avis" className="px-5 sm:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="eyebrow">04</span>
              <h2 className="display-md text-ink">On en dit du bien</h2>
              <span className="flex-1 rule self-center" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 90}>
                <figure className="border border-line rounded-sm p-7 h-full flex flex-col bg-cream">
                  <span className="text-paprika tracking-[0.2em]">★★★★★</span>
                  <blockquote className="mt-4 font-body text-lg text-ink leading-relaxed flex-1">
                    « {r.text} »
                  </blockquote>
                  <figcaption className="mt-5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    {r.name} — via {r.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-wine text-cream px-5 sm:px-8 pt-16 pb-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="display-lg leading-none">{resto.name}</p>
              <p className="mt-3 font-body text-cream/75">
                {resto.baseline} · {resto.address}
              </p>
            </div>
            <a href="#reserver" className="btn self-start lg:self-auto">
              Réserver une table
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-line-cream flex flex-col sm:flex-row gap-4 justify-between font-display text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cream/55">
            <span>Projet de démonstration — enseigne fictive. Aucun établissement réel.</span>
            <span>
              Conçu &amp; développé par{" "}
              <a
                href="https://lucasrblt.me"
                className="link-u text-cream"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lucas Rimbault
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
