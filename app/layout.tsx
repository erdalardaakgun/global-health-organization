import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import CookieConsent from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title:
    "Global Health Organisation - Hastaneler İçin Dijital Pazarlama Hizmetleri",
  description:
    "Hastaneler için özel dijital pazarlama çözümleri sunan Global Health Organisation ile sağlık hizmetlerinizi dijital dünyada büyütün.",
  generator: "Finex Teknoloji A.Ş.",
  applicationName: "Global Health Organisation",
  keywords: [
    "sağlık",
    "hastane",
    "dijital pazarlama",
    "sağlık hizmetleri",
    "tıbbi pazarlama",
  ],
  authors: [
    {
      name: "Global Health Organisation",
      url: "http://globalhealtorganisation.com",
    },
  ],
  creator: "Global Health Organisation",
  publisher: "Global Health Organisation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://globalhealtorganisation.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },

  // Open Graph meta etiketleri
  openGraph: {
    title: "Global Health Organisation - Hastaneler İçin Dijital Pazarlama",
    description:
      "Hastaneler için özel dijital pazarlama çözümleri sunan Global Health Organisation ile sağlık hizmetlerinizi dijital dünyada büyütün.",
    url: "http://globalhealtorganisation.com",
    siteName: "Global Health Organisation",
    images: [
      {
        url: "http://globalhealtorganisation.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Global Health Organisation Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  // Twitter Card meta etiketleri
  twitter: {
    card: "summary_large_image",
    title: "Global Health Organisation - Hastaneler İçin Dijital Pazarlama",
    description:
      "Hastaneler için özel dijital pazarlama çözümleri sunan Global Health Organisation ile sağlık hizmetlerinizi dijital dünyada büyütün.",
    creator: "@globalhealth",
    images: ["http://globalhealtorganisation.com/twitter-image.jpg"],
  },

  // Favicon ve diğer ikonlar
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
      },
    ],
  },

  // Robots meta etiketi
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Manifest dosyası
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <CookieConsent />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
