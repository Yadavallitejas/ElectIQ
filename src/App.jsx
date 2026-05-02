import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoadingDots from './components/LoadingDots';

const HowElectionsWork = React.lazy(() => import('./pages/HowElectionsWork'));
const AskAnything = React.lazy(() => import('./pages/AskAnything'));
const VoterGuide = React.lazy(() => import('./pages/VoterGuide'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col w-full font-sans">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1">
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
