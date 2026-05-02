import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { quickFacts } from '../data/electionData';
import ElectionTimeline from '../components/ElectionTimeline';

// --- Animated Count Up Component ---
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  // Rotate quick facts every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFactIndex((prev) => (prev + 1) % quickFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center text-white overflow-hidden" 
           style={{ background: 'linear-gradient(135deg, #FF6600 0%, #dc2626 40%, #1e3a8a 100%)' }}>
        
        {/* Ashoka Chakra CSS Watermark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border-[40px] border-white relative animate-[spin_60s_linear_infinite]">
            {/* Spokes */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/2 w-full h-2 bg-white origin-left transform -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }}
              ></div>
            ))}
            <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 pt-20 pb-32">
          <div className="animate-[fadeInDown_1s_ease-out]">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest mb-8 shadow-xl">
              <span className="mr-2">🗳️</span> Official Election Education Guide
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight max-w-5xl animate-[fadeInUp_1s_ease-out_0.2s_both]">
            Understand India's <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 filter drop-shadow-lg">Elections</span>
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 text-orange-100 font-medium max-w-3xl mx-auto animate-[fadeInUp_1s_ease-out_0.4s_both] leading-relaxed">
            Interactive, simple, step-by-step — <br className="md:hidden" />for every Indian voter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto px-4 animate-[fadeInUp_1s_ease-out_0.6s_both]">
            <Link 
              to="/how-it-works" 
              className="bg-white text-blue-900 px-8 py-5 rounded-full font-black text-lg md:text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:bg-gray-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Explore Election Process"
            >
              Explore Election Process 
              <span className="transform transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
            </Link>
            <Link 
              to="/ask" 
              className="bg-black/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-5 rounded-full font-bold text-lg md:text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Ask ElectIQ a Question"
            >
              Ask ElectIQ a Question
            </Link>
          </div>
        </div>

        {/* Quick Facts Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-md border-t border-white/10 p-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center gap-3 transition-opacity duration-500" key={activeFactIndex}>
              <span className="text-3xl filter drop-shadow-md">{quickFacts[activeFactIndex].emoji}</span>
              <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                <span className="text-yellow-400 font-bold mr-2">DID YOU KNOW?</span>
                {quickFacts[activeFactIndex].fact}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRUST STRIP */}
      <div className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-2"><span className="text-xl">🏛️</span> Based on ECI guidelines</div>
            <div className="flex items-center gap-2"><span className="text-xl">🤖</span> Powered by Gemini AI</div>
            <div className="flex items-center gap-2"><span className="text-xl">🔒</span> No data sold or shared</div>
            <div className="flex items-center gap-2"><span className="text-xl">🇮🇳</span> Made for Indian voters</div>
          </div>
        </div>
      </div>

      {/* 2. THREE FEATURE CARDS */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/how-it-works" className="group focus:outline-none focus:ring-4 focus:ring-orange-500 rounded-[2rem] block" aria-label="Follow the complete process from announcement to results">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 filter drop-shadow-md" aria-hidden="true">🗺️</div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Election Journey</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8">Follow the complete process from announcement to results in 7 interactive steps.</p>
              <div className="text-orange-500 font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
                Explore Process <span className="transform transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
          
          <Link to="/ask" className="group focus:outline-none focus:ring-4 focus:ring-blue-500 rounded-[2rem] block" aria-label="Get instant answers to any election question">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 filter drop-shadow-md" aria-hidden="true">💬</div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Ask ElectIQ</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8">Get instant answers to any election question powered by advanced Gemini AI.</p>
              <div className="text-blue-600 font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
                Chat Now <span className="transform transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
          
          <Link to="/voter-guide" className="group focus:outline-none focus:ring-4 focus:ring-green-500 rounded-[2rem] block" aria-label="Make sure you're fully prepared for polling day">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 filter drop-shadow-md" aria-hidden="true">✅</div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Voter Checklist</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8">Make sure you're fully prepared for polling day with our interactive guide.</p>
              <div className="text-green-600 font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
                Check Readiness <span className="transform transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. QUICK STATS */}
      <div className="bg-[#1e3a8a] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMGwxMCAxME00MCAwbC0xMCAxME00MCA0MGwtMTAtMTBNMCA0MGwxMC0xMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 drop-shadow-md">
                <CountUp end={543} />
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-widest text-blue-200">Constituencies</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 drop-shadow-md">
                <CountUp end={970} suffix="M+" />
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-widest text-blue-200">Voters</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 drop-shadow-md">
                <CountUp end={7} />
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-widest text-blue-200">Election Phases</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 drop-shadow-md">
                1950
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-widest text-blue-200">Voter Helpline</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ELECTION TIMELINE PREVIEW */}
      <div className="py-24 px-4 bg-[#fff8f0] relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-black text-gray-900">Sneak Peek: The Process</h2>
          </div>
          
          {/* Timeline component with limit=3 */}
          <ElectionTimeline limit={3} />
          
          <div className="flex justify-center mt-4">
            <Link 
              to="/how-it-works" 
              className="bg-[#1e3a8a] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-1 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-orange-500"
              aria-label="See all 7 steps of the election process"
            >
              See All 7 Steps <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
