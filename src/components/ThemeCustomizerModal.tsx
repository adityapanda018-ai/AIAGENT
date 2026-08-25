import { type FC } from 'react';
import { 
  X, 
  Palette, 
  Grid, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Layout, 
  Volume2, 
  VolumeX, 
  Radio, 
  Activity 
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../services/soundFx';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
  currentBackground: string;
  onSelectBackground: (bg: string) => void;
  currentHighlight: string;
  onSelectHighlight: (hl: string) => void;
  particleIntensity: 'off' | 'subtle' | 'high';
  onSelectParticleIntensity: (intensity: 'off' | 'subtle' | 'high') => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isHologramMode: boolean;
  onToggleHologram: () => void;
  onResetDefaults: () => void;
}

export const ThemeCustomizerModal: FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  currentBackground,
  onSelectBackground,
  currentHighlight,
  onSelectHighlight,
  particleIntensity,
  onSelectParticleIntensity,
  isSoundEnabled,
  onToggleSound,
  isHologramMode,
  onToggleHologram,
  onResetDefaults
}) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'dark', name: 'Dark Cyber', desc: 'Default navy slate with cyan accents', color: 'bg-[#0F141C] border-[#38BDF8]' },
    { id: 'matrix', name: 'Matrix Phosphor', desc: 'Hacker terminal phosphor green', color: 'bg-[#021207] border-[#00FF66]' },
    { id: 'titanium', name: 'Arctic Titanium', desc: 'Deep navy enterprise cyber blue', color: 'bg-[#080D1A] border-[#38BDF8]' },
    { id: 'emerald', name: 'Emerald Obsidian', desc: 'Deep jade green research mode', color: 'bg-[#061A14] border-[#10B981]' },
    { id: 'amber', name: 'Solar Amber', desc: 'Warm gold graphite dark mode', color: 'bg-[#1C1306] border-[#F59E0B]' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'Electric purple & synthwave glow', color: 'bg-[#13091F] border-[#A855F7]' },
    { id: 'amoled', name: 'AMOLED Pure Black', desc: 'Pitch black #000000 high contrast', color: 'bg-[#000000] border-[#525252]' },
    { id: 'light', name: 'Light Professional', desc: 'Clean enterprise presentation theme', color: 'bg-[#F8FAFC] border-[#0284C7]' }
  ];

  const backgrounds = [
    { id: 'plain', name: 'Clean Solid', desc: 'Solid uniform dark background', icon: Layout },
    { id: 'grid', name: 'Cyber Grid', desc: '32px blueprint technical grid lines', icon: Grid },
    { id: 'dots', name: 'Dot Matrix Mesh', desc: 'Subtle engineering dot array', icon: Sparkles },
    { id: 'glow', name: 'Radial Cyan Glow', desc: 'Ambient top-down lighting gradient', icon: Palette }
  ];

  const highlights = [
    { id: 'cyan', name: 'Electric Cyan', hex: '#38BDF8' },
    { id: 'emerald', name: 'Emerald Mint', hex: '#10B981' },
    { id: 'amber', name: 'Warm Amber', hex: '#F59E0B' },
    { id: 'violet', name: 'Neon Violet', hex: '#A855F7' },
    { id: 'rose', name: 'Crimson Rose', hex: '#F43F5E' },
    { id: 'orange', name: 'Sunset Orange', hex: '#FB923C' }
  ];

  const handleThemeClick = (themeId: string) => {
    playSwitchSound();
    onSelectTheme(themeId);
  };

  const handleHighlightClick = (hlId: string) => {
    playClickSound();
    onSelectHighlight(hlId);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl space-y-3.5 p-5 text-xs font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2.5 font-mono">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              QUANTUM HUD & THEME CUSTOMIZER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* UNIQUE SECTION: QUANTUM EFFECTS & SOUND */}
          <div className="p-3 bg-[#0F141C] border border-[#38BDF8]/30 rounded-sm space-y-3 font-mono">
            <span className="text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SPECIAL SCI-FI QUANTUM HUD EFFECTS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
              {/* Particle Intensity */}
              <div className="p-2 bg-[#161D27] border border-[#212936] rounded-sm space-y-1.5">
                <span className="text-[#94A3B8] block flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#38BDF8]" />
                  Neural Particle Mesh
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {(['off', 'subtle', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => { playClickSound(); onSelectParticleIntensity(lvl); }}
                      className={`py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                        particleIntensity === lvl
                          ? 'bg-[#38BDF8] text-[#0F141C]'
                          : 'bg-[#0F141C] text-[#94A3B8] hover:bg-[#212936]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cyber Synthesizer Sound */}
              <div className="p-2 bg-[#161D27] border border-[#212936] rounded-sm space-y-1.5">
                <span className="text-[#94A3B8] block flex items-center gap-1">
                  {isSoundEnabled ? <Volume2 className="w-3 h-3 text-[#10B981]" /> : <VolumeX className="w-3 h-3 text-[#94A3B8]" />}
                  Cyber Audio Feedback
                </span>
                <button
                  onClick={() => { playClickSound(); onToggleSound(); }}
                  className={`w-full py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                    isSoundEnabled
                      ? 'bg-[#10B981] text-[#0F141C]'
                      : 'bg-[#0F141C] text-[#94A3B8] hover:bg-[#212936]'
                  }`}
                >
                  {isSoundEnabled ? '🔊 Audio Active' : '🔇 Muted'}
                </button>
              </div>

              {/* Hologram Scanlines */}
              <div className="p-2 bg-[#161D27] border border-[#212936] rounded-sm space-y-1.5">
                <span className="text-[#94A3B8] block flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#A855F7]" />
                  CRT Scanline Filter
                </span>
                <button
                  onClick={() => { playClickSound(); onToggleHologram(); }}
                  className={`w-full py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                    isHologramMode
                      ? 'bg-[#A855F7] text-[#FAF5FF]'
                      : 'bg-[#0F141C] text-[#94A3B8] hover:bg-[#212936]'
                  }`}
                >
                  {isHologramMode ? '📺 CRT Filter ON' : 'Off (Clean)'}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 1: UI THEMES */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Select UI Theme Preset</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {themes.map((t) => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeClick(t.id)}
                    className={`p-2.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                      isSelected
                        ? 'border-[#38BDF8] bg-[#0F141C] shadow-md ring-1 ring-[#38BDF8]/50'
                        : 'border-[#212936] bg-[#0F141C]/60 hover:bg-[#0F141C] hover:border-[#38BDF8]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-3.5 h-3.5 rounded-full border ${t.color}`} />
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#38BDF8]" />}
                    </div>
                    <div>
                      <span className="font-bold text-[11px] text-[#F1F5F9] block">{t.name}</span>
                      <span className="text-[9px] text-[#94A3B8] line-clamp-1">{t.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: BACKGROUND TEXTURE */}
          <div className="space-y-2 pt-2 border-t border-[#212936]">
            <label className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <span>2. Select Background Texture</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {backgrounds.map((bg) => {
                const IconComp = bg.icon;
                const isSelected = currentBackground === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => { playClickSound(); onSelectBackground(bg.id); }}
                    className={`p-2 rounded-sm border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'border-[#38BDF8] bg-[#0F141C] text-[#38BDF8]'
                        : 'border-[#212936] bg-[#0F141C]/60 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C]'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-bold text-[10px] block truncate">{bg.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: HIGHLIGHT ACCENT COLOR */}
          <div className="space-y-2 pt-2 border-t border-[#212936]">
            <label className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <span>3. Highlight & Active Accent Color</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {highlights.map((hl) => {
                const isSelected = currentHighlight === hl.id;
                return (
                  <button
                    key={hl.id}
                    onClick={() => handleHighlightClick(hl.id)}
                    className={`px-3 py-1.5 rounded-sm border text-[11px] font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#F1F5F9] bg-[#0F141C] text-[#F1F5F9] shadow-sm'
                        : 'border-[#212936] bg-[#0F141C]/60 text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hl.hex }} />
                    <span>{hl.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#10B981]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer & Reset Button */}
        <div className="pt-3 border-t border-[#212936] flex items-center justify-between font-mono text-[11px]">
          <button
            onClick={() => { playClickSound(); onResetDefaults(); }}
            className="text-[#94A3B8] hover:text-[#EF4444] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ThemeCustomizerModal;
