import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#040816] text-white p-4 font-sans">
          <div className="max-w-md w-full bg-white/[0.02] border border-red-500/20 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-black mb-3">Something went wrong</h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              We've encountered an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" />
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left bg-black/50 p-4 rounded-xl border border-white/5 overflow-auto max-h-48">
                <p className="text-red-400 font-mono text-xs whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
