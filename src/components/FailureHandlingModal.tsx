import { type FC,  useState  } from 'react';
import { X, AlertOctagon, RefreshCw, Search, ArrowRight, ShieldAlert, AlertTriangle } from 'lucide-react';

interface FailureHandlingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FailureHandlingModal: FC<FailureHandlingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeFailureScenario, setActiveFailureScenario] = useState<
    'evidence' | 'conflict' | 'api' | 'scope'
  >('evidence');

  if (!isOpen) return null;

  const scenarios = [
    { id: 'evidence', label: '1. No Evidence', name: 'NO SUFFICIENT EVIDENCE' },
    { id: 'conflict', label: '2. Unresolved Conflict', name: 'UNRESOLVED CONFLICT' },
    { id: 'api', label: '3. API Failure', name: 'SERVICE UNAVAILABLE' },
    { id: 'scope', label: '4. Bad Scope', name: 'INSUFFICIENT SCOPE' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#EF4444]/40 rounded-sm max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-[#EF4444]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">ENTERPRISE FAILURE HANDLING & EDGE CASES</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Failure Scenario Tabs */}
        <div className="flex items-center gap-1 font-mono text-[10px] overflow-x-auto pb-1">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveFailureScenario(sc.id as any)}
              className={`px-2.5 py-1 rounded-sm border whitespace-nowrap transition-all ${
                activeFailureScenario === sc.id
                  ? 'bg-[#EF4444] text-[#F1F5F9] border-[#EF4444] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Scenario 1: NO SUFFICIENT EVIDENCE */}
        {activeFailureScenario === 'evidence' && (
          <div className="p-4 bg-[#0F141C] rounded-sm border border-[#EF4444]/30 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#EF4444] font-bold border-b border-[#212936] pb-1">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
                NO SUFFICIENT EVIDENCE
              </span>
              <span className="text-[9px] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20">
                PAUSED
              </span>
            </div>

            <p className="text-[#CBD5E1] font-sans text-xs leading-relaxed">
              The system found 4 sources, but only 1 met the minimum relevance threshold (Relevance Score &lt; 0.65). Conclusion generation paused.
            </p>

            <div className="pt-2 border-t border-[#212936] flex justify-end">
              <button
                onClick={() => {
                  alert("Executing Refine Search: Lowering threshold and expanding vector search keywords...");
                  onClose();
                }}
                className="btn-primary py-1.5 px-3 text-xs bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold flex items-center gap-1 font-sans"
              >
                <Search className="w-3.5 h-3.5" />
                <span>[REFINE SEARCH]</span>
              </button>
            </div>
          </div>
        )}

        {/* Scenario 2: UNRESOLVED CONFLICT */}
        {activeFailureScenario === 'conflict' && (
          <div className="p-4 bg-[#0F141C] rounded-sm border border-[#F59E0B]/30 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#F59E0B] font-bold border-b border-[#212936] pb-1">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                UNRESOLVED CONFLICT
              </span>
              <span className="text-[9px] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                WITHHELD
              </span>
            </div>

            <p className="text-[#CBD5E1] font-sans text-xs leading-relaxed">
              Two sources report materially different results (Efficiency η = 97.2% vs η = 98.1%). Recommendation withheld until additional evidence is retrieved.
            </p>

            <div className="pt-2 border-t border-[#212936] flex justify-end">
              <button
                onClick={() => {
                  alert("Executing Conflict Investigation: Launching Apex and DataPulse normalization sub-routine...");
                  onClose();
                }}
                className="btn-primary py-1.5 px-3 text-xs bg-[#F59E0B] text-[#0F141C] border-[#F59E0B] font-bold flex items-center gap-1 font-sans"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>[INVESTIGATE CONFLICT]</span>
              </button>
            </div>
          </div>
        )}

        {/* Scenario 3: RESEARCH SERVICE UNAVAILABLE */}
        {activeFailureScenario === 'api' && (
          <div className="p-4 bg-[#0F141C] rounded-sm border border-[#EF4444]/30 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#EF4444] font-bold border-b border-[#212936] pb-1">
              <span className="flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-[#EF4444]" />
                RESEARCH SERVICE UNAVAILABLE
              </span>
              <span className="text-[9px] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20">
                RETRY REQUIRED
              </span>
            </div>

            <p className="text-[#CBD5E1] font-sans text-xs leading-relaxed">
              External IEEE paper fetcher service failed (HTTP 503 Gateway Timeout). Existing local evidence and vector cache remain intact.
            </p>

            <div className="pt-2 border-t border-[#212936] flex justify-end">
              <button
                onClick={() => {
                  alert("Retrying connection to IEEE search index...");
                  onClose();
                }}
                className="btn-primary py-1.5 px-3 text-xs bg-[#EF4444] text-[#F1F5F9] border-[#EF4444] font-bold flex items-center gap-1 font-sans"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>[RETRY CONNECTION]</span>
              </button>
            </div>
          </div>
        )}

        {/* Scenario 4: INSUFFICIENT SCOPE */}
        {activeFailureScenario === 'scope' && (
          <div className="p-4 bg-[#0F141C] rounded-sm border border-[#38BDF8]/30 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#38BDF8] font-bold border-b border-[#212936] pb-1">
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#38BDF8]" />
                INSUFFICIENT SCOPE
              </span>
              <span className="text-[9px] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/20">
                REFINEMENT SUGGESTED
              </span>
            </div>

            <p className="text-[#CBD5E1] font-sans text-xs leading-relaxed">
              The objective is too broad ("Power Electronics"). Suggested refinement: <em>"Compare SiC and Si IGBT multilevel inverters for 100kW+ industrial applications."</em>
            </p>

            <div className="pt-2 border-t border-[#212936] flex justify-end">
              <button
                onClick={() => {
                  alert("Applied suggested refined objective scope!");
                  onClose();
                }}
                className="btn-primary py-1.5 px-3 text-xs bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold flex items-center gap-1 font-sans"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>[APPLY SUGGESTED SCOPE]</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary py-1 px-4 text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
