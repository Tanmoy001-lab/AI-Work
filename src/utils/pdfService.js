import { PDFDocument } from 'pdf-lib';

/**
 * Converts a list of image files (JPEG/PNG) into a single downloadable PDF.
 */
export async function imagesToPdf(imageUrls) {
  const pdfDoc = await PDFDocument.create();

  for (const url of imageUrls) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      
      let image;
      if (url.endsWith('.png') || url.includes('data:image/png')) {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        image = await pdfDoc.embedJpg(arrayBuffer);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    } catch (e) {
      console.error("Failed to embed image in PDF:", e);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Merges multiple PDFs (in ArrayBuffer/Uint8Array format) into a single PDF.
 */
export async function mergePDFs(pdfFiles) {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    const pdfDoc = await PDFDocument.load(file);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
}

/**
 * Splits a PDF into multiple individual pages, returning an array of PDF bytes.
 */
export async function splitPDF(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const numPages = pdfDoc.getPageCount();
  const splitFiles = [];

  for (let i = 0; i < numPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const newBytes = await newPdf.save();
    splitFiles.push({
      pageNumber: i + 1,
      bytes: newBytes
    });
  }

  return splitFiles;
}

/**
 * Embeds a PNG digital signature onto a specified page of a PDF document at coordinate placements.
 */
export async function embedSignatureOnPdf(pdfBytes, signatureDataUrl, x = 100, y = 100, width = 150, height = 60, pageIndex = 0) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  
  if (pages.length <= pageIndex) {
    throw new Error(`Page index ${pageIndex} out of bounds for PDF containing ${pages.length} pages.`);
  }

  const targetPage = pages[pageIndex];

  // Convert base64 signature DataUrl to ArrayBuffer
  const base64Data = signatureDataUrl.split(',')[1];
  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const signatureImage = await pdfDoc.embedPng(bytes.buffer);

  targetPage.drawImage(signatureImage, {
    x: parseFloat(x),
    y: parseFloat(y),
    width: parseFloat(width),
    height: parseFloat(height),
  });

  const signedPdfBytes = await pdfDoc.save();
  return signedPdfBytes;
}

/**
 * Helper to download raw PDF bytes as a file.
 */
export function downloadPdfBytes(bytes, fileName) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
