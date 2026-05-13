"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface PdfDownloadButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: ReactElement<any>;
  fileName: string;
  label: string;
  className?: string;
}

export function PdfDownloadButton({ document, fileName, label, className }: PdfDownloadButtonProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <PDFDownloadLink
      document={document as any}
      fileName={fileName}
      className={cn(
        "inline-flex items-center gap-2 bg-sprout-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sprout-600 transition-colors",
        className
      )}
    >
      {({ loading }: { loading: boolean }) =>
        loading ? "Generating PDF..." : (
          <>
            <Download className="w-5 h-5" />
            {label}
          </>
        )
      }
    </PDFDownloadLink>
  );
}
