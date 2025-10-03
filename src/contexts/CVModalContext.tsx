"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CVModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CVModalContext = createContext<CVModalContextType | undefined>(undefined);

export function CVModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <CVModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </CVModalContext.Provider>
  );
}

export function useCVModal() {
  const context = useContext(CVModalContext);
  if (!context) {
    throw new Error('useCVModal must be used within CVModalProvider');
  }
  return context;
}
