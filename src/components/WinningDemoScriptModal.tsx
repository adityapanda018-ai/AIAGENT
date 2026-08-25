import { type FC,  useState  } from 'react';
import { X, Play, CheckCircle2, ArrowRight, BookOpen, ShieldCheck, FileText, BarChart3 } from 'lucide-react';

interface WinningDemoScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoStep: (stepIndex: number) => void;
}

export const WinningDemoScriptModal: FC<WinningDemoScriptModalProps> = ({
  isOpen,
  onClose,
  onRunDemoStep
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: 'Step 1: Set High-Impact Technical Inquiry',
      description: 'Pre-load objective: "Evaluate the feasibility of SiC-based multilevel inverters for 100 kW industrial applications."',
      actionText: 'Load Target Objective',
      icon: FileText
    },
    {
      title: 'Step 2: Trigger Automated 7-Stage Pipeline',
      description: 'Click [START INVESTIGATION] to launch automated specialist execution.',
      actionText: 'Click [START INVESTIGATION]',
      icon: Play
    },
    {
      title: 'Step 3: Observe Live Stage Progress',
      description: 'Watch stages transition: Question ✓ ➔ Scope ✓ ➔ Research ● ➔ Analysis ➔ Check ➔ Evidence ➔ Conclusion.',
      actionText: 'Observe Stage Progress',
      icon: CheckCircle2
    },
    {
      title: 'Step 4: Specialists Working Telemetry',
      description: 'Nova searches 12,482 documents, DataPulse runs JS loss model, Apex audits thermal bounds.',
      actionText: 'Stream Specialist Logs',
      icon: BarChart3
    },
    {
      title: 'Step 5: Inspect 38 Indexed Sources',
      description: 'Click 38 SOURCES to view primary IEEE papers, datasheets, and experimental datasets.',
      actionText: 'Open 38 Sources Library',
      icon: BookOpen
    },
    {
      title: 'Step 6: Algorithmic Conflict Resolution',
      description: 'View 2 research conflicts detected ➔ 2 conflicts algorithmically reconciled (Normalized η = 97.8%).',
      actionText: 'Inspect Conflict Reconciliation',
      icon: ShieldCheck
    },
    {
      title: 'Step 7: Traceable Findings (Click 42%)',
      description: 'Click "42%" in Findings to open the right-side Claim Trace slide-over drawer.',
      actionText: 'Click "42%" Claim Trace',
      icon: ArrowRight
    },
    {
      title: 'Step 8: Present Final Deliverable Dossier',
      description: 'Click [VIEW DOSSIER] to inspect the 11-section deliverable report with PDF export.',
      actionText: 'Click [VIEW DOSSIER]',
      icon: FileText
    }
  ];

  const handleNext = () => {
    onRunDemoStep(currentStep);
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const active = demoSteps[currentStep];
  const StepIcon = active.icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#10B981]/50 rounded-sm max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-[#10B981]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">JUDGE DEMO SCRIPT WALKTHROUGH</h2>
            <span className="text-[9px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-sm border border-[#10B981]/30">
              STEP {currentStep + 1} OF {demoSteps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Step Card */}
        <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] space-y-3">
          <div className="flex items-center gap-2 font-mono text-[#10B981] font-bold text-xs">
            <StepIcon className="w-4 h-4" />
            <span>{active.title}</span>
          </div>

          <p className="text-[#F1F5F9] text-xs font-sans leading-relaxed">
            {active.description}
          </p>

          <div className="pt-2 border-t border-[#212936] flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#94A3B8]">DEMO ACTION:</span>
            <button
              onClick={handleNext}
              className="btn-primary py-1.5 px-3 text-xs bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981] font-bold flex items-center gap-1 font-sans"
            >
              <span>{active.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Steps Progress Dots */}
        <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-[#94A3B8]">
          <div className="flex items-center gap-1">
            {demoSteps.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-[#10B981] w-4'
                    : idx < currentStep
                    ? 'bg-[#38BDF8]'
                    : 'bg-[#212936]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F1F5F9] font-sans"
          >
            Close Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
};
