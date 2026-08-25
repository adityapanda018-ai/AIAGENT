import React from 'react';
import { X, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';

interface ConflictAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConflictAnalysisModal: React.FC<ConflictAnalysisModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const claimA = 97.2;
  const claimB = 98.1;
  const difference = (claimB - claimA).toFixed(1);
  const resolvedValue = 97.8;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#F59E0B]/40 rounded-sm max-w-xl w-full overflow-hidden shadow-2xl space-y-4 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">ALGORITHMIC CONFLICT RESOLUTION ENGINE</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Specification: Algorithmic Resolution Card */}
        <div className="p-3.5 bg-[#0F141C] rounded-sm border border-[#212936] space-y-3 font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-[#212936] pb-1">
            <span className="font-bold text-[#F59E0B] text-xs">C-018 Efficiency Discrepancy Analysis</span>
            <span className="text-[#10B981] font-semibold text-[10px] bg-[#10B981]/10 px-2 py-0.5 rounded-sm border border-[#10B981]/20 font-sans">
              ALGORITHMICALLY RESOLVED
            </span>
          </div>

          {/* Claims Mismatch Delta */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 bg-[#161D27] rounded-sm border border-[#212936] space-y-0.5">
              <span className="text-[#94A3B8] block">CLAIM A (IEEE 2024)</span>
              <strong className="text-[#F1F5F9] font-bold text-xs">η = {claimA}%</strong>
            </div>

            <div className="p-2 bg-[#161D27] rounded-sm border border-[#212936] space-y-0.5">
              <span className="text-[#94A3B8] block">CLAIM B (DATASET)</span>
              <strong className="text-[#38BDF8] font-bold text-xs">η = {claimB}%</strong>
            </div>

            <div className="p-2 bg-[#161D27] rounded-sm border border-[#212936] space-y-0.5">
              <span className="text-[#94A3B8] block">DELTA DIFFERENCE</span>
              <strong className="text-[#F59E0B] font-bold text-xs">Δ = {difference} pts</strong>
            </div>
          </div>

          {/* Disagreement Parameters Grid */}
          <div className="space-y-1.5 pt-1 border-t border-[#212936]">
            <label className="block text-[10px] font-mono font-semibold text-[#94A3B8] uppercase">
              PARAMETER DISAGREEMENT EVALUATION
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-sans">
              <div className="p-1.5 bg-[#161D27] rounded-sm border border-[#212936] flex justify-between">
                <span>Switching Frequency:</span>
                <strong className="text-[#F59E0B] font-mono">8 kHz vs 10 kHz</strong>
              </div>
              <div className="p-1.5 bg-[#161D27] rounded-sm border border-[#212936] flex justify-between">
                <span>Test Temperature:</span>
                <strong className="text-[#F59E0B] font-mono">85°C vs 25°C</strong>
              </div>
              <div className="p-1.5 bg-[#161D27] rounded-sm border border-[#212936] flex justify-between">
                <span>Operating Load:</span>
                <strong className="text-[#10B981] font-mono">100 kW (Matched)</strong>
              </div>
              <div className="p-1.5 bg-[#161D27] rounded-sm border border-[#212936] flex justify-between">
                <span>Topology:</span>
                <strong className="text-[#10B981] font-mono">3-Level (Matched)</strong>
              </div>
            </div>
          </div>

          {/* Conflict Type */}
          <div className="flex items-center justify-between p-2 bg-[#161D27] rounded-sm border border-[#212936] text-[10px]">
            <span className="text-[#94A3B8]">CONFLICT CLASSIFICATION:</span>
            <strong className="text-[#F59E0B] uppercase font-bold">Condition Mismatch</strong>
          </div>

          {/* Algorithmic Resolution Formula */}
          <div className="p-3 bg-[#10B981]/10 border border-[#10B981]/30 rounded-sm space-y-1.5 font-sans">
            <div className="flex items-center justify-between text-[#10B981] font-bold font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                NORMALIZATION RESOLUTION
              </span>
              <span>RESOLVED VALUE</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#CBD5E1] text-[11px]">
                Normalized operating conditions at 10kHz carrier frequency (25°C ambient):
              </span>
              <strong className="text-[#10B981] font-mono text-sm flex items-center gap-1 bg-[#10B981]/20 px-2 py-0.5 rounded border border-[#10B981]/40">
                <span>η = {resolvedValue}%</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </strong>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold"
          >
            Close Algorithmic Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
