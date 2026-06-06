# Assets manquants — La Barcarola (refonte Osteria Vintage)

Le site est **fonctionnel mais sans photos** : tous les visuels ci-dessous sont
actuellement rendus par des **placeholders tracés** (composant
[`components/Placeholder.tsx`](components/Placeholder.tsx), classe `.ph`).
Chaque placeholder porte une **clé d'asset** (attribut `data-asset`, visible à l'écran)
qui correspond à une ligne de ce tableau.

➡️ **Quand une vraie image est fournie**, remplacer le `<Placeholder … />` correspondant
dans `app/page.tsx` par un `next/image` (penser à configurer `next.config.ts` si l'image
est distante). Conserver le ratio indiqué pour ne pas casser la mise en page.

> Tant qu'aucune photo réelle n'est intégrée, le rendu reste « démo » : la qualité finale
> dépend directement de ces visuels (idéalement un shooting pro plats + lieu).

## 1. Photos (placeholders en place)

| Clé (`data-asset`) | Emplacement | Ce que la photo doit montrer | Ratio | Format conseillé |
|---|---|---|---|---|
| `photo-facade` | Hero (`app/page.tsx`) | La façade + la terrasse, de jour, enseigne visible | 4 / 5 | ~1200×1500, WebP |
| `photo-cuisine-pates` | Section « La maison » | Les pâtes fraîches en cours de préparation (mains, geste) | 4 / 5 | ~1200×1500, WebP |
| `photo-ambiance-1` | Galerie ambiance | La salle | 1 / 1.3 | ~900×1170, WebP |
| `photo-ambiance-2` | Galerie ambiance | La terrasse climatisée | 1 / 1 | ~900×900, WebP |
| `photo-ambiance-3` | Galerie ambiance | Le four à pizza | 1 / 1 | ~900×900, WebP |
| `photo-ambiance-4` | Galerie ambiance | Les pâtes fraîches (détail assiette) | 1 / 1 | ~900×900, WebP |
| `photo-ambiance-5` | Galerie ambiance | Le comptoir | 1 / 1 | ~900×900, WebP |
| `photo-ambiance-6` | Galerie ambiance | Le dressage / un plat signature | 1 / 1.3 | ~900×1170, WebP |

**Conseil shooting** : lumière naturelle chaude, fonds bois/nappe, cadrages serrés sur la
matière (pâte, fromage filant, pizza au four). Prévoir aussi 3–5 photos de plats au cas où
l'on voudrait illustrer la carte plus tard.

## 2. Décor & identité (rendus en CSS/SVG — upgrades optionnels)

Ces éléments sont **déjà produits** dans le code (pas de placeholder gris), mais un·e
graphiste pourrait les remplacer par des versions dessinées sur mesure pour gagner en finesse :

| Élément | Où | État actuel | Upgrade possible |
|---|---|---|---|
| Tampon « Ouvert 7j/7 » | Hero | Sceau CSS (`.stamp`) | Tampon encré dessiné (effet usé) |
| Sceau « Grazie » | Confirmation de réservation | Sceau CSS (`.stamp`) | Idem |
| Tampon « 9,4 / 128 avis » | Section avis | Sceau CSS (`.stamp`) | Idem |
| Icônes du bandeau (pizza, pâtes, halal, végé) | Bandeau rosso | SVG de trait inline | Pictos vintage dessinés |
| Wordmark « La Barcarola » | Nav + footer | Police *Dancing Script* | Logo lettré sur mesure |

## 3. ⚠️ Propriété intellectuelle

La maquette d'inspiration montrait des **affiches publicitaires Campari / Cinzano**.
Elles ont été **volontairement écartées** : ce sont des **marques déposées**, leur
reproduction sur le site commercial d'un établissement est risquée. Si une ambiance
« affiche apéritif » est souhaitée plus tard, faire réaliser un **artwork original**
(non dérivé d'une marque existante).
