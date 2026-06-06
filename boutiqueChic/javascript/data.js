// ========================================
//  data.js — Données des produits
//  D&A Couture – Projet Web L2
// ========================================

const produits = [

  // ========== COLLECTION ROYALE (8) ==========
  {
    id: 1,
    nom: "Étoile Rose",
    categorie: "La Robe Cristalline",
    prix: 18500,
    description: "RUne somptueuse robe de soirée grise et argentée, entièrement brodée de paillettes scintillantes et de strass.",
    image: "images/robe1.jpg",
    badge: "Nouveauté",
    couleur: "rose",
    couleurHex: "#F4A7B9",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    nom: "Princesse Dorée",
    categorie: "Éclat de Minuit",
    prix: 22000,
    description: "Une majestueuse robe de bal bustier en satin bleu nuit structuré.",
    image: "images/robe2.jpg",
    badge: "Best-seller",
    couleur: "or",
    couleurHex: "#D4AF37",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    nom: "Or Noir",
    categorie: "Collection Royale",
    prix: 16800,
    description: "Une robe de soirée bustier au volume spectaculaire. Conçue sur une base de tulle ou d'organza noir profond.",
    image: "images/robe3.jpg",
    badge: null,
    couleur: "pastel",
    couleurHex: "#F9D5E5",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 4,
    nom: "Nuance Cendrée",
    categorie: "Collection Royale",
    prix: 19200,
    description: " Une robe bustier d'un raffinement minimaliste, déclinée dans un ton gris perle ou sauge très doux. ",
    image: "images/robe4.jpg",
    badge: null,
    couleur: "rose",
    couleurHex: "#F4A7B9",
    tailles: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    nom: "Rubis Impérial",
    categorie: "Collection Royale",
    prix: 24500,
    description: "Une somptueuse robe de bal bustier en satin de soie couleur rouge rubis / bordeaux.",
    image: "images/robe5.jpg",
    badge: "Exclusif",
    couleur: "cerise",
    couleurHex: "#9B1B30",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 6,
    nom: "Drapé Chocolat",
    categorie: "Collection Royale",
    prix: 27000,
    description: "Une robe de gala asymétrique d'une grande élégance, confectionnée dans un satin fluide couleur marron chocolat profond.",
    image: "images/robe6.jpg",
    badge: "Prestige",
    couleur: "or",
    couleurHex: "#D4AF37",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 7,
    nom: "Pureté Royale",
    categorie: "Collection Royale",
    prix: 31000,
    description: "Une robe fourreau d'un blanc immaculé, accompagnée d'une cape drapée majestueuse qui habille les épaules.",
    image: "images/robe7.jpg",
    badge: "Collection exclusive",
    couleur: "bleu",
    couleurHex: "#003087",
    tailles: ["S", "M", "L"]
  },
  {
    id: 8,
    nom: "Éclat d'Argent",
    categorie: "Collection Royale",
    prix: 29800,
    description: "Une robe de soirée asymétrique à coupe sirène, entièrement recouverte de sequins et de broderies argentées scintillantes. ",
    image: "images/robe8.jpg",
    badge: "Nouveauté",
    couleur: "pourpre",
    couleurHex: "#702963",
    tailles: ["XS", "S", "M", "L", "XL"]
  },

  // ========== FÉERIE MODERNE (8) ==========
  {
    id: 9,
    nom: "Nymphe Poudrée",
    categorie: "Féerie Moderne",
    prix: 9500,
    description: "Une somptueuse robe longue de style bohème-chic en tulle plissé vieux rose. ",
    image: "images/robe9.jpg",
    badge: "Tendance",
    couleur: "blush",
    couleurHex: "#F2C4CE",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 10,
    nom: "Aurore Scintillante",
    categorie: "Féerie Moderne",
    prix: 11200,
    description: "Une robe de mariée ou de grand soir spectaculaire de couleur nude / champagne.",
    image: "images/robe10.jpg",
    badge: null,
    couleur: "fuchsia",
    couleurHex: "#FF007F",
    tailles: ["S", "M", "L"]
  },
  {
    id: 11,
    nom: "Prune Impériale",
    categorie: "Féerie Moderne",
    prix: 8900,
    description: "Une majestueuse robe bustier de couleur bordeaux / prune foncé. ",
    image: "images/robe11.jpg",
    badge: "Promo",
    couleur: "rose",
    couleurHex: "#F4A7B9",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 12,
    nom: "Impératrice Dorée",
    categorie: "Féerie Moderne",
    prix: 12800,
    description: "Une robe de style médiéval-royal en mousseline fluide jaune pastel ou beurre.",
    image: "images/robe12.jpg",
    badge: null,
    couleur: "bordeaux",
    couleurHex: "#722F37",
    tailles: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 13,
    nom: "Éclat Doré",
    categorie: "Féerie Moderne",
    prix: 10600,
    description: "Une mini-robe bustier originale de couleur or scintillant, ornée de magnifiques broderies florales en relief (tons violets, blancs et jaunes) sur l'épaule et la hanche.",
    image: "images/robe13.jpg",
    badge: "Coup de cœur",
    couleur: "ivoire",
    couleurHex: "#FFFFF0",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 14,
    nom: "Douceur de Nacre",
    categorie: "Féerie Moderne",
    prix: 13500,
    description: "Une robe courte et aérienne à fines bretelles, déclinée dans un ton nude / beige rosé très délicat.",
    image: "images/robe14.jpg",
    badge: "Nouveauté",
    couleur: "rose",
    couleurHex: "#F4A7B9",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 15,
    nom: "Azur Scintillant",
    categorie: "Féerie Moderne",
    prix: 11900,
    description: "Une ravissante robe de cocktail bustier à coupe asymétrique (plus courte devant que derrière).",
    image: "images/robe15.jpg",
    badge: null,
    couleur: "lilas",
    couleurHex: "#C8A2C8",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 16,
    nom: "Nymphe Émeraude",
    categorie: "Féerie Moderne",
    prix: 14200,
    description: "Une élégante robe longue à fines bretelles dans un ton vert émeraude vibrant.",
    image: "images/robe16.jpg",
    badge: "Best-seller",
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["XS", "S", "M", "L", "XL"]
  },

  // ========== GLAMOUR ABSOLU (8) ==========
  {
    id: 17,
    nom: "Cascades d'Or",
    categorie: "Glamour Absolu",
    prix: 45000,
    description: "Une spectaculaire robe de soirée droite à l'allure résolument rétro-chic.",
    image: "images/robe17.jpg",
    badge: "Collection 2025",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 18,
    nom: "Sirène Solaire",
    categorie: "Glamour Absolu",
    prix: 38500,
    description: "Une somptueuse robe de bal coupe sirène dotée d'un décolleté en V plongeant.",
    image: "images/robe18.jpg",
    badge: null,
    couleur: "ivoire",
    couleurHex: "#FFFFF0",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 19,
    nom: "Drapé de Lumière",
    categorie: "Glamour Absolu",
    prix: 42000,
    description: "Une majestueuse robe bustier asymétrique confectionnée dans un tissu lamé or ultra-brillant. ",
    image: "images/robe19.jpg",
    badge: "Bestseller",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 20,
    nom: "Améthyste Impériale",
    categorie: "Glamour Absolu",
    prix: 36000,
    description: "Une robe fourreau d'exception d'un violet améthyste vibrant. ",
    image: "images/robe20.jpg",
    badge: null,
    couleur: "crème",
    couleurHex: "#FFFDD0",
    tailles: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 21,
    nom: "Cascade d'Or Liquide",
    categorie: "Glamour Absolu",
    prix: 52000,
    description: "Une somptueuse robe de soirée asymétrique sans manches, entièrement recouverte de sequins et de paillettes dorées ultra-brillantes.",
    image: "images/robe21.jpg",
    badge: "Exclusif",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 22,
    nom: "Flore de Lumière",
    categorie: "Glamour Absolu",
    prix: 48000,
    description: "Une majestueuse robe bustier droite couleur champagne ou vieil or. ",
    image: "images/robe22.jpg",
    badge: "Prestige",
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 23,
    nom: "Sirène Ambrée",
    categorie: "Glamour Absolu",
    prix: 55000,
    description: "Une robe de bal sculpturale en lurex ou sequins de couleur jaune orangé / ambre.",
    image: "images/robe23.jpg",
    badge: "Coup de cœur",
    couleur: "or",
    couleurHex: "#D4AF37",
    tailles: ["S", "M", "L"]
  },
  {
    id: 24,
    nom: "Nuage de Nacre",
    categorie: "Glamour Absolu",
    prix: 39500,
    description: "Une création bicolore et texturée d'une grande délicatesse.",
    image: "images/robe24.jpg",
    badge: "Nouveauté",
    couleur: "bordeaux",
    couleurHex: "#722F37",
    tailles: ["XS", "S", "M", "L", "XL"]
  },

  // ========== ÉLÉGANCE INTEMPORELLE (8) ==========
  {
    id: 25,
    nom: "Améthyste Drapée",
    categorie: "Élégance Intemporelle",
    prix: 32000,
    description: "Une somptueuse robe de style sirène combinant un bustier drapé couleur lilas / mauve et une longue jupe fourreau texturée blanc cassé parsemée de fins reflets scintillants.",
    image: "images/robe25.jpg",
    badge: "Prestige",
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 26,
    nom: "Nude Scintillant",
    categorie: "Élégance Intemporelle",
    prix: 28500,
    description: "Une majestueuse robe longue asymétrique ajustée, entièrement recouverte de perles et de sequins fins couleur beige rosé.",
    image: "images/robe26.jpg",
    badge: "Glamour",
    couleur: "doré",
    couleurHex: "#D4AF37",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 27,
    nom: "Lavande Royale",
    categorie: "Élégance Intemporelle",
    prix: 26000,
    description: "Une élégante robe de cocktail de couleur lilas / lavande, dotée d'un col en V croisé et entièrement brodée de micro-perles. ",
    image: "images/robe27.jpg",
    badge: null,
    couleur: "bleu",
    couleurHex: "#003087",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 28,
    nom: "Traîne de Nacre",
    categorie: "Élégance Intemporelle",
    prix: 34000,
    description: "Une somptueuse robe de mariée ou de grand soir blanche et scintillante. Son dos ou ses hanches se prolongent par une majestueuse traîne royale qui se déploie richement au sol.",
    image: "images/robe28.jpg",
    badge: "Coup de cœur",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 29,
    nom: "Or Solaire",
    categorie: "Élégance Intemporelle",
    prix: 29800,
    description: "Une sublime robe longue droite à fines bretelles, entièrement rehaussée de sequins dorés géométriques qui captent intensément la lumière, créant une silhouette digne des tapis rouges.",
    image: "images/robe29.jpg",
    badge: "New",
    couleur: "rouge",
    couleurHex: "#C0392B",
    tailles: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 30,
    nom: "Quartz Rose",
    categorie: "Élégance Intemporelle",
    prix: 23500,
    description: "Une robe de bal d'une grande fluidité en crêpe ou soie rose poudré. Elle se distingue par ses fines bretelles et de délicates chaînettes ou drapés perlés venant souligner la taille et les hanches.",
    image: "images/robe30.jpg",
    badge: null,
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 31,
    nom: "Drapé d'Albâtre",
    categorie: "Élégance Intemporelle",
    prix: 27000,
    description: "Une robe longue sculpturale d'un blanc pur et immaculé.",
    image: "images/robe31.jpg",
    badge: "Best-seller",
    couleur: "champagne",
    couleurHex: "#F7E7CE",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 32,
    nom: "Pétale de Soie",
    categorie: "Élégance Intemporelle",
    prix: 31500,
    description: "Une création romantique et aérienne en mousseline ou tulle rose pâle. ",
    image: "images/robe32.jpg",
    badge: "Exclusif",
    couleur: "ivoire",
    couleurHex: "#FFFFF0",
    tailles: ["S", "M", "L"]
  },

  // ========== TENDANCES 2026 (8) ==========
  {
    id: 33,
    nom: "Orchidée Strassée",
    categorie: "Tendances 2026",
    prix: 17500,
    description: "Une mini-robe bustier originale de couleur lilas ou rose orchidée. ",
    image: "images/robe33.jpg",
    badge: "2026",
    couleur: "multicolore",
    couleurHex: "#B39DDB",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 34,
    nom: "Ondulation Métallique",
    categorie: "Tendances 2026",
    prix: 14800,
    description: "Une robe de cocktail audacieuse dotée d'une seule manche longue. ",
    image: "images/robe34.jpg",
    badge: "Tendance",
    couleur: "rose",
    couleurHex: "#FF6EC7",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 35,
    nom: "Olive Sculpturale",
    categorie: "Tendances 2026",
    prix: 19900,
    description: "Une élégante robe longue asymétrique à une épaule, confectionnée dans un satin de soie fluide de couleur vert olive / bronze. ",
    image: "images/robe35.jpg",
    badge: "Nouveauté",
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["S", "M", "L", "XL"]
  },
  {
    id: 36,
    nom: "Léopard de Gala",
    categorie: "Tendances 2026",
    prix: 16200,
    description: "Une somptueuse robe de bal bustier au décolleté en cœur plongeant. Entièrement recouverte d'un imprimé léopard scintillant sur fond sombre, sa jupe volumineuse s'évase majestueusement avec une traîne royale au sol.",
    image: "images/robe36.jpg",
    badge: null,
    couleur: "terracotta",
    couleurHex: "#E2725B",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 37,
    nom: "Drapé Pourpre",
    categorie: "Tendances 2026",
    prix: 21000,
    description: "Une robe de soirée théâtrale à col bénitier et dos nu, déclinée dans un jersey ou satin fluide rouge bordeaux / pourpre foncé. ",
    image: "images/robe37.jpg",
    badge: "Coup de cœur",
    couleur: "vert",
    couleurHex: "#50C878",
    tailles: ["S", "M", "L"]
  },
  {
    id: 38,
    nom: "Brocard Floral",
    categorie: "Tendances 2026",
    prix: 15600,
    description: "Une robe de bal de style princesse à fines bretelles et bustier à découpes géométriques. ",
    image: "images/robe38.jpg",
    badge: "Best-seller",
    couleur: "corail",
    couleurHex: "#FF6B6B",
    tailles: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 39,
    nom:"Obscure Clarté",
    categorie: "Tendances 2026",
    prix: 23800,
    description: "Une robe longue asymétrique d'un noir profond, combinant un jeu de mousseline transparente drapée sur une seule épaule et une silhouette fourreau plissée, créant un look à la fois ténébreux et chic.",
    image: "images/robe39.jpg",
    badge: "2026",
    couleur: "argent",
    couleurHex: "#C0C0C0",
    tailles: ["XS", "S", "M", "L"]
  },
  {
    id: 40,
    nom: "Armure d'Argent",
    categorie: "Tendances 2026",
    prix: 18300,
    description: "Une robe droite futuriste et épurée couleur argent liquide.",
    image: "images/robe40.jpg",
    badge: "Tendance",
    couleur: "bleu",
    couleurHex: "#0047AB",
    tailles: ["S", "M", "L", "XL"]
  },

  // ========== CHAUSSURES (5 — inchangées) ==========
  {
    id: 41,
    nom: "Sandales Barbie Chic",
    categorie: "Chaussures",
    prix: 7500,
    description: "Sandales à talons rose bonbon métallisé, ornées de lanières de strass à nœuds papillons montantes et d'un talon aiguille pailleté argenté pour un look ultra-glamour.",
    image: "images/talon2.jpg",
    badge: "Nouveauté",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["36", "37", "38", "39", "40", "41"]
  },
  {
    id: 42,
    nom: "Escarpin Elegance Noire",
    categorie: "Chaussures",
    prix: 6800,
    description: "Escarpins noirs a semelle rouge, dotes d'un talon aiguille elance. Un modele intemporel qui apporte glamour et caractere a toutes vos tenues.",
    image: "images/talon3.jpg",
    badge: "Tendance",
    couleur: "noir",
    couleurHex: "#1A1A1A",
    tailles: ["36", "37", "38", "39", "40"]
  },
  {
    id: 43,
    nom: "Escarpins Rubis",
    categorie: "Chaussures",
    prix: 5500,
    description: "Escarpin slingback en vernis bordeaux avec doubles brides decoratives. Design moderne et feminin pour confort et elegance en toute occasion.",
    image: "images/talon4.jpg",
    badge: null,
    couleur: "bordeaux",
    couleurHex: "#722F37",
    tailles: ["36", "37", "38", "39", "40", "41"]
  },
  {
    id: 44,
    nom: "Escarpins Mariee Prestige",
    categorie: "Chaussures",
    prix: 4200,
    description: "Escarpins en tissu paillete ivoire avec fines brides de strass. Parfaits pour les mariages, ceremonies et evenements elegants.",
    image: "images/talon1.jpg",
    badge: "Exclusif",
    couleur: "ivoire",
    couleurHex: "#FFFFF0",
    tailles: ["36", "37", "38", "39", "40"]
  },
  {
    id: 45,
    nom: "Escarpins Nocturne Diamant",
    categorie: "Chaussures",
    prix: 8900,
    description: "Escarpins noirs a talon aiguille avec bride a la cheville ornee de strass scintillants. Noeud en cristaux et bout pointu pour un glamour absolu.",
    image: "images/talon6.jpg",
    badge: "Best-seller",
    couleur: "bordeaux",
    couleurHex: "#722F37",
    tailles: ["36", "37", "38", "39", "40", "41"]
  },

  // ========== ACCESSOIRES — Boucles d'Oreilles ==========
  {
    id: 46,
    nom: "Boucles Cristal",
    categorie: "Accessoires",
    sousCategorie: "Boucles d'Oreilles",
    prix: 2400,
    description: "Boucles d'oreilles pendantes ornées de cristaux scintillants, légères et élégantes.",
    image: "images/boucle1.jpg",
    badge: "Coup de cœur",
    couleur: "Blanc",
    couleurHex: "#E8E8F0",
    tailles: ["Taille unique"]
  },
  {
    id: 47,
    nom: "Boucles Perles Dorées",
    categorie: "Accessoires",
    sousCategorie: "Boucles d'Oreilles",
    prix: 1900,
    description: "Boucles clips dorées avec perles nacrées suspendues, look chic et intemporel.",
    image: "images/boucle2.jpg",
    badge: "Nouveauté",
    couleur: "orange",
    couleurHex: "#ea7426",
    tailles: ["Taille unique"]
  },
  {
    id: 48,
    nom: "Boucles Goutte Rubis",
    categorie: "Accessoires",
    sousCategorie: "Boucles d'Oreilles",
    prix: 2100,
    description: "Boucles pendantes en forme de goutte avec pierre rose  profond, finition dorée.",
    image: "images/boucle3.jpg",
    badge: null,
    couleur: "rouge",
    couleurHex: "#c74258",
    tailles: ["Taille unique"]
  },

  // ========== ACCESSOIRES — Chaînes & Colliers ==========
  {
    id: 49,
    nom: "Collier Perles & Or",
    categorie: "Accessoires",
    sousCategorie: "Chaînes & Colliers",
    prix: 3200,
    description: "Collier ras-de-cou en perles nacrées intercalées de maillons dorés, fermeture mousqueton.",
    image: "images/collier1.jpg",
    badge: "Nouveauté",
    couleur: "blanc",
    couleurHex: "#FAFAFA",
    tailles: ["Taille unique"]
  },
  {
    id: 50,
    nom: "Chaîne Dorée Élégance",
    categorie: "Accessoires",
    sousCategorie: "Chaînes & Colliers",
    prix: 2800,
    description: "Chaîne fine en plaqué or avec pendentif goutte de cristal, longueur ajustable.",
    image: "images/collier2.jpg",
    badge: "Tendance",
    couleur: "or",
    couleurHex: "#D4AF37",
    tailles: ["Taille unique"]
  },
  {
    id: 51,
    nom: "Chaîne Doree Brillant",
    categorie: "Accessoires",
    sousCategorie: "Chaînes & Colliers",
    prix: 2500,
    description: "Chaîne maille forçat en argent rhodié, sobre et élégante pour toutes occasions.",
    image: "images/collier3.jpg",
    badge: null,
    couleur: "argent",
    couleurHex: "#C0C0C0",
    tailles: ["Taille unique"]
  },

  // ========== ACCESSOIRES — Autres ==========
  {
    id: 52,
    nom: "Sac Pochette Blanc",
    categorie: "Accessoires",
    sousCategorie: "Sacs & Pochettes",
    prix: 4500,
    description: "Pochette de soirée en métal blanc texturé, fermeture magnétique et chaîne amovible.",
    image: "images/sac1.jpg",
    badge: "Tendance",
    couleur: "or",
    couleurHex: "#C0C0C0",
    tailles: ["Taille unique"]
  },
  {
    id: 53,
    nom: "Ceinture Satin Marron",
    categorie: "Accessoires",
    sousCategorie: "Ceintures",
    prix: 1800,
    description: "Ceinture large Marron , parfaite pour sublimer une robe ou un pantalon.",
    image: "images/ceinture2.jpg",
    badge: null,
    couleur: "rose",
    couleurHex: "#462f34",
    tailles: ["S/M", "L/XL"]
  },
  {
    id: 54,
    nom: "Voile Parfaite",
    categorie: "Accessoires",
    sousCategorie: "Voiles & Coiffes",
    prix: 1500,
    description: "Voile cathédrale en tulle ivoire brodé, longueur 3 mètres.",
    image: "images/voile1.jpg",
    badge: "Collection 2025",
    couleur: "ivoire",
    couleurHex: "#FFFFF0",
    tailles: ["Taille unique"]
  }

];

// Panier stocké en localStorage
function getPanier() {
  return JSON.parse(localStorage.getItem('da_couture_panier') || '[]');
}
function savePanier(panier) {
  localStorage.setItem('da_couture_panier', JSON.stringify(panier));
}
function ajouterAuPanier(id) {
  const panier = getPanier();
  const idx = panier.findIndex(item => item.id === id);
  if (idx >= 0) {
    panier[idx].qte += 1;
  } else {
    panier.push({ id, qte: 1 });
  }
  savePanier(panier);
  updateCartCount();
  showToast('Ajouté au panier ! 🛍️');
}
function updateCartCount() {
  const panier = getPanier();
  const total = panier.reduce((s, i) => s + i.qte, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function formatPrix(n) {
  return n.toLocaleString('fr-DZ') + ' DA';
}

// Générer une carte produit HTML avec photo
function buildProductCard(p) {
  const imgBase = window.location.pathname.includes('/content/') ? '../' : '';
  const imgSrc = p.image ? imgBase + p.image : '';
  const detailUrl = (window.location.pathname.includes('/content/') ? '' : 'content/') + 'detail-produit.html?id=' + p.id;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img" style="cursor:pointer" onclick="window.location.href='${detailUrl}'">
        <img src="${imgSrc}" alt="${p.nom}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="img-fallback">
          <div class="bg-grad"></div>
          <span class="emoji-icon">${p.emoji || '✨'}</span>
        </div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation();toggleWishlist(this)" title="Ajouter aux favoris">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-body">
        <p class="product-cat">${p.sousCategorie ? p.sousCategorie : p.categorie}</p>
        <h3 class="product-name" style="cursor:pointer" onclick="window.location.href='${detailUrl}'">${p.nom}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrix(p.prix)}</span>
          <button class="product-add" onclick="ajouterAuPanier(${p.id})">
            <i class="fas fa-plus"></i> Ajouter
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.classList.toggle('far');
  icon.classList.toggle('fas');
}
