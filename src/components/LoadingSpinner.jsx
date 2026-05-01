import React from 'react';

/**
 * A full-screen loading spinner component used during initial auth state loading.
 */
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1e3a5f] rounded-full animate-spin"></div>
    </div>
  );
}
