/**
 * Loads an image URL/data URL into an HTML Image object.
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Resizes an image to specified dimensions (width, height) and applies filters.
 * Returns a data URL of the processed image.
 */
export async function processImage(imageSrc, options = {}) {
  const {
    width,
    height,
    isGrayscale = false,
    brightness = 0, // range -100 to 100
    contrast = 0,    // range -100 to 100
    isScannedSim = false, // Document scanner simulation
    quality = 0.85
  } = options;

  const img = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set sizing
  canvas.width = width || img.width;
  canvas.height = height || img.height;

  // Draw image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Apply pixel adjustments
  if (isGrayscale || isScannedSim || brightness !== 0 || contrast !== 0) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const bVal = brightness * 2.55; // convert -100..100 to -255..255
    const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // 1. Apply Brightness
      if (brightness !== 0) {
        r += bVal;
        g += bVal;
        b += bVal;
      }

      // 2. Apply Contrast
      if (contrast !== 0) {
        r = cFactor * (r - 128) + 128;
        g = cFactor * (g - 128) + 128;
        b = cFactor * (b - 128) + 128;
      }

      // 3. Grayscale or Scanner simulation
      if (isScannedSim) {
        // High contrast thresholding (removes background grey shadows, makes ink darker)
        const intensity = 0.299 * r + 0.587 * g + 0.114 * b;
        let finalVal = 255;
        if (intensity < 140) {
          finalVal = intensity * 0.4; // Darken dark parts (sharper ink text)
        }
        r = g = b = finalVal;
      } else if (isGrayscale) {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = g = b = gray;
      }

      // Re-clamp values and save back
      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }

    ctx.putImageData(imgData, 0, 0);
  }

  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Image presets for official government form specifications.
 */
export const IMAGE_PRESETS = {
  passport: {
    name: "Passport Size (3.5 x 4.5 cm)",
    width: 413,   // 3.5cm at 300 DPI
    height: 531   // 4.5cm at 300 DPI
  },
  stamp: {
    name: "Stamp Size (2.0 x 2.5 cm)",
    width: 236,
    height: 295
  },
  signature: {
    name: "Signature Sizing (e.g. JEE/NEET standard)",
    width: 400,
    height: 150
  }
};
