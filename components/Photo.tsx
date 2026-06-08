import Image from "next/image";

/**
 * Photo réelle recadrée en `object-cover`.
 * - Par défaut : ratio fixe (mêmes ratios que `Placeholder`).
 * - `fill` : le wrapper remplit son parent (utiliser `className` pour le positionner,
 *   ex. "absolute inset-0 h-full w-full"). Le `ratio` est alors ignoré.
 */
type PhotoProps = {
  src: string;
  /** Texte alternatif (accessibilité / SEO). */
  alt: string;
  /** Ratio CSS (ex. "4 / 5", "1 / 1", "3 / 5"). Ignoré si `fill`. */
  ratio?: string;
  /** `sizes` next/image — largeur rendue selon le breakpoint. */
  sizes?: string;
  /** Charge l'image en priorité (hero). */
  priority?: boolean;
  /** Remplit le parent au lieu d'imposer un ratio. */
  fill?: boolean;
  className?: string;
  /** Classes appliquées à l'`<Image>` interne (ex. Ken Burns, zoom au hover). */
  imgClassName?: string;
};

export default function Photo({
  src,
  alt,
  ratio = "4 / 5",
  sizes = "(max-width: 1024px) 100vw, 40vw",
  priority = false,
  fill = false,
  className = "",
  imgClassName = "",
}: PhotoProps) {
  return (
    <div
      className={`relative overflow-hidden ${fill ? "" : "rounded-sm"} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
