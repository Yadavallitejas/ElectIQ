import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LoadingDots from './components/LoadingDots';

const Home = React.lazy(() => import('./pages/Home'));

const HowElectionsWork = React.lazy(() => import('./pages/HowElectionsWork'));
const AskAnything = React.lazy(() => import('./pages/AskAnything'));
const VoterGuide = React.lazy(() => import('./pages/VoterGuide'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col w-full font-sans relative">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-orange-500 focus:text-white focus:font-bold focus:outline-none focus:ring-4 focus:ring-orange-300">
            Skip to main content
          </a>
          {/* Safelist hidden div for Tailwind v4 dynamic classes */}
          <div className="hidden text-sm text-base px-4 py-2" aria-hidden="true"></div>
          <Toaster position="top-right" />
          <Navbar />
          <main id="main-content" role="main" className="flex-1 focus:outline-none" tabIndex="-1">
            <Suspense fallback={<div className="h-40 flex items-center justify-center"><LoadingDots /></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowElectionsWork />} />
                <Route path="/ask" element={<AskAnything />} />
                <Route path="/voter-guide" element={<VoterGuide />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
