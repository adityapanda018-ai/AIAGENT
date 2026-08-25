import type { FC } from 'react';

import { Sparkles, Play, Terminal, Search, BarChart2, ShieldCheck, FileText, Globe } from 'lucide-react';
import type { Agent } from '../types/agent';

interface TemplateGalleryProps {
  agents: Agent[];
  onLaunchTask: (agent: Agent, prompt: string) => void;
}

const SAMPLE_PROMPTS: Record<string, string> = {
  'agent-apex': 'Perform an architectural verification audit on a reactive state management pipeline in TypeScript.',
  'agent-nova': 'Synthesize a competitive technical intelligence report on grid-tied multi-megawatt inverter converter topologies.',
  'agent-datapulse': 'Construct a quantitative revenue forecasting model and render a telemetry bar graph.',
  'agent-vortex': 'Evaluate risk trade-offs and deployment specifications for an enterprise multi-cloud transition.'
};

export const TemplateGallery: FC<TemplateGalleryProps> = ({
  agents,
  onLaunchTask
}) => {
  const getAgentIcon = (avatarName: string) => {
    switch (avatarName) {
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Search': return <Search className="w-4 h-4 text-purple-400" />;
      case 'BarChart2': return <BarChart2 className="w-4 h-4 text-emerald-400" />;
      case 'Shield': return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-cyan-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-mono select-none">
      {/* Banner */}
      <div className="glass-card p-4 bg-[#07080c] border-[#1e2330] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">RESEARCH MODULES GALLERY</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Select specialized Research Modules pre-configured for analytical systems engineering, intelligence, and quantitative research.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Research Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => {
          const defaultPrompt = SAMPLE_PROMPTS[agent.id] || `Execute analytical research using ${agent.role} capabilities.`;
          return (
            <div 
              key={agent.id}
              className="glass-card p-3 border border-[#1e2330] hover:border-[#2e364a] transition-all flex flex-col justify-between space-y-3 bg-[#07080c]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-[#11141e] border border-[#1e2330] flex items-center justify-center">
                      {getAgentIcon(agent.avatar)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-100">{agent.name}</h3>
                      <span className="text-[10px] text-amber-400 font-bold">{agent.role}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#11141e] border border-[#1e2330] text-slate-400">
                    {agent.model}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed mb-2">
                  {agent.description}
                </p>

                {/* Tools Badge List */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {agent.tools.map((t) => (
                    <span key={t} className="text-[9px] px-1 py-0.2 rounded bg-[#11141e] text-slate-400 border border-[#1e2330]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Sample Prompt Box */}
                <div className="p-2 rounded bg-[#040507] border border-[#181c28] text-[10px] text-slate-400 font-mono italic">
                  "{defaultPrompt}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#181c28] flex items-center justify-between">
                <span className="text-[9px] text-slate-500">
                  CONTEXT: {agent.memoryContextSize}KB
                </span>

                <button
                  onClick={() => onLaunchTask(agent, defaultPrompt)}
                  className="btn-primary py-0.5 px-3 text-[10px]"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>RUN ANALYSIS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
