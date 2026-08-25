import React from 'react';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Target, Layers, FileText, Cpu } from 'lucide-react';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

interface QuestionAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskPrompt?: string;
}

export const QuestionAnalysisModal: React.FC<QuestionAnalysisModalProps> = ({
  isOpen,
  onClose,
  taskPrompt = ''
}) => {
  if (!isOpen) return null;

  const domainData = resolveDomainEvidence(taskPrompt);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">STAGE 01 — QUESTION DECONSTRUCTION & OBJECTIVE ANALYSIS</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px]">
          {/* Target Inquiry Banner */}
          <div className="p-3 bg-[#161D27] border border-[#38BDF8]/40 rounded-sm space-y-1">
            <span className="text-[#38BDF8] font-bold text-[10px] uppercase block flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-[#38BDF8]" />
              RECEIVED OBJECTIVE PROMPT:
            </span>
            <p className="text-[#F1F5F9] font-sans text-xs leading-relaxed font-semibold">
              "{taskPrompt || domainData.topicTitle}"
            </p>
          </div>

          {/* 4 Deconstructed Analytical Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
            {/* Parameter 1: Domain Classification */}
            <div className="p-2.5 bg-[#161D27] border border-[#212936] rounded-sm space-y-1">
              <span className="text-[#38BDF8] font-mono font-bold text-[10px] uppercase flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                1. DOMAIN CLASSIFICATION:
              </span>
              <strong className="text-[#F1F5F9] block">{domainData.domain}</strong>
              <p className="text-[#94A3B8] text-[10px]">Identified technical domain & IEEE taxonomy category.</p>
            </div>

            {/* Parameter 2: Primary Metric Goal */}
            <div className="p-2.5 bg-[#161D27] border border-[#212936] rounded-sm space-y-1">
              <span className="text-[#10B981] font-mono font-bold text-[10px] uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                2. PRIMARY TARGET METRIC:
              </span>
              <strong className="text-[#10B981] block">{domainData.metricLabel} = {domainData.metricValue}</strong>
              <p className="text-[#94A3B8] text-[10px]">{domainData.metricDescription}</p>
            </div>

            {/* Parameter 3: Specialist Task Allocation */}
            <div className="p-2.5 bg-[#161D27] border border-[#212936] rounded-sm space-y-1">
              <span className="text-[#F59E0B] font-mono font-bold text-[10px] uppercase flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" />
                3. SPECIALIST TASK ALLOCATION:
              </span>
              <ul className="text-[#CBD5E1] text-[10px] space-y-0.5 font-mono">
                <li>• Apex ➔ Systems Topology</li>
                <li>• Nova ➔ Literature DOI Search</li>
                <li>• DataPulse ➔ Loss Regression</li>
                <li>• Vortex ➔ Technical Synthesis</li>
              </ul>
            </div>

            {/* Parameter 4: Formulated Hypothesis */}
            <div className="p-2.5 bg-[#161D27] border border-[#212936] rounded-sm space-y-1">
              <span className="text-[#38BDF8] font-mono font-bold text-[10px] uppercase flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
                4. CORE HYPOTHESIS:
              </span>
              <p className="text-[#CBD5E1] text-[10px] leading-relaxed">
                "{domainData.claims[0].claim_text}"
              </p>
            </div>
          </div>

          {/* Verification Status Footer */}
          <div className="p-2.5 bg-[#10B981]/10 border border-[#10B981]/40 rounded-sm flex items-center justify-between text-[11px] font-sans">
            <div className="flex items-center gap-2 text-[#F1F5F9]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span><strong>Deconstruction Complete:</strong> Objective mapped to 4 specialists and 38 literature sources.</span>
            </div>
            <span className="font-mono text-[9px] text-[#10B981] font-bold uppercase bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
              STAGE 01 PASSED
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Question Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
