import React from 'react';
import ChatAssistant from '../components/ChatAssistant';
import ErrorBoundary from '../components/ErrorBoundary';

const AskAnything = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10 px-2 md:px-4">
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 text-center px-2">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight">Ask ElectIQ Anything</h1>
        <p className="text-gray-600 font-medium text-base md:text-lg max-w-2xl mx-auto">
          Type your question below or choose a suggested topic to get started. Our AI assistant is here to help you understand the Indian election process.
        </p>
      </div>
      
      <ErrorBoundary>
        <ChatAssistant />
      </ErrorBoundary>
    </div>
  );
};

export default AskAnything;
