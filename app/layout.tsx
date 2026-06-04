import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Kuntur Travel | Viajes locales por Perú",
  description:
    "Viajes locales por Perú con rutas personalizadas, paquetes flexibles y asesoría para elegir mejor cada destino.",
  openGraph: {
    title: "Kuntur Travel",
    description: "Rutas locales por Perú, diseñadas a la medida de tu tiempo, presupuesto y estilo de viaje.",
    images: [
      "https://images.pexels.com/photos/3521062/pexels-photo-3521062.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
