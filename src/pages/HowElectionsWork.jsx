import React from 'react';
import ElectionTimeline from '../components/ElectionTimeline';

const HowElectionsWork = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Demystifying the <span className="text-orange-500">Election Process</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India conducts the largest democratic exercise in the world. Here is a simplified breakdown of how it all works.
          </p>
        </div>

        <ElectionTimeline />
        
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">🇮🇳</span> Key Election Bodies
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-orange-600 text-lg">Election Commission of India (ECI):</strong> An autonomous constitutional authority responsible for administering election processes in India at national and state levels.
            </p>
            <p>
              <strong className="text-orange-600 text-lg">Electronic Voting Machines (EVM):</strong> India uses EVMs to record votes, making the process faster and more secure. They are accompanied by VVPATs.
            </p>
            <p>
              <strong className="text-orange-600 text-lg">VVPAT (Voter Verifiable Paper Audit Trail):</strong> An independent system attached to the EVM that allows voters to verify that their votes are cast as intended via a printed paper slip.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowElectionsWork;
