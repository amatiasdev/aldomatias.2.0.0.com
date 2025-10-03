"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVModal } from '@/contexts/CVModalContext';
import Overlay from '@/app/components/atoms/Overlay';
import ModalHeader from '@/app/components/molecules/ModalHeader';
import PDFViewer from '@/app/components/molecules/PDFViewer';
import PDFControls from '@/app/components/molecules/PDFControls';

const CV_FILE_PATH = '/aldo matias cv.pdf';

const ZOOM_LEVELS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_ZOOM_INDEX = 2; // 1.0 scale

export default function CVModal() {
  const { isOpen, closeModal } = useCVModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);

  // Handler functions
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handleZoomIn = useCallback(() => {
    setZoomIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(1);
      setZoomIndex(DEFAULT_ZOOM_INDEX);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          handlePreviousPage();
          break;
        case 'ArrowRight':
          handleNextPage();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal, handlePreviousPage, handleNextPage, handleZoomIn, handleZoomOut]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = CV_FILE_PATH;
    link.download = 'Aldo_Matias_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoadSuccess = (numPages: number) => {
    setTotalPages(numPages);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay isVisible={isOpen} onClick={closeModal} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-desc"
            aria-modal="true"
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col bg-bg-primary rounded-xl shadow-2xl overflow-hidden"
          >
            <ModalHeader
              title="Aldo Matias - CV"
              onClose={closeModal}
              onDownload={handleDownload}
            />

            <p id="cv-modal-desc" className="sr-only">
              PDF preview with download option. Use arrow keys to navigate pages, +/- to zoom, and Escape to close.
            </p>

            <PDFViewer
              fileUrl={CV_FILE_PATH}
              currentPage={currentPage}
              scale={ZOOM_LEVELS[zoomIndex]}
              onLoadSuccess={handleLoadSuccess}
            />

            {totalPages > 0 && (
              <PDFControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                canZoomIn={zoomIndex < ZOOM_LEVELS.length - 1}
                canZoomOut={zoomIndex > 0}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
