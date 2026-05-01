import React, { useState } from 'react';
import DocumentUpload from '../components/DocumentUpload';
import ResultPanel from '../components/ResultPanel';
import toast from 'react-hot-toast';
import { analyzeDocument } from '../services/geminiService';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setResult(null);
    toast('Decoding document...', { icon: '⏳' });
    
    try {
      const data = await analyzeDocument(text);
      setResult(data);
      toast.success('Successfully decoded!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to decode document: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e3a5f] tracking-tight mb-4">
          Decode Official Notices in Plain English
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload or paste any Indian government, legal, or banking document to instantly understand what it means and what you need to do next.
        </p>
      </div>
      
      {!result ? (
        <DocumentUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
      ) : (
        <ResultPanel result={result} onReset={handleReset} />
      )}
    </div>
  );
}
