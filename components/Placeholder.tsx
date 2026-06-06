/**
 * Placeholder visuel pour un asset manquant (photo non encore fournie par le client).
 * Chaque `assetKey` correspond à une entrée d'`ASSETS-MANQUANTS.md`.
 * À remplacer par une vraie image (next/image) le moment venu.
 */

type PlaceholderProps = {
  /** Légende lisible de ce que la photo doit montrer. */
  label: string;
  /** Clé de référence dans ASSETS-MANQUANTS.md (ex. "photo-facade"). */
  assetKey: string;
  /** Ratio CSS (ex. "4 / 5", "1 / 1", "16 / 9"). */
  ratio?: string;
  /** Petit libellé en pastille (défaut : "Photo à venir"). */
  kicker?: string;
  className?: string;
};

export default function Placeholder({
  label,
  assetKey,
  ratio = "4 / 5",
  kicker = "Photo à venir",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`ph rounded-sm ${className}`}
      style={{ aspectRatio: ratio }}
      data-asset={assetKey}
      role="img"
      aria-label={`${label} — visuel à venir`}
    >
      <div className="ph__label">
        <span className="ph__kicker">{kicker}</span>
        <span className="ph__name">{label}</span>
        <span className="ph__key">{assetKey}</span>
      </div>
    </div>
  );
}
