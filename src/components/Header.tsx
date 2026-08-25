import { type FC, useState, useEffect } from 'react';
import { Cpu, Key, Network, ShieldCheck, Palette, Activity, Search, Share2, DollarSign, Command, Zap, Layers } from 'lucide-react';
import type { ApiSettings } from '../types/agent';
import { SystemArchitectureModal } from './SystemArchitectureModal';
import { FullSystemTestModal } from './FullSystemTestModal';

interface HeaderProps {
  settings: ApiSettings;
  onOpenSettings: () => void;
  onOpenAgentBuilder: () => void;
  onOpenThemeModal: () => void;
  onOpenSimulator: () => void;
  onOpenAcademicSearch: () => void;
  onOpenShareModal: () => void;
  onOpenTokenMeter: () => void;
  onOpenCommandPalette: () => void;
  onOpenCircuitTopology: () => void;
  onOpenRunComparison: () => void;
}

export const Header: FC<HeaderProps> = (props) => {
  const {
    onOpenSettings,
    onOpenThemeModal,
    onOpenSimulator,
    onOpenAcademicSearch,
    onOpenShareModal,
    onOpenTokenMeter,
    onOpenCommandPalette,
    onOpenCircuitTopology,
    onOpenRunComparison
  } = props;

  const [timeStr, setTimeStr] = useState<string>('');
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [isFullTestModalOpen, setIsFullTestModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setTimeStr(new Date().toTimeString().split(' ')[0].slice(0, 5));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-[#212936] bg-[#0F141C] select-none font-sans">
      {/* Top Simplified Professional Bar */}
      <div className="h-6 bg-[#161D27] border-b border-[#212936] px-4 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-[#F1F5F9] font-bold">
            NEXUSAI RESEARCH WORKBENCH
          </span>
          <span className="text-[#212936]">|</span>
          <span className="text-[#CBD5E1]">
            INVESTIGATION <strong className="text-[#38BDF8]">0248</strong>
          </span>
          <span className="text-[#212936]">|</span>
          <span className="text-[#10B981] font-bold bg-[#10B981]/10 px-1.5 py-0.2 rounded-sm border border-[#10B981]/30 flex items-center gap-1 font-sans text-[10px]">
            <ShieldCheck className="w-3 h-3 text-[#10B981]" />
            PRIMARY PRODUCTION WORKBENCH
          </span>
          <span className="text-[#212936]">|</span>
          <span className="text-[#CBD5E1]">
            LAST UPDATED: <strong className="text-[#94A3B8]">{timeStr || '20:05'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] whitespace-nowrap text-[#10B981] font-semibold">
          {/* Quick Command Palette Keyboard Hint */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1 text-[10px] text-[#94A3B8] hover:text-[#38BDF8] bg-[#0F141C] border border-[#212936] px-2 py-0.2 rounded cursor-pointer transition-colors"
          >
            <Command className="w-3 h-3 text-[#38BDF8]" />
            <span>Cmd/Ctrl + K</span>
          </button>
          <div className="flex items-center gap-1">
            <span className="text-[10px]">●</span>
            <span>SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#161D27] border border-[#38BDF8]/40 flex items-center justify-center rounded-sm shadow-md overflow-hidden p-1 group hover:border-[#38BDF8] transition-all">
            <img src="/nexus-logo.svg" alt="NexusAI Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-xs text-[#F1F5F9] tracking-wide uppercase font-sans">
                NEXUSAI RESEARCH WORKBENCH
              </h1>
              <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded-sm bg-[#161D27] text-[#10B981] border border-[#10B981]/30">
                VERIFIED PROVENANCE
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-sans">
              Research. Verify. Connect. Decide.
            </p>
          </div>
        </div>

        {/* Workstation Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#38BDF8]/50"
            title="Open Command Palette (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>[ ⌘K ]</span>
          </button>

          {/* Circuit Schematic Button */}
          <button
            onClick={onOpenCircuitTopology}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#F59E0B]/50"
            title="Inspect 3-Level ANPC Hardware Circuit Schematic"
          >
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>[ CIRCUIT ]</span>
          </button>

          {/* Diff Matrix Button */}
          <button
            onClick={onOpenRunComparison}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#10B981]/50"
            title="Compare Investigation Runs (0248 vs 0247)"
          >
            <Layers className="w-3.5 h-3.5 text-[#10B981]" />
            <span>[ DIFF ]</span>
          </button>

          {/* Engineering Simulator Button */}
          <button
            onClick={onOpenSimulator}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#38BDF8]/50"
            title="Open Interactive Engineering Loss & Thermal Simulator"
          >
            <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>[ SIM ]</span>
          </button>

          {/* Academic Search Connector Button */}
          <button
            onClick={onOpenAcademicSearch}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#38BDF8]/50"
            title="Search arXiv, IEEE, PubMed & Semantic Scholar"
          >
            <Search className="w-3.5 h-3.5 text-[#818CF8]" />
            <span>[ ACADEMIC ]</span>
          </button>

          {/* Share Dossier Button */}
          <button
            onClick={onOpenShareModal}
            className="btn-secondary py-1 px-2 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-[#38BDF8]/50"
            title="Generate Shareable Dossier Link & QR Code"
          >
            <Share2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>[ SHARE ]</span>
          </button>

          {/* Live Token & Cost Meter Button */}
          <button
            onClick={onOpenTokenMeter}
            className="btn-secondary py-1 px-2 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10 hover:bg-[#10B981]/20"
            title="View Real-Time Token Consumption & Cost Observability"
          >
            <DollarSign className="w-3 h-3 text-[#10B981]" />
            <span>$0.034</span>
          </button>

          {/* [RUN ALL TESTS] System Verification Button */}
          <button
            onClick={() => setIsFullTestModalOpen(true)}
            className="btn-primary py-1 px-2.5 text-[11px] bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981] font-bold flex items-center gap-1 font-sans cursor-pointer"
            title="Run Complete 14-Point System Verification Suite"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>[ TESTS ]</span>
          </button>

          <button
            onClick={() => setIsArchModalOpen(true)}
            className="p-1.5 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
            title="System Architecture Diagram"
          >
            <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
          </button>

          {/* UI Theme, Background & Highlight Customizer Button */}
          <button
            onClick={onOpenThemeModal}
            className="p-1.5 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
            title="Customize Themes, Background Textures & Highlight Accents"
          >
            <Palette className="w-3.5 h-3.5 text-[#38BDF8]" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
            title="API Settings & Domain Setup"
          >
            <Key className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>
      </div>

      <SystemArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <FullSystemTestModal
        isOpen={isFullTestModalOpen}
        onClose={() => setIsFullTestModalOpen(false)}
      />
    </header>
  );
};
export default Header;

