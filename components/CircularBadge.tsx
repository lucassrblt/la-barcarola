/**
 * Tampon / sceau à texte circulaire (style estampille vintage).
 * Le texte du haut suit l'arc supérieur, celui du bas l'arc inférieur,
 * et `center` est rendu au milieu (libellé fort type "7J/7").
 */
type CircularBadgeProps = {
  /** Texte courant le long de l'arc supérieur. */
  top: string;
  /** Texte courant le long de l'arc inférieur. */
  bottom?: string;
  /** Contenu central (texte fort ou petit bloc). */
  center?: React.ReactNode;
  /** Diamètre en px. */
  size?: number;
  /** Couleur du trait, du texte et des anneaux. */
  color?: string;
  /** Espacement des lettres du texte circulaire. */
  letterSpacing?: number;
  /** Taille de police du texte circulaire (unités viewBox 0-100). */
  fontSize?: number;
  className?: string;
};

export default function CircularBadge({
  top,
  bottom,
  center,
  size = 96,
  color = "var(--rosso)",
  letterSpacing = 1.4,
  fontSize = 7,
  className = "",
}: CircularBadgeProps) {
  // ids stables dérivés du texte (évite les collisions si plusieurs badges)
  const slug = top.replace(/[^a-z0-9]/gi, "").slice(0, 12).toLowerCase();
  const topId = `arc-top-${slug}`;
  const bottomId = `arc-bottom-${slug}`;

  return (
    <span
      className={`relative inline-grid place-items-center ${className}`}
      style={{ width: size, height: size, color }}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="1.4" />
        <circle cx="50" cy="50" r="43" stroke={color} strokeWidth="0.7" opacity="0.6" />
        <defs>
          {/* arc supérieur : texte lisible en haut */}
          <path id={topId} d="M 15,50 A 35,35 0 0 1 85,50" />
          {/* arc inférieur : texte lisible en bas */}
          <path id={bottomId} d="M 15,50 A 35,35 0 0 0 85,50" />
        </defs>
        <text
          fill={color}
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          style={{ textTransform: "uppercase" }}
        >
          <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        {bottom && (
          <text
            fill={color}
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={fontSize}
            letterSpacing={letterSpacing}
            style={{ textTransform: "uppercase" }}
          >
            <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
              {bottom}
            </textPath>
          </text>
        )}
        {/* étoiles latérales de séparation */}
        <text fill={color} fontSize="7" textAnchor="middle">
          <tspan x="11" y="53">✦</tspan>
          <tspan x="89" y="53">✦</tspan>
        </text>
      </svg>
      {center != null && (
        <span className="relative z-10 grid place-items-center text-center leading-none">
          {center}
        </span>
      )}
    </span>
  );
}
