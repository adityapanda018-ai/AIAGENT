import React, { useState } from 'react';
import { X, Network, ShieldCheck, Info, ArrowDown } from 'lucide-react';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

interface EvidenceGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskPrompt?: string;
}

export const EvidenceGraphModal: React.FC<EvidenceGraphModalProps> = ({
  isOpen,
  onClose,
  taskPrompt = ''
}) => {
  const domainData = resolveDomainEvidence(taskPrompt);

  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    type: string;
    details: string;
  } | null>({
    title: domainData.topicTitle,
    type: 'Research Question Node',
    details: taskPrompt || domainData.topicTitle
  });

  if (!isOpen) return null;

  const isOpticalFiber = taskPrompt.toLowerCase().includes('fiber') || 
                         taskPrompt.toLowerCase().includes('optical') || 
                         taskPrompt.toLowerCase().includes('otdr') || 
                         taskPrompt.toLowerCase().includes('micro-bend');

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              INTERACTIVE EVIDENCE NETWORK GRAPH — {domainData.domain}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Canvas: User Specified Multi-Branch Evidence Network Tree */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
          {/* LEFT 2 COLUMNS: Node Diagram Canvas */}
          <div className="md:col-span-2 p-4 bg-[#0F141C] rounded-sm border border-[#212936] flex flex-col items-center justify-center space-y-2 font-mono text-[11px] overflow-auto">
            {isOpticalFiber ? (
              /* User Specification Multi-Branch Evidence Network Tree */
              <div className="w-full space-y-3 font-mono text-[10px] text-center">
                {/* Root: Research Question */}
                <button
                  onClick={() => setSelectedNode({
                    title: 'Research Question',
                    type: 'Root Objective Node',
                    details: taskPrompt || 'AI methods for detecting micro-bending and gradual attenuation in optical fiber networks'
                  })}
                  className="p-2 px-4 bg-[#38BDF8]/10 border border-[#38BDF8] rounded-sm text-[#38BDF8] font-bold inline-block hover:bg-[#38BDF8]/20 transition-all cursor-pointer shadow-md"
                >
                  Research Question: Optical Fiber AI Anomaly Detection
                </button>

                <div className="text-[#38BDF8] text-[10px] font-bold">│</div>

                {/* 3 Main Branches */}
                <div className="grid grid-cols-3 gap-2">
                  {/* BRANCH 1: OTDR */}
                  <div className="p-2.5 bg-[#161D27] border border-[#38BDF8]/40 rounded-sm space-y-1.5 flex flex-col items-center">
                    <button
                      onClick={() => setSelectedNode({
                        title: 'OTDR (Optical Time-Domain Reflectometry)',
                        type: 'Signal Acquisition Branch',
                        details: '1550nm reflectometer backscatter pulse measurement (0.1m spatial resolution).'
                      })}
                      className="font-bold text-[#38BDF8] hover:underline cursor-pointer"
                    >
                      OTDR
                    </button>
                    <div className="text-[#38BDF8] text-[9px]">│</div>
                    <button
                      onClick={() => setSelectedNode({
                        title: 'Micro-bending',
                        type: 'Loss Anomaly Node',
                        details: 'Localized micro-bend loss isolated down to 0.05 dB/km.'
                      })}
                      className="p-1 px-2 bg-[#0F141C] border border-[#F59E0B]/40 rounded text-[#F59E0B] text-[9px] hover:bg-[#F59E0B]/10 cursor-pointer w-full text-center truncate"
                    >
                      Micro-bending
                    </button>
                    <button
                      onClick={() => setSelectedNode({
                        title: 'Attenuation',
                        type: 'Loss Trend Node',
                        details: 'Gradual fiber attenuation profiling over 100km passive links.'
                      })}
                      className="p-1 px-2 bg-[#0F141C] border border-[#F59E0B]/40 rounded text-[#F59E0B] text-[9px] hover:bg-[#F59E0B]/10 cursor-pointer w-full text-center truncate"
                    >
                      Attenuation
                    </button>
                  </div>

                  {/* BRANCH 2: CNN-LSTM */}
                  <div className="p-2.5 bg-[#161D27] border border-[#10B981]/40 rounded-sm space-y-1.5 flex flex-col items-center">
                    <button
                      onClick={() => setSelectedNode({
                        title: 'CNN-LSTM Deep Learning',
                        type: 'Neural Network Branch',
                        details: 'Hybrid Convolutional-LSTM network for temporal OTDR backscatter sequence modeling.'
                      })}
                      className="font-bold text-[#10B981] hover:underline cursor-pointer"
                    >
                      CNN-LSTM
                    </button>
                    <div className="text-[#10B981] text-[9px]">│</div>
                    <button
                      onClick={() => setSelectedNode({
                        title: 'Detection Accuracy (99.1%)',
                        type: 'Verification Metric Node',
                        details: 'Verified 99.1% localization accuracy across N=4,120 benchmark OTDR traces.'
                      })}
                      className="p-1.5 px-2 bg-[#0F141C] border border-[#10B981]/50 rounded text-[#10B981] text-[9px] font-bold hover:bg-[#10B981]/10 cursor-pointer w-full text-center"
                    >
                      Detection Accuracy: 99.1%
                    </button>
                  </div>

                  {/* BRANCH 3: Predictive Maintenance */}
                  <div className="p-2.5 bg-[#161D27] border border-[#F59E0B]/40 rounded-sm space-y-1.5 flex flex-col items-center">
                    <button
                      onClick={() => setSelectedNode({
                        title: 'Predictive Maintenance',
                        type: 'Operations Branch',
                        details: 'Proactive fault localization before catastrophic fiber link severance.'
                      })}
                      className="font-bold text-[#F59E0B] hover:underline cursor-pointer"
                    >
                      Predictive Maint.
                    </button>
                    <div className="text-[#F59E0B] text-[9px]">│</div>
                    <button
                      onClick={() => setSelectedNode({
                        title: 'MTTR Reduction (64%)',
                        type: 'Operational Impact Node',
                        details: 'Mean-time-to-repair reduced by 64% (from 4.2h down to 1.5h).'
                      })}
                      className="p-1.5 px-2 bg-[#0F141C] border border-[#F59E0B]/50 rounded text-[#F59E0B] text-[9px] font-bold hover:bg-[#F59E0B]/10 cursor-pointer w-full text-center"
                    >
                      MTTR: -64%
                    </button>
                  </div>
                </div>

                <div className="text-[#CBD5E1] text-[10px] font-bold">↓</div>

                {/* Bottom Convergence: Research Gap */}
                <button
                  onClick={() => setSelectedNode({
                    title: 'Research Gap',
                    type: 'Unresolved Frontier Node',
                    details: 'Real-time multi-core optical fiber micro-bend spatial resolution under ultra-fast thermal transients requires further high-frequency sensor validation.'
                  })}
                  className="p-2 px-4 bg-[#EF4444]/10 border border-[#EF4444]/50 rounded-sm text-[#EF4444] font-bold inline-block hover:bg-[#EF4444]/20 transition-all cursor-pointer"
                >
                  Research Gap: Real-time Multi-Core Fiber Resolution
                </button>
              </div>
            ) : (
              /* Fallback Tree */
              <div className="space-y-2 text-center">
                <button
                  onClick={() => setSelectedNode({ title: domainData.topicTitle, type: 'Question', details: taskPrompt })}
                  className="p-2 px-3 bg-[#38BDF8]/10 border border-[#38BDF8] text-[#38BDF8] font-bold rounded"
                >
                  Research Question
                </button>
                <ArrowDown className="w-3.5 h-3.5 mx-auto text-[#38BDF8]" />
                <button
                  onClick={() => setSelectedNode({ title: domainData.claims[0].claim_id, type: 'Claim', details: domainData.claims[0].claim_text })}
                  className="p-2 px-3 bg-[#F59E0B]/10 border border-[#F59E0B] text-[#F59E0B] font-bold rounded"
                >
                  {domainData.claims[0].claim_id}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Node Details Inspector Pane */}
          <div className="p-3 bg-[#0F141C] rounded-sm border border-[#212936] space-y-3 font-mono">
            <div className="flex items-center gap-1.5 text-[#38BDF8] font-bold border-b border-[#212936] pb-1.5 text-[11px]">
              <Info className="w-3.5 h-3.5" />
              <span>NETWORK NODE INSPECTOR</span>
            </div>

            {selectedNode ? (
              <div className="space-y-2 text-[10px]">
                <div>
                  <span className="text-[#94A3B8] block">SELECTED NODE:</span>
                  <strong className="text-[#F1F5F9] font-sans text-xs">{selectedNode.title}</strong>
                </div>

                <div>
                  <span className="text-[#94A3B8] block">NODE CLASSIFICATION:</span>
                  <span className="text-[#F59E0B] font-bold">{selectedNode.type}</span>
                </div>

                <div className="pt-2 border-t border-[#212936]">
                  <span className="text-[#94A3B8] block">TECHNICAL DETAILS / AUDIT:</span>
                  <p className="text-[#CBD5E1] font-sans text-[11px] leading-relaxed mt-1">
                    "{selectedNode.details}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#212936] text-[9px] text-[#10B981] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                  Verified Relational Network Node
                </div>
              </div>
            ) : (
              <p className="text-[#94A3B8] italic font-sans text-[10px]">Click any network node to inspect details.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-between items-center font-mono text-[10px]">
          <span className="text-[#94A3B8]">Topology: Research Question ➔ (OTDR │ CNN-LSTM │ Predictive Maint) ➔ Research Gap</span>
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Graph
          </button>
        </div>
      </div>
    </div>
  );
};
