/* Données de démonstration — enseigne fictive « Maison Lavigne ». */

export type DietTag = "Végétarien" | "Vegan" | "Sans gluten";

export type Dish = {
  id: string;
  category: "Entrées" | "Plats" | "Desserts" | "Cave & boissons";
  name: string;
  desc: string;
  price: number;
  tags: DietTag[];
  signature?: boolean;
};

export const categories = ["Entrées", "Plats", "Desserts", "Cave & boissons"] as const;
export const dietTags: DietTag[] = ["Végétarien", "Vegan", "Sans gluten"];

export const menu: Dish[] = [
  // Entrées
  {
    id: "e1",
    category: "Entrées",
    name: "Velouté de potimarron",
    desc: "Crème de châtaigne, huile de noisette torréfiée, graines.",
    price: 11,
    tags: ["Végétarien", "Sans gluten"],
  },
  {
    id: "e2",
    category: "Entrées",
    name: "Œuf parfait 63°",
    desc: "Mousseline de pomme de terre fumée, lard de Colonnata, ciboulette.",
    price: 13,
    tags: [],
    signature: true,
  },
  {
    id: "e3",
    category: "Entrées",
    name: "Betterave & chèvre frais",
    desc: "Betteraves rôties au thym, chèvre des Causses, vinaigrette miel.",
    price: 12,
    tags: ["Végétarien", "Sans gluten"],
  },
  {
    id: "e4",
    category: "Entrées",
    name: "Tartare de truite",
    desc: "Truite de l'Adour, aneth, crème acidulée, blinis maison.",
    price: 14,
    tags: [],
  },
  // Plats
  {
    id: "p1",
    category: "Plats",
    name: "Joue de bœuf braisée",
    desc: "Sept heures au vin de Bordeaux, purée à la fourchette, carottes glacées.",
    price: 24,
    tags: ["Sans gluten"],
    signature: true,
  },
  {
    id: "p2",
    category: "Plats",
    name: "Cabillaud rôti",
    desc: "Dos de cabillaud, beurre blanc citronné, poireaux fondants.",
    price: 23,
    tags: ["Sans gluten"],
  },
  {
    id: "p3",
    category: "Plats",
    name: "Risotto aux cèpes",
    desc: "Carnaroli crémeux, cèpes poêlés, vieux parmesan, huile de truffe.",
    price: 21,
    tags: ["Végétarien", "Sans gluten"],
  },
  {
    id: "p4",
    category: "Plats",
    name: "Curry de légumes & coco",
    desc: "Légumes de saison, lait de coco, riz basmati, coriandre.",
    price: 19,
    tags: ["Vegan", "Sans gluten"],
  },
  {
    id: "p5",
    category: "Plats",
    name: "Magret de canard",
    desc: "Cuisson rosée, sauce aux figues, gratin dauphinois.",
    price: 26,
    tags: ["Sans gluten"],
  },
  {
    id: "p6",
    category: "Plats",
    name: "Burger Maison",
    desc: "Bœuf race à viande, tomme affinée, oignons confits, frites fraîches.",
    price: 20,
    tags: [],
  },
  // Desserts
  {
    id: "d1",
    category: "Desserts",
    name: "Paris-Brest",
    desc: "Praliné noisette maison, pâte à choux croustillante.",
    price: 10,
    tags: ["Végétarien"],
    signature: true,
  },
  {
    id: "d2",
    category: "Desserts",
    name: "Tarte fine aux pommes",
    desc: "Pommes du Limousin, caramel beurre salé, glace vanille.",
    price: 9,
    tags: ["Végétarien"],
  },
  {
    id: "d3",
    category: "Desserts",
    name: "Mousse au chocolat noir",
    desc: "Chocolat 70 %, fleur de sel, tuile cacao.",
    price: 9,
    tags: ["Végétarien", "Sans gluten"],
  },
  {
    id: "d4",
    category: "Desserts",
    name: "Sorbets de saison",
    desc: "Trois parfums au choix, fruits de producteurs.",
    price: 8,
    tags: ["Vegan", "Sans gluten"],
  },
  // Cave & boissons
  {
    id: "c1",
    category: "Cave & boissons",
    name: "Bordeaux rouge — Château (verre)",
    desc: "Sélection du sommelier, médoc ou saint-émilion selon arrivage.",
    price: 7,
    tags: ["Vegan", "Sans gluten"],
  },
  {
    id: "c2",
    category: "Cave & boissons",
    name: "Blanc sec — Entre-deux-Mers (verre)",
    desc: "Vif et minéral, parfait sur le poisson.",
    price: 6,
    tags: ["Vegan", "Sans gluten"],
  },
  {
    id: "c3",
    category: "Cave & boissons",
    name: "Limonade artisanale",
    desc: "Citron de Menton, infusion maison, sans alcool.",
    price: 5,
    tags: ["Vegan", "Sans gluten"],
  },
  {
    id: "c4",
    category: "Cave & boissons",
    name: "Café & mignardises",
    desc: "Torréfaction locale, petit assortiment sucré.",
    price: 5,
    tags: ["Végétarien"],
  },
];

export const chef = {
  name: "Camille Lavigne",
  role: "Chef & fondatrice",
  bio: "Formée dans les maisons bordelaises, Camille cuisine au rythme du marché. Une carte courte qui tourne chaque semaine, des producteurs choisis à la main, et l'envie simple de bien recevoir.",
};

export const ambiance = [
  "La salle",
  "Le comptoir",
  "La cave",
  "En cuisine",
  "La terrasse",
  "Le dressage",
];

export const hours: { day: string; value: string }[] = [
  { day: "Lundi", value: "Fermé" },
  { day: "Mar — Jeu", value: "12h–14h · 19h–22h" },
  { day: "Ven — Sam", value: "12h–14h · 19h–23h" },
  { day: "Dimanche", value: "12h–15h" },
];

export type Review = { name: string; text: string; source: string };
export const reviews: Review[] = [
  {
    name: "Julie M.",
    text: "La joue de bœuf est un poème. Service chaleureux, addition honnête. On reviendra.",
    source: "Google",
  },
  {
    name: "Pierre & Sophie",
    text: "Réservé en deux clics pour un anniversaire. Table parfaite, carte des vins au top.",
    source: "TheFork",
  },
  {
    name: "Nadia K.",
    text: "Enfin un bistrot qui pense aussi aux options végé sans bâcler. Le risotto aux cèpes, une tuerie.",
    source: "Google",
  },
];

export const resto = {
  name: "Maison Lavigne",
  tagline: "Bistrot de marché",
  baseline: "On cuisine ce que le marché donne.",
  address: "22 rue Sainte-Colombe, 33000 Bordeaux",
  phone: "05 56 12 34 56",
  est: "2018",
};
