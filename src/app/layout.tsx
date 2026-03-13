import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lasa Kitchens & Closets | Bespoke Millwork Studio",
  description:
    "Bespoke Millwork Studio in South Florida. Tailors of wood, specializing in kitchens, closets, and architectural millwork.",
  keywords: [
    "bespoke kitchens",
    "lasa closets",
    "custom cabinetry miami",
    "miami woodworking",
    "south florida millwork",
  ],
  openGraph: {
    title: "Lasa Kitchens & Closets | Bespoke Millwork Studio",
    description:
      "Bespoke Millwork Studio in South Florida. Tailors of wood.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} antialiased`}>
        <SmoothScrollProvider>
          <Header />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
