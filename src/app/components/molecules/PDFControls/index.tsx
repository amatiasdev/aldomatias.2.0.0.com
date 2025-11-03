"use client";

import IconButton from '@/app/components/atoms/IconButton';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface PDFControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export default function PDFControls({
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut
}: PDFControlsProps) {
  return (
    <div className="flex items-center justify-center px-6 py-3 border-t border-border-subtle bg-bg-secondary gap-2">
      {/* Zoom Controls */}
      <IconButton
        icon={<ZoomOut size={20} />}
        label="Zoom out"
        onClick={onZoomOut}
        disabled={!canZoomOut}
      />
      <span className="text-sm text-fg-tertiary font-medium">
        Zoom
      </span>
      <IconButton
        icon={<ZoomIn size={20} />}
        label="Zoom in"
        onClick={onZoomIn}
        disabled={!canZoomIn}
      />
    </div>
  );
}
