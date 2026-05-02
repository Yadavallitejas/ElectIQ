import React from 'react';
import { Link } from 'react-router-dom';
import { quickFacts } from '../data/electionData';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white flex-1 flex flex-col justify-center items-center px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Democracy Starts With <span className="text-yellow-300">You</span>.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-orange-100 font-medium max-w-2xl mx-auto">
            Your interactive guide to Indian elections. Learn how it works, prepare to vote, and get your questions answered instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/voter-guide" 
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              Get Voting Ready
            </Link>
            <Link 
              to="/ask" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">📚</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">How It Works</h3>
          <p className="text-gray-600 mb-6">Understand the A-Z of the election process, from registration to counting day, in simple steps.</p>
          <Link to="/how-it-works" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center justify-center gap-1">
            Learn more <span>→</span>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">🤖</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Assistant</h3>
          <p className="text-gray-600 mb-6">Have a specific question? Our AI assistant ElectIQ can explain complex election rules in seconds.</p>
          <Link to="/ask" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center justify-center gap-1">
            Chat now <span>→</span>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Voter Guide</h3>
          <p className="text-gray-600 mb-6">Use our interactive checklist to make sure you have everything you need for polling day.</p>
          <Link to="/voter-guide" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center justify-center gap-1">
            Check readiness <span>→</span>
          </Link>
        </div>
      </div>

      {/* Quick Facts Section */}
      <div className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Did you know?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {quickFacts.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-orange-50 rounded-xl">
                <span className="text-4xl mb-3">{item.emoji}</span>
                <span className="text-gray-700 font-medium">{item.fact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
