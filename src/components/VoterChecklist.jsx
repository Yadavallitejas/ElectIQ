import React, { useState, useEffect } from 'react';
import { voterChecklist } from '../data/electionData';

const VoterChecklist = () => {
  // Load initial state from localStorage or default to empty object
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('voterChecklist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
    return {};
  });

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    try {
      localStorage.setItem('voterChecklist', JSON.stringify(checkedItems));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    setCheckedItems({});
    localStorage.removeItem('voterChecklist');
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = voterChecklist.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const isComplete = progress === 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-gray-100 relative overflow-hidden font-sans">
      
      {/* Confetti Animation when 100% complete */}
      {isComplete && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <style>{`
            @keyframes fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
            }
            .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              top: -10px;
              animation: fall 3s ease-in infinite;
            }
          `}</style>
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#FF6600', '#1e3a8a', '#059669', '#dc2626', '#fbbf24'][Math.floor(Math.random() * 5)]
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Voter Readiness</h3>
          
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-gray-600 font-bold">{completedCount}/{totalCount}</span>
            <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ease-out ${isComplete ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-black" style={{ color: isComplete ? '#22c55e' : '#f97316' }}>{progress}%</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {voterChecklist.map((item) => {
            const isChecked = checkedItems[item.id] || false;
            
            return (
              <div 
                key={item.id} 
                className={`relative flex items-start p-4 rounded-xl border-2 transition-all duration-300 ${
                  isChecked 
                    ? 'bg-green-50/50 border-green-400 shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div 
                  className="mt-0.5 relative flex-shrink-0 w-7 h-7 rounded border-2 cursor-pointer transition-colors duration-300 flex items-center justify-center mr-4"
                  style={{ 
                    borderColor: isChecked ? '#22c55e' : '#d1d5db',
                    backgroundColor: isChecked ? '#22c55e' : 'transparent'
                  }}
                  onClick={() => toggleCheck(item.id)}
                >
                  <style>{`
                    @keyframes check {
                      0% { stroke-dashoffset: 24; }
                      100% { stroke-dashoffset: 0; }
                    }
                  `}</style>
                  {isChecked && (
                    <svg className="w-5 h-5 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7"
                        style={{ 
                          strokeDasharray: 24, 
                          strokeDashoffset: 24,
                          animation: 'check 0.4s ease-out forwards'
                        }}
                      />
                    </svg>
                  )}
                </div>
                
                <div className="flex-1 pt-0.5">
                  <div 
                    className={`font-semibold text-lg cursor-pointer transition-colors duration-300 ${isChecked ? 'text-gray-500 line-through' : 'text-gray-800'}`}
                    onClick={() => toggleCheck(item.id)}
                  >
                    {item.task}
                  </div>
                  
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center gap-1 mt-2 text-sm font-bold ${isChecked ? 'text-green-600 hover:text-green-700' : 'text-orange-500 hover:text-orange-600'} transition-colors group`}
                    >
                      {item.linkText}
                      <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Success Message */}
        {isComplete && (
          <div className="mb-8 p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg text-center transform animate-[bounce_1s_ease-in-out_1]">
            <h4 className="text-2xl font-black mb-1">You're ready to vote! 🎉</h4>
            <p className="font-medium text-green-100">Your vote is your voice in our democracy.</p>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <button 
            onClick={handleReset}
            className="text-gray-400 hover:text-red-500 text-sm font-bold underline transition-colors px-4 py-2"
          >
            Reset Checklist
          </button>
        </div>

        {/* Helpline Card */}
        <div className="bg-[#fff8f0] rounded-xl p-5 border border-orange-200">
          <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3">Official Resources</h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:1950" className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center gap-3 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                📞
              </div>
              <div>
                <div className="text-xs text-gray-500 font-bold">Voter Helpline</div>
                <div className="font-black text-gray-800">1950 <span className="text-xs font-normal text-gray-400">(Toll Free)</span></div>
              </div>
            </a>
            
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center gap-3 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🌐
              </div>
              <div>
                <div className="text-xs text-gray-500 font-bold">Official Website</div>
                <div className="font-black text-gray-800">eci.gov.in</div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VoterChecklist;
