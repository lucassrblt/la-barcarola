# État des assets — La Barcarola (refonte Osteria Vintage)

Toutes les photos de la mise en page actuelle sont **intégrées**. Le mécanisme : `app/page.tsx`
teste la présence du fichier (`hasAsset(...)`) et affiche un `next/image`, sinon un
`<Placeholder />` traçé (composant [`components/Placeholder.tsx`](components/Placeholder.tsx)).
Pour remplacer/ajouter un visuel : déposer le fichier dans `public/images/` au nom attendu.

## 1. Photos intégrées (présentes dans `public/images/`)

| Fichier | Emplacement | Contenu | Ratio d'affichage |
|---|---|---|---|
| `facade-terrasse.png` | Hero | Façade + terrasse, enseigne visible | plein cadre |
| `pates-fraiches.png` | Bande « La Maison » | Pâtes fraîches en préparation (mains) | plein cadre |
| `salle.png` | Bande « Ambiance » | La salle (affiches, nappes vichy) | plein cadre |
| `affiche-campari.png` | Carte, colonne gauche | Affiche apéritif vintage (gauche) | 3 / 5 |
| `affiche-cinzano.png` | Carte, colonne droite | Affiche apéritif vintage (droite) | 3 / 5 |
| `pizza.png` | Carte, pastille dans le panneau central | Pizza au four (vue du dessus) | cercle |
| `stamp-ouvert.png` | Hero | Tampon « Ouvert 7j/7 — tous les jours » | cercle |

> Qualité finale = qualité de ces visuels. Idéalement un shooting pro (plats + lieu),
> lumière naturelle chaude, cadrages serrés sur la matière.

## 2. Réellement absent / à fournir

| Élément | Où | État | Recommandation |
|---|---|---|---|
| **Image Open Graph** | `app/layout.tsx` (`metadata.openGraph.images`) | non définie | 1200×630, aperçu de partage (réseaux/SMS) |
| **Favicon / icône d'app** | `app/icon.png` / `favicon.ico` | défaut Next | icône sur mesure (monogramme « LB » ou tampon) |

## 3. Rendus en CSS/SVG — upgrades optionnels (pas de placeholder)

| Élément | Où | État actuel | Upgrade possible |
|---|---|---|---|
| Tampon « Trattoria fresca » | Header (gauche) | Texte circulaire CSS (`CircularBadge`) | Estampille dessinée |
| Badge « Grazie Mille / 1000 » | Section avis | Texte circulaire CSS (`CircularBadge`) | Estampille dessinée |
| Icônes du bandeau (pizza, pâtes, halal, végé) | Bandeau rosso | SVG de trait inline | Pictos vintage dessinés |
| Wordmark « La Barcarola » | Header + footer | Police *Dancing Script* | Logo lettré sur mesure |

## 4. ⚠️ Propriété intellectuelle

Les affiches **Campari** et **Cinzano** sont des **marques déposées**. Reproduire leurs visuels
sur le site commercial d'un établissement est juridiquement risqué. Avant une mise en ligne
commerciale, envisager de les remplacer par un **artwork ORIGINAL** dans l'esprit « affiche
apéritif italienne » (création dédiée, non dérivée d'une marque existante).
