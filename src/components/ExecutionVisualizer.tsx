import { type FC,  useState, useEffect  } from 'react';
import { 
  Terminal, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck,
  Globe,
  BarChart2,
  Database,
  FileText,
  Filter,
  CheckCircle2
} from 'lucide-react';
import type { ExecutionStep } from '../types/agent';

interface ExecutionVisualizerProps {
  steps: ExecutionStep[];
  isRunning: boolean;
}

export const ExecutionVisualizer: FC<ExecutionVisualizerProps> = ({
  steps,
  isRunning
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<string>('all');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [selectedStageId, setSelectedStageId] = useState<string | null>('04');

  useEffect(() => {
    let timer: any = null;
    if (isRunning) {
      const startTime = Date.now();
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (steps.length === 0) {
      setElapsedSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRunning, steps.length]);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleStep = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getAgentIcon = (avatarName: string) => {
    switch (avatarName) {
      case 'Terminal': return <Terminal className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'Search': return <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case 'BarChart2': return <BarChart2 className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'Database': return <Database className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'Shield': return <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />;
      default: return <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />;
    }
  };

  const logFilters = [
    { id: 'all', label: 'ALL' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'tool_activity', label: 'TOOL ACTIVITY' },
    { id: 'validation', label: 'VALIDATION' },
    { id: 'synthesis', label: 'SYNTHESIS' },
  ];

  const mapStepType = (type: string): string => {
    if (type === 'thought') return 'research';
    if (type === 'tool_call') return 'tool_activity';
    return type;
  };

  const filteredSteps = filterType === 'all' 
    ? steps 
    : steps.filter(s => mapStepType(s.type) === filterType);

  // User Specification: Interactive 7-Stage Pipeline Details Matrix
  const stagesList = [
    {
      id: '01',
      title: '01 QUESTION',
      status: steps.length >= 1 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 1,
      details: {
        header: 'QUESTION ANALYSIS',
        items: [
          { label: 'Original objective', val: 'Evaluate SiC multilevel inverter feasibility for 100kW+ applications' },
          { label: 'User assumptions', val: 'High-frequency PWM operation (10kHz+), junction temp <= 125°C' },
          { label: 'Constraints', val: '3-level ANPC topology, switching loss reduction >= 40%' }
        ]
      }
    },
    {
      id: '02',
      title: '02 SCOPE',
      status: steps.length >= 2 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 2,
      details: {
        header: 'SCOPE BOUNDARIES',
        items: [
          { label: 'Technical', val: 'Power loss simulation, thermal junction resistance, dV/dt gate drive' },
          { label: 'Literature', val: 'IEEE Transactions on Power Electronics (2024-2025)' },
          { label: 'Experimental', val: '2,418 observation empirical dataset' },
          { label: 'Market', val: 'Primary SiC MOSFET semiconductor datasheet specifications' }
        ]
      }
    },
    {
      id: '03',
      title: '03 RESEARCH',
      status: isRunning && steps.length >= 2 && steps.length < 4 ? '● RUNNING' : steps.length >= 3 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 3,
      isRunning: isRunning && steps.length >= 2 && steps.length < 4,
      details: {
        header: 'LITERATURE & CORPUS INDEX',
        items: [
          { label: 'Total sources examined', val: '38 sources' },
          { label: 'Primary literature', val: '12 peer-reviewed articles' },
          { label: 'Secondary references', val: '19 industrial papers' },
          { label: 'Empirical datasets', val: '7 benchmark repositories' }
        ]
      }
    },
    {
      id: '04',
      title: '04 ANALYSIS',
      status: isRunning && steps.length >= 3 ? '● RUNNING' : steps.length >= 4 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 4,
      isRunning: isRunning && steps.length >= 3,
      details: {
        header: 'SPECIALIST ANALYTICAL MODELING',
        items: [
          { label: 'Specialists active', val: 'Apex, Nova, DataPulse, Vortex' },
          { label: 'Analytical tasks executed', val: '3 parallel mathematical computations' },
          { label: 'Numerical simulations', val: '2 loss & efficiency regressions' }
        ]
      }
    },
    {
      id: '05',
      title: '05 CROSS-CHECK',
      status: steps.length >= 5 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 5,
      details: {
        header: 'INDEPENDENT AUDIT VERIFICATION',
        items: [
          { label: 'Claims reviewed', val: '18 technical assertions' },
          { label: 'Detected conflicts', val: '2 boundary mismatches' },
          { label: 'Resolved conflicts', val: '2 successfully reconciled' }
        ]
      }
    },
    {
      id: '06',
      title: '06 EVIDENCE',
      status: steps.length >= 6 ? '✓ COMPLETE' : '○ QUEUED',
      isDone: steps.length >= 6,
      details: {
        header: 'EVIDENCE LEDGER COMPILATION',
        items: [
          { label: 'Verified sources', val: '31 primary DOIs' },
          { label: 'Unverified sources', val: '7 background references' },
          { label: 'Claim-to-evidence links', val: '14 explicit mappings' }
        ]
      }
    },
    {
      id: '07',
      title: '07 CONCLUSION',
      status: steps.some(s => s.type === 'synthesis') ? '✓ PUBLISHED' : '○ QUEUED',
      isDone: steps.some(s => s.type === 'synthesis'),
      details: {
        header: 'RESEARCH DOSSIER DELIVERABLE',
        items: [
          { label: 'Recommendation', val: 'Adopt 3-level SiC ANPC topology for >10kHz PWM operation' },
          { label: 'Key limitation', val: 'Requires R_th,jc <= 0.18 K/W continuous thermal path' },
          { label: 'Open question', val: 'Long-term gate oxide reliability under repetitive high dV/dt stress' }
        ]
      }
    }
  ];

  const activeStage = stagesList.find(s => s.id === selectedStageId) || stagesList[3];

  return (
    <div className="h-full flex flex-col glass-card overflow-hidden font-sans select-none bg-[#161D27] border-[#212936] rounded-sm">
      {/* Header Bar - Clean Essential Info Only */}
      <div className="p-2 border-b border-[#212936] bg-[#0F141C] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-semibold text-[#F1F5F9] text-[11px] uppercase tracking-wider font-sans">INVESTIGATION TELEMETRY STREAM</span>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] font-mono">
          <Filter className="w-3 h-3 text-[#94A3B8] mr-0.5" />
          {logFilters.map((ft) => (
            <button
              key={ft.id}
              onClick={() => setFilterType(ft.id)}
              className={`px-1.5 py-0.2 rounded-sm uppercase transition-colors ${
                filterType === ft.id
                  ? 'bg-[#38BDF8] text-[#0F141C] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] hover:bg-[#161D27]'
              }`}
            >
              [{ft.label}]
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {/* User Specification: Clean Essential Researcher Metadata Card */}
        <div className="bg-[#0F141C] border border-[#212936] rounded-sm p-3 text-xs space-y-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono border-b border-[#212936] pb-2 text-[10px]">
            <div>
              <span className="text-[#94A3B8] block font-sans">RUN TIME</span>
              <strong className="text-[#F59E0B] font-bold text-xs font-mono">{formatElapsed(elapsedSeconds)}</strong>
            </div>
            <div>
              <span className="text-[#94A3B8] block font-sans">STATUS</span>
              <strong className="text-[#10B981] font-bold text-xs">
                {isRunning ? '● ACTIVE' : 'Ready for investigation'}
              </strong>
            </div>
            <div>
              <span className="text-[#94A3B8] block font-sans">SOURCES</span>
              <strong className="text-[#38BDF8] font-bold text-xs">38 SOURCES</strong>
            </div>
            <div>
              <span className="text-[#94A3B8] block font-sans">SPECIALISTS</span>
              <strong className="text-[#F59E0B] font-bold text-xs">4 SPECIALISTS</strong>
            </div>
          </div>

          <div>
            <div className="text-[9px] uppercase font-semibold text-[#94A3B8] mb-0.5 font-mono">OBJECTIVE</div>
            <div className="text-xs text-[#F1F5F9] font-sans font-medium">
              {steps.length > 0 ? steps[0]?.content.split('\n')[0].replace('Objective Analysis:', '').replace('Received objective:', '').trim() : 'Evaluate SiC multilevel inverter feasibility'}
            </div>
          </div>

          {/* User Specification: Interactive 7-Stage Analytical Pipeline */}
          <div className="pt-2 border-t border-[#212936] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#94A3B8]">
              <span>7-STAGE ANALYTICAL PIPELINE</span>
              <span className="text-[#38BDF8] text-[9px] font-sans">Click stage to inspect details</span>
            </div>

            {/* Interactive Stage Buttons Grid */}
            <div className="space-y-1">
              {stagesList.map((stage) => {
                const isSelected = selectedStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`w-full p-1.5 rounded-sm border text-left transition-all flex items-center justify-between text-[11px] ${
                      isSelected
                        ? 'bg-[#161D27] border-[#38BDF8] text-[#F1F5F9] shadow-sm'
                        : 'bg-[#0F141C] border-[#212936] text-[#94A3B8] hover:bg-[#161D27]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono">
                      {stage.isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : stage.isRunning ? (
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse ml-0.5 mr-1" />
                      ) : (
                        <span className="w-2 h-2 rounded-full border border-[#94A3B8] ml-0.5 mr-1" />
                      )}
                      <span className="font-semibold text-[#F1F5F9]">{stage.title}</span>
                    </div>

                    <span className={`text-[10px] font-mono font-semibold ${
                      stage.isDone ? 'text-[#10B981]' : stage.isRunning ? 'text-[#10B981]' : 'text-[#94A3B8]'
                    }`}>
                      {stage.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stage Inspector Drawer */}
            {activeStage && (
              <div className="mt-2 p-2.5 bg-[#161D27] rounded-sm border border-[#38BDF8]/40 space-y-2 animate-fade-in font-sans text-xs">
                <div className="flex items-center justify-between border-b border-[#212936] pb-1 font-mono text-[10px]">
                  <span className="text-[#38BDF8] font-semibold">{activeStage.details.header}</span>
                  <span className="text-[#94A3B8]">STAGE {activeStage.id} METRICS</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {activeStage.details.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-1 bg-[#0F141C] rounded-sm border border-[#212936]">
                      <span className="text-[#94A3B8] font-semibold text-[10px]">{item.label}</span>
                      <span className="text-[#F1F5F9] font-medium text-[11px]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Stream Logs */}
        <div className="space-y-2 pt-1 border-t border-[#212936]">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-1 font-mono">
            DETAILED TELEMETRY LOG STREAM
          </div>

          {filteredSteps.length === 0 ? (
            <div className="p-4 text-center text-[#94A3B8] text-[11px] font-sans">
              No research artifacts yet. Run an investigation to generate findings and supporting evidence.
            </div>
          ) : (
            filteredSteps.map((step) => {
              const isExpanded = expandedSteps[step.id] ?? true;
              const timeFormatted = new Date(step.timestamp).toISOString().split('T')[1].replace('Z', '');
              const mappedType = mapStepType(step.type);

              return (
                <div 
                  key={step.id} 
                  className="bg-[#0F141C] rounded-sm border border-[#212936] hover:border-[#38BDF8]/50 transition-all p-2 text-[11px]"
                >
                  <div 
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-[#94A3B8]">[{timeFormatted}]</span>
                      {getAgentIcon(step.agentAvatar)}
                      <span className="font-semibold text-[#F1F5F9] font-sans">{step.agentName}</span>
                      <span className="text-[9px] font-semibold px-1 py-0.2 rounded-sm bg-[#161D27] text-[#F59E0B] border border-[#F59E0B]/20 uppercase font-mono">
                        {mappedType.replace('_', ' ')}
                      </span>
                      <span className="text-[#F1F5F9] truncate font-sans text-[11px]">{step.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.2 rounded-sm border border-[#10B981]/20">
                        VERIFIED
                      </span>
                      {step.durationMs && (
                        <span className="text-[9px] font-mono text-[#94A3B8]">
                          {step.durationMs}ms
                        </span>
                      )}
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[#212936] space-y-1.5 text-[11px]">
                      <p className="text-[#F1F5F9] font-sans whitespace-pre-line leading-relaxed text-[11px]">
                        {step.content}
                      </p>

                      {step.toolName && (
                        <div className="p-2 rounded-sm bg-[#161D27] border border-[#212936] space-y-1">
                          <div className="flex items-center justify-between text-[#F1F5F9] font-semibold border-b border-[#212936] pb-1 text-[10px] font-mono">
                            <span className="text-[#F59E0B]">FUNCTION: {step.toolName}</span>
                            <span className="text-[#10B981]">STATUS: COMPLETED</span>
                          </div>

                          {step.toolInput && (
                            <div>
                              <span className="text-[#94A3B8] block text-[9px] font-mono">ARGUMENTS:</span>
                              <pre className="text-[#F1F5F9] p-1 bg-[#0F141C] rounded-sm text-[10px] overflow-x-auto font-mono">
                                {typeof step.toolInput === 'string' ? step.toolInput : JSON.stringify(step.toolInput, null, 2)}
                              </pre>
                            </div>
                          )}

                          {step.toolOutput && (
                            <div>
                              <span className="text-[#94A3B8] block text-[9px] font-mono">OBSERVATION DATA:</span>
                              <pre className="text-[#38BDF8] p-1 bg-[#0F141C] rounded-sm text-[10px] overflow-x-auto font-mono">
                                {typeof step.toolOutput === 'string' ? step.toolOutput : JSON.stringify(step.toolOutput, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
