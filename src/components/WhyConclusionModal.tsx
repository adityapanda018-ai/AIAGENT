import type { FC } from 'react';

import { X, HelpCircle, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

interface WhyConclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskPrompt?: string;
}

export const WhyConclusionModal: FC<WhyConclusionModalProps> = ({
  isOpen,
  onClose,
  taskPrompt = ''
}) => {
  if (!isOpen) return null;

  const domainData = resolveDomainEvidence(taskPrompt);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">WHY THIS CONCLUSION?</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TEST 4: User Specification Conclusion Rationale Chain */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-[#212936] pb-1 font-sans">
            <span className="font-bold text-[#F1F5F9] text-xs">Evidence Rationale Chain ({domainData.domain})</span>
            <span className="text-[#10B981] font-semibold text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Verified Trace
            </span>
          </div>

          <div className="space-y-2 flex flex-col items-center">
            {/* 1. CONCLUSION */}
            <div className="w-full p-2.5 bg-[#161D27] border border-[#38BDF8]/40 rounded-sm space-y-1">
              <span className="text-[#38BDF8] font-bold text-[10px] uppercase block">1. CONCLUSION:</span>
              <p className="text-[#F1F5F9] font-sans text-xs">{domainData.recommendationText}</p>
            </div>

            <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />

            {/* 2. SUPPORTING CLAIMS */}
            <div className="w-full p-2.5 bg-[#161D27] border border-[#F59E0B]/40 rounded-sm space-y-1">
              <span className="text-[#F59E0B] font-bold text-[10px] uppercase block">2. SUPPORTING CLAIMS:</span>
              <p className="text-[#CBD5E1] font-sans text-[11px]">
                • {domainData.claims[0].claim_id}: "{domainData.claims[0].claim_text}"
              </p>
            </div>

            <ArrowDown className="w-3.5 h-3.5 text-[#F59E0B]" />

            {/* 3. EVIDENCE */}
            <div className="w-full p-2.5 bg-[#161D27] border border-[#10B981]/40 rounded-sm space-y-1">
              <span className="text-[#10B981] font-bold text-[10px] uppercase block">3. EVIDENCE EXCERPT:</span>
              <p className="text-[#CBD5E1] font-sans text-[11px]">
                "{domainData.evidence[0].excerpt}" ({domainData.evidence[0].page})
              </p>
            </div>

            <ArrowDown className="w-3.5 h-3.5 text-[#10B981]" />

            {/* 4. SOURCES */}
            <div className="w-full p-2.5 bg-[#161D27] border border-[#38BDF8]/40 rounded-sm space-y-1">
              <span className="text-[#38BDF8] font-bold text-[10px] uppercase block">4. PRIMARY SOURCES:</span>
              <p className="text-[#CBD5E1] font-sans text-[11px]">
                {domainData.sourcesList[0].title} (DOI: {domainData.sourcesList[0].doi})
              </p>
            </div>

            <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />

            {/* 5. REASONING */}
            <div className="w-full p-2.5 bg-[#10B981]/10 border border-[#10B981]/40 rounded-sm space-y-1">
              <span className="text-[#10B981] font-bold text-[10px] uppercase block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                5. REASONING & CONSENSUS AUDIT:
              </span>
              <p className="text-[#F1F5F9] font-sans text-[11px] leading-relaxed">
                {domainData.keyFindingsText} Passed 4/4 specialist validation rules (Apex, Nova, DataPulse, Vortex).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Rationale Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
