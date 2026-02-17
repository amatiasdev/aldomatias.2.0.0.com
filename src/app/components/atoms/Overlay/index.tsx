"use client";

interface OverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Overlay({ isVisible, onClick, className = '' }: OverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in ${className}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
