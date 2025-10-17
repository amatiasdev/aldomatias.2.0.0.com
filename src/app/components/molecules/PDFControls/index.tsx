"use client";

import IconButton from '@/app/components/atoms/IconButton';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export default function PDFControls({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut
}: PDFControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 border-t border-border-subtle bg-bg-secondary gap-3">
      {/* Page Navigation */}
      <div className="flex items-center gap-2">
        <IconButton
          icon={<ChevronLeft size={20} />}
          label="Previous page"
          onClick={onPreviousPage}
          disabled={currentPage <= 1}
        />
        <span className="text-sm text-fg-secondary min-w-[100px] text-center font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <IconButton
          icon={<ChevronRight size={20} />}
          label="Next page"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
        />
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-2">
        <IconButton
          icon={<ZoomOut size={20} />}
          label="Zoom out"
          onClick={onZoomOut}
          disabled={!canZoomOut}
        />
        <IconButton
          icon={<ZoomIn size={20} />}
          label="Zoom in"
          onClick={onZoomIn}
          disabled={!canZoomIn}
        />
      </div>
    </div>
  );
}
