import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import { themeScript } from "@/lib/theme-script";
import { CVModalProvider } from "@/contexts/CVModalContext";
import CVModal from "./components/organisms/CVModal";
import JsonLd from "./components/seo/JsonLd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aldomatias.com'),
  title: {
    default: 'Aldo Matias | Full-Stack Developer - Available Worldwide',
    template: '%s | Aldo Matias'
  },
  description: 'Middle Full-Stack Developer with 4+ years experience in React, Node.js, TypeScript & AWS. Open to global opportunities. Previously at BBVA Bank. Fluent in English. Available for remote (USA timezone) and on-site roles (Europe).',
  keywords: [
    // Core Skills
    'Full-Stack Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'AWS Cloud Engineer',
    'JavaScript Engineer',
    'Next.js Developer',
    'MongoDB Developer',
    'Docker DevOps',
    'Cloud Infrastructure Engineer',
    // International/Remote
    'Remote Developer LATAM',
    'Nearshore Developer',
    'International Software Engineer',
    'Developer open to relocation',
    'Software Engineer visa sponsorship',
    // Geographic targeting
    'Developer willing to relocate USA',
    'Developer relocation Europe',
    'H1B visa developer',
    'Blue Card developer',
    'Developer relocation Germany',
    'Developer relocation Netherlands',
    // Availability
    'Web Developer for hire',
    'Middle Developer available',
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
    locale: 'en_US',
    url: 'https://aldomatias.com',
    siteName: 'Aldo Matias Portfolio',
    title: 'Aldo Matias | Full-Stack Developer - Available Worldwide',
    description: 'Middle Full-Stack Developer with 4+ years in React, Node.js, TypeScript & AWS. Open to global opportunities. Remote (USA) & On-site (Europe).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aldo Matias - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aldo Matias | Full-Stack Developer',
    description: 'React, Node.js, TypeScript & AWS. Open to global opportunities.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Aldo Matias" />
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen transition-colors duration-200`}
      >
        <Providers>
          <CVModalProvider>
            <Header/>
            <main className="flex-grow">{children}</main>
            <Footer />
            <CVModal />
          </CVModalProvider>
        </Providers>
      </body>
    </html>
  );
}
