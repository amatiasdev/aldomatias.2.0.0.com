"use client";

import { useState } from "react";
import Image from "next/image";
import ImageGalleryModal from "../ImageGalleryModal";

interface ImageGalleryPreviewProps {
  images: string[];
  initialIndex?: number;
}

export default function ImageGalleryPreview({
  images,
  initialIndex = 0,
}: ImageGalleryPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleModalNavigate = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="w-full space-y-3">
        {/* Main Image */}
        <div
          className="relative w-full aspect-video rounded-sm overflow-hidden border border-accent-500/30 cursor-pointer group"
          onClick={handleMainImageClick}
        >
          <Image
            src={images[selectedIndex]}
            alt={`Project screenshot ${selectedIndex + 1}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/70 px-4 py-2 rounded-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                <span className="text-white text-sm font-medium">
                  Click to expand
                </span>
              </div>
            </div>
          </div>
          {/* Image Counter Badge */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-sm">
              <span className="text-white text-xs font-mono">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails Row */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-sm overflow-hidden transition-all ${
                  index === selectedIndex
                    ? "ring-2 ring-accent-500 opacity-100 scale-105"
                    : "ring-1 ring-gray-600 opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 100px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <ImageGalleryModal
        images={images}
        isOpen={isModalOpen}
        currentIndex={selectedIndex}
        onClose={() => setIsModalOpen(false)}
        onNavigate={handleModalNavigate}
      />
    </>
  );
}
