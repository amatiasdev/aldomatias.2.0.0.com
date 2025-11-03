"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - using CDN (matches react-pdf's pdfjs-dist version)
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  fileUrl: string;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
}

export default function PDFViewer({
  fileUrl,
  scale,
  onLoadSuccess
}: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);

  function handleDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setIsLoading(false);
    setNumPages(numPages);
    onLoadSuccess(numPages);
  }

  return (
    <div className="flex-1 bg-bg-tertiary flex items-center justify-center p-4">
      {isLoading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-fg-tertiary">Loading CV...</p>
        </div>
      )}

      <Document
        file={fileUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        loading={null}
        error={
          <div className="text-center text-red-500">
            <p className="font-semibold mb-2">Failed to load PDF</p>
            <p className="text-sm text-fg-tertiary">Please try again or contact support.</p>
          </div>
        }
        className="w-full max-w-4xl"
      >
        <div className="overflow-auto max-h-[80vh] flex flex-col gap-4 items-start scrollbar-hide">
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl rounded-lg"
            />
          ))}
        </div>
      </Document>
    </div>
  );
}
