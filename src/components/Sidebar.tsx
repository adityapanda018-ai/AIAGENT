import { type FC,  useState  } from 'react';
import type { Agent, NavTab } from '../types/agent';
import { FailureHandlingModal } from './FailureHandlingModal';
import { EvidenceGraphModal } from './EvidenceGraphModal';
import { 
  Terminal, 
  History, 
  Database, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Network, 
  BookOpen, 
  Activity,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  onNewAgent?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  agents,
  selectedAgentId,
  onSelectAgent
}) => {
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);

  // User Specification: Exact Verbatim Feature Map Layout
  const featureMapItems = [
    { id: 'dashboard' as NavTab, title: 'Research Desk', subtitle: 'Active investigation workstation', icon: Terminal },
    { id: 'runs' as NavTab, title: 'Analysis Runs', subtitle: 'Investigation history (0248, 0247...)', icon: History },
    { id: 'knowledge' as NavTab, title: 'Evidence Library', subtitle: 'Primary sources & DOIs', icon: Database },
    { id: 'templates' as NavTab, title: 'Research Modules', subtitle: 'Apex, Nova, DataPulse, Vortex', icon: Layers },
    { id: 'index' as NavTab, title: 'Knowledge Index', subtitle: '12,482 vector indexed docs', icon: Database },
    { id: 'resilience' as NavTab, title: 'Failure & Recovery', subtitle: '8 scenario resilience suite', icon: AlertTriangle },
    { id: 'system_validation' as NavTab, title: 'System Validation', subtitle: 'Phase 11 automated 24 tests', icon: ShieldCheck },
    { id: 'observability' as NavTab, title: 'System Observability', subtitle: 'Phase 12 metrics & health', icon: Activity },
    { id: 'messaging' as NavTab, title: 'Messaging Apps', subtitle: 'WhatsApp, Telegram, Slack', icon: MessageSquare },
  ];

  return (
    <aside className="w-56 h-full bg-[#0F141C] border-r border-[#212936] flex flex-col justify-between p-3 select-none text-xs font-sans overflow-y-auto shrink-0">
      <div className="space-y-4">
        {/* WORKSPACE & VALIDATION FEATURE MAP */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-[#94A3B8] uppercase tracking-wider px-2 py-1 flex items-center justify-between">
            <span>NEXUSAI FEATURE MAP</span>
            <span className="text-[#10B981] font-bold text-[9px]">V1.0</span>
          </div>
          
          <nav className="space-y-0.5">
            {featureMapItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex flex-col justify-center ${
                    isActive
                      ? 'bg-[#161D27] border-l-2 border-[#38BDF8] text-[#F1F5F9]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27]/50'
                  }`}
                >
                  <span className="font-semibold text-xs leading-tight flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${item.id === 'resilience' ? 'text-[#F59E0B]' : item.id === 'system_validation' ? 'text-[#10B981]' : 'text-[#38BDF8]'}`} />
                      <span>{item.title}</span>
                    </span>
                    {item.id === 'resilience' && (
                      <span className="text-[#F59E0B] text-[9px] font-mono font-bold">⚠</span>
                    )}
                    {item.id === 'system_validation' && (
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                    )}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">{item.subtitle}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* DIRECT ACTION TRIGGERS */}
        <div className="space-y-1 pt-2 border-t border-[#212936]">
          <div className="text-[10px] font-mono font-semibold text-[#94A3B8] uppercase tracking-wider px-2 py-0.5">
            PROVENANCE & DOSSIER
          </div>

          <button
            onClick={() => setIsGraphModalOpen(true)}
            className="w-full text-left px-2.5 py-1.5 rounded-sm transition-colors border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 font-mono text-[10px] flex items-center justify-between"
          >
            <span className="font-bold flex items-center gap-1">
              <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
              Evidence Graph
            </span>
            <span className="text-[9px]">PHASE 13</span>
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className="w-full text-left px-2.5 py-1.5 rounded-sm transition-colors border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 font-mono text-[10px] flex items-center justify-between mt-1"
          >
            <span className="font-bold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
              Research Dossier
            </span>
            <span className="text-[9px]">PHASE 17</span>
          </button>
        </div>

        {/* RESEARCH SPECIALISTS ROSTER SECTION */}
        <div className="space-y-1 pt-2 border-t border-[#212936]">
          <div className="text-[10px] font-mono font-semibold text-[#94A3B8] uppercase tracking-wider px-2 py-0.5">
            RESEARCH SPECIALISTS
          </div>

          <div className="space-y-0.5">
            {agents.map((agent) => {
              const isSelected = selectedAgentId === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex flex-col ${
                    isSelected
                      ? 'bg-[#161D27] text-[#38BDF8] border-l-2 border-[#38BDF8]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27]/50'
                  }`}
                >
                  <span className="font-semibold text-xs leading-tight">{agent.name}</span>
                  <span className="text-[10px] text-[#94A3B8] leading-tight truncate mt-0.5">{agent.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="pt-3 border-t border-[#212936] text-[10px] font-mono text-[#94A3B8] space-y-0.5 mt-4">
        <div className="flex items-center justify-between">
          <span>NEXUSAI RELEASE</span>
          <span className="text-[#10B981] font-bold">V1.0 FINAL</span>
        </div>
      </div>

      <FailureHandlingModal
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
      />

      <EvidenceGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
      />
    </aside>
  );
};
