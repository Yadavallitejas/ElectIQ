import React from 'react';
import VoterChecklist from '../components/VoterChecklist';
import { Link } from 'react-router-dom';

const VoterGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Your Personal <span className="text-orange-500">Voter Guide</span>
          </h1>
          <p className="text-xl text-gray-600">
            Make sure you are fully prepared for polling day. Follow this guide to ensure your vote is counted.
          </p>
        </div>

        <VoterChecklist />

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need help finding your Polling Station?</h2>
          <p className="text-lg mb-8 text-orange-100 max-w-2xl mx-auto">
            You can search your details on the official Electoral Search portal or download the Voter Helpline App.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://electoralsearch.eci.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Official ECI Search Portal
            </a>
            <Link 
              to="/ask" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Ask ElectIQ for Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterGuide;
