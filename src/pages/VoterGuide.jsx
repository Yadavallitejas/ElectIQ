import React from 'react';
import VoterChecklist from '../components/VoterChecklist';

const validDocs = [
  { name: "Aadhaar Card", icon: "🆔" },
  { name: "Passport", icon: "🛂" },
  { name: "Driving License", icon: "🚗" },
  { name: "PAN Card", icon: "💳" },
  { name: "MNREGA Job Card", icon: "📋" },
  { name: "Bank/Post Office Passbook", icon: "🏦" },
  { name: "Health Insurance Smart Card", icon: "🏥" },
  { name: "Pension Document", icon: "📜" },
  { name: "NPR Smart Card", icon: "🪪" },
  { name: "Disability ID Card", icon: "♿" },
  { name: "Service Identity Card", icon: "🏢" },
  { name: "Official Gov ID", icon: "🏛️" }
];

const VoterGuide = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Voter Readiness Guide</h1>
          <p className="text-lg text-gray-600 font-medium">Use the interactive checklist to prepare for election day, and review the approved documents below.</p>
        </div>

        <div className="mb-20">
          <VoterChecklist />
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center border-b-2 border-orange-500 pb-4 inline-block mx-auto">Important Documents for Polling Day</h2>
          
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="text-7xl drop-shadow-md">🪪</div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">The EPIC (Voter ID Card)</h3>
                <p className="text-gray-700 leading-relaxed font-medium mb-4">
                  The <strong className="text-orange-600">Electors Photo Identity Card (EPIC)</strong> is the primary document issued by the Election Commission of India. It serves as your definitive proof of registration as a voter.
                </p>
                <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-200 font-bold text-sm">
                  💡 Didn't receive your EPIC yet? Don't worry! As long as your name is on the Electoral Roll, you can vote using any of the 12 alternative documents listed below.
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">12 Alternative Accepted Documents</h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">If you don't have your Voter ID card on polling day, you can present any ONE of the following original documents along with your presence on the voter list.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {validDocs.map((doc, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow hover:border-blue-200 group focus-within:ring-2 focus-within:ring-orange-500" tabIndex="0" role="group" aria-label={`Accepted document: ${doc.name}`}>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform filter drop-shadow-sm" aria-hidden="true">{doc.icon}</div>
                <h4 className="font-bold text-gray-800 text-sm leading-snug">{doc.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterGuide;
