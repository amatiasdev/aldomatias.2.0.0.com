"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - using local file from public folder
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PDFViewerProps {
  fileUrl: string;
  currentPage: number;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
}

export default function PDFViewer({
  fileUrl,
  currentPage,
  scale,
  onLoadSuccess
}: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  function handleDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setIsLoading(false);
    onLoadSuccess(numPages);
  }

  return (
    <div className="flex-1 overflow-auto bg-bg-tertiary flex items-center justify-center p-4">
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
        className="flex justify-center"
      >
        <Page
          pageNumber={currentPage}
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="shadow-2xl rounded-lg overflow-hidden"
        />
      </Document>
    </div>
  );
}
