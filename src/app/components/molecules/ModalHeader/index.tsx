"use client";

import IconButton from '@/app/components/atoms/IconButton';
import { X, Download } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function ModalHeader({ title, onClose, onDownload }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-primary">
      <h2
        id="cv-modal-title"
        className="text-xl font-semibold text-fg-primary"
      >
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Download size={20} />}
          label="Download CV as PDF"
          variant="secondary"
          onClick={onDownload}
        />
        <IconButton
          icon={<X size={20} />}
          label="Close modal"
          variant="ghost"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
