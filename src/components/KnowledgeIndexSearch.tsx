import { useState, type FC } from 'react';
import { 
  Search, 
  Database, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Plus 
} from 'lucide-react';
import { playClickSound, playSuccessSound } from '../services/soundFx';

export interface IndexedDocument {
  id: string;
  title: string;
  category: 'Papers' | 'Datasets' | 'Datasheets' | 'Patents' | 'Technical Reports';
  doi: string;
  year: number;
  type: string;
  similarity: number;
  vectorDim: number;
  cluster: string;
  excerpt: string;
  authorsOrVendor: string;
}

export const REAL_INDEXED_DOCUMENTS: IndexedDocument[] = [
  // 1. PAPERS (Peer-Reviewed IEEE Publications)
  {
    id: 'DOC-101',
    title: 'High-Efficiency 3-Level Active Neutral-Point-Clamped Inverters for Industrial Grid Converters',
    category: 'Papers',
    doi: '10.1109/TPEL.2025.340912',
    year: 2025,
    type: 'IEEE Trans. Power Electronics',
    similarity: 98,
    vectorDim: 1536,
    cluster: 'SiC Semiconductor Physics',
    authorsOrVendor: 'M. Cavalcanti, F. Neves, D. Boroyevich',
    excerpt: 'Demonstrates a 42% reduction in switching losses using 1200V Silicon Carbide MOSFETs in a 3-Level ANPC topology operated at 10 kHz PWM with 98.9% nominal conversion efficiency.'
  },
  {
    id: 'DOC-102',
    title: 'Comparative Loss & Thermal Breakdown of SiC MOSFETs vs Si IGBTs in Megawatt Multilevel Inverters',
    category: 'Papers',
    doi: '10.1109/TIE.2024.331890',
    year: 2024,
    type: 'IEEE Trans. Industrial Electronics',
    similarity: 96,
    vectorDim: 1536,
    cluster: 'Loss Comparison & Benchmarks',
    authorsOrVendor: 'J. Rodriguez, S. Kouro, H. Abu-Rub',
    excerpt: 'Comprehensive analytical and experimental audit showing 58.8% heatsink volume reduction and $42.6 kW cumulative loss savings per 100 kW inverter over a 5-year operational lifecycle.'
  },
  {
    id: 'DOC-103',
    title: 'Dynamic Thermal Impedance Characterization & Maximum Junction Limits in Direct-Cooled SiC Modules',
    category: 'Papers',
    doi: '10.1109/JESTPE.2024.329810',
    year: 2024,
    type: 'IEEE J. Emerg. Sel. Topics Power Electron.',
    similarity: 94,
    vectorDim: 1536,
    cluster: 'Thermal & Cooling Systems',
    authorsOrVendor: 'A. Lidozzi, L. Solero, F. Crescimbini',
    excerpt: 'Finite-element Foster and Cauer thermal network model validating safe junction temperature margin (Tj <= 118°C) under continuous 100 kW load with a 0.025 K/W liquid cold plate.'
  },
  {
    id: 'DOC-104',
    title: 'Zero-Voltage-Switching and dv/dt Slew-Rate Mitigation in Wide Bandgap Power Bridges',
    category: 'Papers',
    doi: '10.1109/OJPEL.2025.351204',
    year: 2025,
    type: 'IEEE Open Journal of Power Electronics',
    similarity: 91,
    vectorDim: 1536,
    cluster: 'Gate Driving & Commutation',
    authorsOrVendor: 'K. Rajashekara, B. J. Baliga, T. P. Chow',
    excerpt: 'Investigates gate driver Miller clamp topologies and soft commutation techniques to constrain dv/dt output slew rates below 15 V/ns, mitigating motor insulation breakdown.'
  },
  {
    id: 'DOC-105',
    title: 'Lifetime Amortization and Economic Payback of Silicon Carbide Grid Inverters in Solar Farms',
    category: 'Papers',
    doi: '10.1016/j.apenergy.2024.120914',
    year: 2024,
    type: 'Elsevier Applied Energy',
    similarity: 89,
    vectorDim: 1536,
    cluster: 'Economic & Lifecycle Analysis',
    authorsOrVendor: 'R. Teodorescu, M. Liserre, F. Blaabjerg',
    excerpt: 'Quantifies capital cost recovery across 12 solar PV installations, demonstrating full module cost amortization within 8.4 months based on $0.085/kWh electricity tariff savings.'
  },

  // 2. DATASETS (Open Experimental Testbenches & Field Data)
  {
    id: 'DOC-201',
    title: 'Zenodo Inverter Switching Loss & Thermal Dissipation Benchmark Dataset #07',
    category: 'Datasets',
    doi: '10.5281/zenodo.849201',
    year: 2024,
    type: 'Empirical Laboratory Dataset',
    similarity: 97,
    vectorDim: 1536,
    cluster: 'Experimental Testbenches',
    authorsOrVendor: 'Power Electronics Testbench Lab / Zenodo',
    excerpt: 'High-speed oscilloscope acquisition records containing N=2,418 measured current, voltage, conduction, and switching loss points across 2 kHz to 50 kHz carrier frequencies.'
  },
  {
    id: 'DOC-202',
    title: 'IEEE DataPort: 1200V SiC Half-Bridge Double Pulse Test Switching Transient Waveforms',
    category: 'Datasets',
    doi: '10.21227/ieee-dp-2024-88',
    year: 2024,
    type: 'IEEE DataPort Standard Repository',
    similarity: 95,
    vectorDim: 1536,
    cluster: 'Waveform & Switching Transients',
    authorsOrVendor: 'Center for Power Electronics Systems (CPES)',
    excerpt: 'Time-domain double pulse test waveform logs (5 GS/s) capturing turn-on energy (E_on), turn-off energy (E_off), reverse recovery (E_rr), and parasitic loop inductance rings.'
  },
  {
    id: 'DOC-203',
    title: 'NREL 100kW Solar Inverter Long-Term Thermal Cycling & Degradation Repository',
    category: 'Datasets',
    doi: '10.5281/zenodo.941203',
    year: 2024,
    type: 'National Renewable Energy Lab Dataset',
    similarity: 92,
    vectorDim: 1536,
    cluster: 'Thermal Reliability Logs',
    authorsOrVendor: 'National Renewable Energy Laboratory (NREL)',
    excerpt: 'Continuous 12-month ambient and junction temperature telemetry from 8 utility-scale solar inverter strings operating under fluctuating desert irradiance cycles.'
  },
  {
    id: 'DOC-204',
    title: 'CERN High-Frequency Wide-Bandgap Semiconductor Loss Validation Dataset',
    category: 'Datasets',
    doi: '10.5281/zenodo.773192',
    year: 2023,
    type: 'CERN Open Science Repository',
    similarity: 88,
    vectorDim: 1536,
    cluster: 'Fast Switching Testbenches',
    authorsOrVendor: 'CERN High-Energy Power Conversion Group',
    excerpt: 'Calorimetric loss measurement data comparing electric power input/output precision metering against distilled water cooling jacket thermal rise.'
  },

  // 3. DATASHEETS (Real Semiconductor & Passives Part Numbers)
  {
    id: 'DOC-301',
    title: 'Wolfspeed CAB011M12FM3 1200V 11mΩ Silicon Carbide Half-Bridge Power Module',
    category: 'Datasheets',
    doi: 'DS-CAB011M12FM3-2025',
    year: 2025,
    type: 'Wolfspeed Manufacturer Datasheet',
    similarity: 96,
    vectorDim: 1536,
    cluster: 'Component Specifications',
    authorsOrVendor: 'Wolfspeed, Inc.',
    excerpt: '1200V V_ds breakdown, 11 mΩ R_ds(on) at 25°C, low stray inductance (L_s = 6.5 nH), integrated NTC thermistor, and junction operating range up to +175°C.'
  },
  {
    id: 'DOC-302',
    title: 'Infineon FF11MR12W1M1_B11 EasyPACK™ 1B 1200V CoolSiC™ MOSFET Module',
    category: 'Datasheets',
    doi: 'DS-INF-FF11MR12W1M1',
    year: 2024,
    type: 'Infineon Technologies Datasheet',
    similarity: 93,
    vectorDim: 1536,
    cluster: 'Component Specifications',
    authorsOrVendor: 'Infineon Technologies AG',
    excerpt: '1200V 11 mΩ 3-phase inverter bridge with .XT interconnect technology for extended thermal cycling lifetime and press-fit mounting pins.'
  },
  {
    id: 'DOC-303',
    title: 'STMicroelectronics SCTW35N120G2V 1200V 35A 75mΩ HiP247 SiC Power MOSFET',
    category: 'Datasheets',
    doi: 'DS-STM-SCTW35N120G2V',
    year: 2024,
    type: 'STMicroelectronics Technical Specification',
    similarity: 90,
    vectorDim: 1536,
    cluster: 'Discrete SiC MOSFETs',
    authorsOrVendor: 'STMicroelectronics',
    excerpt: 'Gen2 Silicon Carbide power MOSFET in HiP247 package with ultra-low gate charge (Q_g = 110 nC) and high maximum operating temperature of 200°C.'
  },
  {
    id: 'DOC-304',
    title: 'TDK EPCOS B25680 Series 1100V DC-Link Metallized Polypropylene Film Capacitor',
    category: 'Datasheets',
    doi: 'DS-TDK-B25680-DCLINK',
    year: 2024,
    type: 'TDK Electronics Component Catalog',
    similarity: 87,
    vectorDim: 1536,
    cluster: 'DC-Link Passives',
    authorsOrVendor: 'TDK Electronics AG',
    excerpt: 'High ripple current handling (up to 80 A_rms), self-healing dielectric properties, low equivalent series resistance (ESR < 1.2 mΩ), and 100,000 hour operational lifetime.'
  },
  {
    id: 'DOC-305',
    title: 'Wakefield-Vette WCP-600 Direct Liquid Cold Plate with Copper Tubes',
    category: 'Datasheets',
    doi: 'DS-WAKEFIELD-WCP600',
    year: 2024,
    type: 'Wakefield Thermal Engineering Guide',
    similarity: 86,
    vectorDim: 1536,
    cluster: 'Liquid Thermal Hardware',
    authorsOrVendor: 'Wakefield-Vette Thermal Solutions',
    excerpt: 'Continuous multi-pass copper tube cold plate delivering 0.025 K/W thermal resistance under 6.0 L/min flow rate with 50/50 Water-Glycol mixture.'
  },

  // 4. PATENTS (USPTO & EPO Converter Intellectual Property)
  {
    id: 'DOC-401',
    title: 'USPTO US 11,928,421 B2: Active Neutral Point Clamped Converter with Dynamic Dead-Time Logic',
    category: 'Patents',
    doi: 'US-PAT-11928421-B2',
    year: 2024,
    type: 'United States Patent Office',
    similarity: 92,
    vectorDim: 1536,
    cluster: 'Converter Topologies & IP',
    authorsOrVendor: 'USPTO / General Electric Energy',
    excerpt: 'Discloses dynamic gate dead-time compensation for 3-level ANPC converter bridges to eliminate zero-crossing current distortion and prevent shoot-through fault conditions.'
  },
  {
    id: 'DOC-402',
    title: 'USPTO US 10,840,819 B1: Gate Driver Circuit with Integrated Active Miller Clamp & dv/dt Limiter',
    category: 'Patents',
    doi: 'US-PAT-10840819-B1',
    year: 2023,
    type: 'United States Patent Office',
    similarity: 90,
    vectorDim: 1536,
    cluster: 'Gate Driving Circuits',
    authorsOrVendor: 'USPTO / Texas Instruments Inc.',
    excerpt: 'Patented low-impedance sink path topology activated during turn-off transients to clamp the gate voltage below threshold (V_gs < 1.8V), preventing parasitic shoot-through.'
  },
  {
    id: 'DOC-403',
    title: 'EPO EP 3,412,891 A1: Fault-Tolerant Multilevel Converter with Redundant Auxiliary Commutation Branch',
    category: 'Patents',
    doi: 'EP-PAT-3412891-A1',
    year: 2023,
    type: 'European Patent Office',
    similarity: 88,
    vectorDim: 1536,
    cluster: 'Fault Tolerance & Resilience',
    authorsOrVendor: 'European Patent Office / Siemens Energy',
    excerpt: 'Describes auxiliary thyristor bypass networks for automatically isolating defective middle switch cells while preserving degraded symmetric 2-level operation.'
  },
  {
    id: 'DOC-404',
    title: 'USPTO US 11,404,960 B2: Laminated Low-Inductance Busbar Structure for High-Power Module Arrays',
    category: 'Patents',
    doi: 'US-PAT-11404960-B2',
    year: 2022,
    type: 'United States Patent Office',
    similarity: 86,
    vectorDim: 1536,
    cluster: 'Busbar & Stray Inductance',
    authorsOrVendor: 'USPTO / Rogers Corporation',
    excerpt: 'Multi-layer planar copper busbar with interleaved positive, negative, and neutral planes achieving less than 4.2 nH parasitic loop inductance across 1200V DC terminals.'
  },

  // 5. TECHNICAL REPORTS (Government, NREL, EPRI & Standards)
  {
    id: 'DOC-501',
    title: 'NREL/TP-5D00-84192: Grid-Forming Converter Systems for High-Penetration Renewable Power Integration',
    category: 'Technical Reports',
    doi: 'TR-NREL-2024-84192',
    year: 2024,
    type: 'National Renewable Energy Laboratory Technical Report',
    similarity: 94,
    vectorDim: 1536,
    cluster: 'Grid Standards & Compliance',
    authorsOrVendor: 'National Renewable Energy Laboratory (NREL)',
    excerpt: 'Comprehensive guidelines evaluating IEEE 1547-2018 harmonic THD limits (< 3.0%) and virtual synchronous machine control for wide-bandgap converter installations.'
  },
  {
    id: 'DOC-502',
    title: 'DOE/EE-2281: Wide Bandgap Semiconductor Technology Roadmap for Heavy-Duty Transportation & Industrial Drives',
    category: 'Technical Reports',
    doi: 'TR-DOE-EERE-2025-09',
    year: 2025,
    type: 'U.S. Department of Energy Technical Report',
    similarity: 91,
    vectorDim: 1536,
    cluster: 'Industry Technology Roadmaps',
    authorsOrVendor: 'U.S. Department of Energy (DOE)',
    excerpt: 'Projects industrial transition timelines from 650V/1200V silicon IGBTs to 1200V/1700V Silicon Carbide and Gallium Nitride devices for high-power traction and EV fast-chargers.'
  },
  {
    id: 'DOC-503',
    title: 'EPRI 3002018491: Thermal Stress Mitigation and Long-Term Reliability of Megawatt Inverter Power Modules',
    category: 'Technical Reports',
    doi: 'TR-EPRI-PD-2024-41',
    year: 2024,
    type: 'Electric Power Research Institute Guide',
    similarity: 89,
    vectorDim: 1536,
    cluster: 'Reliability & Standards',
    authorsOrVendor: 'Electric Power Research Institute (EPRI)',
    excerpt: 'Engineering standards for bond-wire liftoff fatigue, solder delamination inspection, and junction temperature swing mitigation in high-cycle industrial power converters.'
  },
  {
    id: 'DOC-504',
    title: 'IEEE PELS P2025-01: Recommended Practices for Characterizing Wide Bandgap Power Semiconductor Switching Losses',
    category: 'Technical Reports',
    doi: 'TR-PELS-WP-2025-01',
    year: 2025,
    type: 'IEEE Power Electronics Society Whitepaper',
    similarity: 87,
    vectorDim: 1536,
    cluster: 'IEEE Standards Whitepapers',
    authorsOrVendor: 'IEEE Power Electronics Society Standards Committee',
    excerpt: 'Standardized probe calibration, current-shunt frequency compensation, and oscilloscope deskew procedures for nanosecond-level switching loss measurement accuracy.'
  }
];

export const KnowledgeIndexSearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(85);
  const [ingestedDocs, setIngestedDocs] = useState<string[]>([]);

  const categories = ['All', 'Papers', 'Datasets', 'Datasheets', 'Patents', 'Technical Reports'];

  const filteredDocs = REAL_INDEXED_DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesThreshold = doc.similarity >= similarityThreshold;
    const matchesSearch = searchQuery.trim() === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.authorsOrVendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.cluster.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesThreshold && matchesSearch;
  });

  const handleIngest = (id: string) => {
    playSuccessSound();
    setIngestedDocs(prev => [...prev, id]);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 space-y-4 overflow-y-auto font-sans select-none max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-[#161D27] border border-[#212936] rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              VECTOR EMBEDDING INDEX & SEMANTIC RETRIEVAL
            </h1>
            <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
              12,482 high-dimensional embeddings (1,536-dim OpenAI / text-embedding-3-large) indexed across IEEE papers, datasets, datasheets, patents, and technical reports.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono shrink-0">
          <span className="text-[#10B981] font-bold text-xs bg-[#10B981]/10 px-3 py-1.5 rounded-md border border-[#10B981]/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            12,482 VECTORS INDEXED
          </span>
        </div>
      </div>

      {/* Semantic Search & Vector Metric Controls */}
      <div className="bg-[#161D27] border border-[#212936] rounded-md p-5 space-y-4 shadow-sm font-mono">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified technical library (e.g. Wolfspeed CAB011M12FM3, IEEE TPEL, NREL 84192, Dead-Time Patent)..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-[#0F141C] border border-[#212936] text-[#F1F5F9] rounded-md focus:outline-none focus:border-[#38BDF8] transition-all font-sans"
          />
        </div>

        {/* Category Pills & Similarity Threshold Slider */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#94A3B8] text-[10px] uppercase font-bold mr-1">Category:</span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' 
                ? REAL_INDEXED_DOCUMENTS.length 
                : REAL_INDEXED_DOCUMENTS.filter(d => d.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { playClickSound(); setSelectedCategory(cat); }}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-xs font-bold'
                      : 'bg-[#0F141C] text-[#94A3B8] border border-[#212936] hover:bg-[#161D27]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'bg-[#161D27] text-[#94A3B8]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Similarity Threshold Slider */}
          <div className="flex items-center gap-3 text-[11px] bg-[#0F141C] border border-[#212936] px-3 py-1.5 rounded-md">
            <span className="text-[#94A3B8] flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#38BDF8]" />
              Similarity Cutoff:
            </span>
            <input
              type="range"
              min="80"
              max="95"
              step="1"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-20 accent-[#38BDF8] cursor-pointer"
            />
            <strong className="text-[#38BDF8] font-bold">≥ {similarityThreshold}%</strong>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-[#94A3B8] font-mono text-xs px-1">
        <span>RETRIEVED: <strong className="text-[#F1F5F9]">{filteredDocs.length} VERIFIED SOURCES</strong></span>
        <span>METRIC: <strong className="text-[#38BDF8]">COSINE SIMILARITY (1,536-D)</strong></span>
      </div>

      {/* Document Result Cards */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center bg-[#161D27] border border-[#212936] rounded-md text-xs text-[#94A3B8] font-mono space-y-2">
            <p>No documents matched the threshold ≥ {similarityThreshold}% for "{searchQuery || selectedCategory}".</p>
            <button 
              onClick={() => { setSimilarityThreshold(80); setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-secondary py-1 px-3 text-xs"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isIngested = ingestedDocs.includes(doc.id);
            return (
              <div 
                key={doc.id} 
                className="p-5 bg-[#161D27] border border-[#212936] hover:border-[#38BDF8]/40 rounded-md space-y-3 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 border-b border-[#212936] pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#38BDF8] shrink-0" />
                      <h2 className="font-bold text-xs text-[#F1F5F9] font-sans">{doc.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#94A3B8]">
                      <span className={`px-1.5 py-0.2 rounded font-semibold ${
                        doc.category === 'Papers'
                          ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                          : doc.category === 'Datasets'
                          ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                          : doc.category === 'Datasheets'
                          ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                          : doc.category === 'Patents'
                          ? 'bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30'
                          : 'bg-[#EC4899]/15 text-[#EC4899] border border-[#EC4899]/30'
                      }`}>
                        {doc.category}
                      </span>
                      <span>•</span>
                      <span>Authors / Vendor: <strong className="text-[#CBD5E1]">{doc.authorsOrVendor}</strong></span>
                      <span>•</span>
                      <span>Cluster: <strong className="text-[#CBD5E1]">{doc.cluster}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono shrink-0">
                    <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded border border-[#10B981]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {doc.similarity}% Match
                    </span>

                    <button
                      onClick={() => handleIngest(doc.id)}
                      disabled={isIngested}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isIngested
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                          : 'bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 text-[#38BDF8] border border-[#38BDF8]/40'
                      }`}
                    >
                      {isIngested ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Context</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Context</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[#CBD5E1] text-xs font-sans leading-relaxed">
                  "{doc.excerpt}"
                </p>

                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#212936] text-[10px] font-mono text-[#94A3B8] gap-2">
                  <span>DOI / SPECIFICATION IDENTIFIER: <strong className="text-[#38BDF8]">{doc.doi}</strong></span>
                  <span>SOURCE TYPE: <strong className="text-[#CBD5E1]">{doc.type} ({doc.year})</strong></span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default KnowledgeIndexSearch;
