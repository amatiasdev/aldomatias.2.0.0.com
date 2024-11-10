"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon, Bars4Icon, XMarkIcon } from '@heroicons/react/16/solid';


export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onViewCVClick = () => {
    window.open("/aldo matias cv.pdf", "_blank");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-md z-10 bg-background text-foreground dark:bg-darkBackground dark:text-darkForeground">
      <Link href="/">
        <Image src="/main-icon.png" alt="Logo" className="ml-4 w-12 h-12 z-20" width={200} height={200} />
      </Link>
      
      <div className="flex items-center space-x-4 md:hidden">
        {/* Icono de tema */}
        <button onClick={toggleTheme} className="flex items-center">
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-yellow-500" />
          )}
        </button>
        
        {/* Icono de menú hamburguesa */}
        <button onClick={toggleMenu} className="focus:outline-none z-20">
          {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars4Icon className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Menú de navegación para pantallas grandes */}
      <nav className="hidden md:flex items-center space-x-6">
        <button onClick={toggleTheme} className="flex items-center cursor-pointer">
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-yellow-500" />
          )}
        </button>
        <Link href="/experience">Employment History</Link>
        <Link href="/contact">Contact</Link>
        <button onClick={onViewCVClick}>View CV</button>
      </nav>

      {/* Menú desplegable para dispositivos móviles */}
      {isMenuOpen && (
        <nav className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-background dark:bg-darkBackground text-foreground dark:text-darkForeground md:hidden space-y-4">
          <Image src="/main-icon.png" alt="Logo" className="w-16 h-16 mb-4" width={200} height={200} />
          <Link href="/experience" className="py-2 w-full text-center text-xl font-semibold" onClick={toggleMenu}>Employment History</Link>
          <Link href="/contact" className="py-2 w-full text-center text-xl font-semibold" onClick={toggleMenu}>Contact</Link>
          <button className="py-2 w-full text-center text-xl font-semibold" onClick={onViewCVClick}>View CV</button>
      </nav>
      )}
    </header>
  );
}