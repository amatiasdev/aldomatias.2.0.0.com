import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import { themeScript } from "@/lib/theme-script";
import JsonLd from "./components/seo/JsonLd";

// Google Fonts with next/font for optimal loading
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aldomatias.com'),
  title: {
    default: 'Aldo Matias | Automatización n8n, Seguridad & AWS',
    template: '%s | Aldo Matias'
  },
  description: 'Automatizo operaciones con n8n, audito seguridad (OWASP) y configuro infraestructura AWS para empresas en Mexico y remoto. Resultados en 1–2 semanas. Ex-BBVA Bank. Propuesta en 48h.',
  keywords: [
    // Services
    'n8n automation',
    'automatización n8n',
    'security audit',
    'auditoría de seguridad',
    'AWS infrastructure',
    'infraestructura AWS',
    'OWASP audit',
    // Service-specific
    'WhatsApp automation',
    'automatización WhatsApp',
    'disaster recovery AWS',
    'VPN setup',
    'Active Directory cloud',
    'workflow automation',
    // Consulting
    'freelance automation consultant',
    'consultor automatización',
    'security consultant',
    'consultor seguridad',
    'cloud infrastructure freelancer',
    // Long-tail
    'n8n consultant',
    'consultor n8n',
    'OWASP security audit cost',
    'costo auditoría seguridad',
    'n8n WhatsApp automation',
    'automatización WhatsApp n8n',
    'AWS disaster recovery setup',
    'configuración disaster recovery',
    'freelance DevOps',
    'DevOps freelancer',
    // Location
    'automation consultant Dublin',
    'security audit LATAM',
    'AWS consultant remote',
  ],
  authors: [{ name: 'Aldo Matias', url: 'https://aldomatias.com' }],
  creator: 'Aldo Matias',
  publisher: 'Aldo Matias',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aldomatias.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: 'https://aldomatias.com',
    siteName: 'Aldo Matias | Automatización & Seguridad',
    title: 'Aldo Matias | Automatización n8n, Seguridad & AWS',
    description: 'Automatizo operaciones con n8n, audito seguridad y configuro infraestructura AWS. Resultados en 1–2 semanas. Propuesta en 48h.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aldo Matias - Automatización, Seguridad & AWS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aldo Matias | Automatización n8n, Seguridad & AWS',
    description: 'Automatizo operaciones, audito seguridad y configuro AWS. Entrega en 1–2 semanas. Propuesta gratuita en 48h.',
    images: ['/og-image.png'],
    creator: '@aldomatias',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Aldo Matias" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V3CZ6PF3Q8"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3CZ6PF3Q8');
          `}
        </Script>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Header/>
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
