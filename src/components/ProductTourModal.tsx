import { type FC, useState } from 'react';
import { 
  X, 
  Sparkles, 
  Terminal, 
  Activity, 
  Zap, 
  Layers, 
  Command, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Compass, 
  Play 
} from 'lucide-react';
import { playClickSound, playSwitchSound, playSuccessSound } from '../services/soundFx';

interface ProductTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSampleRun: () => void;
  onOpenSimulator: () => void;
  onOpenCircuitTopology: () => void;
  onOpenRunComparison: () => void;
  onOpenCommandPalette: () => void;
}

interface TourStep {
  id: number;
  title: string;
  badge: string;
  icon: any;
  headline: string;
  description: string;
  highlightPoints: string[];
  actionLabel?: string;
  onAction?: () => void;
}

export const ProductTourModal: FC<ProductTourModalProps> = ({
  isOpen,
  onClose,
  onStartSampleRun,
  onOpenSimulator,
  onOpenCircuitTopology,
  onOpenRunComparison,
  onOpenCommandPalette
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const tourSteps: TourStep[] = [
    {
      id: 0,
      title: 'WELCOME TO NEXUSAI',
      badge: 'GETTING STARTED',
      icon: Compass,
      headline: 'Next-Generation Autonomous Power Electronics Research Workstation',
      description: 'NexusAI coordinates 4 specialized technical agents (Architecture, Technical Research, Quantitative Analytics, and Synthesis) to conduct rigorous engineering feasibility audits with primary literature citations.',
      highlightPoints: [
        'Multi-agent specialist workflow with strict task contracts',
        'Real-time numerical telemetry and loss calculations',
        'Verified provenance linking to primary IEEE DOIs and datasets'
      ],
      actionLabel: 'Launch Sample Investigation',
      onAction: () => {
        onStartSampleRun();
        onClose();
      }
    },
    {
      id: 1,
      title: 'THE RESEARCH DESK',
      badge: 'STAGE 1: INVESTIGATION',
      icon: Terminal,
      headline: 'Autonomous 7-Stage Multi-Specialist Research Pipeline',
      description: 'Define your engineering objective, select domain scope (Technical, Economic, Thermal, Grid Compliance), and launch investigations across specialist agent contracts.',
      highlightPoints: [
        'Apex: System topology & boundary constraints',
        'Nova: Literature retrieval & IEEE DOI indexing',
        'DataPulse: Loss formulas, harmonic THD & statistics',
        'Vortex: Comprehensive empirical synthesis dossier'
      ]
    },
    {
      id: 2,
      title: 'LOSS & THERMAL SIMULATOR',
      badge: 'STAGE 2: COMPUTATION',
      icon: Activity,
      headline: 'Calibrated IEEE Semiconductor Physics Model',
      description: 'Fine-tune load power (10 kW – 250 kW), PWM carrier frequency (5 kHz – 50 kHz), ambient temperature, and switch between Liquid Cold Plate, Forced Air, and Natural Convection.',
      highlightPoints: [
        'Realistic total loss dissipation & 98.5%–99.4% efficiency curves',
        'Junction temperature ($T_j$) margin check (≤125°C safe limit)',
        '1-click export of executable Python 3.11 simulation code'
      ],
      actionLabel: 'Try Loss Simulator Now',
      onAction: () => {
        onOpenSimulator();
        onClose();
      }
    },
    {
      id: 3,
      title: 'CIRCUIT SCHEMATIC EXPLORER',
      badge: 'STAGE 3: HARDWARE',
      icon: Zap,
      headline: 'Interactive 3-Level ANPC Hardware Schematic',
      description: 'Inspect the active circuit diagram of a 1200V DC-link 3-Level Active Neutral-Point-Clamped inverter bridge.',
      highlightPoints: [
        'Interactive switch nodes ($S_1$ to $S_6$) & clamping paths ($D_1-D_2$)',
        'Click any switch to view 50% voltage stress ($600\\text{V}$), $R_{ds(on)}$, and $E_{sw}$',
        'Validates soft commutation and reduced dv/dt stress on output filters'
      ],
      actionLabel: 'Inspect Circuit Schematic',
      onAction: () => {
        onOpenCircuitTopology();
        onClose();
      }
    },
    {
      id: 4,
      title: 'RUN COMPARISON DIFF MATRIX',
      badge: 'STAGE 4: BENCHMARKING',
      icon: Layers,
      headline: 'Side-by-Side Inverter Architecture Benchmark',
      description: 'Compare primary candidate designs against baseline legacy hardware with color-coded positive/negative deltas.',
      highlightPoints: [
        'Investigation 0248 (SiC 3-Level ANPC) vs Investigation 0247 (Silicon IGBT 2-Level)',
        '+4.10% Efficiency gain & -83.5% Loss reduction',
        '8.4-Month economic capital amortization payback analysis'
      ],
      actionLabel: 'Open Diff Matrix',
      onAction: () => {
        onOpenRunComparison();
        onClose();
      }
    },
    {
      id: 5,
      title: 'POWER USER CONTROLS',
      badge: 'STAGE 5: PRODUCTIVITY',
      icon: Command,
      headline: 'Keyboard-First Command Palette & Quantum HUD',
      description: 'Navigate the entire platform at the speed of thought without touching your mouse.',
      highlightPoints: [
        'Press Ctrl + K (or Cmd + K) to launch any tool, agent, or export',
        'Export to Jupyter Notebook (.ipynb) and IEEE LaTeX Paper (.tex)',
        'Customizable Quantum Neural Particle Mesh and in-browser Audio SFX'
      ],
      actionLabel: 'Open Command Palette (Ctrl+K)',
      onAction: () => {
        onOpenCommandPalette();
        onClose();
      }
    }
  ];

  const active = tourSteps[currentStep];
  const Icon = active.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      playSwitchSound();
      setCurrentStep(prev => prev + 1);
    } else {
      playSuccessSound();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      playSwitchSound();
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-2xl w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-6 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-3 font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              NEXUSAI PRODUCT TOUR & ONBOARDING GUIDE
            </h2>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1.5 font-mono">
          {tourSteps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { playSwitchSound(); setCurrentStep(idx); }}
              className={`flex-1 h-1.5 rounded-full transition-all cursor-pointer ${
                currentStep === idx 
                  ? 'bg-[#38BDF8] shadow-sm shadow-[#38BDF8]/50' 
                  : idx < currentStep 
                    ? 'bg-[#10B981]' 
                    : 'bg-[#212936]'
              }`}
              title={`Go to Step ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-sm space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-[9px] font-bold">
              {active.badge} • STEP {currentStep + 1} OF {tourSteps.length}
            </span>
            <span className="text-[10px] text-[#94A3B8] font-bold">{active.title}</span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="p-2.5 bg-[#161D27] border border-[#38BDF8]/40 rounded-sm shrink-0">
              <Icon className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#F1F5F9] font-sans">{active.headline}</h3>
              <p className="text-[11px] text-[#CBD5E1] font-sans leading-relaxed">
                {active.description}
              </p>
            </div>
          </div>

          {/* Highlight Bullets */}
          <div className="space-y-1.5 pt-2 border-t border-[#212936]">
            {active.highlightPoints.map((pt, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-[#CBD5E1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* Optional Direct Feature Action Button */}
          {active.actionLabel && active.onAction && (
            <div className="pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  active.onAction!();
                }}
                className="btn-secondary w-full py-1.5 text-xs text-[#38BDF8] hover:border-[#38BDF8] border-[#38BDF8]/30 bg-[#38BDF8]/5 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{active.actionLabel}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="pt-2 border-t border-[#212936] flex items-center justify-between font-mono text-[11px]">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="btn-secondary py-1 px-3 text-xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="btn-primary py-1 px-4 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductTourModal;
