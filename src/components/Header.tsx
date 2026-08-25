import { type FC,  useState, useEffect  } from 'react';
import { Cpu, Key, Database, Network, Info, Play, Palette, Mic } from 'lucide-react';
import type { ApiSettings } from '../types/agent';
import { SystemArchitectureModal } from './SystemArchitectureModal';
import { WinningDemoScriptModal } from './WinningDemoScriptModal';
import { FullSystemTestModal } from './FullSystemTestModal';
import { VoiceAssistantModal } from './VoiceAssistantModal';

interface HeaderProps {
  settings: ApiSettings;
  onOpenSettings: () => void;
  onOpenAgentBuilder: () => void;
  onRunDemoStep?: (stepIndex: number) => void;
  onRunPrompt?: (promptText: string) => void;
}

export const Header: FC<HeaderProps> = ({
  settings: _settings,
  onOpenSettings,
  onOpenAgentBuilder: _onOpenAgentBuilder,
  onRunDemoStep = () => {},
  onRunPrompt = () => {}
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isFullTestModalOpen, setIsFullTestModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('dark');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setTimeStr(new Date().toTimeString().split(' ')[0].slice(0, 5));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    if (themeName === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    setIsThemeMenuOpen(false);
  };

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
            INVESTIGATION <strong className="text-[#F59E0B]">0248</strong>
          </span>
          <span className="text-[#212936]">|</span>
          <span className="text-[#F59E0B] font-bold bg-[#F59E0B]/10 px-1.5 py-0.2 rounded-sm border border-[#F59E0B]/30 flex items-center gap-1 font-sans text-[10px]">
            <Info className="w-3 h-3 text-[#F59E0B]" />
            DEMO DATASET / VALIDATION RUN
          </span>
          <span className="text-[#212936]">|</span>
          <span className="text-[#CBD5E1]">
            LAST UPDATED: <strong className="text-[#94A3B8]">{timeStr || '20:05'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] whitespace-nowrap text-[#10B981] font-semibold">
          <span className="text-[10px]">●</span>
          <span>SYSTEM OPERATIONAL</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#161D27] border border-[#212936] flex items-center justify-center text-[#38BDF8] font-bold rounded-sm">
            <Database className="w-4 h-4 text-[#38BDF8]" />
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
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* User Specification: [RUN ALL TESTS] System Verification Button */}
          <button
            onClick={() => setIsFullTestModalOpen(true)}
            className="btn-primary py-1 px-3 text-[11px] bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981] font-bold flex items-center gap-1 font-sans cursor-pointer"
            title="Run Complete 14-Point System Verification Suite"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>[ RUN ALL TESTS ]</span>
          </button>

          {/* User Specification: [WINNING DEMO SCRIPT] Button */}
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-secondary py-1 px-3 text-[11px] font-bold flex items-center gap-1 font-sans cursor-pointer"
            title="Run Winning Judge Demo Script"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#38BDF8]" />
            <span>[ DEMO SCRIPT ]</span>
          </button>

          {/* Voice AI Assistant Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="btn-secondary py-1 px-3 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30 hover:bg-[#38BDF8]/20"
            title="Open Hands-Free Voice AI Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
            <span>[ VOICE AI ]</span>
          </button>

          <button
            onClick={() => setIsArchModalOpen(true)}
            className="btn-secondary py-1 px-3 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
          >
            <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>[ ARCHITECTURE ]</span>
          </button>

          {/* UI Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="p-1 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
              title="Change UI Branding & Theme"
            >
              <Palette className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-[#161D27] border border-[#212936] rounded-sm shadow-xl z-50 p-1.5 font-mono text-[11px]">
                <div className="text-[10px] text-[#94A3B8] font-bold px-2 py-1 uppercase tracking-wider">UI THEMES</div>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${currentTheme === 'dark' ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold' : 'text-[#CBD5E1] hover:bg-[#212936]'}`}
                >
                  <span>Dark Cyber</span>
                  {currentTheme === 'dark' && <span>✓</span>}
                </button>
                <button
                  onClick={() => handleThemeChange('emerald')}
                  className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${currentTheme === 'emerald' ? 'bg-[#10B981]/20 text-[#10B981] font-bold' : 'text-[#CBD5E1] hover:bg-[#212936]'}`}
                >
                  <span>Emerald Obsidian</span>
                  {currentTheme === 'emerald' && <span>✓</span>}
                </button>
                <button
                  onClick={() => handleThemeChange('amber')}
                  className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${currentTheme === 'amber' ? 'bg-[#F59E0B]/20 text-[#F59E0B] font-bold' : 'text-[#CBD5E1] hover:bg-[#212936]'}`}
                >
                  <span>Solar Amber</span>
                  {currentTheme === 'amber' && <span>✓</span>}
                </button>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${currentTheme === 'light' ? 'bg-[#0284C7]/20 text-[#0284C7] font-bold' : 'text-[#CBD5E1] hover:bg-[#212936]'}`}
                >
                  <span>Light Professional</span>
                  {currentTheme === 'light' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenSettings}
            className="p-1 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
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

      <WinningDemoScriptModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onRunDemoStep={onRunDemoStep}
      />

      <FullSystemTestModal
        isOpen={isFullTestModalOpen}
        onClose={() => setIsFullTestModalOpen(false)}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onRunPrompt={onRunPrompt}
      />
    </header>
  );
};
