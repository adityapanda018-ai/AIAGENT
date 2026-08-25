
import { History, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const auditLogs = [
    { time: '19:02:11', event: 'Investigation created', details: 'Target inquiry loaded into FastAPI orchestrator.' },
    { time: '19:02:14', event: 'Research plan generated', details: 'Vector query plan dispatched across 4 specialist contracts.' },
    { time: '19:02:18', event: '12 primary sources retrieved', details: '38 total sources fetched from IEEE Xplore and Zenodo.' },
    { time: '19:02:27', event: 'Nova analysis completed', details: 'DOI indexing and claim C-014 extraction finished.' },
    { time: '19:02:31', event: 'DataPulse analysis completed', details: 'V8 loss regression model executed (42% reduction verified).' },
    { time: '19:02:35', event: 'Conflict C-018 detected', details: 'Discrepancy identified between 8kHz (97.2%) and 10kHz (98.1%).' },
    { time: '19:02:42', event: 'Conflict resolved', details: 'Operating conditions normalized to 10kHz @ 25°C → η = 97.8%.' },
    { time: '19:02:48', event: 'Evidence verification completed', details: 'Relational evidence store consensus achieved (4/4 passed).' },
    { time: '19:02:52', event: 'Dossier generated', details: '16-section deliverable report published with audit hash.' },
  ];

  return (
    <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-sm space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#212936] pb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#10B981]" />
          <h3 className="font-bold text-[#F1F5F9] uppercase tracking-wider text-xs">
            16. AUDITABLE RESEARCH TRAIL
          </h3>
        </div>
        <span className="text-[9px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30 font-bold flex items-center gap-1 font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          AUDITABLE RESEARCH VERIFIED
        </span>
      </div>

      <div className="space-y-1.5 text-[10px]">
        {auditLogs.map((log, idx) => (
          <div key={idx} className="p-2 bg-[#161D27] rounded-sm border border-[#212936] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#38BDF8] font-bold">{log.time}</span>
              <strong className="text-[#F1F5F9] font-sans text-[11px]">{log.event}</strong>
              <span className="text-[#94A3B8] font-sans text-[10px] hidden sm:inline">— {log.details}</span>
            </div>
            <span className="text-[#10B981] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              ✓
            </span>
          </div>
        ))}
      </div>

      {/* QR Code Reopen Badge */}
      <div className="pt-2 border-t border-[#212936] flex items-center justify-between text-[10px] text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-[#38BDF8]" />
          <span>REOPEN DIGITAL INVESTIGATION ID: <strong className="text-[#F59E0B]">INV-0248-SHA256</strong></span>
        </div>
        <span className="text-[#10B981]">SHA256-DOSSIER-VERIFIED-2026</span>
      </div>
    </div>
  );
};
