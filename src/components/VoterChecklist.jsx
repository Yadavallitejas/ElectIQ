import React, { useState } from 'react';
import { voterChecklist } from '../data/electionData';

const VoterChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedCount / voterChecklist.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Voter Readiness Checklist</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>Your Readiness</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {voterChecklist.map((item) => (
          <label 
            key={item.id} 
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${checkedItems[item.id] ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}
          >
            <div className="flex-shrink-0 mr-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                checked={checkedItems[item.id] || false}
                onChange={() => toggleCheck(item.id)}
              />
            </div>
            <span className={`${checkedItems[item.id] ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
              {item.text}
            </span>
          </label>
        ))}
      </div>
      
      {progress === 100 && (
        <div className="mt-6 p-4 bg-orange-100 text-orange-800 rounded-lg text-center font-bold animate-pulse">
          🎉 You are fully ready to vote! Every vote counts!
        </div>
      )}
    </div>
  );
};

export default VoterChecklist;
