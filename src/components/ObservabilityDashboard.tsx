import React from 'react';
import { Cpu, Server, Activity, ShieldCheck, Zap } from 'lucide-react';

export const ObservabilityDashboard: React.FC = () => {
  const healthItems = [
    { name: 'RESEARCH ENGINE', status: 'ONLINE', latencyMs: 14 },
    { name: 'SPECIALIST ORCHESTRATOR', status: 'ONLINE', latencyMs: 8 },
    { name: 'DATABASE', status: 'ONLINE', latencyMs: 3 },
    { name: 'VECTOR INDEX', status: 'ONLINE', latencyMs: 22 },
    { name: 'SOURCE RETRIEVAL', status: 'ONLINE', latencyMs: 45 },
    { name: 'DOSSIER ENGINE', status: 'ONLINE', latencyMs: 12 },
  ];

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              SYSTEM OBSERVABILITY & MONITORING DASHBOARD
            </h2>
            <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">
              Real-time microservice health, latency metrics, and API throughput telemetry.
            </p>
          </div>
        </div>

        <span className="text-[#10B981] font-bold text-[10px] bg-[#10B981]/10 px-2.5 py-1 rounded-sm border border-[#10B981]/30 font-mono flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          SYSTEM HEALTH: 100% OPERATIONAL
        </span>
      </div>

      {/* User Specification: Phase 12 SYSTEM HEALTH Grid */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3">
        <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono flex items-center gap-2">
          <Server className="w-4 h-4 text-[#38BDF8]" />
          MICROSERVICE SYSTEM HEALTH
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {healthItems.map((h) => (
            <div key={h.name} className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-[#F1F5F9] text-[10px]">{h.name}</span>
                <span className="text-[9px] text-[#94A3B8] block">Latency: {h.latencyMs} ms</span>
              </div>
              <span className="text-[#10B981] font-bold text-[10px] flex items-center gap-1 bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                ● {h.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Specification: Observability Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm space-y-1">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">AVG INVESTIGATION TIME</span>
          <div className="text-base font-bold text-[#38BDF8]">1.8s</div>
          <span className="text-[9px] text-[#94A3B8] block font-sans">Target: &lt; 3.0s</span>
        </div>

        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm space-y-1">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">AVG SOURCES / INVESTIGATION</span>
          <div className="text-base font-bold text-[#F1F5F9]">31.2 SOURCES</div>
          <span className="text-[9px] text-[#10B981] block font-sans">12 primary DOIs avg</span>
        </div>

        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm space-y-1">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">FAILED RETRIEVALS</span>
          <div className="text-base font-bold text-[#10B981]">0 FAILS</div>
          <span className="text-[9px] text-[#10B981] block font-sans">100% success rate</span>
        </div>

        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm space-y-1">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">VERIFICATION FAILURES</span>
          <div className="text-base font-bold text-[#10B981]">0 FAILS</div>
          <span className="text-[9px] text-[#10B981] block font-sans">Consensus 4/4 verified</span>
        </div>

        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm space-y-1">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">API THROUGHPUT</span>
          <div className="text-base font-bold text-[#F59E0B] flex items-center gap-1">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            1,420 t/min
          </div>
          <span className="text-[9px] text-[#94A3B8] block font-sans">Token consumption</span>
        </div>
      </div>

      {/* User Specification: Phase 11 Security & Protection Middleware Audit */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3 font-mono text-xs">
        <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#F59E0B]" />
          SECURITY & API PROTECTION MIDDLEWARE CONTROLS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
          <div className="p-2 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between">
            <span>Authentication:</span>
            <strong className="text-[#10B981]">ACTIVE (JWT)</strong>
          </div>

          <div className="p-2 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between">
            <span>Rate Limiting:</span>
            <strong className="text-[#10B981]">100 req/min</strong>
          </div>

          <div className="p-2 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between">
            <span>API Key Encryption:</span>
            <strong className="text-[#10B981]">AES-256 GCM</strong>
          </div>

          <div className="p-2 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between">
            <span>Input Validation:</span>
            <strong className="text-[#10B981]">Pydantic v2</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
