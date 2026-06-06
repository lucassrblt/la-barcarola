import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Menu from "@/components/Menu";
import ReservationForm from "@/components/ReservationForm";
import Placeholder from "@/components/Placeholder";
import { chef, ambiance, hours, reviews, resto, menu } from "@/lib/data";

const signatures = menu.filter((d) => d.signature);
const ambianceShots = ambiance.map((label, i) => ({
  label,
  key: `photo-ambiance-${i + 1}`,
}));

/* Petites icônes de trait pour le bandeau (assets réels, pas placeholders). */
const banderoles = [
  {
    label: "Pizze au four",
    icon: (
      <path d="M12 3 3 20h18L12 3Z M12 11v0 M9.5 15v0 M14 14v0" />
    ),
  },
  {
    label: "Pâtes fraîches",
    icon: <path d="M4 5c4 2 12 2 16 0 M4 12c4 2 12 2 16 0 M4 19c4 2 12 2 16 0" />,
  },
  {
    label: "Halal",
    icon: <path d="M15.5 5a7 7 0 1 0 0 14 8 8 0 1 1 0-14Z" />,
  },
  {
    label: "Végétarien",
    icon: <path d="M20 4C9 4 4 11 4 20c9 0 16-5 16-16Z M9 15c3-3 6-5 9-6" />,
  },
];

export default function Home() {
  return (
    <div id="top" className="flex flex-col flex-1">
      <Nav />

      {/* ============ HERO (papier) ============ */}
      <section className="relative min-h-screen flex items-center bg-cream text-ink overflow-hidden">
        <div className="relative mx-auto max-w-[1320px] w-full px-5 sm:px-8 pt-32 pb-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="reveal eyebrow" style={{ animationDelay: "0.05s" }}>
              {resto.tagline} · {resto.area}
            </div>
            <h1 className="mt-5 display-xl">
              <span className="reveal block" style={{ animationDelay: "0.12s", color: "var(--rosso)" }}>
                Benvenuti
              </span>
              <span
                className="reveal block"
                style={{ animationDelay: "0.22s", color: "var(--verde)" }}
              >
                à La Barcarola
              </span>
            </h1>
            <p
              className="reveal mt-5 font-script text-3xl sm:text-4xl"
              style={{ animationDelay: "0.32s", color: "var(--gold)" }}
            >
              Cucina fatta in casa, con amore.
            </p>
            <p
              className="reveal mt-6 max-w-md font-body text-lg text-ink-soft leading-relaxed"
              style={{ animationDelay: "0.42s" }}
            >
              Pizze au four, pâtes fraîches et recettes franco-italiennes —
              l’envie simple de recevoir comme à la maison, au cœur d’Asnières.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.52s" }}
            >
              <a href="#reserver" className="btn">
                Réserver une table
              </a>
              <a href="#carte" className="btn btn-ghost text-verde">
                Voir la carte
              </a>
            </div>
            <div
              className="reveal mt-8 flex items-center gap-3 font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-soft"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="text-rosso text-base tracking-[0.1em]">★★★★★</span>
              <span>9,4 / 10 · 128 avis</span>
              <span className="opacity-40">—</span>
              <span>{resto.address.split(",")[0]}</span>
            </div>
          </div>

          <div className="reveal lg:col-span-5" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="vintage-frame">
                <Placeholder
                  label="La façade & la terrasse"
                  assetKey="photo-facade"
                  ratio="4 / 5"
                />
              </div>
              <div className="absolute -top-5 -left-5">
                <div className="stamp">
                  <span>
                    <small>Ouvert</small>
                    <b>7j/7</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BANDEAU ============ */}
      <div className="bg-rosso text-cream">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-center gap-x-9 gap-y-2 font-display text-sm font-semibold uppercase tracking-[0.08em]">
          {banderoles.map((b, i) => (
            <span key={b.label} className="flex items-center gap-x-9">
              {i > 0 && <span className="text-cream/40">✦</span>}
              <span className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                  aria-hidden
                >
                  {b.icon}
                </svg>
                {b.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ CARTE ============ */}
      <section id="carte" className="px-5 sm:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="eyebrow">01</span>
              <h2 className="display-md text-ink">La Carte</h2>
            </div>
            <div className="rule-fancy mb-10">
              <span>✦</span>
            </div>
            <p className="font-script text-2xl text-gold -mt-6 mb-10">
              Pizze al forno, pasta fresca, dolci della casa.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="vintage-frame p-4 sm:p-8">
              <Menu />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LA MAISON ============ */}
      <section id="chef" className="px-5 sm:px-8 py-24 sm:py-32 bg-paper border-y border-line">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="vintage-frame">
                <Placeholder
                  label="Les pâtes fraîches, en cuisine"
                  assetKey="photo-cuisine-pates"
                  ratio="4 / 5"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <span className="eyebrow">La maison</span>
              <p className="display-lg text-ink mt-4">{chef.name}</p>
              <p className="font-script text-2xl text-gold mt-1">{chef.role}</p>
              <p className="mt-6 font-body text-lg text-ink-soft leading-relaxed max-w-xl">
                {chef.bio}
              </p>

              <div className="mt-8">
                <span className="font-display text-[0.62rem] font-bold uppercase tracking-[0.18em] text-rosso">
                  Les incontournables
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {signatures.map((d) => (
                    <span
                      key={d.id}
                      className="font-body italic text-ink border border-line rounded-full px-4 py-1.5 bg-cream"
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
            <div className="flex items-baseline gap-4 mb-3">
              <span className="eyebrow">02</span>
              <h2 className="display-md text-ink">L’ambiance</h2>
            </div>
            <div className="rule-fancy mb-10">
              <span>✦</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ambianceShots.map((shot, i) => (
              <Reveal key={shot.key} delay={i * 50}>
                <Placeholder
                  label={shot.label}
                  assetKey={shot.key}
                  ratio={i % 5 === 0 ? "1 / 1.3" : "1 / 1"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RÉSERVATION (bloc verde) ============ */}
      <section id="reserver" className="px-5 sm:px-8 py-24 sm:py-32 bg-verde text-cream">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow text-gold">03 — Réservation</span>
              <h2 className="display-lg mt-4">À tavola.</h2>
              <p className="font-script text-2xl text-gold mt-1">On vous garde une table.</p>
              <p className="mt-5 font-body text-cream/85 leading-relaxed">
                Réservez en quelques secondes. Pour les groupes de plus de 8,
                appelez-nous directement, on s’organise.
              </p>
              <dl className="mt-9 space-y-4">
                {[
                  ["Adresse", resto.address],
                  ["Téléphone", resto.phone],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line-cream pt-3">
                    <dt className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cream/60">
                      {k}
                    </dt>
                    <dd className="font-body text-cream mt-1">{v}</dd>
                  </div>
                ))}
                <div className="border-t border-line-cream pt-3">
                  <dt className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cream/60">
                    Horaires
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between font-body text-sm text-cream"
                      >
                        <span>{h.day}</span>
                        <span className="text-cream/70">{h.value}</span>
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
            <div className="flex flex-wrap items-baseline gap-4 mb-3">
              <span className="eyebrow">04</span>
              <h2 className="display-md text-ink">On en dit du bien</h2>
              <span className="flex-1" />
              <div className="stamp shrink-0">
                <span>
                  <b>9,4</b>
                  <small>128 avis</small>
                </span>
              </div>
            </div>
            <div className="rule-fancy mb-10">
              <span>✦</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 90}>
                <figure className="vintage-frame h-full flex flex-col p-7">
                  <span className="text-rosso tracking-[0.2em]">★★★★★</span>
                  <blockquote className="mt-4 font-body text-lg text-ink leading-relaxed flex-1">
                    « {r.text} »
                  </blockquote>
                  <figcaption className="mt-5 font-display text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                    {r.name} — via {r.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-ink text-cream px-5 sm:px-8 pt-16 pb-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="font-script text-5xl text-cream leading-none">{resto.name}</p>
              <p className="mt-3 font-body text-cream/70">
                {resto.baseline} · {resto.address}
              </p>
            </div>
            <a href="#reserver" className="btn self-start lg:self-auto">
              Réserver une table
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-line-cream flex flex-col sm:flex-row gap-4 justify-between font-display text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cream/55">
            <span>
              Refonte concept — proposition indépendante, non officielle et sans
              affiliation avec l’établissement.
            </span>
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
