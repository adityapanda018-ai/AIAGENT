import { type FC,  useState  } from 'react';
import { History, BookOpen, Network, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { EvidenceGraphModal } from './EvidenceGraphModal';

interface InvestigationHistoryViewProps {
  onOpenDossier: () => void;
}

export const InvestigationHistoryView: FC<InvestigationHistoryViewProps> = ({
  onOpenDossier
}) => {
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const pastInvestigations = [
    {
      id: '0248',
      title: 'Silicon Carbide (SiC) Multilevel Inverter Feasibility',
      status: 'Completed',
      sources: 38,
      conflicts: 2,
      specialists: 4,
      duration: '12m 42s',
      date: '2026-08-25'
    },
    {
      id: '0247',
      title: 'Wireless Power Transfer Efficiency Optimization',
      status: 'Completed',
      sources: 27,
      conflicts: 1,
      specialists: 4,
      duration: '8m 15s',
      date: '2026-08-24'
    },
    {
      id: '0246',
      title: 'Fiber-Optic Fault Detection via Machine Learning',
      status: 'Completed',
      sources: 41,
      conflicts: 3,
      specialists: 4,
      duration: '14m 02s',
      date: '2026-08-23'
    },
    {
      id: '0245',
      title: 'Battery Pack Immersion Thermal Management System',
      status: 'Completed',
      sources: 31,
      conflicts: 2,
      specialists: 4,
      duration: '9m 50s',
      date: '2026-08-22'
    }
  ];

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              INVESTIGATION HISTORY & EVIDENCE GRAPH ARCHIVE
            </h2>
            <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">
              Reopen completed research runs, inspect provenance graphs, and export past dossiers.
            </p>
          </div>
        </div>

        <span className="text-[#10B981] font-bold text-[10px] bg-[#10B981]/10 px-2.5 py-1 rounded-sm border border-[#10B981]/30 font-mono flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          4 PAST INVESTIGATIONS ARCHIVED
        </span>
      </div>

      {/* User Specification: Phase 13 Investigation History Cards */}
      <div className="space-y-3">
        {pastInvestigations.map((inv) => (
          <div 
            key={inv.id}
            className="p-4 bg-[#161D27] border border-[#212936] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#38BDF8]/40 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#F59E0B] font-bold text-xs">INVESTIGATION {inv.id}</span>
                <span className="text-[#10B981] font-semibold text-[9px] bg-[#10B981]/10 px-2 py-0.2 rounded border border-[#10B981]/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  {inv.status}
                </span>
                <span className="text-[#94A3B8] text-[10px]">{inv.date}</span>
              </div>

              <h3 className="font-bold text-xs text-[#F1F5F9] font-sans">
                {inv.title}
              </h3>

              <div className="flex items-center gap-4 text-[10px] text-[#94A3B8] font-mono">
                <span>Sources: <strong className="text-[#38BDF8]">{inv.sources}</strong></span>
                <span>Conflicts: <strong className="text-[#F59E0B]">{inv.conflicts}</strong></span>
                <span>Specialists: <strong className="text-[#F1F5F9]">{inv.specialists}</strong></span>
                <span>Duration: <strong className="text-[#CBD5E1]">{inv.duration}</strong></span>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="flex items-center gap-2 font-mono text-[10px] shrink-0">
              <button
                onClick={() => setIsGraphOpen(true)}
                className="px-3 py-1 rounded-sm bg-[#0F141C] text-[#38BDF8] border border-[#38BDF8]/40 hover:bg-[#161D27] flex items-center gap-1 font-sans"
              >
                <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>[EVIDENCE GRAPH]</span>
              </button>

              <button
                onClick={onOpenDossier}
                className="btn-primary py-1 px-3 text-xs bg-[#10B981] text-[#0F141C] border-[#10B981] font-bold flex items-center gap-1 font-sans"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>[VIEW DOSSIER]</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <EvidenceGraphModal
        isOpen={isGraphOpen}
        onClose={() => setIsGraphOpen(false)}
      />
    </div>
  );
};
