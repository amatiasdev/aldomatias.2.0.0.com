// src/app/components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 px-4">
      <div className="container mx-auto flex flex-col items-center space-y-3 md:flex-row md:justify-between md:space-y-0">
        <p className="text-sm text-center">&copy; {new Date().getFullYear()} Aldo Matias</p>
        <div className="flex space-x-6 text-lg">
          <a
            href="https://www.linkedin.com/in/aldomatias-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/ASovvEqAIE/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500"
          >
            LeetCode
          </a>
          <a
            href="https://github.com/aldomatias"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
