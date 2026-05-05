import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Hermes | Sites prontos para vender",
    template: "%s | Hermes",
  },
  description:
    "Templates premium, landing pages e sites sob medida para marcas que precisam vender com clareza, velocidade e acabamento visual.",
  keywords: [
    "sites premium",
    "templates premium",
    "landing page",
    "desenvolvimento de sites",
    "site para negócios",
    "sites de alta conversão",
  ],
  openGraph: {
    title: "Hermes | Sites prontos para vender",
    description:
      "Templates premium e sites sob medida para negócios que querem uma presença digital profissional no ar com rapidez.",
    locale: "pt_BR",
    type: "website",
    siteName: "Hermes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
