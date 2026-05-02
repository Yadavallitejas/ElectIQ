import React from 'react';

const StepCard = ({ step, isActive, onClick }) => {
  return (
    <div 
      className={`relative w-full rounded-3xl shadow-sm cursor-pointer transition-all duration-500 overflow-hidden text-left border-2 ${
        isActive ? 'shadow-2xl md:scale-105 z-30' : 'border-transparent hover:shadow-md hover:-translate-y-1 z-10'
      }`}
      style={{ 
        boxShadow: isActive ? `0 15px 30px -5px ${step.color}50` : undefined,
        borderColor: isActive ? step.color : 'transparent',
        backgroundColor: '#ffffff'
      }}
      onClick={onClick}
    >
      {/* Background tint when expanded */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: `${step.color}10` }}
      ></div>

      <div className="relative p-6 md:p-8 z-10">
        <div className="flex justify-between items-start mb-6">
          <div 
            className="flex items-center justify-center w-14 h-14 rounded-full text-white font-black text-2xl shadow-lg border-2 border-white transform transition-transform duration-300"
            style={{ backgroundColor: step.color, transform: isActive ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}
          >
            {step.id}
          </div>
          <div className="flex flex-col items-end">
            <span 
              className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white shadow-sm mb-2"
              style={{ color: step.color, border: `1px solid ${step.color}30` }}
            >
              {step.phase}
            </span>
            <span className="text-xs font-extrabold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200 shadow-inner">
              ⏳ {step.duration}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-5 mb-2">
          <div className="text-5xl drop-shadow-md transform transition-transform duration-500" style={{ transform: isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1)' }}>
            {step.icon}
          </div>
          <div className="pt-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-2">{step.title}</h3>
            {/* Show a hint when collapsed */}
            <div className={`text-xs font-bold uppercase tracking-wider transition-opacity duration-300 ${isActive ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 text-orange-500'}`}>
              Tap to expand ▼
            </div>
          </div>
        </div>

        <div 
          className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        >
          <div className="overflow-hidden">
            <p className="text-gray-700 text-[15px] leading-relaxed mb-6 font-medium border-l-4 pl-4 rounded-r-lg py-1" style={{ borderColor: step.color, backgroundColor: `${step.color}05` }}>
              {step.description}
            </p>
            
            <div className="mb-6 bg-white/70 p-5 rounded-2xl border border-white shadow-sm">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Key Facts</h4>
              <ul className="space-y-3">
                {step.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-800 font-semibold leading-snug">
                    <span style={{ color: step.color, backgroundColor: `${step.color}20` }} className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] mt-0.5">
                      ✓
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full transition-all duration-300" style={{ backgroundColor: step.color }}></div>
              <span className="text-xs font-black text-gray-800 flex items-center gap-2 mb-2 uppercase tracking-wider">
                <span className="text-xl filter drop-shadow-sm group-hover:animate-pulse">💡</span> Learn More
              </span>
              <p className="text-sm text-gray-600 font-medium leading-relaxed pl-1">
                {step.learnMore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
