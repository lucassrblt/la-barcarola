# Maison Lavigne — Site vitrine restaurant / bistrot

Site vitrine d'un bistrot de marché avec **carte dynamique** et **réservation de table en ligne** :
présentation de la maison et du chef, carte filtrable par catégorie et par régime, ambiance,
avis, et un module de réservation (couverts → date → service midi/soir → créneau → confirmation).

> ⚠️ **Projet de démonstration.** « Maison Lavigne » est une **enseigne fictive** : cette
> réalisation concept illustre le type de vitrine que je conçois pour la restauration. Aucun
> établissement réel, aucune donnée n'est enregistrée.

🔗 **Démo en ligne :** _(à déployer — Vercel)_

## Aperçu

- **Direction artistique** bistrot chic : crème menu, bordeaux-aubergine profond, accent paprika —
  une identité **colorée** distincte des autres réalisations. Display Bricolage Grotesque × corps
  Newsreader (serif éditoriale « carte »).
- **Carte dynamique** : filtres par catégorie (entrées / plats / desserts / cave) et par régime
  (végétarien, vegan, sans gluten), avec compteurs en direct.
- **Réservation de table** : disponibilités calculées côté serveur selon le service (midi/soir),
  le jour de fermeture et le nombre de couverts.
- **100 % responsive**, animations au scroll, `prefers-reduced-motion` respecté.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Route handlers Node** (`/api/availability`, `/api/reservation`) + **Zod** pour la validation
- **next/font** (Google Fonts auto-hébergées)

## Architecture

```
app/
├── page.tsx              # Landing : hero, carte, chef, ambiance, réservation, avis
├── layout.tsx            # Fonts + métadonnées SEO/OpenGraph
├── globals.css           # Design system (tokens, textures, animations)
└── api/
    ├── availability/     # GET — créneaux par service selon date + couverts
    └── reservation/      # POST — validation Zod + référence de réservation
components/
├── Nav.tsx               # En-tête sticky + menu mobile
├── Menu.tsx              # Carte dynamique filtrable (client)
├── ReservationForm.tsx   # Réservation de table (client)
└── Reveal.tsx            # Apparition au scroll (IntersectionObserver)
lib/data.ts               # Contenu (carte, chef, ambiance, horaires, avis)
```

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
```

## Mise en production réelle

La carte et la réservation sont fonctionnelles mais ne persistent rien (démo). Pour une vraie
mise en ligne : gérer la carte via un CMS, brancher une base + un email de confirmation sur
`/api/reservation`, et synchroniser les disponibilités avec un vrai plan de salle.

---

Conçu & développé par [Lucas Rimbault](https://lucasrblt.me).
