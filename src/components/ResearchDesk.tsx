import { type FC, useState } from 'react';
import { 
  Play, 
  Square, 
  BookOpen, 
  HelpCircle, 
  Network, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ExternalLink,
  Check
} from 'lucide-react';
import type { Agent, ExecutionStep } from '../types/agent';
import { ClaimTraceDrawer } from './ClaimTraceDrawer';
import { EvidenceLibraryModal } from './EvidenceLibraryModal';
import { ConflictAnalysisModal } from './ConflictAnalysisModal';
import { WhyConclusionModal } from './WhyConclusionModal';
import { EvidenceGraphModal } from './EvidenceGraphModal';
import { QuestionAnalysisModal } from './QuestionAnalysisModal';
import { resolveDomainEvidence } from '../services/evidenceDatabase';
import { playClickSound } from '../services/soundFx';

interface ResearchDeskProps {
  selectedAgent: Agent;
  taskPrompt: string;
  onPromptChange: (val: string) => void;
  isRunning: boolean;
  onStartInvestigation: (prompt: string, scope: string[], sources: string, depth: string, verification: string) => void;
  onStopInvestigation: () => void;
  steps?: ExecutionStep[];
}

export const ResearchDesk: FC<ResearchDeskProps> = ({
  selectedAgent: _selectedAgent,
  taskPrompt,
  onPromptChange,
  isRunning,
  onStartInvestigation,
  onStopInvestigation,
  steps = []
}) => {
  const [selectedScope, setSelectedScope] = useState<string[]>(['Technical', 'Literature']);
  const [activeClaimDrawer, setActiveClaimDrawer] = useState<boolean>(false);
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<boolean>(false);
  const [activeConflictModal, setActiveConflictModal] = useState<boolean>(false);
  const [activeWhyModal, setActiveWhyModal] = useState<boolean>(false);
  const [activeGraphModal, setActiveGraphModal] = useState<boolean>(false);
  const [activeQuestionModal, setActiveQuestionModal] = useState<boolean>(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string>('CLAIM C-014');

  const scopeOptions = ['Technical', 'Literature', 'Experimental', 'Market'];

  const toggleScope = (scope: string) => {
    playClickSound();
    setSelectedScope(prev => 
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  const handleStart = () => {
    playClickSound();
    const promptToUse = taskPrompt.trim() || 'Evaluate 3-level ANPC SiC MOSFET inverter efficiency at 10kHz PWM and 100kW load.';
    onStartInvestigation(promptToUse, selectedScope, 'All', 'Detailed', 'Strict');
  };

  const handleOpenClaimDrawer = (id: string) => {
    playClickSound();
    setSelectedClaimId(id);
    setActiveClaimDrawer(true);
  };

  const specialists = [
    { name: 'Apex', role: 'Systems Architecture', verified: true },
    { name: 'Nova', role: 'Technical Research', verified: true },
    { name: 'DataPulse', role: 'Quantitative Analysis', verified: true },
    { name: 'Vortex', role: 'Technical Synthesis', verified: true }
  ];

  const pipelineStages = [
    { num: '01', name: 'Question Scope', status: steps.length >= 1 ? 'done' : 'queued' },
    { num: '02', name: 'Constraint Check', status: steps.length >= 2 ? 'done' : 'queued' },
    { num: '03', name: 'DOI Research', status: isRunning && steps.length >= 2 && steps.length < 4 ? 'running' : steps.length >= 3 ? 'done' : 'queued' },
    { num: '04', name: 'Loss Analytics', status: isRunning && steps.length >= 3 ? 'running' : steps.length >= 4 ? 'done' : 'queued' },
    { num: '05', name: 'Thermal Check', status: steps.length >= 5 ? 'done' : 'queued' },
    { num: '06', name: 'Evidence Chain', status: steps.length >= 6 ? 'done' : 'queued' },
    { num: '07', name: 'Final Dossier', status: steps.some(s => s.type === 'synthesis') ? 'done' : 'queued' }
  ];

  const domainData = resolveDomainEvidence(taskPrompt);

  return (
    <div className="space-y-4 font-sans text-xs select-none max-w-6xl mx-auto pb-12">
      {/* 1. HERO WORKBENCH PROMPT CARD */}
      <div className="bg-[#161D27] border border-[#212936] rounded-md p-5 space-y-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              FEASIBILITY & INVESTIGATION DESK
            </h2>
          </div>
          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5">
            Active Domain: <strong className="text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/20">{domainData.domain}</strong>
          </span>
        </div>

        <div className="space-y-2">
          <textarea
            value={taskPrompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Enter technical investigation parameters (e.g. Evaluate 3-level ANPC SiC MOSFET inverter efficiency at 10kHz PWM and 100kW load)..."
            rows={3}
            className="w-full bg-[#0F141C] border border-[#212936] rounded-md p-3.5 text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#38BDF8] min-h-[84px] resize-y font-sans leading-relaxed transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 font-mono text-[11px]">
          {/* Scope Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[#94A3B8] text-[10px] uppercase font-bold">Investigation Scope:</span>
            <div className="flex items-center gap-1.5">
              {scopeOptions.map((sc) => {
                const isSelected = selectedScope.includes(sc);
                return (
                  <button
                    key={sc}
                    onClick={() => toggleScope(sc)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-xs'
                        : 'bg-[#0F141C] text-[#94A3B8] border border-[#212936] hover:bg-[#161D27]'
                    }`}
                  >
                    {sc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div>
            {isRunning ? (
              <button
                onClick={onStopInvestigation}
                className="btn-danger py-2 px-5 text-xs font-mono font-bold flex items-center gap-2 rounded-md cursor-pointer transition-all shadow-md"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Run</span>
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="btn-primary py-2 px-5 text-xs font-mono font-bold bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981] flex items-center gap-2 rounded-md cursor-pointer transition-all shadow-md shadow-[#10B981]/20 hover:shadow-[#10B981]/40"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Investigation</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. ANALYTICAL PIPELINE STEPPER */}
      <div className="bg-[#161D27] border border-[#212936] rounded-md p-4 space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            7-STAGE SPECIALIST EXECUTION PIPELINE
          </span>
          <span className="text-[10px] font-bold flex items-center gap-1.5">
            {steps.length >= 7 ? (
              <span className="text-[#10B981] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Verified
              </span>
            ) : isRunning ? (
              <span className="text-[#38BDF8] flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Executing Stage {steps.length + 1}...
              </span>
            ) : (
              <span className="text-[#94A3B8]">Ready for Run</span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {pipelineStages.map((st) => (
            <button
              key={st.num}
              onClick={() => st.num === '01' && setActiveQuestionModal(true)}
              className={`p-2.5 rounded-md border flex flex-col items-center justify-center space-y-1 transition-all text-center cursor-pointer ${
                st.status === 'done'
                  ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]'
                  : st.status === 'running'
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8] text-[#38BDF8] ring-1 ring-[#38BDF8]/30 shadow-sm'
                  : 'bg-[#0F141C] border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold">
                <span>{st.num}</span>
                {st.status === 'done' ? (
                  <Check className="w-3 h-3 text-[#10B981]" />
                ) : st.status === 'running' ? (
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]/40" />
                )}
              </div>
              <span className="text-[10px] font-sans truncate w-full">{st.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. EXECUTIVE SPLIT VIEW: FINDINGS VS EVIDENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN: SYNTHESIZED FINDINGS & RATIONALE */}
        <div className="bg-[#161D27] border border-[#212936] rounded-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#212936] pb-3">
            <h3 className="font-bold text-xs text-[#F59E0B] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" />
              FINDINGS & RECOMMENDATIONS
            </h3>
            
            <button
              onClick={() => setActiveWhyModal(true)}
              className="px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 font-mono text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Why This Conclusion?</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-[#F1F5F9] font-sans leading-relaxed">
            {/* Finding 01 */}
            <div className="p-3.5 bg-[#0F141C] rounded-md border border-[#212936] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase">KEY ARCHITECTURAL ADVANTAGE</span>
                <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.2 rounded">VERIFIED</span>
              </div>
              <p className="text-[#CBD5E1] text-[11px]">
                {domainData.keyFindingsText.split(domainData.metricValue)[0]}
                <button 
                  onClick={() => handleOpenClaimDrawer(domainData.claims[0].claim_id)}
                  className="text-[#38BDF8] hover:text-[#7DD3FC] font-bold font-mono px-1.5 py-0.2 bg-[#38BDF8]/15 rounded border border-[#38BDF8]/30 transition-all cursor-pointer mx-1"
                  title="View Claim Trace"
                >
                  {domainData.metricValue}
                </button>
                {domainData.keyFindingsText.split(domainData.metricValue)[1] || '.'}
              </p>
            </div>

            {/* Finding 02 */}
            <div className="p-3.5 bg-[#0F141C] rounded-md border border-[#212936] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase">EMPIRICAL CLAIM AUDIT</span>
                <button 
                  onClick={() => handleOpenClaimDrawer(domainData.claims[0].claim_id)}
                  className="text-[9px] font-mono text-[#10B981] underline cursor-pointer"
                >
                  {domainData.claims[0].claim_id}
                </button>
              </div>
              <p className="text-[#CBD5E1] text-[11px]">
                "{domainData.claims[0].claim_text}"
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVIDENCE & SPECIALIST STATUS */}
        <div className="bg-[#161D27] border border-[#212936] rounded-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#212936] pb-3 font-mono">
            <h3 className="font-bold text-xs text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
              EVIDENCE PROVENANCE & SPECIALISTS
            </h3>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveGraphModal(true)}
                className="px-2 py-1 rounded bg-[#161D27] text-[#38BDF8] hover:bg-[#212936] border border-[#212936] text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                title="Open Evidence Graph"
              >
                <Network className="w-3 h-3" />
                <span>Graph</span>
              </button>

              <button
                onClick={() => setActiveEvidenceModal(true)}
                className="px-2 py-1 rounded bg-[#161D27] text-[#10B981] hover:bg-[#212936] border border-[#212936] text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                title="View All Sources"
              >
                <ExternalLink className="w-3 h-3" />
                <span>38 Sources</span>
              </button>
            </div>
          </div>

          {/* Metric Rows */}
          <div className="grid grid-cols-3 gap-2 font-mono">
            <div className="p-2.5 bg-[#0F141C] border border-[#212936] rounded-md text-center">
              <span className="text-[9px] text-[#94A3B8] uppercase block">IEEE DOIs</span>
              <strong className="text-sm text-[#38BDF8]">12</strong>
            </div>
            <div className="p-2.5 bg-[#0F141C] border border-[#212936] rounded-md text-center">
              <span className="text-[9px] text-[#94A3B8] uppercase block">Secondary Ref</span>
              <strong className="text-sm text-[#F59E0B]">19</strong>
            </div>
            <div className="p-2.5 bg-[#0F141C] border border-[#212936] rounded-md text-center">
              <span className="text-[9px] text-[#94A3B8] uppercase block">Datasets</span>
              <strong className="text-sm text-[#10B981]">7</strong>
            </div>
          </div>

          {/* Specialist Contracts */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider block">
              ASSIGNED SPECIALIST CONTRACTS
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
              {specialists.map((spec) => (
                <div 
                  key={spec.name} 
                  className="p-2 bg-[#0F141C] border border-[#212936] rounded-md flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#F1F5F9] block text-xs">{spec.name}</span>
                    <span className="text-[9px] text-[#94A3B8] block">{spec.role}</span>
                  </div>
                  <span className="text-[#10B981] text-[10px] font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ClaimTraceDrawer
        isOpen={activeClaimDrawer}
        claimId={selectedClaimId}
        onClose={() => setActiveClaimDrawer(false)}
      />

      <EvidenceLibraryModal
        isOpen={activeEvidenceModal}
        onClose={() => setActiveEvidenceModal(false)}
      />

      <ConflictAnalysisModal
        isOpen={activeConflictModal}
        onClose={() => setActiveConflictModal(false)}
      />

      <WhyConclusionModal
        isOpen={activeWhyModal}
        onClose={() => setActiveWhyModal(false)}
      />

      <EvidenceGraphModal
        isOpen={activeGraphModal}
        onClose={() => setActiveGraphModal(false)}
      />

      <QuestionAnalysisModal
        isOpen={activeQuestionModal}
        onClose={() => setActiveQuestionModal(false)}
      />
    </div>
  );
};
export default ResearchDesk;
