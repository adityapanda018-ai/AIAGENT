import { type FC, useState } from 'react';
import { Play, Square, BookOpen, HelpCircle, GitBranch, Sparkles } from 'lucide-react';
import type { Agent, ExecutionStep } from '../types/agent';
import { ClaimTraceDrawer } from './ClaimTraceDrawer';
import { EvidenceLibraryModal } from './EvidenceLibraryModal';
import { ConflictAnalysisModal } from './ConflictAnalysisModal';
import { WhyConclusionModal } from './WhyConclusionModal';
import { EvidenceGraphModal } from './EvidenceGraphModal';
import { QuestionAnalysisModal } from './QuestionAnalysisModal';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

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
    setSelectedScope(prev => 
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  const handleStart = () => {
    const promptToUse = taskPrompt.trim() || 'What are the most effective AI methods for detecting micro-bending and gradual attenuation in passive optical fiber networks?';
    onStartInvestigation(promptToUse, selectedScope, 'All', 'Detailed', 'Strict');
  };

  const handleOpenClaimDrawer = (id: string) => {
    setSelectedClaimId(id);
    setActiveClaimDrawer(true);
  };

  const specialists = [
    { name: 'Apex', role: 'Systems Architecture', color: 'text-[#F1F5F9]' },
    { name: 'Nova', role: 'Technical Research', color: 'text-[#38BDF8]' },
    { name: 'DataPulse', role: 'Quantitative Analysis', color: 'text-[#F59E0B]' },
    { name: 'Vortex', role: 'Technical Synthesis', color: 'text-[#10B981]' },
  ];

  const pipelineStages = [
    { num: '01', name: 'Question', status: steps.length >= 1 ? 'done' : 'queued' },
    { num: '02', name: 'Scope', status: steps.length >= 2 ? 'done' : 'queued' },
    { num: '03', name: 'Research', status: isRunning && steps.length >= 2 && steps.length < 4 ? 'running' : steps.length >= 3 ? 'done' : 'queued' },
    { num: '04', name: 'Analysis', status: isRunning && steps.length >= 3 ? 'running' : steps.length >= 4 ? 'done' : 'queued' },
    { num: '05', name: 'Check', status: steps.length >= 5 ? 'done' : 'queued' },
    { num: '06', name: 'Evidence', status: steps.length >= 6 ? 'done' : 'queued' },
    { num: '07', name: 'Conclusion', status: steps.some(s => s.type === 'synthesis') ? 'done' : 'queued' },
  ];

  const domainData = resolveDomainEvidence(taskPrompt);

  return (
    <div className="space-y-4 font-sans text-xs select-none max-w-6xl mx-auto">
      {/* CARD 1: STREAMLINED CLEAN WORKSTATION INPUT */}
      <div className="glass-card bg-[#161D27] border border-[#212936] rounded-sm p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">RESEARCH WORKSTATION</h2>
          </div>
          <span className="text-[10px] text-[#94A3B8]">
            Active Domain: <strong className="text-[#38BDF8]">{domainData.domain}</strong>
          </span>
        </div>

        <textarea
          value={taskPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Enter your technical research question... (e.g. Evaluate 3-level ANPC SiC MOSFET inverter efficiency at 10kHz PWM)"
          rows={3}
          className="w-full bg-[#0F141C] border border-[#212936] rounded-sm p-3 text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#38BDF8] min-h-[80px] resize-y font-sans leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-[#94A3B8] text-[10px]">Scope:</span>
            {scopeOptions.map((sc) => (
              <button
                key={sc}
                onClick={() => toggleScope(sc)}
                className={`px-2 py-0.5 rounded-sm border text-[10px] uppercase font-mono transition-colors cursor-pointer ${
                  selectedScope.includes(sc)
                    ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/40 font-bold'
                    : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>

          <div>
            {isRunning ? (
              <button
                onClick={onStopInvestigation}
                className="btn-danger py-1.5 px-4 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>[ STOP INVESTIGATION ]</span>
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="btn-primary py-1.5 px-4 text-xs font-mono font-bold bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981] flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>[ START INVESTIGATION ]</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CARD 2: CLEAN 7-STAGE PIPELINE TRACKER */}
      <div className="glass-card bg-[#161D27] border border-[#212936] rounded-sm p-3 font-mono">
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 mb-2">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase">ANALYTICAL PIPELINE FLOW</span>
          <span className="text-[10px] text-[#10B981] font-bold">
            {steps.length >= 7 ? '✓ COMPLETE' : isRunning ? '● RUNNING...' : '○ READY'}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {pipelineStages.map((st) => (
            <button
              key={st.num}
              onClick={() => st.num === '01' && setActiveQuestionModal(true)}
              className={`p-2 rounded-sm border flex flex-col items-center justify-center space-y-1 transition-all text-center cursor-pointer ${
                st.status === 'done'
                  ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]'
                  : st.status === 'running'
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8] text-[#38BDF8] animate-pulse'
                  : 'bg-[#0F141C] border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
              }`}
            >
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span>{st.num}</span>
                <span>
                  {st.status === 'done' ? '✓' : st.status === 'running' ? '●' : '○'}
                </span>
              </div>
              <span className="text-[10px] font-sans truncate w-full">{st.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CARD 3: UNCLUTTERED 2-COLUMN SPLIT (FINDINGS vs EVIDENCE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT COLUMN: KEY FINDINGS & RATIONALE */}
        <div className="glass-card bg-[#161D27] border border-[#212936] rounded-sm p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
            <h3 className="font-bold text-xs text-[#F59E0B] uppercase tracking-wider">FINDINGS & DECISION</h3>
            
            <div className="flex items-center gap-1.5 font-sans">
              <button
                onClick={() => setActiveWhyModal(true)}
                className="px-2 py-0.5 rounded-sm bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/40 font-mono text-[9px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>[ WHY THIS CONCLUSION? ]</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-[11px] text-[#F1F5F9] font-sans">
            <ul className="space-y-2.5">
              {/* Finding 01 */}
              <li className="flex items-start gap-2 leading-relaxed p-3 bg-[#0F141C] rounded-sm border border-[#212936]">
                <span className="text-[#F59E0B] font-mono font-bold">•</span>
                <div>
                  <span>{domainData.keyFindingsText.split(domainData.metricValue)[0]}</span>
                  <button 
                    onClick={() => handleOpenClaimDrawer(domainData.claims[0].claim_id)}
                    className="underline text-[#38BDF8] hover:text-[#60A5FA] font-bold font-mono px-1.5 py-0.2 bg-[#38BDF8]/10 rounded border border-[#38BDF8]/30 transition-all cursor-pointer mx-1"
                    title="Click to open Claim Trace Panel"
                  >
                    {domainData.metricValue}
                  </button>
                  <span>{domainData.keyFindingsText.split(domainData.metricValue)[1] || '.'}</span>
                </div>
              </li>

              {/* Finding 02 */}
              <li className="flex items-start gap-2 leading-relaxed p-3 bg-[#0F141C] rounded-sm border border-[#212936]">
                <span className="text-[#10B981] font-mono font-bold">✓</span>
                <div>
                  <span>Verified Claim </span>
                  <button 
                    onClick={() => handleOpenClaimDrawer(domainData.claims[0].claim_id)}
                    className="underline text-[#10B981] hover:text-[#34D399] font-bold font-mono px-1.5 py-0.2 bg-[#10B981]/10 rounded border border-[#10B981]/30 transition-all cursor-pointer mx-1"
                  >
                    {domainData.claims[0].claim_id}
                  </button>
                  <span>: "{domainData.claims[0].claim_text}"</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: EVIDENCE LIBRARY & SPECIALISTS */}
        <div className="glass-card bg-[#161D27] border border-[#212936] rounded-sm p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-[#212936] pb-2">
            <h3 className="font-bold text-xs text-[#10B981] uppercase tracking-wider">EVIDENCE & SPECIALISTS</h3>
            
            <div className="flex items-center gap-1.5 font-sans">
              <button
                onClick={() => setActiveGraphModal(true)}
                className="text-[#38BDF8] hover:text-[#60A5FA] font-bold text-xs flex items-center gap-1 bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 transition-all cursor-pointer"
              >
                <GitBranch className="w-3 h-3 text-[#38BDF8]" />
                <span>[ GRAPH ]</span>
              </button>

              <button
                onClick={() => setActiveEvidenceModal(true)}
                className="text-[#10B981] hover:text-[#34D399] font-bold text-xs flex items-center gap-1 bg-[#10B981]/10 px-2 py-0.5 rounded-sm border border-[#10B981]/30 transition-all cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-[#10B981]" />
                <span>[ 38 SOURCES ]</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <div 
              onClick={() => setActiveEvidenceModal(true)}
              className="p-3 bg-[#0F141C] rounded-sm border border-[#212936] hover:border-[#38BDF8]/40 transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Primary literature:</span>
                <strong className="text-[#10B981]">12 DOIs ({domainData.domain})</strong>
              </div>
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Secondary references:</span>
                <strong className="text-[#38BDF8]">19 sources</strong>
              </div>
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Empirical datasets:</span>
                <strong className="text-[#F59E0B]">7 datasets</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#212936] space-y-1 font-sans">
              <span className="text-[10px] font-mono font-semibold text-[#94A3B8] uppercase block">
                ASSIGNED RESEARCH SPECIALISTS
              </span>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                {specialists.map((s) => (
                  <div key={s.name} className="p-2 bg-[#0F141C] rounded-sm border border-[#212936] flex items-center justify-between">
                    <span className={`font-bold ${s.color}`}>{s.name}</span>
                    <span className="text-[9px] text-[#94A3B8] shrink-0 font-mono">✓ Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <ClaimTraceDrawer
        isOpen={activeClaimDrawer}
        onClose={() => setActiveClaimDrawer(false)}
        claimId={selectedClaimId}
        taskPrompt={taskPrompt}
      />

      <EvidenceLibraryModal
        isOpen={activeEvidenceModal}
        onClose={() => setActiveEvidenceModal(false)}
        taskPrompt={taskPrompt}
      />

      <ConflictAnalysisModal
        isOpen={activeConflictModal}
        onClose={() => setActiveConflictModal(false)}
      />

      <WhyConclusionModal
        isOpen={activeWhyModal}
        onClose={() => setActiveWhyModal(false)}
        taskPrompt={taskPrompt}
      />

      <EvidenceGraphModal
        isOpen={activeGraphModal}
        onClose={() => setActiveGraphModal(false)}
        taskPrompt={taskPrompt}
      />

      <QuestionAnalysisModal
        isOpen={activeQuestionModal}
        onClose={() => setActiveQuestionModal(false)}
        taskPrompt={taskPrompt}
      />
    </div>
  );
};
