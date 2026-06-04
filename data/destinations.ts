import { Camera, Compass, Mountain, Palmtree, Sparkles, Sun, Utensils, Waves } from "lucide-react";

export type Destination = {
  name: string;
  category: string;
  duration: string;
  budget: string;
  adventure: string;
  image: string;
  icon: typeof Compass;
  accent: string;
};

export const destinations: Destination[] = [
  {
    name: "Cusco Místico",
    category: "Ruinas andinas",
    duration: "4 días sugeridos",
    budget: "Desde S/ 890",
    adventure: "Media",
    image:
      "https://images.pexels.com/photos/3521062/pexels-photo-3521062.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Sparkles,
    accent: "#D8A85B"
  },
  {
    name: "Huaraz Aventura",
    category: "Montañas y lagunas",
    duration: "3 a 5 días",
    budget: "Desde S/ 620",
    adventure: "Alta",
    image:
      "https://images.pexels.com/photos/35923673/pexels-photo-35923673.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Mountain,
    accent: "#3F6B4F"
  },
  {
    name: "Paracas Sunset",
    category: "Costa y reserva",
    duration: "2 días",
    budget: "Desde S/ 420",
    adventure: "Baja",
    image:
      "https://images.pexels.com/photos/16820322/pexels-photo-16820322.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Waves,
    accent: "#B65A3C"
  },
  {
    name: "Huacachina Desert Escape",
    category: "Desierto y dunas",
    duration: "Full day o 2 días",
    budget: "Desde S/ 360",
    adventure: "Media",
    image:
      "https://images.pexels.com/photos/18041997/pexels-photo-18041997.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Sun,
    accent: "#D8A85B"
  },
  {
    name: "Arequipa Colonial",
    category: "Ciudad blanca",
    duration: "3 días",
    budget: "Desde S/ 690",
    adventure: "Media",
    image:
      "https://images.pexels.com/photos/26984841/pexels-photo-26984841.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Camera,
    accent: "#B65A3C"
  },
  {
    name: "Tarapoto Jungle Mode",
    category: "Selva y cataratas",
    duration: "4 días",
    budget: "Desde S/ 740",
    adventure: "Media alta",
    image:
      "https://images.pexels.com/photos/17836360/pexels-photo-17836360.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Palmtree,
    accent: "#3F6B4F"
  },
  {
    name: "Puno Lago Sagrado",
    category: "Titicaca y comunidad",
    duration: "2 a 3 días",
    budget: "Desde S/ 540",
    adventure: "Baja",
    image:
      "https://images.pexels.com/photos/30846228/pexels-photo-30846228.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Compass,
    accent: "#0B1E2D"
  },
  {
    name: "Lima Night & Food",
    category: "Costa, bares y cocina",
    duration: "Full night",
    budget: "Desde S/ 260",
    adventure: "Baja",
    image:
      "https://images.pexels.com/photos/16925386/pexels-photo-16925386.jpeg?auto=compress&cs=tinysrgb&w=1400",
    icon: Utensils,
    accent: "#D8A85B"
  }
];
