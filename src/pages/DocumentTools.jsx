import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../utils/translations';
import { imagesToPdf, mergePDFs, splitPDF, embedSignatureOnPdf, downloadPdfBytes } from '../utils/pdfService';
import { processImage, IMAGE_PRESETS } from '../utils/imageService';
import { 
  FileText, 
  Image as ImageIcon, 
  Edit, 
  PenTool, 
  Grid, 
  Upload, 
  Download, 
  Trash2, 
  RefreshCw,
  Sliders,
  CheckCircle,
  FileCode,
  Sparkles
} from 'lucide-react';

export default function DocumentTools({ currentLang }) {
  const t = translations[currentLang] || translations.en;
  
  const [activeTab, setActiveTab] = useState('converter');

  const tabs = [
    { id: 'converter', label: "Image to PDF", icon: ImageIcon },
    { id: 'resizer', label: "Image Editor", icon: Sliders },
    { id: 'signature', label: "Digital Signature", icon: PenTool },
    { id: 'pdf-toolkit', label: "PDF Merger/Split", icon: FileText }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <PenTool className="w-6 sm:w-8 h-6 sm:h-8 text-primary-blue" />
          <span>{t.navTools}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Sleek document helper workspace. All processes run 100% locally in your browser — your documents never leave your device.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar scroll-smooth space-x-1 sm:space-x-2 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-t-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition whitespace-nowrap focus:outline-none ${
                isActive
                  ? 'border-primary-blue text-primary-blue bg-blue-50/20'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace Wrapper */}
      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
        {activeTab === 'converter' && <ImageToPdfTab />}
        {activeTab === 'resizer' && <ImageResizerTab />}
        {activeTab === 'signature' && <DigitalSignatureTab />}
        {activeTab === 'pdf-toolkit' && <PdfToolkitTab />}
      </div>

    </div>
  );
}

// ----------------------------------------------------
// TAB 1: IMAGE TO PDF CONVERTER
// ----------------------------------------------------
function ImageToPdfTab() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, { name: file.name, dataUrl: event.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompilePdf = async () => {
    if (uploadedImages.length === 0) return;
    setIsProcessing(true);
    try {
      const urls = uploadedImages.map(img => img.dataUrl);
      const pdfBytes = await imagesToPdf(urls);
      downloadPdfBytes(pdfBytes, 'JanSahayak_Compiled.pdf');
    } catch (e) {
      console.error(e);
      alert("Failed to convert images to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
        Image to PDF Document Compiler
      </h3>
      <p className="text-xs text-slate-400 font-medium">
        Select or drag-and-drop multiple image uploads (JPG, PNG, WEBP). We will compile them in order into a single multi-page PDF.
      </p>

      {/* Upload Zone */}
      <label className="border-2 border-dashed border-slate-200 hover:border-primary-blue bg-slate-50 hover:bg-blue-50/10 p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-inner">
        <Upload className="w-10 h-10 text-slate-400 mb-3 animate-bounce" />
        <span className="block text-xs sm:text-sm font-extrabold text-slate-700">
          Upload Image Files
        </span>
        <span className="block text-[10px] text-slate-400 font-medium mt-1">
          Supports PNG, JPEG, WEBP files
        </span>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden" 
        />
      </label>

      {/* Image Previews */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider pl-0.5">
            Images queue ({uploadedImages.length} items):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="relative bg-slate-50 p-2.5 rounded-2xl border border-slate-100 group shadow-sm">
                <img 
                  src={img.dataUrl} 
                  alt="upload preview" 
                  className="w-full h-24 object-cover rounded-xl shadow-inner" 
                />
                
                {/* Order Index */}
                <span className="absolute top-4 left-4 w-5 h-5 bg-slate-900/80 text-white flex items-center justify-center font-bold text-[10px] rounded-full">
                  {idx + 1}
                </span>

                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-4 right-4 p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-full border border-red-100 hover:scale-105 transition"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleCompilePdf}
            disabled={isProcessing}
            className="w-full sm:w-auto py-3 px-6 bg-primary-blue text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:scale-100 transition flex items-center justify-center space-x-2"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Compile into PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// TAB 2: IMAGE RESIZER / PASSPORT EDITOR
// ----------------------------------------------------
function ImageResizerTab() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  
  // Resizing options
  const [preset, setPreset] = useState('passport');
  const [width, setWidth] = useState(413);
  const [height, setHeight] = useState(531);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [quality, setQuality] = useState(0.85);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset sync
  useEffect(() => {
    if (preset !== 'custom') {
      const config = IMAGE_PRESETS[preset];
      if (config) {
        setWidth(config.width);
        setHeight(config.height);
      }
    }
  }, [preset]);

  // Run processing filters
  const applyFilters = async () => {
    if (!selectedImage) return;
    try {
      const url = await processImage(selectedImage, {
        width,
        height,
        brightness,
        contrast,
        isGrayscale,
        isScannedSim: isScanned,
        quality
      });
      setProcessedUrl(url);
    } catch (e) {
      console.error(e);
      alert("Failed to process image.");
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedImage, width, height, brightness, contrast, isGrayscale, isScanned, quality]);

  return (
    <div className="space-y-6">
      <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
        Passport Photo & Signature Resizer (with Document Enhancer)
      </h3>
      <p className="text-xs text-slate-400 font-medium">
        Upload standard photos requiring strict resizing parameters (like Class 10 Markshes, passport pictures, stamp sizes). Run B&W grayscaling or auto shadow-removal filters.
      </p>

      {!selectedImage ? (
        <label className="border-2 border-dashed border-slate-200 hover:border-primary-blue bg-slate-50 hover:bg-blue-50/10 p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-inner">
          <Upload className="w-10 h-10 text-slate-400 mb-3 animate-bounce" />
          <span className="block text-xs sm:text-sm font-extrabold text-slate-700">
            Upload Image to Edit
          </span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            className="hidden" 
          />
        </label>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Controllers Column (2/5) */}
          <div className="md:col-span-2 space-y-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Editing Controls
              </span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-red-500 hover:underline font-bold"
              >
                Clear Photo
              </button>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Select Resizer Preset:
              </label>
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="passport">Passport Sizing (3.5 x 4.5 cm)</option>
                <option value="stamp">Stamp Sizing (2.0 x 2.5 cm)</option>
                <option value="signature">Signature Crop (NTA Standard)</option>
                <option value="custom">Custom Size Dimensions</option>
              </select>
            </div>

            {/* Custom dimensions */}
            {preset === 'custom' && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">WIDTH (PX):</label>
                  <input 
                    type="number" 
                    value={width} 
                    onChange={(e) => setWidth(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">HEIGHT (PX):</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-slate-700 font-bold"
                  />
                </div>
              </div>
            )}

            {/* Brightness */}
            <div>
              <div className="flex justify-between font-bold text-slate-400 uppercase text-[9px] mb-1">
                <span>Brightness</span>
                <span className="text-slate-700">{brightness}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
              />
            </div>

            {/* Contrast */}
            <div>
              <div className="flex justify-between font-bold text-slate-400 uppercase text-[9px] mb-1">
                <span>Contrast</span>
                <span className="text-slate-700">{contrast}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
              />
            </div>

            {/* Filters Checkbox */}
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <label className="flex items-center space-x-2 text-slate-600 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGrayscale}
                  onChange={(e) => {
                    setIsGrayscale(e.target.checked);
                    if (e.target.checked) setIsScanned(false);
                  }}
                  className="rounded text-primary-blue focus:ring-primary-blue border-slate-300"
                />
                <span>Convert to Black & White</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-600 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScanned}
                  onChange={(e) => {
                    setIsScanned(e.target.checked);
                    if (e.target.checked) setIsGrayscale(false);
                  }}
                  className="rounded text-primary-blue focus:ring-primary-blue border-slate-300"
                />
                <span className="text-primary-blue flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Document Scanner Enhance</span>
                </span>
              </label>
            </div>

            {/* Quality Compression */}
            <div className="border-t border-slate-200 pt-3">
              <div className="flex justify-between font-bold text-slate-400 uppercase text-[9px] mb-1">
                <span>Compression quality (File size reduction)</span>
                <span className="text-slate-700">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
              />
            </div>

          </div>

          {/* Canvas Display previews (3/5) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100 min-h-[20rem] space-y-4">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Processed Output Preview
            </span>
            {processedUrl ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100 max-w-full">
                  <img 
                    src={processedUrl} 
                    alt="processed preview" 
                    className="max-h-72 max-w-full object-contain rounded-xl"
                  />
                </div>

                <a
                  href={processedUrl}
                  download="JanSahayak_Resized.jpg"
                  className="py-2.5 px-6 bg-primary-blue hover:brightness-105 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-blue-500/10"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Edited Image</span>
                </a>
              </div>
            ) : (
              <div className="text-xs text-slate-400 animate-pulse">
                Applying filters...
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// TAB 3: DIGITAL SIGNATURE PAD & PDF SIGNING
// ----------------------------------------------------
function DigitalSignatureTab() {
  const [sigType, setSigType] = useState('draw');
  
  // Signature data state
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [typedName, setTypedName] = useState('');
  const [typedFont, setTypedFont] = useState('cursive');

  // PDF Signing state
  const [pdfFileBytes, setPdfFileBytes] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [signedPdfUrl, setSignedPdfUrl] = useState(null);
  const [isSigning, setIsSigning] = useState(false);

  // Position coordinates
  const [coordX, setCoordX] = useState(100);
  const [coordY, setCoordY] = useState(100);
  const [sigWidth, setSigWidth] = useState(150);
  const [sigHeight, setSigHeight] = useState(60);
  const [pageIndex, setPageIndex] = useState(0);

  // HTML5 Drawing Canvas references
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Reset drawing canvas context
  const handleClearDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureUrl(null);
    }
  };

  const handleStartDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a'; // Deep Navy Blue ink

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleDrawMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignatureUrl(canvas.toDataURL());
    }
  };

  // Compile typed signature
  const compileTypedSignature = () => {
    if (!typedName.trim()) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set text styles
    ctx.fillStyle = '#1e3a8a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (typedFont === 'cursive') {
      ctx.font = "italic bold 36px 'Brush Script MT', cursive, sans-serif";
    } else if (typedFont === 'serif') {
      ctx.font = "italic 32px Georgia, serif";
    } else {
      ctx.font = "bold 28px 'Outfit', sans-serif";
    }

    ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
    setSignatureUrl(canvas.toDataURL());
  };

  // Trigger text compiles
  useEffect(() => {
    if (sigType === 'type') {
      compileTypedSignature();
    }
  }, [typedName, typedFont, sigType]);

  // PDF File Upload Handler
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPdfFileBytes(event.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Stamp Signature PDF
  const handleStampPdf = async () => {
    if (!pdfFileBytes || !signatureUrl) return;
    setIsSigning(true);
    try {
      const signedBytes = await embedSignatureOnPdf(
        pdfFileBytes,
        signatureUrl,
        coordX,
        coordY,
        sigWidth,
        sigHeight,
        pageIndex
      );
      
      const blob = new Blob([signedBytes], { type: 'application/pdf' });
      setSignedPdfUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      alert("Failed to stamp digital signature onto PDF.");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 2 Column Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Signature Generator */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
            1. Generate Digital Signature
          </h3>
          
          {/* Sigs Options */}
          <div className="flex border border-slate-100 p-1 bg-slate-50 rounded-xl max-w-xs text-xs font-bold shadow-inner">
            <button
              onClick={() => { setSigType('draw'); handleClearDrawing(); }}
              className={`flex-grow py-2 px-3 rounded-lg transition ${sigType === 'draw' ? 'bg-white text-slate-800 shadow' : 'text-slate-400'}`}
            >
              Draw Freehand
            </button>
            <button
              onClick={() => { setSigType('type'); setSignatureUrl(null); }}
              className={`flex-grow py-2 px-3 rounded-lg transition ${sigType === 'type' ? 'bg-white text-slate-800 shadow' : 'text-slate-400'}`}
            >
              Type Signature
            </button>
          </div>

          {sigType === 'draw' ? (
            /* Freehand canvas */
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl shadow-inner p-1 max-w-md">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={150}
                  onMouseDown={handleStartDrawing}
                  onMouseMove={handleDrawMove}
                  onMouseUp={handleStopDrawing}
                  onMouseLeave={handleStopDrawing}
                  onTouchStart={handleStartDrawing}
                  onTouchMove={handleDrawMove}
                  onTouchEnd={handleStopDrawing}
                  className="w-full h-36 bg-white rounded-xl cursor-crosshair touch-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearDrawing}
                  className="py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold shadow-sm transition"
                >
                  Clear Drawing
                </button>
                {signatureUrl && (
                  <a
                    href={signatureUrl}
                    download="JanSahayak_Signature.png"
                    className="py-2 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download transparent PNG</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            /* Type tool inputs */
            <div className="space-y-4 max-w-md animate-fade-in">
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Type your legal full name..."
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-slate-800 text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />

              <div className="grid grid-cols-3 gap-2">
                {['cursive', 'serif', 'sans'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypedFont(f)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition ${
                      typedFont === f 
                        ? 'bg-blue-50 border-primary-blue text-primary-blue shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {f} Style
                  </button>
                ))}
              </div>

              {signatureUrl && (
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl max-w-full flex items-center justify-center shadow-inner">
                  <img src={signatureUrl} alt="type signature" className="h-16 object-contain" />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: PDF Embedder */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
            2. Stamp Signature onto PDF Document
          </h3>

          {!pdfFileBytes ? (
            <label className="border-2 border-dashed border-slate-200 hover:border-primary-blue bg-slate-50 hover:bg-blue-50/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-inner">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="block text-xs font-bold text-slate-700">
                Upload Target PDF
              </span>
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={handlePdfUpload} 
                className="hidden" 
              />
            </label>
          ) : (
            <div className="space-y-4 animate-fade-in bg-slate-50/60 p-4.5 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-500 max-w-[12rem] truncate">
                  📄 {pdfFileName}
                </span>
                <button 
                  onClick={() => { setPdfFileBytes(null); setSignedPdfUrl(null); }}
                  className="text-red-500 hover:underline font-bold"
                >
                  Change File
                </button>
              </div>

              {/* Placements Matrix Coordinates */}
              <div className="grid grid-cols-2 gap-3 font-semibold text-slate-600">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">PLACEMENT X (COORD):</label>
                  <input 
                    type="number" 
                    value={coordX} 
                    onChange={(e) => setCoordX(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">PLACEMENT Y (COORD):</label>
                  <input 
                    type="number" 
                    value={coordY} 
                    onChange={(e) => setCoordY(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">WIDTH (PX):</label>
                  <input 
                    type="number" 
                    value={sigWidth} 
                    onChange={(e) => setSigWidth(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">HEIGHT (PX):</label>
                  <input 
                    type="number" 
                    value={sigHeight} 
                    onChange={(e) => setSigHeight(Number(e.target.value))} 
                    className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStampPdf}
                  disabled={!signatureUrl || isSigning}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:brightness-105 text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 disabled:opacity-40"
                >
                  {isSigning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
                  <span>Stamp Signature into PDF</span>
                </button>
              </div>

              {/* Download signed document */}
              {signedPdfUrl && (
                <div className="pt-3 border-t border-slate-200 animate-fade-in flex items-center justify-center">
                  <a
                    href={signedPdfUrl}
                    download={`Signed_${pdfFileName}`}
                    className="w-full py-3 bg-primary-blue text-white rounded-xl font-extrabold text-center shadow-lg shadow-blue-500/20 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-4.5 h-4.5" />
                    <span>Download Signed PDF</span>
                  </a>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------
// TAB 4: PDF MERGER AND PAGE SPLITTER
// ----------------------------------------------------
function PdfToolkitTab() {
  const [mergeFiles, setMergeFiles] = useState([]);
  const [splitFileBytes, setSplitFileBytes] = useState(null);
  const [splitFileName, setSplitFileName] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState([]);

  // Merge upload
  const handleMergeUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMergeFiles(prev => [...prev, { name: file.name, bytes: event.target.result }]);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleRemoveMergeFile = (idx) => {
    setMergeFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRunMerge = async () => {
    if (mergeFiles.length < 2) return;
    setIsProcessing(true);
    try {
      const filesBytes = mergeFiles.map(f => f.bytes);
      const compiledBytes = await mergePDFs(filesBytes);
      downloadPdfBytes(compiledBytes, 'JanSahayak_Merged.pdf');
    } catch (e) {
      console.error(e);
      alert("Failed to merge PDFs.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Split upload
  const handleSplitUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSplitFileName(file.name);
      setSplitResults([]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSplitFileBytes(event.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleRunSplit = async () => {
    if (!splitFileBytes) return;
    setIsProcessing(true);
    try {
      const pages = await splitPDF(splitFileBytes);
      setSplitResults(pages);
    } catch (e) {
      console.error(e);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPage = (pageBytes, pageNum) => {
    downloadPdfBytes(pageBytes, `${splitFileName.replace('.pdf', '')}_Page_${pageNum}.pdf`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
      
      {/* Left: PDF Merger */}
      <div className="space-y-6 pb-6 md:pb-0">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
            A. PDF Merger Utility
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Combine multiple PDF files in order to compose a unified single PDF file. Perfect for attachments!
          </p>
        </div>

        <label className="border-2 border-dashed border-slate-200 hover:border-primary-blue bg-slate-50 hover:bg-blue-50/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-inner">
          <Upload className="w-8 h-8 text-slate-400 mb-2" />
          <span className="block text-xs font-bold text-slate-700">
            Upload PDFs to Merge
          </span>
          <input 
            type="file" 
            multiple 
            accept="application/pdf" 
            onChange={handleMergeUpload} 
            className="hidden" 
          />
        </label>

        {mergeFiles.length > 0 && (
          <div className="space-y-4 animate-fade-in text-xs">
            <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px]">
              Files in queue:
            </span>
            <div className="space-y-2">
              {mergeFiles.map((file, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl shadow-sm">
                  <span className="font-bold text-slate-700 truncate max-w-[12rem]">
                    {idx + 1}. {file.name}
                  </span>
                  <button
                    onClick={() => handleRemoveMergeFile(idx)}
                    className="text-red-500 hover:scale-105 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleRunMerge}
              disabled={mergeFiles.length < 2 || isProcessing}
              className="w-full py-3 bg-primary-blue hover:brightness-105 text-white font-extrabold rounded-xl shadow-md transition disabled:opacity-40 flex items-center justify-center space-x-1.5"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>Merge and Download</span>
            </button>
          </div>
        )}
      </div>

      {/* Right: PDF Splitter */}
      <div className="space-y-6 pt-6 md:pt-0 md:pl-8">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
            B. PDF Page Splitter Utility
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Extract pages from a loaded multi-page PDF document to save them as separate standalone PDF files.
          </p>
        </div>

        {!splitFileBytes ? (
          <label className="border-2 border-dashed border-slate-200 hover:border-primary-blue bg-slate-50 hover:bg-blue-50/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-inner">
            <Upload className="w-8 h-8 text-slate-400 mb-2" />
            <span className="block text-xs font-bold text-slate-700">
              Upload PDF to Split
            </span>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleSplitUpload} 
              className="hidden" 
            />
          </label>
        ) : (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <span className="font-bold text-slate-700 truncate max-w-[12rem]">
                📄 {splitFileName}
              </span>
              <button
                onClick={() => { setSplitFileBytes(null); setSplitResults([]); }}
                className="text-red-500 hover:underline font-bold text-[10px]"
              >
                Change File
              </button>
            </div>

            <button
              onClick={handleRunSplit}
              disabled={isProcessing}
              className="w-full py-3 bg-slate-900 text-white font-extrabold rounded-xl shadow-md transition disabled:opacity-40 flex items-center justify-center space-x-1.5"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
              <span>Perform Splitting</span>
            </button>

            {/* Split Page Results Grid */}
            {splitResults.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-100 animate-fade-in">
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px]">
                  Extracted standalones ({splitResults.length} pages):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {splitResults.map((page) => (
                    <button
                      key={page.pageNumber}
                      onClick={() => handleDownloadPage(page.bytes, page.pageNumber)}
                      className="p-3 bg-white border border-slate-200/80 hover:border-primary-blue rounded-xl font-bold text-slate-700 hover:text-primary-blue shadow-sm hover:shadow transition flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
                    >
                      <FileCode className="w-4 h-4" />
                      <span className="text-[10px]">Page {page.pageNumber}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
