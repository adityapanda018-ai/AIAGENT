import { type FC,  useState  } from 'react';
import { X, CheckCircle2, ShieldCheck, Database, Table } from 'lucide-react';
import { getClaimRelationalTrace } from '../services/evidenceDatabase';

interface ClaimTraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
  claimText?: string;
  supportedBy?: string[];
}

export const ClaimTraceModal: FC<ClaimTraceModalProps> = ({
  isOpen,
  onClose,
  claimId = 'CLAIM C-014'
}) => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'tables'>('provenance');

  if (!isOpen) return null;

  const trace = getClaimRelationalTrace(claimId);
  const { claim, evidenceList, verificationList } = trace;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="font-bold text-[#F59E0B] text-xs">{claim.claim_id}</span>
            <span className="text-[9px] text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm border border-[#10B981]/20 font-sans">
              STATUS: {claim.status}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('provenance')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'provenance'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [PROVENANCE FLOW]
            </button>

            <button
              onClick={() => setActiveTab('tables')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'tables'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [RELATIONAL TABLES]
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {activeTab === 'provenance' ? (
            /* User Specification: 5-Tier ASCII Provenance Diagram & Evidence Excerpts */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] space-y-4">
              {/* ASCII Diagram Box */}
              <div className="font-mono text-center space-y-1">
                <span className="text-[#F59E0B] font-bold text-xs">{claim.claim_id}</span>
                <pre className="text-[#38BDF8] font-bold text-[10px] leading-tight select-none">
{`        ↓
┌───────────────────────────────────────────────────────────┐
│ ${claim.claim_text.slice(0, 56)}... │
└───────────────────────────────────────────────────────────┘
        ↓
 ┌──────┼─────────┐
 ↓      ↓         ↓
Paper  Dataset   Datasheet
        ↓
   Verification
        ↓
 ┌──────┼───────┐
Apex   Nova   DataPulse
        ↓
   FINAL STATUS: ${claim.status}`}
                </pre>
              </div>

              {/* Relational Evidence Excerpts */}
              <div className="space-y-2 font-mono text-[10px]">
                <span className="text-[#94A3B8] font-bold uppercase block border-b border-[#212936] pb-1">
                  EVIDENCE EXCERPTS ({evidenceList.length} SOURCES)
                </span>
                {evidenceList.map((ev) => (
                  <div key={ev.evidence_id} className="p-2.5 bg-[#161D27] rounded-sm border border-[#212936] space-y-1">
                    <div className="flex items-center justify-between text-[#F59E0B] font-bold">
                      <span>[{ev.evidence_id}] {ev.source_title}</span>
                      <span className="text-[#38BDF8]">{ev.page}</span>
                    </div>
                    <p className="text-[#F1F5F9] font-sans text-[11px] leading-relaxed">
                      "{ev.excerpt}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Specialist Verifications */}
              <div className="space-y-2 font-mono text-[10px] pt-2 border-t border-[#212936]">
                <span className="text-[#94A3B8] font-bold uppercase block border-b border-[#212936] pb-1">
                  SPECIALIST VERIFICATIONS ({verificationList.length} AUDITS)
                </span>
                {verificationList.map((vr) => (
                  <div key={vr.verification_id} className="p-2 bg-[#161D27] rounded-sm border border-[#212936] flex items-center justify-between text-[11px]">
                    <div className="space-y-0.5">
                      <strong className="text-[#F1F5F9] font-mono">{vr.specialist} Specialist</strong>
                      <p className="text-[#CBD5E1] text-[10px] font-sans">{vr.reason}</p>
                    </div>
                    <span className="text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {vr.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* User Specification: Exact Relational Database Tables (claims, evidence, verification) */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] space-y-4 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#38BDF8]" />
                  RELATIONAL DATABASE SCHEMA TABLES
                </span>
                <span className="text-[9px] text-[#10B981]">PROVENANCE DB</span>
              </div>

              {/* TABLE 1: claims */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#F59E0B] font-bold uppercase">
                  <Table className="w-3.5 h-3.5" />
                  <span>TABLE: claims</span>
                </div>
                <div className="overflow-x-auto border border-[#212936] rounded-sm">
                  <table className="w-full text-left border-collapse text-[9px]">
                    <thead>
                      <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                        <th className="p-1.5">claim_id</th>
                        <th className="p-1.5">investigation_id</th>
                        <th className="p-1.5">claim_type</th>
                        <th className="p-1.5">status</th>
                        <th className="p-1.5">confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                      <tr>
                        <td className="p-1.5 font-bold text-[#F59E0B]">{claim.claim_id}</td>
                        <td className="p-1.5">{claim.investigation_id}</td>
                        <td className="p-1.5 text-[#38BDF8]">{claim.claim_type}</td>
                        <td className="p-1.5 text-[#10B981] font-bold">{claim.status}</td>
                        <td className="p-1.5">{claim.confidence}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: evidence */}
              <div className="space-y-1 pt-2 border-t border-[#212936]">
                <div className="flex items-center gap-1.5 text-[#38BDF8] font-bold uppercase">
                  <Table className="w-3.5 h-3.5" />
                  <span>TABLE: evidence</span>
                </div>
                <div className="overflow-x-auto border border-[#212936] rounded-sm">
                  <table className="w-full text-left border-collapse text-[9px]">
                    <thead>
                      <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                        <th className="p-1.5">evidence_id</th>
                        <th className="p-1.5">claim_id</th>
                        <th className="p-1.5">source_id</th>
                        <th className="p-1.5">excerpt</th>
                        <th className="p-1.5">page</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                      {evidenceList.map((ev) => (
                        <tr key={ev.evidence_id}>
                          <td className="p-1.5 font-bold text-[#38BDF8]">{ev.evidence_id}</td>
                          <td className="p-1.5">{ev.claim_id}</td>
                          <td className="p-1.5 text-[#F59E0B]">{ev.source_id}</td>
                          <td className="p-1.5 truncate max-w-[200px]">{ev.excerpt}</td>
                          <td className="p-1.5">{ev.page}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 3: verification */}
              <div className="space-y-1 pt-2 border-t border-[#212936]">
                <div className="flex items-center gap-1.5 text-[#10B981] font-bold uppercase">
                  <Table className="w-3.5 h-3.5" />
                  <span>TABLE: verification</span>
                </div>
                <div className="overflow-x-auto border border-[#212936] rounded-sm">
                  <table className="w-full text-left border-collapse text-[9px]">
                    <thead>
                      <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                        <th className="p-1.5">verification_id</th>
                        <th className="p-1.5">claim_id</th>
                        <th className="p-1.5">specialist</th>
                        <th className="p-1.5">result</th>
                        <th className="p-1.5">reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                      {verificationList.map((vr) => (
                        <tr key={vr.verification_id}>
                          <td className="p-1.5 font-bold text-[#10B981]">{vr.verification_id}</td>
                          <td className="p-1.5">{vr.claim_id}</td>
                          <td className="p-1.5 font-bold text-[#F1F5F9]">{vr.specialist}</td>
                          <td className="p-1.5 text-[#10B981] font-bold">{vr.result}</td>
                          <td className="p-1.5 truncate max-w-[200px]">{vr.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold"
          >
            Close Trace Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
