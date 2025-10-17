import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import { themeScript } from "@/lib/theme-script";
import { CVModalProvider } from "@/contexts/CVModalContext";
import CVModal from "./components/organisms/CVModal";

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
  title: "Aldo Matias - Software developer",
  description: "A personal portfolio showcasing the skills and experience of Aldo Matias, a software developer with expertise in web development, algorithms, and technical problem solving. Explore projects, employment history, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
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
