import type { Agent, Artifact, KnowledgeDocument, SwarmTeam } from '../types/agent';

export const DEFAULT_TOOLS = [
  'code_interpreter',
  'knowledge_vector_search',
  'api_caller',
  'web_search',
  'paper_fetcher',
  'citation_graph',
  'data_plotter',
  'stat_calculator',
  'dossier_generator',
  'pdf_exporter'
];

export const DEFAULT_AGENTS: Agent[] = [
  {
    id: 'apex-1',
    name: 'Apex',
    role: 'Systems Architecture',
    avatar: 'Terminal',
    description: 'Input: Objective, Sources, Constraints ➔ Output: Architecture findings, Constraints, Feasibility, Technical risks.',
    systemPrompt: 'You are Apex, Systems Architecture specialist. Analyze topology, design constraints, technical feasibility, and architectural risks.',
    temperature: 0.2,
    model: 'gpt-4o',
    capabilities: ['Topology Analysis', 'Feasibility Audit', 'Risk Assessment'],
    tools: ['code_interpreter', 'knowledge_vector_search', 'api_caller'],
    memoryContextSize: 128
  },
  {
    id: 'nova-2',
    name: 'Nova',
    role: 'Technical Research',
    avatar: 'Search',
    description: 'Input: Research question, Papers, Datasheets ➔ Output: Literature findings, Claims, Research gaps, References.',
    systemPrompt: 'You are Nova, Technical Research specialist. Audit literature indexes, retrieve primary papers, extract DOIs, and identify research gaps.',
    temperature: 0.3,
    model: 'gpt-4o',
    capabilities: ['DOI Indexing', 'Literature Search', 'Claim Extraction'],
    tools: ['web_search', 'paper_fetcher', 'citation_graph'],
    memoryContextSize: 128
  },
  {
    id: 'datapulse-3',
    name: 'DataPulse',
    role: 'Quantitative Analysis',
    avatar: 'BarChart2',
    description: 'Input: Datasets, Numerical claims, Results ➔ Output: Calculations, Comparisons, Statistics, Graphs, Anomalies.',
    systemPrompt: 'You are DataPulse, Quantitative Analysis specialist. Execute mathematical loss models, regression analysis, statistical comparisons, and anomaly detection.',
    temperature: 0.1,
    model: 'gpt-4o-mini',
    capabilities: ['Numerical Loss Modeling', 'Statistical Regression', 'Plot Generation'],
    tools: ['code_interpreter', 'data_plotter', 'stat_calculator'],
    memoryContextSize: 128
  },
  {
    id: 'vortex-4',
    name: 'Vortex',
    role: 'Technical Synthesis',
    avatar: 'Shield',
    description: 'Input: Apex findings, Nova findings, DataPulse findings ➔ Output: Combined conclusion, Trade-offs, Recommendations, Limitations.',
    systemPrompt: 'You are Vortex, Technical Synthesis specialist. Synthesize Apex, Nova, and DataPulse outputs into a final deliverable research dossier.',
    temperature: 0.4,
    model: 'gpt-4o',
    capabilities: ['Multi-Specialist Synthesis', 'Trade-off Analysis', 'Dossier Publication'],
    tools: ['dossier_generator', 'pdf_exporter'],
    memoryContextSize: 128
  }
];

export const DEFAULT_SWARMS: SwarmTeam[] = [
  {
    id: 'swarm-01',
    name: 'Investigation Swarm Alpha',
    description: 'Full 4-specialist multi-role investigation team',
    leadRole: 'Systems Architecture',
    workflowType: 'hierarchical',
    members: DEFAULT_AGENTS
  }
];

export const DEFAULT_KNOWLEDGE: KnowledgeDocument[] = [
  {
    id: 'doc-01',
    title: 'IEEE SiC Multilevel Inverter Benchmark (2025)',
    category: 'Literature',
    content: 'Peer-reviewed study evaluating 3-level ANPC topology efficiency improvements relative to 2-level Si IGBT inverters.',
    tokenCount: 4200,
    sizeBytes: 1456000,
    uploadedAt: Date.now() - 86400000
  },
  {
    id: 'doc-02',
    title: 'Semiconductor Datasheet Specification',
    category: 'Datasheets',
    content: 'SiC MOSFET 1200V 15mΩ datasheet parameters, R_ds(on) thermal coefficients, and junction-to-case resistance bounds.',
    tokenCount: 2800,
    sizeBytes: 912000,
    uploadedAt: Date.now() - 172800000
  }
];

export const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art-01',
    title: 'Silicon Carbide (SiC) Multilevel Inverter Feasibility Dossier',
    type: 'markdown',
    description: 'Final Deliverable Research Dossier with verified evidence chain.',
    createdAt: Date.now() - 3600000,
    provenance: {
      sources: ['IEEE Transactions 2025', 'Zenodo Experimental Dataset'],
      stepIds: ['step-1', 'step-3', 'step-4', 'step-5'],
      verificationStatus: 'verified',
      auditHash: 'SHA256-DOSSIER-VERIFIED'
    },
    content: `# Silicon Carbide (SiC) Multilevel Inverter Feasibility Dossier

## 01 Executive Summary
Evaluated 3-level ANPC SiC MOSFET power converter topologies for 100kW+ industrial inverter applications relative to conventional 2-level Silicon IGBT systems.

## 02 Technical Findings
- **Switching Dissipation**: Reduced by 42% at 10kHz PWM frequency.
- **Thermal Barrier**: Requires junction-to-case resistance R_th,jc <= 0.18 K/W.
- **Peak Efficiency**: Reaches 98.9% under rated load.

## 03 Evidence & Verification Provenance Tree
- **CLAIM C-014**: SiC 3-level ANPC topology reduces switching losses by 42%.
  - **SUPPORTED BY**: IEEE 2025 (DOI: 10.1109/TPE.2025.340912), Experimental Dataset (N=2,418).
  - **INDEPENDENT CHECK**: Apex (✓), DataPulse (✓), Nova (✓).
`
  }
];
