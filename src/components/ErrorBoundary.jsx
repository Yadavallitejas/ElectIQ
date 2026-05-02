import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-[75vh] min-h-[500px] max-w-4xl mx-auto bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative font-sans items-center justify-center p-8 text-center">
          <div className="text-6xl mb-6">🤖💤</div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">ElectIQ is taking a short break.</h2>
          <p className="text-gray-700 text-lg max-w-md mx-auto mb-8 font-medium">
            We're having trouble connecting to the AI services right now.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-sm w-full">
            <h3 className="font-bold text-orange-600 mb-2">For election queries:</h3>
            <p className="mb-2">Call <strong className="text-gray-900">1950</strong> (Toll-Free)</p>
            <p>Visit <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">eci.gov.in</a></p>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
