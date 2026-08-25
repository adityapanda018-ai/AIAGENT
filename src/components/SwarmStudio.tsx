import { type FC, useState, Fragment } from 'react';
import { ArrowRight, Play, Zap, ShieldCheck, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react';
import type { SwarmTeam, Agent } from '../types/agent';
import { DEFAULT_SWARMS } from '../data/defaultData';

interface SwarmStudioProps {
  agents: Agent[];
  swarms: SwarmTeam[];
  onRunSwarm: (swarm: SwarmTeam, prompt: string) => void;
  isRunning: boolean;
}

export const SwarmStudio: FC<SwarmStudioProps> = ({
  agents,
  swarms,
  onRunSwarm,
  isRunning
}) => {
  const [selectedSwarmId, setSelectedSwarmId] = useState<string>(swarms[0]?.id || DEFAULT_SWARMS[0].id);
  const [swarmPrompt, setSwarmPrompt] = useState<string>('Evaluate the feasibility of silicon carbide based multilevel inverters for high-power applications.');
  const [showWorkflowDetails, setShowWorkflowDetails] = useState<boolean>(false);

  const selectedSwarm = swarms.find(s => s.id === selectedSwarmId) || swarms[0];

  const handleLaunch = () => {
    if (selectedSwarm && swarmPrompt.trim()) {
      onRunSwarm(selectedSwarm, swarmPrompt.trim());
    }
  };

  const workflowSpecialists = [
    { name: 'Apex', role: 'Systems architecture' },
    { name: 'Nova', role: 'Literature research' },
    { name: 'DataPulse', role: 'Quantitative analysis' },
    { name: 'Vortex', role: 'Research synthesis' },
  ];

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-mono select-none bg-[#0B0F14]">
      {/* User Specification Banner Header */}
      <div className="glass-card p-4 bg-[#151B23] border-[#27313C] space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#E6E9ED] uppercase tracking-wider">
              RESEARCH WORKFLOW
            </h2>
            <p className="text-[11px] text-[#C59A52] font-medium mt-0.5">
              Technical feasibility investigation
            </p>
          </div>

          <button
            onClick={() => setShowWorkflowDetails(!showWorkflowDetails)}
            className="px-2.5 py-1 rounded bg-[#11161D] hover:bg-[#151B23] border border-[#27313C] text-[#E6E9ED] text-[10px] flex items-center gap-1.5 transition-colors"
          >
            <Info className="w-3 h-3 text-[#4FA3D1]" />
            <span>WORKFLOW DETAILS</span>
            {showWorkflowDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Small Meta Line per User Spec */}
        <div className="text-[10px] text-[#8D98A5] pt-1 flex items-center justify-between border-t border-[#27313C]">
          <span className="font-mono">
            4 specialists · 3 parallel analyses · verification enabled
          </span>
          <span className="text-[#5FAF83] font-bold">
            PROVENANCE VERIFIED
          </span>
        </div>

        {/* Expandable WORKFLOW DETAILS Panel */}
        {showWorkflowDetails && (
          <div className="mt-2 p-3 bg-[#0B0F14] border border-[#27313C] rounded space-y-2 text-xs animate-fade-in">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8D98A5] border-b border-[#27313C] pb-1">
              WORKFLOW DETAILS & SPECIALIST MATRIX
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
              {workflowSpecialists.map((spec) => (
                <div key={spec.name} className="p-2 rounded bg-[#11161D] border border-[#27313C] space-y-0.5">
                  <div className="font-bold text-[#C59A52] text-xs">{spec.name}</div>
                  <div className="text-[10px] text-[#E6E9ED]">{spec.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Configured Workflows */}
      <div>
        <h3 className="text-[10px] font-bold text-[#8D98A5] uppercase tracking-widest mb-2">
          SELECT RESEARCH WORKFLOW TARGET
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {swarms.map((team) => {
            const isSelected = team.id === selectedSwarmId;
            const teamAgents = team.members
              .map(m => agents.find(a => a.id === m.agentId))
              .filter(Boolean);

            return (
              <div
                key={team.id}
                onClick={() => setSelectedSwarmId(team.id)}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#4FA3D1] bg-[#11161D] shadow-sm'
                    : 'border-[#27313C] bg-[#151B23] hover:bg-[#11161D]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#C59A52]" />
                    <h4 className="font-bold text-xs text-[#E6E9ED]">{team.name}</h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#0B0F14] text-[#C59A52] border border-[#27313C] uppercase">
                    {team.workflowType}
                  </span>
                </div>

                <p className="text-[10px] text-[#8D98A5] mb-3">{team.description}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-[#27313C]">
                  {teamAgents.map((ag, idx) => (
                    <Fragment key={ag?.id || idx}>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0B0F14] border border-[#27313C] text-[10px]">
                        <span className="font-bold text-[#C59A52]">{ag?.name}</span>
                      </div>
                      {idx < teamAgents.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-[#8D98A5] shrink-0" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Execution Panel */}
      {selectedSwarm && (
        <div className="glass-card p-4 border-[#27313C] space-y-3 bg-[#151B23]">
          <div className="flex items-center justify-between text-xs">
            <h3 className="font-bold text-[#E6E9ED] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C59A52]" />
              <span>EXECUTE INVESTIGATION: "{selectedSwarm.name.toUpperCase()}"</span>
            </h3>
            <span className="text-[10px] text-[#8D98A5] font-mono">
              4 SPECIALISTS ENROLLED
            </span>
          </div>

          <div>
            <textarea
              rows={3}
              value={swarmPrompt}
              onChange={(e) => setSwarmPrompt(e.target.value)}
              className="w-full glass-input text-xs font-mono leading-relaxed bg-[#0B0F14] text-[#E6E9ED]"
              placeholder="Describe the research objective for the technical feasibility investigation..."
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[10px] text-[#8D98A5] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5FAF83]" />
              <span>Strict evidence handoff verification enabled</span>
            </div>

            <button
              onClick={handleLaunch}
              disabled={isRunning || !swarmPrompt.trim()}
              className="btn-primary py-1 px-4 text-[11px] disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'RUNNING WORKFLOW...' : 'RUN RESEARCH WORKFLOW'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
