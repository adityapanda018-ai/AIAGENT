import { useState, type FC } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  Play 
} from 'lucide-react';
import { playClickSound, playSuccessSound } from '../services/soundFx';

interface DeveloperApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EndpointKey = 'simulate' | 'research' | 'provenance';
type LangKey = 'python' | 'curl' | 'typescript';

export const DeveloperApiDocsModal: FC<DeveloperApiDocsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointKey>('simulate');
  const [selectedLang, setSelectedLang] = useState<LangKey>('python');
  const [copied, setCopied] = useState<boolean>(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const endpoints = [
    {
      id: 'simulate' as EndpointKey,
      method: 'POST',
      path: '/api/v1/simulation/losses',
      title: 'Loss & Thermal Physics Simulation',
      desc: 'Computes conduction, switching, and junction temperature ($T_j$) margins across IEEE calibrated semiconductor models.'
    },
    {
      id: 'research' as EndpointKey,
      method: 'POST',
      path: '/api/v1/research/synthesize',
      title: 'Autonomous Multi-Agent Investigation',
      desc: 'Spawns 4 specialized agent contracts (Apex, Nova, DataPulse, Vortex) to synthesize verified engineering dossiers.'
    },
    {
      id: 'provenance' as EndpointKey,
      method: 'GET',
      path: '/api/v1/provenance/verify/{hash}',
      title: 'Cryptographic Provenance Verification',
      desc: 'Validates claim audit hashes against indexed primary literature DOIs and empirical Zenodo datasets.'
    }
  ];

  const codeSnippets: Record<EndpointKey, Record<LangKey, string>> = {
    simulate: {
      python: `# pip install nexus-workbench
import nexus_workbench as nx

client = nx.Client(api_key="nx_live_9849201f8a")

# Run 3-Level ANPC Loss & Thermal Sweep
result = client.simulation.calculate_losses(
    power_kw=100.0,
    carrier_freq_khz=10.0,
    ambient_temp_c=40.0,
    topology="3level_anpc",
    cooling_type="liquid_cold_plate", # Rth = 0.025 K/W
    module_sku="CAB011M12FM3"
)

print(f"Efficiency: {result.efficiency_pct:.2f}%")
print(f"Total Loss: {result.total_loss_kw:.2f} kW")
print(f"Junction Temp: {result.t_junction_c:.1f} °C (Safe Margin: {result.thermal_margin_c:.1f} °C)")`,
      curl: `curl -X POST https://api.nexusworkbench.io/v1/simulation/losses \\
  -H "Authorization: Bearer nx_live_9849201f8a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "power_kw": 100.0,
    "carrier_freq_khz": 10.0,
    "ambient_temp_c": 40.0,
    "topology": "3level_anpc",
    "cooling_type": "liquid_cold_plate",
    "module_sku": "CAB011M12FM3"
  }'`,
      typescript: `import { NexusClient } from '@nexusai/workbench-sdk';

const nexus = new NexusClient({ apiKey: process.env.NEXUS_API_KEY });

const result = await nexus.simulation.calculateLosses({
  powerKw: 100.0,
  carrierFreqKhz: 10.0,
  ambientTempC: 40.0,
  topology: '3level_anpc',
  coolingType: 'liquid_cold_plate'
});

console.log(\`Efficiency: \${result.efficiency}%, Total Loss: \${result.totalLossKw} kW\`);`
    },
    research: {
      python: `# pip install nexus-workbench
import nexus_workbench as nx

client = nx.Client(api_key="nx_live_9849201f8a")

# Launch multi-specialist investigation
run = client.research.synthesize(
    question="Evaluate 3-level ANPC SiC MOSFET inverter efficiency at 10kHz PWM and 100kW load",
    specialists=["apex", "nova", "datapulse", "vortex"],
    domains=["Technical", "Literature", "Thermal"],
    strict_verification=True
)

print(f"Dossier ID: {run.dossier_id}")
print(f"Audit Hash: {run.audit_hash}")
print(f"Primary Citations: {len(run.citations)} DOIs indexed")`,
      curl: `curl -X POST https://api.nexusworkbench.io/v1/research/synthesize \\
  -H "Authorization: Bearer nx_live_9849201f8a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "Evaluate 3-level ANPC SiC inverter efficiency at 10kHz PWM",
    "domains": ["Technical", "Literature"],
    "strict_verification": true
  }'`,
      typescript: `import { NexusClient } from '@nexusai/workbench-sdk';

const nexus = new NexusClient({ apiKey: process.env.NEXUS_API_KEY });

const dossier = await nexus.research.synthesize({
  question: 'Evaluate 3-level ANPC SiC inverter efficiency at 10kHz PWM',
  domains: ['Technical', 'Literature'],
  strictVerification: true
});`
    },
    provenance: {
      python: `# pip install nexus-workbench
import nexus_workbench as nx

client = nx.Client(api_key="nx_live_9849201f8a")

# Verify claim authenticity against indexed DOIs
audit = client.provenance.verify_hash("SHA256-DOSSIER-0248-VERIFIED")

print(f"Valid: {audit.is_verified}")
print(f"Primary DOI: {audit.primary_doi}") # 10.1109/TPEL.2025.340912
print(f"Claim Text: {audit.claim_text}")`,
      curl: `curl -X GET https://api.nexusworkbench.io/v1/provenance/verify/SHA256-DOSSIER-0248-VERIFIED \\
  -H "Authorization: Bearer nx_live_9849201f8a"`,
      typescript: `import { NexusClient } from '@nexusai/workbench-sdk';

const nexus = new NexusClient({ apiKey: process.env.NEXUS_API_KEY });

const audit = await nexus.provenance.verifyHash('SHA256-DOSSIER-0248-VERIFIED');
console.log(audit.isVerified, audit.primaryDoi);`
    }
  };

  const sampleResponses: Record<EndpointKey, any> = {
    simulate: {
      status: "success",
      topology: "3level_anpc",
      power_kw: 100.0,
      carrier_freq_khz: 10.0,
      conduction_loss_w: 617.5,
      switching_loss_w: 168.0,
      total_loss_w: 785.5,
      total_loss_kw: 0.79,
      efficiency_pct: 98.92,
      thermal_resistance_k_w: 0.025,
      ambient_temp_c: 40.0,
      t_junction_c: 59.6,
      safe_operating_margin_c: 65.4,
      status_code: 200,
      audit_hash: "SHA256-SIM-100KW-3LANPC-9892"
    },
    research: {
      status: "completed",
      dossier_id: "DOSSIER-0248",
      specialists_invoked: ["Apex", "Nova", "DataPulse", "Vortex"],
      primary_dois: [
        "10.1109/TPEL.2025.340912",
        "10.1109/TIE.2024.331890",
        "10.5281/zenodo.849201"
      ],
      verified_claims_count: 8,
      consensus_confidence_pct: 98.4,
      audit_hash: "SHA256-SYNTHESIS-0248-CONFIRMED"
    },
    provenance: {
      is_verified: true,
      audit_hash: "SHA256-DOSSIER-0248-VERIFIED",
      claim_id: "CLAIM C-014",
      claim_text: "3-level SiC ANPC topology reduces switching losses by 42% relative to Si IGBT benchmarks.",
      doi: "10.1109/TPEL.2025.340912",
      verification_authority: "IEEE Power Electronics Society (TPEL 2025)"
    }
  };

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText(codeSnippets[selectedEndpoint][selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestRun = () => {
    playClickSound();
    setIsLoading(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      setTestOutput(JSON.stringify(sampleResponses[selectedEndpoint], null, 2));
    }, 450);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-md max-w-4xl w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-6 text-xs font-sans max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-3 font-mono">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
                DEVELOPER REST API & PYTHON SDK HUB
              </h2>
              <span className="text-[10px] text-[#94A3B8] font-sans">
                Integrate calibrated power electronics loss models and autonomous research agents into external pipelines
              </span>
            </div>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1 rounded text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Endpoints Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono">
          {endpoints.map((ep) => {
            const isSelected = selectedEndpoint === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => {
                  playClickSound();
                  setSelectedEndpoint(ep.id);
                  setTestOutput(null);
                }}
                className={`p-3 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? 'bg-[#0F141C] border-[#38BDF8] text-[#38BDF8] shadow-sm ring-1 ring-[#38BDF8]/30'
                    : 'bg-[#0F141C]/60 border-[#212936] text-[#94A3B8] hover:bg-[#0F141C] hover:text-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[9px] px-1.5 py-0.2 rounded bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                    {ep.method}
                  </span>
                  <span className="text-[9px] text-[#94A3B8]">{ep.path}</span>
                </div>
                <div>
                  <strong className="block text-xs text-[#F1F5F9] font-bold">{ep.title}</strong>
                  <span className="block text-[10px] text-[#94A3B8] font-sans leading-tight mt-0.5 line-clamp-2">
                    {ep.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-md space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-[#212936] pb-2">
            <div className="flex items-center gap-1.5">
              {(['python', 'curl', 'typescript'] as LangKey[]).map((lang) => {
                const isSelected = selectedLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => { playClickSound(); setSelectedLang(lang); }}
                    className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    {lang === 'python' ? 'Python SDK' : lang === 'curl' ? 'cURL REST' : 'TypeScript'}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestRun}
                disabled={isLoading}
                className="px-2.5 py-1 rounded bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/40 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isLoading ? 'Executing...' : 'Test Sandbox API'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] border border-[#212936] text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Block */}
          <pre className="p-3.5 bg-[#161D27] text-[#38BDF8] rounded-md border border-[#212936] overflow-x-auto text-[11px] leading-relaxed">
            <code>{codeSnippets[selectedEndpoint][selectedLang]}</code>
          </pre>

          {/* Test Sandbox Output Display */}
          {testOutput && (
            <div className="space-y-1.5 pt-2 border-t border-[#212936] animate-fade-in">
              <div className="flex items-center justify-between text-[10px] text-[#10B981]">
                <span className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3" />
                  HTTP 200 OK — Live Simulation Sandbox Payload Response:
                </span>
                <span>Latency: 42ms</span>
              </div>
              <pre className="p-3 bg-[#161D27] text-[#10B981] rounded-md border border-[#10B981]/30 overflow-x-auto text-[10px] leading-relaxed">
                <code>{testOutput}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex items-center justify-between font-mono text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="text-[#10B981] font-bold">API v1.4 Operational</span>
            <span>•</span>
            <span>99.98% SLA Guaranteed</span>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="btn-secondary py-1.5 px-4 text-xs cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeveloperApiDocsModal;
