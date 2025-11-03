"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface ImageGalleryModalProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageGalleryModal({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNavigate,
}: ImageGalleryModalProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      } else if (e.key === "ArrowRight") {
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Helper functions must be defined before useSwipeable
  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  // Swipe gestures for mobile - must be called before conditional return
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  // Prevent SSR issues - only render portal on client
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm pointer-events-auto min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-3 md:p-2 text-white hover:text-accent-500 transition-colors touch-manipulation"
            aria-label="Close gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 z-50 px-3 py-1.5 md:px-4 md:py-2 bg-black/70 rounded-sm text-white">
            <span className="font-mono text-sm md:text-base">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Main Content Container */}
          <div
            className="relative w-full h-full max-h-screen flex flex-col items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <motion.div
              {...swipeHandlers}
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[58vh] md:h-[65vh]"
            >
              <Image
                src={images[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </motion.div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-4 md:p-3 bg-black/70 hover:bg-accent-500/80 text-white rounded-full transition-colors touch-manipulation"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-4 md:p-3 bg-black/70 hover:bg-accent-500/80 text-white rounded-full transition-colors touch-manipulation"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="relative w-full max-w-5xl">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 justify-start md:justify-center py-2 px-2 md:px-0">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate(index)}
                        className={`relative flex-shrink-0 w-24 h-20 md:w-20 md:h-16 rounded-sm overflow-hidden transition-all touch-manipulation ${
                          index === currentIndex
                            ? "ring-2 ring-accent-500 opacity-100"
                            : "ring-1 ring-gray-600 opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 96px, 80px"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gradiente izquierdo - solo mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent pointer-events-none md:hidden" />

                {/* Gradiente derecho - solo mobile */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent pointer-events-none md:hidden" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
