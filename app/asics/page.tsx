'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AsicsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [campaignName, setCampaignName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'image/jpeg' || file.type === 'image/jpg'
    );
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0 || !campaignName.trim()) return;
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('campaignName', campaignName);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await fetch('/api/asics-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Files uploaded successfully! We will analyze ${data.files.length} asset(s) and send you a report.`);
        setFiles([]);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('There was an error uploading your files. Please try again or contact support.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Asics branding */}
      <header className="bg-[#000066] py-6 px-6 lg:px-8 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Image 
                src="/asics-logo.png" 
                alt="ASICS Logo" 
                width={120} 
                height={40}
                className="object-contain brightness-0 invert"
              />
              <div className="hidden md:block h-8 w-px bg-white/30"></div>
              <span className="text-white text-lg font-medium hidden md:inline">
                Marketing Asset Research
              </span>
            </div>
            <Link 
              href="/" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 lg:py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#000066]">
              Asics Marketing Asset Researcher
            </h1>
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Drop the assets (jpg) that you want to analyze. We will search the internet for 
              exact matches of these assets and provide you a report of their usage.
            </p>
          </div>

          {/* Campaign Name Input */}
          <div className="mb-8">
            <label htmlFor="campaignName" className="block text-lg font-semibold text-[#000066] mb-3">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g., Summer 2026 Launch"
              className="w-full px-6 py-4 rounded-xl border-2 border-[#000066]/20 focus:border-[#000066] focus:outline-none focus:ring-2 focus:ring-[#000066]/20 text-base transition-all"
              required
            />
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#000066]/20 overflow-hidden">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative p-12 lg:p-16 transition-all ${
                isDragging 
                  ? 'bg-[#000066]/5 border-[#000066]' 
                  : 'bg-background'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".jpg,.jpeg,image/jpeg"
                onChange={handleFileInput}
                className="hidden"
              />
              
              <label
                htmlFor="file-upload"
                className="cursor-pointer block text-center"
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Upload Icon */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isDragging 
                      ? 'bg-[#000066] scale-110' 
                      : 'bg-[#000066]/10'
                  }`}>
                    <svg 
                      className={`w-10 h-10 transition-colors ${
                        isDragging ? 'text-white' : 'text-[#000066]'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                  </div>

                  {/* Instructions */}
                  <div>
                    <p className="text-xl font-semibold text-[#000066] mb-2">
                      Drop your JPG files here
                    </p>
                    <p className="text-foreground/60">
                      or <span className="text-[#000066] underline">browse files</span> from your computer
                    </p>
                  </div>

                  {/* File Info */}
                  <div className="flex items-center gap-2 text-sm text-foreground/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Accepts JPG/JPEG images only • Multiple files supported</span>
                  </div>
                </div>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="border-t-2 border-[#000066]/10 bg-[#000066]/5 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#000066]">
                    Selected Files ({files.length})
                  </h3>
                  <button
                    onClick={() => setFiles([])}
                    className="text-sm text-foreground/60 hover:text-[#000066] transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-[#000066]/10"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <svg className="w-8 h-8 text-[#000066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-foreground/50">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-4 text-foreground/40 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading || !campaignName.trim()}
                    className="bg-[#000066] hover:bg-[#000066]/90 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      'Analyze Assets'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-[#000066]/5 rounded-xl p-8 border border-[#000066]/20">
            <h3 className="text-lg font-semibold text-[#000066] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How it works
            </h3>
            <ul className="space-y-3 text-foreground/70">
              <li className="flex items-start gap-3">
                <span className="text-[#000066] font-bold mt-0.5">1.</span>
                <span>Upload your marketing asset JPG files using the uploader above</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#000066] font-bold mt-0.5">2.</span>
                <span>Our AI will search the internet for exact and similar matches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#000066] font-bold mt-0.5">3.</span>
                <span>You'll receive a comprehensive report of where your assets appear online</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#000066]/5 py-8 px-6 lg:px-8 border-t border-[#000066]/20">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-foreground/60">
            Powered by <span className="font-semibold text-[#000066]">Teamdesk AI</span> • Secure & Confidential
          </p>
        </div>
      </footer>
    </div>
  );
}
