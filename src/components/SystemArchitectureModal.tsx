import React, { useState } from 'react';
import { X, Network, GitBranch, Workflow, UserCheck, Layers, Server, Cloud, Trophy, Database } from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'master' | 'cloud' | 'backend' | 'levels' | 'contracts' | 'hierarchy' | 'lifecycle'>('flow');

  if (!isOpen) return null;

  const contracts = [
    {
      name: 'APEX',
      role: 'Systems Architecture',
      color: 'text-[#F1F5F9]',
      borderColor: 'border-[#F1F5F9]/30',
      inputs: ['Objective', 'Research sources', 'Technical constraints'],
      outputs: ['Architecture findings', 'Design constraints', 'Feasibility', 'Technical risks']
    },
    {
      name: 'NOVA',
      role: 'Technical Research',
      color: 'text-[#38BDF8]',
      borderColor: 'border-[#38BDF8]/40',
      inputs: ['Research question', 'Retrieved papers', 'Datasheets', 'Technical documents'],
      outputs: ['Literature findings', 'Important claims', 'Research gaps', 'Relevant references']
    },
    {
      name: 'DATAPULSE',
      role: 'Quantitative Analysis',
      color: 'text-[#F59E0B]',
      borderColor: 'border-[#F59E0B]/40',
      inputs: ['Datasets', 'Numerical claims', 'Experimental results'],
      outputs: ['Calculations', 'Comparisons', 'Statistics', 'Graphs', 'Anomalies']
    },
    {
      name: 'VORTEX',
      role: 'Technical Synthesis',
      color: 'text-[#10B981]',
      borderColor: 'border-[#10B981]/40',
      inputs: ['Apex findings', 'Nova findings', 'DataPulse findings'],
      outputs: ['Combined conclusion', 'Trade-offs', 'Recommendations', 'Limitations']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">SYSTEM & WORKFLOW ARCHITECTURE</h2>
          </div>
          
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'flow'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [DATAFLOW SEQUENCE]
            </button>
            <button
              onClick={() => setActiveTab('master')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'master'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [MASTER TOPOLOGY]
            </button>
            <button
              onClick={() => setActiveTab('cloud')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'cloud'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [CLOUD DEPLOYMENT]
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'backend'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [BACKEND STACK]
            </button>
            <button
              onClick={() => setActiveTab('levels')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'levels'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [LEVELS]
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'contracts'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [CONTRACTS]
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'hierarchy'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [ENTITY TREE]
            </button>
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                activeTab === 'lifecycle'
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [LIFECYCLE]
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
          {activeTab === 'flow' && (
            /* User Specification: Core Dataflow Sequence */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#38BDF8]" />
                  CORE END-TO-END DATAFLOW SEQUENCE
                </span>
                <span className="text-[9px] text-[#10B981] font-bold">VERIFIED PIPELINE</span>
              </div>

              <pre className="text-[#38BDF8] font-bold text-center text-xs leading-relaxed select-none">
{`Database → API → Agent Orchestrator → 7-stage pipeline`}
              </pre>

              <div className="p-3 bg-[#161D27] rounded-sm border border-[#212936] space-y-2 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#F1F5F9] font-bold">1. PostgreSQL 16 + pgvector Database:</span>
                  <span className="text-[#10B981]">Stores 12,482 vector docs & relational evidence</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#F1F5F9] font-bold">2. FastAPI Gateway API:</span>
                  <span className="text-[#38BDF8]">Handles auth, CORS, Pydantic validation, & routing</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#F1F5F9] font-bold">3. Agent Orchestrator:</span>
                  <span className="text-[#F59E0B]">Decomposes task across Apex, Nova, DataPulse, Vortex</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#F1F5F9] font-bold">4. 7-Stage Pipeline:</span>
                  <span className="text-[#10B981]">Question ➔ Scope ➔ Research ➔ Analysis ➔ Check ➔ Evidence ➔ Dossier</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'master' && (
            /* Master Architecture & Life-Cycle Topology */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  NEXUSAI MASTER ARCHITECTURE & LIFE-CYCLE TOPOLOGY
                </span>
                <span className="text-[9px] text-[#10B981] font-bold">END-TO-END VERIFIED</span>
              </div>

              <pre className="text-[#38BDF8] font-bold text-center text-xs leading-snug select-none">
{`                 NEXUSAI
                    │
       ┌────────────┴────────────┐
       │                         │
   PLATFORM                  RESEARCH
       │                         │
       ↓                         ↓
    React                    Retrieval
       ↓                    Documents
    FastAPI                     ↓
       ↓                    Specialists
    Database                     ↓
       ↓                   Quantitative
       │                         ↓
       └────────────┬────────────┘
                    ↓
              EVIDENCE ENGINE
                    ↓
             CLAIM VERIFICATION
                    ↓
             CONFLICT DETECTION
                    ↓
             DECISION SUPPORT
                    ↓
              RESEARCH DOSSIER
                    ↓
               AUDIT TRAIL
                    ↓
               VALIDATION
                    ↓
                DEPLOYMENT
                    ↓
              🏆 FINAL DEMO`}
              </pre>
            </div>
          )}

          {activeTab === 'cloud' && (
            /* Cloud Production Deployment Architecture */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-[#38BDF8]" />
                  CLOUD PRODUCTION DEPLOYMENT ARCHITECTURE
                </span>
                <span className="text-[9px] text-[#10B981] font-bold">SEPARATED SERVICES</span>
              </div>

              <pre className="text-[#38BDF8] font-bold text-center text-xs leading-relaxed select-none">
{`                    INTERNET
                       │
                       ↓
              ┌────────────────┐
              │  Web Frontend  │
              └───────┬────────┘
                      ↓
              ┌────────────────┐
              │  API Gateway   │
              └───────┬────────┘
                      ↓
          ┌───────────┴───────────┐
          ↓                       ↓
   Research Engine          Specialist Engine
          │                       │
          └───────────┬───────────┘
                      ↓
              Evidence Engine
                      ↓
               PostgreSQL
                      ↓
                 pgvector`}
              </pre>
            </div>
          )}

          {activeTab === 'backend' && (
            /* FastAPI Microservice Orchestration Architecture */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#10B981]" />
                  FASTAPI MICROSERVICE ORCHESTRATION ARCHITECTURE
                </span>
                <span className="text-[9px] text-[#10B981] font-bold">CONTROLLED ORCHESTRATION</span>
              </div>

              <pre className="text-[#10B981] font-bold text-center text-xs leading-relaxed select-none">
{`React (Frontend Client)
        ↓
FastAPI (API Gateway / Endpoint)
        ↓
Orchestrator (Pipeline Controller)
        ↓
Specialists / Research Tools (Apex, Nova, DataPulse, Vortex)
        ↓
Evidence Store (Knowledge Index & Provenance Vectors)
        ↓
Verification Engine (Algorithmic Conflict Resolution & Audit Rules)
        ↓
PostgreSQL (Relational Persistence DB)`}
              </pre>
            </div>
          )}

          {activeTab === 'levels' && (
            /* Three-Level Product Architecture Model */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#38BDF8]" />
                  THREE-LEVEL PRODUCT ARCHITECTURE MODEL
                </span>
                <span className="text-[9px] text-[#38BDF8] font-bold">Research ➔ Analysis ➔ Decision</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#161D27] rounded-sm border border-[#38BDF8]/40 space-y-1">
                  <div className="flex items-center justify-between text-[#38BDF8] font-bold">
                    <span>LEVEL 1 — RESEARCH</span>
                    <span className="text-[9px] font-sans">Question ➔ Sources ➔ Literature</span>
                  </div>
                  <pre className="text-[10px] text-[#CBD5E1] select-none">
{`Question ➔ Sources ➔ Literature`}
                  </pre>
                </div>

                <div className="p-3 bg-[#161D27] rounded-sm border border-[#F59E0B]/40 space-y-1">
                  <div className="flex items-center justify-between text-[#F59E0B] font-bold">
                    <span>LEVEL 2 — ANALYSIS</span>
                    <span className="text-[9px] font-sans">Specialists ➔ Calculations ➔ Conflicts ➔ Verification</span>
                  </div>
                  <pre className="text-[10px] text-[#CBD5E1] select-none">
{`Specialists ➔ Calculations ➔ Conflicts ➔ Verification`}
                  </pre>
                </div>

                <div className="p-3 bg-[#161D27] rounded-sm border border-[#10B981]/40 space-y-1">
                  <div className="flex items-center justify-between text-[#10B981] font-bold">
                    <span>LEVEL 3 — DECISION</span>
                    <span className="text-[9px] font-sans">Evidence ➔ Findings ➔ Recommendation ➔ Dossier</span>
                  </div>
                  <pre className="text-[10px] text-[#CBD5E1] select-none">
{`Evidence ➔ Findings ➔ Recommendation ➔ Dossier`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            /* Multi-Specialist Task Contracts */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#10B981]" />
                  SPECIALIST TASK CONTRACT SPECIFICATIONS
                </span>
                <span className="text-[9px] text-[#10B981]">DISTINCT TASK ROLES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contracts.map((c) => (
                  <div key={c.name} className={`p-3 bg-[#161D27] rounded-sm border ${c.borderColor} space-y-2`}>
                    <div className="flex items-center justify-between border-b border-[#212936] pb-1">
                      <span className={`font-bold text-xs ${c.color}`}>{c.name}</span>
                      <span className="text-[9px] text-[#94A3B8] font-sans">{c.role}</span>
                    </div>

                    <div className="space-y-1 text-[10px]">
                      <span className="text-[#38BDF8] font-bold block">INPUT:</span>
                      <ul className="list-disc list-inside text-[#CBD5E1] space-y-0.5 font-sans">
                        {c.inputs.map((inp, idx) => (
                          <li key={idx}>{inp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1 text-[10px] pt-1 border-t border-[#212936]">
                      <span className="text-[#10B981] font-bold block">OUTPUT:</span>
                      <ul className="list-disc list-inside text-[#CBD5E1] space-y-0.5 font-sans">
                        {c.outputs.map((out, idx) => (
                          <li key={idx}>{out}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hierarchy' && (
            /* Investigation Entity Tree Hierarchy */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#F59E0B]" />
                  INVESTIGATION DOMAIN ENTITY HIERARCHY
                </span>
                <span className="text-[9px] text-[#10B981]">RELATIONAL SCHEMA</span>
              </div>

              <pre className="text-[#10B981] font-bold text-xs leading-relaxed select-none">
{`INVESTIGATION
│
├── Objective
├── Scope
├── Sources
│
├── Specialists
│   ├── Apex
│   ├── Nova
│   ├── DataPulse
│   └── Vortex
│
├── Claims
│   ├── Evidence
│   ├── Verification
│   └── Conflicts
│
├── Findings
│
├── Assumptions
├── Limitations
│
└── Final Dossier`}
              </pre>
            </div>
          )}

          {activeTab === 'lifecycle' && (
            /* 14-Step Investigation Execution Lifecycle */
            <div className="p-4 bg-[#0F141C] rounded-sm border border-[#212936] font-mono text-[11px] text-[#CBD5E1] space-y-3 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#212936] pb-2">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[#38BDF8]" />
                  14-STEP INVESTIGATION EXECUTION LIFECYCLE
                </span>
                <span className="text-[9px] text-[#38BDF8]">AUTOMATED RUNTIME</span>
              </div>

              <pre className="text-[#38BDF8] font-bold text-center text-xs leading-snug select-none">
{`User enters objective
        ↓
Create Investigation
        ↓
Generate research plan
        ↓
Search sources
        ↓
Collect documents
        ↓
Extract relevant information
        ↓
Create evidence records
        ↓
Generate claims
        ↓
Send claims to specialists
        ↓
Independent verification
        ↓
Detect conflicts
        ↓
Resolve conflicts
        ↓
Generate findings
        ↓
Generate dossier`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
