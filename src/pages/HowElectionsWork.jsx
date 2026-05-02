import React from 'react';
import { Link } from 'react-router-dom';
import ElectionTimeline from '../components/ElectionTimeline';

const HowElectionsWork = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6">The Election Journey</h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
            India's election process is a monumental democratic exercise. From the moment the Election Commission announces the dates, a massive machinery swings into action to ensure every eligible citizen can cast their vote. Explore the 7 key phases of this journey below.
          </p>
        </div>

        <ElectionTimeline />

        <div className="mt-12 md:mt-16 bg-white rounded-3xl p-6 md:p-12 text-center shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="text-4xl md:text-5xl mb-4 md:mb-6">🤔</div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI assistant, ElectIQ, is trained on official Election Commission guidelines and the Representation of the People Act. Ask anything you'd like to know!
          </p>
          <Link 
            to="/ask" 
            className="inline-flex w-full md:w-auto items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Ask ElectIQ a question"
          >
            Ask ElectIQ <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowElectionsWork;
