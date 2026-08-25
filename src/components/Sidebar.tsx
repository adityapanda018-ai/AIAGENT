import { type FC } from 'react';
import { 
  Terminal, 
  History, 
  Database, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  MessageSquare, 
  Zap, 
  Search 
} from 'lucide-react';
import type { NavTab, Agent } from '../types/agent';

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
  onSelectTab
}) => {
  const workbenchNav = [
    { id: 'dashboard' as NavTab, title: 'Research Desk', subtitle: 'Feasibility & Synthesis', icon: Terminal },
    { id: 'simulator' as NavTab, title: 'Loss Simulator', subtitle: 'IEEE Thermal & Conduction', icon: Zap },
    { id: 'runs' as NavTab, title: 'Analysis Runs', subtitle: '0248 vs 0247 Benchmarks', icon: History }
  ];

  const knowledgeNav = [
    { id: 'knowledge' as NavTab, title: 'Evidence Library', subtitle: 'Indexed IEEE DOIs', icon: Database },
    { id: 'index' as NavTab, title: 'Vector Index', subtitle: '12,480 Curated Embeddings', icon: Search },
    { id: 'templates' as NavTab, title: 'Specialist Modules', subtitle: 'Apex, Nova, DataPulse', icon: Layers }
  ];

  const systemNav = [
    { id: 'resilience' as NavTab, title: 'Fault Resilience', subtitle: '8 Fault Recovery Scenarios', icon: AlertTriangle },
    { id: 'system_validation' as NavTab, title: 'Validation Suite', subtitle: 'Automated 24 Tests', icon: ShieldCheck },
    { id: 'observability' as NavTab, title: 'Observability', subtitle: 'Live Cluster Telemetry', icon: Activity },
    { id: 'messaging' as NavTab, title: 'Integrations', subtitle: 'Webhooks & Notifications', icon: MessageSquare }
  ];

  return (
    <aside className="w-60 h-full bg-[#0F141C] border-r border-[#212936] flex flex-col justify-between p-3 select-none text-xs font-sans overflow-hidden shrink-0">
      <div className="space-y-4">
        {/* SECTION 1: WORKBENCH */}
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider px-2 block">
            CORE WORKBENCH
          </span>
          <nav className="space-y-0.5">
            {workbenchNav.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-md transition-all flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#161D27] text-[#38BDF8] font-bold border-l-2 border-[#38BDF8] shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
                  <div className="overflow-hidden">
                    <span className="block text-xs font-semibold leading-tight">{item.title}</span>
                    <span className="block text-[10px] text-[#94A3B8] leading-tight truncate">{item.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTION 2: KNOWLEDGE & EVIDENCE */}
        <div className="space-y-1 pt-1 border-t border-[#212936]/60">
          <span className="text-[9px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider px-2 block">
            EVIDENCE & KNOWLEDGE
          </span>
          <nav className="space-y-0.5">
            {knowledgeNav.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-md transition-all flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#161D27] text-[#38BDF8] font-bold border-l-2 border-[#38BDF8] shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
                  <div className="overflow-hidden">
                    <span className="block text-xs font-semibold leading-tight">{item.title}</span>
                    <span className="block text-[10px] text-[#94A3B8] leading-tight truncate">{item.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTION 3: SYSTEM & RELIABILITY */}
        <div className="space-y-1 pt-1 border-t border-[#212936]/60">
          <span className="text-[9px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider px-2 block">
            SYSTEM & INTEGRATIONS
          </span>
          <nav className="space-y-0.5">
            {systemNav.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-all flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#161D27] text-[#38BDF8] font-bold border-l-2 border-[#38BDF8] shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161D27]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
                  <div className="overflow-hidden">
                    <span className="block text-xs font-semibold leading-tight">{item.title}</span>
                    <span className="block text-[10px] text-[#94A3B8] leading-tight truncate">{item.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-2.5 rounded bg-[#161D27] border border-[#212936] text-[10px] font-mono text-[#94A3B8] space-y-1">
        <div className="flex items-center justify-between text-[#F1F5F9] font-bold">
          <span>NEXUS CLUSTER</span>
          <span className="text-[#10B981] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            v2.4
          </span>
        </div>
        <div className="text-[9px] text-[#94A3B8]">
          4 Specialists • Active Cache 98.4%
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
