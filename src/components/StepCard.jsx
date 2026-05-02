import React from 'react';

const StepCard = ({ step }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 flex flex-col border-t-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      style={{ borderTopColor: step.color }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100" style={{ color: step.color }}>
          {step.phase}
        </span>
        <span className="text-sm text-gray-500 font-medium">{step.duration}</span>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{step.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 leading-tight">{step.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
      
      <div className="mt-auto pt-4 border-t border-gray-100">
        <ul className="space-y-2">
          {step.keyFacts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepCard;
