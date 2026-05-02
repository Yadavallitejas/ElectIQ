import React, { useState, useEffect } from 'react';
import StepCard from './StepCard';
import { electionSteps } from '../data/electionData';

const ElectionTimeline = ({ limit }) => {
  const [activeStep, setActiveStep] = useState(null);
  const [progress, setProgress] = useState(0);

  const stepsToShow = limit ? electionSteps.slice(0, limit) : electionSteps;

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full rounded-[3rem] py-16 px-4 md:px-8 shadow-inner my-12 overflow-hidden relative" style={{ backgroundColor: '#fff8f0' }}>
      <style>{`
        .timeline-scroll::-webkit-scrollbar {
          height: 10px;
        }
        .timeline-scroll::-webkit-scrollbar-track {
          background: #fff0e0; 
          border-radius: 10px;
          margin-inline: 2rem;
        }
        .timeline-scroll::-webkit-scrollbar-thumb {
          background: #ffaa77; 
          border-radius: 10px;
          border: 2px solid #fff0e0;
        }
        .timeline-scroll::-webkit-scrollbar-thumb:hover {
          background: #FF6600; 
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 border border-orange-200">
            Interactive Guide
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            How Indian Elections Work <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Step by Step</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Tap any step below to explore the massive machinery behind the world's largest democracy.
          </p>
        </div>

        {/* Progress Bar Area */}
        <div className="max-w-4xl mx-auto mb-16 relative px-4">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Start</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Finish</span>
          </div>
          <div className="h-3 w-full bg-orange-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full transition-all duration-[2000ms] ease-out rounded-full relative overflow-hidden"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(to right, #FF6600, #dc2626, #1e3a8a)'
              }}
            >
              {/* Shimmer effect inside progress bar */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <div className="absolute -top-6 left-0 w-full flex justify-between px-3 md:px-0">
            <span className="text-2xl filter drop-shadow-md transform -translate-x-1/2 md:translate-x-0">📢</span>
            <span className="text-2xl filter drop-shadow-md">🗳️</span>
            <span className="text-2xl filter drop-shadow-md transform translate-x-1/2 md:translate-x-0">📊</span>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative pb-6">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute top-[13px] left-0 right-0 h-1.5 z-0 rounded-full shadow-sm" style={{ background: 'linear-gradient(to right, #FF6600, #dc2626, #1e3a8a)' }}></div>
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[15px] w-1.5 z-0 rounded-full shadow-sm" style={{ background: 'linear-gradient(to bottom, #FF6600, #dc2626, #1e3a8a)' }}></div>

          {/* Cards Container */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 overflow-x-auto pb-10 pt-2 px-1 timeline-scroll snap-x snap-mandatory hide-scrollbar-mobile md:px-4">
            {stepsToShow.map(step => (
               <div key={step.id} className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8 shrink-0 md:w-[380px] snap-center z-10 pt-0 pl-1 md:pl-0 group">
                  
                  {/* Node (The Dot) */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    {/* Pulsing ring for active state */}
                    <div 
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${activeStep === step.id ? 'animate-ping opacity-50' : 'opacity-0'}`}
                      style={{ backgroundColor: step.color }}
                    ></div>
                    
                    {/* The Dot */}
                    <div 
                       className="w-7 h-7 rounded-full border-[5px] border-[#fff8f0] shadow-md transition-all duration-500 relative z-20 cursor-pointer"
                       style={{ 
                         backgroundColor: activeStep === step.id ? step.color : '#cbd5e1',
                         transform: activeStep === step.id ? 'scale(1.4)' : 'scale(1)',
                         boxShadow: activeStep === step.id ? `0 0 15px ${step.color}80` : ''
                       }}
                       onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    ></div>
                  </div>
                  
                  {/* Card wrapper */}
                  <div className="w-full pr-4 md:pr-0">
                     <StepCard 
                       step={step} 
                       isActive={activeStep === step.id} 
                       onClick={() => setActiveStep(activeStep === step.id ? null : step.id)} 
                     />
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionTimeline;
