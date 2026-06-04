export type TravelPackage = {
  name: string;
  duration: string;
  price: string;
  includes: string[];
  idealFor: string;
  image: string;
};

export const packages: TravelPackage[] = [
  {
    name: "Full Day Escape",
    duration: "1 día",
    price: "desde S/ 190",
    includes: ["Ruta curada", "Traslado local", "Guía de fotos"],
    idealFor: "viajes rápidos desde Lima",
    image:
      "https://images.pexels.com/photos/32163606/pexels-photo-32163606.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Weekend Andes",
    duration: "2 noches",
    price: "desde S/ 520",
    includes: ["Hospedaje boutique", "Itinerario por horas", "Plan anti-clima"],
    idealFor: "parejas y escapadas",
    image:
      "https://images.pexels.com/photos/35923673/pexels-photo-35923673.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Ruta Costa & Desierto",
    duration: "3 días",
    price: "desde S/ 690",
    includes: ["Paracas", "Huacachina", "Sunset dunes"],
    idealFor: "fotos, aventura suave y amigos",
    image:
      "https://images.pexels.com/photos/18041997/pexels-photo-18041997.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Aventura Huaraz",
    duration: "4 días",
    price: "desde S/ 840",
    includes: ["Lagunas", "Trekking", "Aclimatación gradual"],
    idealFor: "viajeros activos",
    image:
      "https://images.pexels.com/photos/35923673/pexels-photo-35923673.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Experiencia Premium Cusco",
    duration: "5 días",
    price: "desde S/ 1,480",
    includes: ["Machu Picchu", "Valle Sagrado", "Concierge digital"],
    idealFor: "portafolio visual y lujo local",
    image:
      "https://images.pexels.com/photos/3521062/pexels-photo-3521062.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];
