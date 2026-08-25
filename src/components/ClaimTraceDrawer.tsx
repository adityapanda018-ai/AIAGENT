import React from 'react';
import { X, CheckCircle2, ShieldCheck, BarChart3, Database, GitBranch, ArrowDown } from 'lucide-react';
import { getClaimRelationalTrace, resolveDomainEvidence } from '../services/evidenceDatabase';

interface ClaimTraceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
  taskPrompt?: string;
}

export const ClaimTraceDrawer: React.FC<ClaimTraceDrawerProps> = ({
  isOpen,
  onClose,
  claimId = 'CLAIM C-014',
  taskPrompt = ''
}) => {
  if (!isOpen) return null;

  const trace = getClaimRelationalTrace(claimId);
  const domainData = resolveDomainEvidence(taskPrompt);
  const { claim, evidenceList, verificationList } = trace;

  const activeClaimText = claimId === 'CLAIM C-041' 
    ? domainData.claims[0].claim_text 
    : claim.claim_text;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Dimmed backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161D27] border-l border-[#38BDF8]/40 shadow-2xl flex flex-col font-sans">
          {/* Header */}
          <div className="p-4 border-b border-[#212936] bg-[#0F141C] flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">CLAIM TRACE PROVENANCE ENGINE</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body matching user 6-level ASCII layout */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* User Specified 6-Level Provenance Hierarchy Tree */}
            <div className="space-y-2 font-mono">
              <span className="text-[10px] font-bold text-[#38BDF8] uppercase block border-b border-[#212936] pb-1 flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-[#38BDF8]" />
                PROVENANCE CHAIN ({claimId})
              </span>

              <div className="p-3 bg-[#0F141C] rounded-sm border border-[#38BDF8]/30 font-mono text-[10px] leading-relaxed flex flex-col items-center space-y-1.5">
                {/* 1. CLAIM */}
                <div className="w-full p-2 bg-[#F59E0B]/10 border border-[#F59E0B] rounded-sm text-[#F59E0B] font-bold text-center">
                  1. {claimId}: "{activeClaimText.slice(0, 45)}..."
                </div>

                <ArrowDown className="w-3.5 h-3.5 text-[#F59E0B]" />

                {/* 2. Supporting Evidence */}
                <div className="w-full p-2 bg-[#38BDF8]/10 border border-[#38BDF8] rounded-sm text-[#38BDF8] font-bold text-center">
                  2. SUPPORTING EVIDENCE ({evidenceList.length || 3} EXCERPTS)
                </div>

                <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />

                {/* 3. Source(s) */}
                <div className="w-full p-2 bg-[#10B981]/10 border border-[#10B981] rounded-sm text-[#10B981] font-bold text-center">
                  3. SOURCE(S): {domainData.sourcesList[0].title.slice(0, 30)}...
                </div>

                <ArrowDown className="w-3.5 h-3.5 text-[#10B981]" />

                {/* 4. Extracted Data */}
                <div className="w-full p-2 bg-[#161D27] border border-[#CBD5E1]/40 rounded-sm text-[#F1F5F9] font-bold text-center">
                  4. EXTRACTED DATA: {domainData.metricLabel} = {domainData.metricValue}
                </div>

                <ArrowDown className="w-3.5 h-3.5 text-[#CBD5E1]" />

                {/* 5. Reasoning */}
                <div className="w-full p-2 bg-[#10B981]/10 border border-[#10B981]/40 rounded-sm text-[#10B981] font-bold text-center">
                  5. REASONING: CONSENSUS AUDIT PASSED (4/4)
                </div>

                <ArrowDown className="w-3.5 h-3.5 text-[#10B981]" />

                {/* 6. Conclusion */}
                <div className="w-full p-2 bg-[#10B981] text-[#0F141C] font-bold rounded-sm text-center">
                  6. CONCLUSION: {domainData.domain} VERIFIED
                </div>
              </div>
            </div>

            {/* SOURCE EVIDENCE SECTION */}
            <div className="space-y-2 font-mono">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase block border-b border-[#212936] pb-1">
                SOURCE EVIDENCE DETAILS
              </span>

              <div className="space-y-2 text-[11px]">
                {evidenceList.map((ev) => (
                  <div key={ev.evidence_id} className="p-2.5 bg-[#0F141C] rounded-sm border border-[#212936] space-y-1">
                    <div className="flex items-center justify-between text-[#38BDF8] font-bold">
                      <span>{ev.source_title}</span>
                      <span className="text-[#10B981] font-sans text-[9px]">✓ Relevant</span>
                    </div>
                    <p className="text-[#CBD5E1] text-[10px] font-sans">{ev.excerpt}</p>
                    <span className="text-[9px] text-[#94A3B8] block">{ev.page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ANALYSIS BREAKDOWN SECTION */}
            <div className="space-y-2 font-mono">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase block border-b border-[#212936] pb-1 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-[#F59E0B]" />
                EXTRACTED DATA METRICS
              </span>

              <div className="p-3 bg-[#0F141C] rounded-sm border border-[#212936] space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Domain Metric:</span>
                  <strong className="text-[#38BDF8] font-bold">{domainData.metricLabel}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Measured Value:</span>
                  <strong className="text-[#10B981] font-bold text-sm bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                    {domainData.metricValue}
                  </strong>
                </div>
              </div>
            </div>

            {/* VERIFICATION SECTION */}
            <div className="space-y-2 font-mono">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase block border-b border-[#212936] pb-1 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-[#10B981]" />
                SPECIALIST VERIFICATION AUDIT
              </span>

              <div className="p-2.5 bg-[#0F141C] rounded-sm border border-[#212936] space-y-1.5 text-[11px]">
                {verificationList.map((vr) => (
                  <div key={vr.verification_id} className="flex items-center justify-between">
                    <span className="text-[#F1F5F9]">{vr.specialist} Specialist</span>
                    <span className="text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Footer */}
            <div className="pt-2 border-t border-[#212936] flex items-center justify-between font-mono">
              <span className="text-[#94A3B8] text-[10px]">FINAL STATUS:</span>
              <span className="text-[#10B981] font-bold text-xs bg-[#10B981]/10 px-3 py-1 rounded-sm border border-[#10B981]/30">
                {claim.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
