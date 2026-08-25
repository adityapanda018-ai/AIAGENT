import { type FC, useState } from 'react';
import { 
  Zap, 
  Layers, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Command, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../services/soundFx';

interface FloatingTelemetryDockProps {
  onOpenCommandPalette: () => void;
  onOpenCircuitTopology: () => void;
  onOpenRunComparison: () => void;
  isSoundActive: boolean;
  onToggleSound: () => void;
  isSplitView: boolean;
  onToggleSplitView: () => void;
}

export const FloatingTelemetryDock: FC<FloatingTelemetryDockProps> = ({
  onOpenCommandPalette,
  onOpenCircuitTopology,
  onOpenRunComparison,
  isSoundActive,
  onToggleSound,
  isSplitView,
  onToggleSplitView
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="fixed bottom-3 right-4 z-40 font-mono select-none flex flex-col items-end space-y-1">
      {/* Expanded Quick Tool Shelf */}
      {isExpanded && (
        <div className="bg-[#161D27]/95 backdrop-blur-md border border-[#38BDF8]/40 rounded-sm p-2 shadow-2xl space-y-1.5 animate-fade-in text-[11px] mb-1">
          <div className="flex items-center justify-between text-[10px] text-[#94A3B8] border-b border-[#212936] pb-1 px-1">
            <span className="flex items-center gap-1 text-[#38BDF8] font-bold">
              <Sparkles className="w-3 h-3" />
              QUICK LAUNCHER DOCK
            </span>
            <span className="text-[#10B981] font-semibold">● 4 SPECIALISTS ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={() => { playClickSound(); onOpenCommandPalette(); }}
              className="px-2 py-1.5 rounded bg-[#0F141C] hover:bg-[#212936] text-[#F1F5F9] border border-[#212936] flex items-center gap-1.5 transition-colors cursor-pointer text-left"
            >
              <Command className="w-3.5 h-3.5 text-[#38BDF8]" />
              <div>
                <span className="block font-bold text-[10px]">Command Palette</span>
                <span className="text-[8px] text-[#94A3B8]">Ctrl + K</span>
              </div>
            </button>

            <button
              onClick={() => { playClickSound(); onOpenCircuitTopology(); }}
              className="px-2 py-1.5 rounded bg-[#0F141C] hover:bg-[#212936] text-[#F1F5F9] border border-[#212936] flex items-center gap-1.5 transition-colors cursor-pointer text-left"
            >
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <div>
                <span className="block font-bold text-[10px]">Circuit Schematic</span>
                <span className="text-[8px] text-[#94A3B8]">3-Level ANPC Leg</span>
              </div>
            </button>

            <button
              onClick={() => { playClickSound(); onOpenRunComparison(); }}
              className="px-2 py-1.5 rounded bg-[#0F141C] hover:bg-[#212936] text-[#F1F5F9] border border-[#212936] flex items-center gap-1.5 transition-colors cursor-pointer text-left"
            >
              <Layers className="w-3.5 h-3.5 text-[#10B981]" />
              <div>
                <span className="block font-bold text-[10px]">Diff Matrix</span>
                <span className="text-[8px] text-[#94A3B8]">0248 vs 0247</span>
              </div>
            </button>

            <button
              onClick={() => { playClickSound(); onToggleSplitView(); }}
              className={`px-2 py-1.5 rounded border flex items-center gap-1.5 transition-colors cursor-pointer text-left ${
                isSplitView
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                  : 'bg-[#0F141C] hover:bg-[#212936] text-[#F1F5F9] border-[#212936]'
              }`}
            >
              {isSplitView ? <Minimize2 className="w-3.5 h-3.5 text-[#38BDF8]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
              <div>
                <span className="block font-bold text-[10px]">Split View</span>
                <span className="text-[8px] text-[#94A3B8]">{isSplitView ? 'Dual Pane On' : 'Single Pane'}</span>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#212936] px-1 text-[9px] text-[#94A3B8]">
            <span>Cache Hit Rate: <strong className="text-[#10B981]">98.4%</strong></span>
            <button
              onClick={() => { playClickSound(); onToggleSound(); }}
              className="flex items-center gap-1 hover:text-[#F1F5F9] cursor-pointer"
            >
              {isSoundActive ? <Volume2 className="w-2.5 h-2.5 text-[#10B981]" /> : <VolumeX className="w-2.5 h-2.5 text-[#EF4444]" />}
              <span>{isSoundActive ? 'Audio ON' : 'Audio Muted'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Pill Floating Bar */}
      <div className="flex items-center gap-2 bg-[#161D27]/90 backdrop-blur-md border border-[#212936] hover:border-[#38BDF8]/60 p-1.5 px-3 rounded-full shadow-xl transition-all">
        {/* Quick Command Trigger */}
        <button
          onClick={() => { playClickSound(); onOpenCommandPalette(); }}
          className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1] hover:text-[#38BDF8] transition-colors cursor-pointer"
          title="Open Command Palette (Ctrl + K)"
        >
          <Command className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-bold">Ctrl+K</span>
        </button>

        <span className="text-[#212936]">|</span>

        {/* Live Active Pulse */}
        <div className="flex items-center gap-1 text-[10px] text-[#10B981] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>4 AGENTS</span>
        </div>

        <span className="text-[#212936]">|</span>

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => { playSwitchSound(); setIsExpanded(!isExpanded); }}
          className="p-0.5 rounded text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
          title={isExpanded ? 'Collapse Dock' : 'Expand Quick Tools'}
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
export default FloatingTelemetryDock;
