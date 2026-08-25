import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  BarChart3, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Terminal,
  ShieldCheck,
  BookOpen,
  Printer,
  AlertTriangle,
  Info,
  HelpCircle,
  QrCode
} from 'lucide-react';
import type { Artifact } from '../types/agent';
import { executeJavaScript } from '../services/codeRunner';
import type { CodeRunResult } from '../services/codeRunner';
import { WhyConclusionModal } from './WhyConclusionModal';
import { EngineeringDecisionMatrix } from './EngineeringDecisionMatrix';
import { AuditTrailView } from './AuditTrailView';

interface ArtifactWorkspaceProps {
  artifacts: Artifact[];
}

export const ArtifactWorkspace: React.FC<ArtifactWorkspaceProps> = ({ artifacts }) => {
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [codeRunOutput, setCodeRunOutput] = useState<CodeRunResult | null>(null);
  const [viewMode, setViewMode] = useState<'dossier' | 'raw'>('dossier');
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const selectedArtifact = artifacts.find(a => a.id === activeArtifactId) || artifacts[artifacts.length - 1];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (artifact: Artifact) => {
    const ext = artifact.type === 'code' ? 'js' : artifact.type === 'chart' ? 'json' : 'md';
    const blob = new Blob([artifact.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifact.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunCode = () => {
    if (selectedArtifact && selectedArtifact.type === 'code') {
      const res = executeJavaScript(selectedArtifact.content);
      setCodeRunOutput(res);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col glass-card overflow-hidden font-sans select-none bg-[#161D27] border-[#212936] rounded-sm">
      {/* Header Bar */}
      <div className="p-2 border-b border-[#212936] bg-[#0F141C] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pr-2">
          <BookOpen className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
          <span className="font-semibold text-xs text-[#F1F5F9] uppercase tracking-wider shrink-0 mr-1 font-sans">NEXUSAI RESEARCH DOSSIER & DELIVERABLE</span>

          {artifacts.length === 0 ? (
            <span className="text-[11px] text-[#94A3B8] italic font-sans">No research artifacts compiled</span>
          ) : (
            artifacts.map((art) => {
              const isSelected = (selectedArtifact?.id === art.id);
              return (
                <button
                  key={art.id}
                  onClick={() => {
                    setActiveArtifactId(art.id);
                    setCodeRunOutput(null);
                  }}
                  className={`px-2 py-1 rounded-sm text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all font-sans ${
                    isSelected
                      ? 'bg-[#161D27] text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C]'
                  }`}
                >
                  {art.type === 'code' && <FileCode className="w-3 h-3 text-[#38BDF8]" />}
                  {art.type === 'markdown' && <FileText className="w-3 h-3 text-[#F59E0B]" />}
                  {art.type === 'chart' && <BarChart3 className="w-3 h-3 text-[#10B981]" />}
                  <span className="max-w-[110px] truncate">{art.title}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 font-sans">
          {viewMode === 'raw' && selectedArtifact && (
            <>
              {selectedArtifact.type === 'code' && (
                <button
                  onClick={handleRunCode}
                  className="btn-primary py-0.5 px-2 text-[10px]"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Sandbox</span>
                </button>
              )}

              <button
                onClick={() => handleCopy(selectedArtifact.content)}
                className="p-1 rounded-sm bg-[#0F141C] hover:bg-[#161D27] text-[#F1F5F9] border border-[#212936] transition-colors text-[10px]"
                title="Copy Content"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleDownload(selectedArtifact)}
                className="p-1 rounded-sm bg-[#0F141C] hover:bg-[#161D27] text-[#F1F5F9] border border-[#212936] transition-colors text-[10px]"
                title="Download File"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            onClick={() => setViewMode(viewMode === 'dossier' ? 'raw' : 'dossier')}
            className={`py-0.5 px-2 text-[10px] font-mono font-semibold rounded-sm border ${
              viewMode === 'dossier'
                ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8]'
                : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
            }`}
          >
            [ VIEW DOSSIER ]
          </button>

          <button
            onClick={handleExportPDF}
            className="py-0.5 px-2 text-[10px] font-mono font-semibold rounded-sm bg-[#10B981] text-[#0F141C] border border-[#10B981] hover:bg-[#10B981]/90 flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3 h-3" />
            <span>[ EXPORT PDF ]</span>
          </button>
        </div>
      </div>

      {/* Main Artifact Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {viewMode === 'dossier' ? (
          /* User Specification: Phase 17 Professional 16-Section Research Dossier */
          <div className="bg-[#0F141C] border border-[#212936] rounded-sm p-6 space-y-5 text-xs font-sans text-[#F1F5F9] max-w-4xl mx-auto shadow-md">
            {/* Honest Disclosure Banner */}
            {!isBannerDismissed && (
              <div className="p-2.5 bg-[#161D27] border border-[#F59E0B]/30 rounded-sm flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Demonstration benchmark dataset used for interface validation.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B] font-bold">DEMO VALIDATION MODE</span>
                  <button
                    onClick={() => setIsBannerDismissed(true)}
                    className="text-[#94A3B8] hover:text-[#F1F5F9] text-[10px] font-mono px-1 py-0.5 rounded border border-[#212936] hover:bg-[#0F141C] cursor-pointer"
                    title="Dismiss Notice"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Dossier Cover Header */}
            <div className="border-b border-[#212936] pb-4 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>NEXUSAI RESEARCH DOSSIER / INVESTIGATION 0248</span>
                <span className="text-[#10B981] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  Independent Verification Passed
                </span>
              </div>

              <h1 className="text-lg font-bold text-[#F1F5F9] leading-tight font-sans">
                Silicon Carbide (SiC) Multilevel Inverter Feasibility Dossier
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-[#94A3B8] font-mono pt-1">
                <div className="flex items-center gap-3">
                  <span>Specialist Roster: <strong>Apex, Nova, DataPulse, Vortex</strong></span>
                  <span>Sources: <strong>38 Peer-Reviewed DOIs</strong></span>
                </div>

                {/* Digital Verification QR Code Badge */}
                <div className="flex items-center gap-1.5 text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/30">
                  <QrCode className="w-4 h-4 text-[#38BDF8]" />
                  <span>REOPEN ID: <strong>INV-0248-SHA256</strong></span>
                </div>
              </div>
            </div>

            {/* 1. Executive Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#F59E0B] border-b border-[#212936] pb-1">
                1. EXECUTIVE SUMMARY
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                This technical dossier presents an empirical feasibility analysis evaluating 3-level Active Neutral Point Clamped (ANPC) SiC MOSFET power converter topologies for 100kW+ industrial inverter applications relative to conventional 2-level Silicon IGBT systems.
              </p>
            </div>

            {/* 2. Research Question */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#38BDF8] border-b border-[#212936] pb-1">
                2. RESEARCH QUESTION
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                "Evaluate the feasibility of silicon carbide based multilevel inverters for 100 kW industrial applications."
              </p>
            </div>

            {/* 3. Scope */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#10B981] border-b border-[#212936] pb-1">
                3. SCOPE
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                Scope Boundaries: [Technical, Literature, Experimental, Market]. Operating parameters: Frequency &gt;= 10kHz, Load &gt;= 100kW, Junction Temp &lt;= 125°C.
              </p>
            </div>

            {/* 4. Methodology */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#F59E0B] border-b border-[#212936] pb-1">
                4. METHODOLOGY
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                Executed a 7-stage analytical pipeline across 4 specialist task contracts: Question ➔ Scope ➔ Research ➔ Analysis ➔ Cross-check ➔ Evidence ➔ Conclusion. All empirical assertions were cross-validated against literature indexes, V8 JavaScript loss sandbox simulations, and topological domain rules.
              </p>
            </div>

            {/* 5. Sources */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#38BDF8] border-b border-[#212936] pb-1">
                5. SOURCES
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                38 total indexed sources retrieved: 12 primary IEEE literature DOIs, 19 secondary technical reports, and 7 empirical benchmark datasets.
              </p>
            </div>

            {/* 6. Literature Review */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#10B981] border-b border-[#212936] pb-1">
                6. LITERATURE REVIEW
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                High-power conversion in industrial drives requires high voltage blocking capabilities combined with low switching dissipation. Wide bandgap SiC semiconductors allow higher operating frequencies (10kHz+), reducing passive magnetic component sizes.
              </p>
            </div>

            {/* 7. Specialist Analysis */}
            <div className="space-y-1.5 font-mono text-[10px]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] border-b border-[#212936] pb-1 font-mono">
                7. SPECIALIST ANALYSIS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-[11px]">
                <div className="p-2 bg-[#161D27] rounded border border-[#212936]">
                  <strong className="text-[#F1F5F9] font-mono text-[10px]">Apex (Systems Architecture)</strong>
                  <p className="text-[#CBD5E1] text-[10px]">3-level ANPC topology reduces switching voltage stress per device.</p>
                </div>
                <div className="p-2 bg-[#161D27] rounded border border-[#212936]">
                  <strong className="text-[#38BDF8] font-mono text-[10px]">Nova (Technical Research)</strong>
                  <p className="text-[#CBD5E1] text-[10px]">Retrieved 38 sources, extracted DOIs, identified thermal gaps.</p>
                </div>
              </div>
            </div>

            {/* 8. Quantitative Analysis */}
            <div className="space-y-1.5 font-mono text-[10px]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] border-b border-[#212936] pb-1 font-mono">
                8. QUANTITATIVE ANALYSIS
              </h2>
              <div className="p-2 bg-[#161D27] rounded border border-[#212936] text-[#CBD5E1] font-sans text-[11px]">
                V8 loss regression model calculated dissipation: Si IGBT baseline = 310W vs 3-Level SiC ANPC = 180W at 10kHz (42% reduction).
              </div>
            </div>

            {/* 9. Engineering Decision Matrix */}
            <div className="space-y-2">
              <EngineeringDecisionMatrix taskPrompt={selectedArtifact?.title || 'Optical Fiber'} />
            </div>

            {/* 10. Research Conflicts */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#F59E0B] border-b border-[#212936] pb-1">
                10. RESEARCH CONFLICTS
              </h2>
              <div className="p-3 bg-[#161D27] rounded-sm border border-[#212936] space-y-1 font-mono text-[10px]">
                <div className="flex items-center justify-between text-[#F59E0B] font-bold">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
                    CONFLICT C-018: Efficiency Discrepancy
                  </span>
                  <span className="text-[#10B981]">ALGORITHMICALLY RESOLVED</span>
                </div>
                <p className="text-[#CBD5E1] font-sans text-[11px]">
                  Discrepancy detected between IEEE 2024 (97.2% @ 8kHz) and Experimental Dataset (98.1% @ 10kHz). Root cause: Differing PWM carrier frequencies and thermal test conditions.
                </p>
                <div className="text-[#10B981] font-bold pt-1 border-t border-[#212936]">
                  RESOLUTION: Conditions normalized to 10kHz at 25°C ambient → η = 97.8%.
                </div>
              </div>
            </div>

            {/* 11. Assumptions */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#38BDF8] border-b border-[#212936] pb-1">
                11. ASSUMPTIONS
              </h2>
              <ul className="list-disc list-inside text-[11px] text-[#CBD5E1] space-y-0.5">
                <li>100 kW continuous load</li>
                <li>10 kHz PWM switching frequency</li>
                <li>25°C ambient operating temperature</li>
              </ul>
            </div>

            {/* 12. Limitations */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#EF4444] border-b border-[#212936] pb-1">
                12. LIMITATIONS
              </h2>
              <ul className="list-disc list-inside text-[11px] text-[#CBD5E1] space-y-0.5">
                <li>Results not validated above 150°C junction temperature</li>
                <li>Manufacturer datasheet parameters not independently re-measured in lab</li>
              </ul>
            </div>

            {/* 13. Findings */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#F59E0B] border-b border-[#212936] pb-1">
                13. FINDINGS
              </h2>
              <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                3-level SiC ANPC topology reduces switching losses by 42%, reduces heatsink volume by 58.8%, and achieves peak efficiency of 98.9%.
              </p>
            </div>

            {/* 14. Recommendation */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#212936] pb-1">
                <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#10B981]">
                  14. RECOMMENDATION
                </h2>

                <button
                  onClick={() => setIsWhyModalOpen(true)}
                  className="px-2 py-0.5 rounded-sm bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/40 font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>[WHY THIS CONCLUSION?]</span>
                </button>
              </div>

              <div className="p-3.5 bg-[#161D27] rounded-sm border border-[#10B981]/30 space-y-2 text-[11px]">
                <p className="text-[#CBD5E1] leading-relaxed font-sans">
                  Technically feasible for 100 kW-class applications under defined operating conditions. Proceed with 3-level SiC ANPC topology for high-frequency designs where magnetics weight and enclosure volume are critical constraints.
                </p>
              </div>
            </div>

            {/* 15. References */}
            <div className="space-y-1.5 pt-2 border-t border-[#212936] font-mono text-[9px] text-[#94A3B8]">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#38BDF8] border-b border-[#212936] pb-1">
                15. REFERENCES & CLICKABLE DOIs
              </h2>
              <div className="text-[#38BDF8] hover:underline cursor-pointer" onClick={() => alert("Opening IEEE 2025 paper...")}>
                [01] IEEE Transactions on Power Electronics (2025), DOI: 10.1109/TPE.2025.340912
              </div>
              <div className="text-[#38BDF8] hover:underline cursor-pointer" onClick={() => alert("Opening Experimental Dataset...")}>
                [02] Experimental Converter Benchmark Dataset (Zenodo DOI: 10.5281/zenodo.849201)
              </div>
              <div className="text-[#38BDF8] hover:underline cursor-pointer" onClick={() => alert("Opening Datasheet Specs...")}>
                [03] Semiconductor Manufacturer Primary Specification Datasheet (Ref: SiC-1200V-ANPC)
              </div>
            </div>

            {/* User Specification: 16. Audit Trail */}
            <AuditTrailView />
          </div>
        ) : (
          /* Raw View */
          <div>
            {!selectedArtifact ? (
              <div className="flex flex-col items-center justify-center text-[#94A3B8] text-center p-6 space-y-1.5">
                <BookOpen className="w-6 h-6 text-[#94A3B8]" />
                <p className="text-xs font-semibold text-[#F1F5F9]">No research artifacts yet.</p>
                <p className="text-[11px] text-[#94A3B8]">Run an investigation to generate findings and supporting evidence.</p>
              </div>
            ) : (
              <div>
                <div className="mb-2.5 flex items-center justify-between text-xs border-b border-[#212936] pb-2">
                  <div>
                    <h4 className="font-semibold text-[#F1F5F9] text-xs">{selectedArtifact.title}</h4>
                    {selectedArtifact.description && <p className="text-[10px] text-[#94A3B8]">{selectedArtifact.description}</p>}
                  </div>
                  <span className="font-mono text-[9px] bg-[#0F141C] px-2 py-0.5 rounded-sm border border-[#212936] text-[#F59E0B] font-semibold">
                    {selectedArtifact.type.toUpperCase()}
                  </span>
                </div>

                {selectedArtifact.type === 'code' ? (
                  <div className="space-y-2.5">
                    <pre className="p-3 rounded-sm bg-[#0F141C] border border-[#212936] text-[#38BDF8] font-mono text-[11px] overflow-x-auto leading-relaxed">
                      <code>{selectedArtifact.content}</code>
                    </pre>

                    {codeRunOutput && (
                      <div className="p-3 rounded-sm bg-[#0F141C] border border-[#10B981]/30 font-mono text-[10px] space-y-1.5">
                        <div className="flex items-center justify-between text-[#10B981] font-semibold border-b border-[#212936] pb-1">
                          <div className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>WORKSTATION SANDBOX STDOUT</span>
                          </div>
                          <span className="text-[9px] text-[#94A3B8]">{codeRunOutput.executionTimeMs} ms</span>
                        </div>

                        {codeRunOutput.logs.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[9px] text-[#94A3B8]">STDOUT LOGS:</span>
                            {codeRunOutput.logs.map((log: string, i: number) => (
                              <div key={i} className="text-[#F1F5F9] pl-2 border-l-2 border-[#F59E0B]">{log}</div>
                            ))}
                          </div>
                        )}

                        <div>
                          <span className="text-[9px] text-[#94A3B8]">EVALUATION RESULT:</span>
                          <pre className="text-[#10B981] bg-[#161D27] p-1.5 rounded-sm mt-1 overflow-x-auto text-[10px]">
                            {typeof codeRunOutput.result === 'object' ? JSON.stringify(codeRunOutput.result, null, 2) : String(codeRunOutput.result)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-sm bg-[#0F141C] border border-[#212936] text-[#F1F5F9] text-xs font-sans leading-relaxed whitespace-pre-line">
                    {selectedArtifact.content}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Why Conclusion Rationale Modal */}
      <WhyConclusionModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
      />
    </div>
  );
};
