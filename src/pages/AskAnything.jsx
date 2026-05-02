import React from 'react';
import ChatAssistant from '../components/ChatAssistant';

const AskAnything = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Ask <span className="text-orange-500">ElectIQ</span>
        </h1>
        <p className="text-xl text-gray-600">
          Have a question about your voting rights, polling stations, or required documents? Ask our AI assistant below.
        </p>
      </div>

      <ChatAssistant />
      
      <div className="mt-12 text-center text-sm text-gray-500 max-w-2xl mx-auto">
        <p>Disclaimer: ElectIQ uses AI to provide simplified explanations of election rules. For official and legally binding information, always refer to the <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Election Commission of India website</a>.</p>
      </div>
    </div>
  );
};

export default AskAnything;
