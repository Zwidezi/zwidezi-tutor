import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * A proper React Error Boundary using class component lifecycle methods.
 * This catches errors during rendering, in lifecycle methods, and in
 * constructors of child components. It will NOT catch errors in:
 * - Event handlers (use try/catch)
 * - Async code (use try/catch)
 * - Server-side rendering
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-[2rem] shadow-xl border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-2">Eish, something went wrong!</h1>
            <p className="text-sm text-slate-500 mb-6">
              Don't worry, your learning progress is safe. Let's try again.
            </p>
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LoadingProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingProps> = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white mb-6 animate-pulse-soft shadow-xl shadow-green-100">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h2 className="text-xl font-black text-slate-900 tracking-tight">Mzansi Tutor</h2>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Your CAPS Study Buddy 🇿🇦</p>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">{message}</p>
    <div className="mt-8 animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 opacity-20"></div>
  </div>
);

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = "Eish, something went wrong!", 
  message = "Please try again.",
  onRetry
}) => (
  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
    <div className="flex-1">
      <p className="text-xs font-black text-red-600 uppercase tracking-widest">{title}</p>
      <p className="text-[10px] text-red-500 mt-0.5">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="text-[10px] font-black text-red-600 underline uppercase tracking-widest hover:text-red-700">
        Retry
      </button>
    )}
  </div>
);
