import { type FC, useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  Activity, 
  BookOpen, 
  Layers, 
  FileCode, 
  FileText, 
  Palette, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { playClickSound } from '../services/soundFx';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Simulation' | 'Research' | 'Export' | 'Theme' | 'System';
  shortcut?: string;
  icon: any;
  action: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any) => void;
  onOpenSimulator: () => void;
  onOpenAcademicSearch: () => void;
  onOpenTopology: () => void;
  onOpenComparison: () => void;
  onOpenThemeModal: () => void;
  onOpenTestModal: () => void;
  onExportJupyter: () => void;
  onExportLatex: () => void;
}

export const CommandPaletteModal: FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenSimulator,
  onOpenAcademicSearch,
  onOpenTopology,
  onOpenComparison,
  onOpenThemeModal,
  onOpenTestModal,
  onExportJupyter,
  onExportLatex
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: 'cmd-sim-open',
      title: 'Open Interactive Loss & Thermal Simulator',
      category: 'Simulation',
      shortcut: 'S',
      icon: Activity,
      action: () => { onOpenSimulator(); onClose(); }
    },
    {
      id: 'cmd-topo-open',
      title: 'Inspect 3-Level ANPC Hardware Circuit Schematic',
      category: 'Simulation',
      shortcut: 'C',
      icon: Zap,
      action: () => { onOpenTopology(); onClose(); }
    },
    {
      id: 'cmd-diff-open',
      title: 'Compare Investigation Runs (0248 vs 0247 Diff Matrix)',
      category: 'Research',
      shortcut: 'D',
      icon: Layers,
      action: () => { onOpenComparison(); onClose(); }
    },
    {
      id: 'cmd-acad-search',
      title: 'Search Academic Repositories (arXiv, IEEE, PubMed)',
      category: 'Research',
      shortcut: 'A',
      icon: BookOpen,
      action: () => { onOpenAcademicSearch(); onClose(); }
    },
    {
      id: 'cmd-export-ipynb',
      title: 'Export Executable Jupyter Notebook (.ipynb)',
      category: 'Export',
      shortcut: 'J',
      icon: FileCode,
      action: () => { onExportJupyter(); onClose(); }
    },
    {
      id: 'cmd-export-tex',
      title: 'Export IEEE LaTeX Research Paper (.tex)',
      category: 'Export',
      shortcut: 'T',
      icon: FileText,
      action: () => { onExportLatex(); onClose(); }
    },
    {
      id: 'cmd-nav-desk',
      title: 'Go to Research Desk (Investigation Workstation)',
      category: 'Navigation',
      shortcut: '1',
      icon: Terminal,
      action: () => { onNavigateTab('dashboard'); onClose(); }
    },
    {
      id: 'cmd-nav-sim',
      title: 'Go to Full-Screen Loss Simulator Workbench',
      category: 'Navigation',
      shortcut: '2',
      icon: Activity,
      action: () => { onNavigateTab('simulator'); onClose(); }
    },
    {
      id: 'cmd-nav-runs',
      title: 'Go to Investigation History (Analysis Runs)',
      category: 'Navigation',
      shortcut: '3',
      icon: Layers,
      action: () => { onNavigateTab('runs'); onClose(); }
    },
    {
      id: 'cmd-nav-knowledge',
      title: 'Go to Evidence Library & DOIs',
      category: 'Navigation',
      shortcut: '4',
      icon: BookOpen,
      action: () => { onNavigateTab('knowledge'); onClose(); }
    },
    {
      id: 'cmd-theme-modal',
      title: 'Customize UI Themes, Particles & Audio SFX',
      category: 'Theme',
      shortcut: 'P',
      icon: Palette,
      action: () => { onOpenThemeModal(); onClose(); }
    },
    {
      id: 'cmd-run-tests',
      title: 'Execute Complete 14-Point System Verification Suite',
      category: 'System',
      shortcut: 'V',
      icon: ShieldCheck,
      action: () => { onOpenTestModal(); onClose(); }
    }
  ];

  const filtered = commands.filter(c => 
    !query.trim() ||
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          playClickSound();
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-xl w-full flex flex-col overflow-hidden shadow-2xl space-y-0 text-xs font-sans">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#212936] bg-[#0F141C]">
          <Search className="w-4 h-4 text-[#38BDF8] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search action... (e.g. Simulation, Export, Circuit, Theme)"
            className="w-full bg-transparent text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none font-sans"
          />
          <span className="px-1.5 py-0.5 rounded bg-[#161D27] text-[#94A3B8] border border-[#212936] text-[9px] font-mono">
            ESC
          </span>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-[#94A3B8] font-mono text-xs">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full px-3 py-2 rounded-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#38BDF8]/15 border-l-2 border-[#38BDF8] text-[#F1F5F9]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
                    <span className="text-xs truncate font-medium text-[#F1F5F9]">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-[9px]">
                    <span className="text-[#94A3B8] uppercase">{item.category}</span>
                    {item.shortcut && (
                      <span className="px-1.5 py-0.2 rounded bg-[#0F141C] text-[#38BDF8] border border-[#212936]">
                        {item.shortcut}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="w-3 h-3 text-[#38BDF8]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 border-t border-[#212936] bg-[#0F141C] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#10B981] flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3" />
            NexusAI Spotlight Core
          </span>
        </div>
      </div>
    </div>
  );
};
export default CommandPaletteModal;
