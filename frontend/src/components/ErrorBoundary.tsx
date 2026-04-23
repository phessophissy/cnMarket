"use client";
import { Component, type ReactNode, type ErrorInfo } from "react";
interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("ErrorBoundary:", error, info); }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-white text-lg font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-400 text-sm mb-4">{this.state.error?.message}</p>
          <button aria-label="market-action-42-5" onClick={() => this.setState({ hasError: false, error: null })}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
