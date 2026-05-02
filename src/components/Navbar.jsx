import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-orange-500 font-bold border-b-2 border-orange-500" 
      : "text-gray-600 hover:text-orange-500 border-b-2 border-transparent hover:border-orange-200";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-1">
              <span className="text-3xl" aria-hidden="true">🗳️</span>
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-gray-900">
                Elect<span className="text-orange-500">IQ</span>
              </span>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={`${isActive('/')} px-1 py-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm`}>
                Home
              </Link>
              <Link to="/how-it-works" className={`${isActive('/how-it-works')} px-1 py-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm`}>
                How It Works
              </Link>
              <Link to="/ask" className={`${isActive('/ask')} px-1 py-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm`}>
                Ask ElectIQ
              </Link>
              <Link to="/voter-guide" className={`${isActive('/voter-guide')} px-1 py-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm`}>
                Voter Guide
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">{user.displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Sign In with Google"
              >
                Sign In with Google
              </button>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[48px] flex items-center">Home</Link>
            <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[48px] flex items-center">How It Works</Link>
            <Link to="/ask" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[48px] flex items-center">Ask ElectIQ</Link>
            <Link to="/voter-guide" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[48px] flex items-center">Voter Guide</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5 gap-3">
                <div className="flex-shrink-0">
                  <img loading="lazy" className="h-10 w-10 rounded-full" src={user.photoURL || 'https://via.placeholder.com/40'} alt={`${user.displayName}'s profile picture`} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.displayName}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={() => { signOut(); setIsOpen(false); }}
                  className="ml-auto bg-gray-100 flex-shrink-0 p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-5">
                <button
                  onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Sign In with Google"
                >
                  Sign In with Google
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
