import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public handleReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F141C] text-[#F1F5F9] font-mono flex items-center justify-center p-6 select-none">
          <div className="max-w-md w-full bg-[#161D27] border border-[#EF4444]/40 rounded-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">RUNTIME RECOVERY SHIELD</h1>
                <p className="text-[11px] text-[#94A3B8] font-sans">An unhandled client exception occurred.</p>
              </div>
            </div>

            <div className="p-3 bg-[#0F141C] border border-[#212936] rounded text-[11px] text-[#EF4444] font-mono overflow-x-auto max-h-40">
              <p className="font-bold">{this.state.error?.toString()}</p>
              <pre className="text-[9px] text-[#94A3B8] mt-1 font-mono whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack || this.state.error?.stack}
              </pre>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="btn-primary py-1.5 px-4 text-xs font-mono bg-[#38BDF8] hover:bg-[#0284c7] text-[#0F141C] font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET SESSION & RELOAD</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
