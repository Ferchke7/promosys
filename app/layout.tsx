import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promsys.uz"),
  title: "PROMSYS — умное управление производством",
  description:
    "MES, WMS и APS в единой системе для заводов и фабрик Узбекистана.",
  keywords: ["MES", "WMS", "APS", "автоматизация производства", "Узбекистан"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "PROMSYS — производство под полным контролем",
    description:
      "Планирование, склад, качество и аналитика предприятия в едином цифровом контуре.",
    type: "website",
    locale: "ru_RU",
    siteName: "PROMSYS",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PROMSYS — производство под контролем" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROMSYS — производство под полным контролем",
    description: "MES, WMS и APS в единой системе для предприятий Узбекистана.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
