import { existsSync } from "fs";
import { join } from "path";

import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Menu from "@/components/Menu";
import Reserve from "@/components/Reserve";
import Photo from "@/components/Photo";
import Placeholder from "@/components/Placeholder";
import CircularBadge from "@/components/CircularBadge";
import { reviews, resto } from "@/lib/data";

/* Vrai asset si présent dans /public, sinon placeholder (le client fournira
   les affiches Campari/Cinzano et la photo de pizza). */
const hasAsset = (p: string) => existsSync(join(process.cwd(), "public", p));

/* Petites icônes de trait pour le bandeau. */
const banderoles = [
  { label: "Pizze au four", icon: <path d="M12 3 3 20h18L12 3Z M12 11v0 M9.5 15v0 M14 14v0" /> },
  { label: "Pâtes fraîches", icon: <path d="M4 5c4 2 12 2 16 0 M4 12c4 2 12 2 16 0 M4 19c4 2 12 2 16 0" /> },
  { label: "Halal", icon: <path d="M15.5 5a7 7 0 1 0 0 14 8 8 0 1 1 0-14Z" /> },
  { label: "Végétarien", icon: <path d="M20 4C9 4 4 11 4 20c9 0 16-5 16-16Z M9 15c3-3 6-5 9-6" /> },
];

const featured = reviews[0];

export default function Home() {
  return (
    <div id="top" className="flex flex-col flex-1">
      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative bg-cream text-ink overflow-hidden pt-[120px] sm:pt-[140px]">
        <div className="grid lg:grid-cols-2 min-h-[78vh]">
          {/* Texte */}
          <div className="flex items-center px-5 sm:px-8">
            <div className="ml-auto w-full max-w-[600px] py-12 lg:py-16">
              <h1 className="display-xl">
                <span className="reveal block" style={{ animationDelay: "0.08s", color: "var(--rosso)" }}>
                  Benvenuti
                </span>
                <span className="reveal block" style={{ animationDelay: "0.18s" }}>
                  <span style={{ color: "var(--olive)" }}>A </span>
                  <span style={{ color: "var(--rosso)" }}>La Barcarola</span>
                </span>
              </h1>

              <p
                className="reveal mt-6 font-script text-3xl sm:text-4xl text-ink flex items-end gap-3"
                style={{ animationDelay: "0.3s" }}
              >
                <span>Cucina fatta in casa,
                  <br />con amore.</span>
                <svg width="56" height="30" viewBox="0 0 56 30" fill="none" className="mb-1 shrink-0" aria-hidden>
                  <path
                    d="M2 10c14 8 30 9 48 5"
                    stroke="var(--ink)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 15l4-1-3-3"
                    stroke="var(--ink)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>

              <div
                className="reveal mt-9 font-display text-base font-bold uppercase tracking-[0.12em] text-verde leading-snug"
                style={{ animationDelay: "0.42s" }}
              >
                {resto.area}
                <br />
                {resto.address.split(",")[0]}
              </div>
            </div>
          </div>

          {/* Photo plein cadre */}
          <div className="relative min-h-[46vh] lg:min-h-full">
            {hasAsset("images/facade-terrasse.png") ? (
              <Photo
                src="/images/facade-terrasse.png"
                alt="La façade verte et la terrasse de La Barcarola au crépuscule, tables à nappes vichy"
                ratio="auto"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="absolute inset-0 h-full w-full"
                imgClassName="kenburns"
              />
            ) : (
              <Placeholder label="La façade & la terrasse" assetKey="photo-facade" className="absolute inset-0 h-full" />
            )}

            {/* Tampon Ouvert 7j/7 — chevauche la jointure texte/photo */}
            <div className="absolute z-20 -top-12 right-6 lg:top-1/2 lg:right-auto lg:-left-16 lg:-translate-y-1/2">
              <div className="stamp-float relative w-24 sm:w-28 lg:w-32 aspect-square rounded-full overflow-hidden shadow-[0_10px_28px_-12px_rgba(42,33,26,0.85)]">
                <Image
                  src="/images/stamp-ouvert.png"
                  alt="Ouvert 7j/7, tous les jours"
                  fill
                  sizes="128px"
                  className="object-cover scale-[1.04]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BANDEAU ============ */}
      <div className="bg-rosso-bright text-cream">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-sm font-bold uppercase tracking-[0.1em]">
          {banderoles.map((b, i) => (
            <span key={b.label} className="flex items-center gap-x-8">
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
      <section id="carte" className="px-5 sm:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <h2 className="display-md text-verde text-center">La Carte</h2>
            <div className="rule-fancy max-w-xs mx-auto mt-4 mb-12">
              <span>✦</span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)_minmax(0,0.85fr)] gap-6 lg:gap-8 items-start">
            {/* Affiche gauche */}
            <Reveal className="hidden lg:block group">
              {hasAsset("images/affiche-campari.png") ? (
                <Photo
                  src="/images/affiche-campari.png"
                  alt="Affiche vintage Campari"
                  ratio="3 / 5"
                  sizes="22vw"
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <Placeholder label="Affiche Campari" assetKey="affiche-campari" kicker="Affiche vintage" ratio="3 / 5" />
              )}
            </Reveal>

            {/* Menu + pizza (pizza contenue dans le panneau, comme le mockup) */}
            <Reveal delay={80}>
              <div className="vintage-frame p-4 sm:p-7 relative overflow-hidden">
                <Menu />
                {/* Pizza — à droite de la liste, contenue dans le cadre */}
                {hasAsset("images/pizza.png") && (
                  <div className="hidden xl:block absolute right-5 top-[56%] -translate-y-1/2 w-32 -rotate-6 pointer-events-none">
                    <div className="relative aspect-square rounded-full overflow-hidden shadow-[0_14px_36px_-16px_rgba(42,33,26,0.8)]">
                      <Image
                        src="/images/pizza.png"
                        alt="Pizza au four de La Barcarola"
                        fill
                        sizes="150px"
                        className="object-cover scale-[1.08]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Affiche droite */}
            <Reveal delay={120} className="hidden lg:block group">
              {hasAsset("images/affiche-cinzano.png") ? (
                <Photo
                  src="/images/affiche-cinzano.png"
                  alt="Affiche vintage Cinzano"
                  ratio="3 / 5"
                  sizes="22vw"
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <Placeholder label="Affiche Cinzano" assetKey="affiche-cinzano" kicker="Affiche vintage" ratio="3 / 5" />
              )}
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="text-center mt-12">
              <a
                href="#carte"
                className="link-u group/link inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-rosso"
              >
                Voir la carte complète
                <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LA MAISON + AMBIANCE (bande condensée) ============ */}
      <section id="chef" className="bg-paper border-y border-line">
        <div className="mx-auto max-w-[1320px] grid md:grid-cols-2 lg:grid-cols-4">
          {/* La maison — texte */}
          <Reveal className="flex flex-col justify-center p-8 lg:p-10 border-b md:border-b-0 md:border-r border-line">
            <h2 className="display-md text-verde">La Maison</h2>
            <p className="mt-4 font-body text-ink-soft leading-relaxed">
              Ici, on cuisine comme là-bas. Des produits vrais, des recettes de
              famille, et beaucoup de cœur. Benvenuti a casa.
            </p>
            <a
              href="#carte"
              className="link-u group/link mt-6 inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.16em] text-rosso self-start"
            >
              En savoir plus
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </a>
          </Reveal>

          {/* La maison — photo */}
          <Reveal delay={80} className="group relative min-h-[280px] overflow-hidden border-b md:border-b-0 lg:border-r border-line">
            {hasAsset("images/pates-fraiches.png") ? (
              <Photo
                src="/images/pates-fraiches.png"
                alt="Les mains du chef façonnant les pâtes fraîches maison"
                ratio="auto"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <Placeholder label="Pâtes fraîches" assetKey="photo-cuisine-pates" className="absolute inset-0 h-full" />
            )}
          </Reveal>

          {/* Ambiance — texte */}
          <Reveal delay={120} id="ambiance" className="flex flex-col justify-center p-8 lg:p-10 border-b lg:border-b-0 md:border-r border-line">
            <h2 className="display-md text-verde">Ambiance</h2>
            <p className="mt-4 font-body text-ink-soft leading-relaxed">
              Une trattoria de quartier, à l’italienne.
            </p>
            <a
              href="#ambiance"
              className="link-u group/link mt-6 inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.16em] text-rosso self-start"
            >
              Voir la galerie
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </a>
          </Reveal>

          {/* Ambiance — photo */}
          <Reveal delay={160} className="group relative min-h-[280px] overflow-hidden">
            {hasAsset("images/salle.png") ? (
              <Photo
                src="/images/salle.png"
                alt="La salle intérieure aux affiches vintage et nappes vichy, lumière tamisée"
                ratio="auto"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <Placeholder label="La salle" assetKey="photo-ambiance-1" className="absolute inset-0 h-full" />
            )}
          </Reveal>
        </div>
      </section>

      {/* ============ RÉSERVATION + AVIS (bande rouge) ============ */}
      <section id="reserver" className="bg-rosso text-cream">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-14 sm:py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Réserver */}
          <Reveal>
            <h2 className="display-md text-cream">Réserver une table</h2>
            <p className="mt-2 font-body text-cream/80">
              En quelques secondes. Pour plus de 8 couverts, appelez-nous au {resto.phone}.
            </p>
            <div className="mt-6">
              <Reserve />
            </div>
          </Reveal>

          {/* Avis */}
          <Reveal delay={120} id="avis">
            <div className="flex items-start gap-6">
              <div>
                <span className="eyebrow text-cream/70">Avis clients</span>
                <p className="font-display font-extrabold leading-none mt-2">
                  <span className="text-5xl sm:text-6xl">9,4</span>
                  <span className="text-2xl text-cream/70">/10</span>
                </p>
                <p className="mt-1 font-body text-cream/70">128 avis</p>
              </div>
              <div className="flex-1 border-l border-line-cream pl-6">
                <p className="text-gold tracking-[0.2em]">★★★★★</p>
                <blockquote className="mt-2 font-body text-lg italic leading-relaxed">
                  « {featured.text} »
                </blockquote>
                <figcaption className="mt-3 font-display text-[0.62rem] font-bold uppercase tracking-[0.12em] text-cream/60">
                  {featured.name} — via {featured.source}
                </figcaption>
              </div>
              <div className="hidden sm:block shrink-0 self-center">
                <CircularBadge
                  top="Grazie · Mille"
                  bottom="La Barcarola"
                  center={<span className="font-display text-lg font-extrabold text-cream leading-none">1000</span>}
                  size={92}
                  color="var(--cream)"
                  fontSize={7}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER mince ============ */}
      <footer className="text-cream" style={{ backgroundColor: "#74201b" }}>
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-[0.66rem] font-bold uppercase tracking-[0.12em] text-cream/85 text-center sm:text-left">
            {resto.name} — {resto.address} — {resto.phone}
          </p>
          <div className="flex items-center gap-4">
            <a href="#top" aria-label="Instagram" className="text-cream/80 hover:text-cream hover:scale-110 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#top" aria-label="Facebook" className="text-cream/80 hover:text-cream hover:scale-110 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 8.5h2V5.5h-2.2C11.4 5.5 10 7 10 9v1.5H8V13h2v6h3v-6h2.2l.3-2.5H13V9.3c0-.6.2-.8.8-.8Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 pb-5 -mt-1">
          <p className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-cream/45 text-center sm:text-left">
            Refonte concept — proposition indépendante, non officielle. Conçu &amp; développé par{" "}
            <a href="https://lucasrblt.me" target="_blank" rel="noopener noreferrer" className="link-u text-cream/70">
              Lucas Rimbault
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
