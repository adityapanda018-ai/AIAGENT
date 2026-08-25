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

export const KnowledgeIndexSearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState('silicon carbide switching losses');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [ingestedDocs, setIngestedDocs] = useState<string[]>([]);

  const indexedDocs = [
    {
      id: 'DOC-101',
      title: 'IEEE Transactions on Power Electronics (2025)',
      category: 'Papers',
      doi: '10.1109/TPE.2025.340912',
      year: 2025,
      type: 'Primary Research Paper',
      similarity: 98,
      vectorDim: 1536,
      cluster: 'SiC Semiconductor Physics',
      excerpt: 'Evaluates switching loss dissipation in 3-level ANPC SiC power modules relative to Si IGBT benchmarks at 10kHz PWM.'
    },
    {
      id: 'DOC-102',
      title: 'Zenodo Converter Loss Benchmark Dataset #07',
      category: 'Datasets',
      doi: '10.5281/zenodo.849201',
      year: 2024,
      type: 'Empirical Dataset',
      similarity: 95,
      vectorDim: 1536,
      cluster: 'Experimental Testbenches',
      excerpt: 'Contains N=2,418 observed current, voltage, and loss observations across 2kHz, 5kHz, 8kHz, and 10kHz frequencies.'
    },
    {
      id: 'DOC-103',
      title: 'Wolfspeed 1200V 11mΩ SiC MOSFET Module Datasheet',
      category: 'Datasheets',
      doi: 'DS-CAB011M12FM3',
      year: 2025,
      type: 'Manufacturer Specification',
      similarity: 92,
      vectorDim: 1536,
      cluster: 'Component Specifications',
      excerpt: 'Low E_on and E_off switching energy ratings, R_ds(on) thermal coefficient limits, and junction-to-case resistance bounds.'
    },
    {
      id: 'DOC-104',
      title: 'Active Neutral Point Clamped Converter Topology Patent',
      category: 'Patents',
      doi: 'US-PATENT-11928421',
      year: 2023,
      type: 'Patent Specification',
      similarity: 88,
      vectorDim: 1536,
      cluster: 'Converter Topologies',
      excerpt: 'Switching gate drive sequence and auxiliary clamping diode commutation logic for 3-level ANPC converters.'
    },
    {
      id: 'DOC-105',
      title: 'High-Power Converter Thermal Management Technical Report',
      category: 'Technical Reports',
      doi: 'TR-2024-POWER-88',
      year: 2024,
      type: 'Technical Report',
      similarity: 86,
      vectorDim: 1536,
      cluster: 'Thermal & Cooling',
      excerpt: 'Evaluates heatsink volume reduction and liquid cooling requirements for 100kW+ SiC inverter designs.'
    }
  ];

  const categories = ['All', 'Papers', 'Datasets', 'Datasheets', 'Patents', 'Technical Reports'];

  const filteredDocs = indexedDocs.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesThreshold = doc.similarity >= similarityThreshold;
    const matchesSearch = searchQuery.trim() === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              12,482 high-dimensional embeddings (1,536-dim OpenAI / text-embedding-3-large) indexed across IEEE papers, datasets, and patents.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
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
            placeholder="Search high-dimensional semantic index (e.g. silicon carbide switching losses, thermal resistance, ANPC clamping)..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-[#0F141C] border border-[#212936] text-[#F1F5F9] rounded-md focus:outline-none focus:border-[#38BDF8] transition-all font-sans"
          />
        </div>

        {/* Category Pills & Similarity Threshold Slider */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#94A3B8] text-[10px] uppercase font-bold mr-1">Domain Category:</span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { playClickSound(); setSelectedCategory(cat); }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-xs'
                      : 'bg-[#0F141C] text-[#94A3B8] border border-[#212936] hover:bg-[#161D27]'
                  }`}
                >
                  {cat}
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
              min="50"
              max="95"
              step="5"
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
        <span>RETRIEVED: <strong className="text-[#F1F5F9]">{filteredDocs.length} MATCHES</strong></span>
        <span>METRIC: <strong className="text-[#38BDF8]">COSINE SIMILARITY (1,536-D)</strong></span>
      </div>

      {/* Document Result Cards */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
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
                    <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.2 rounded border border-[#F59E0B]/20 font-semibold">{doc.category}</span>
                    <span>•</span>
                    <span>Cluster: <strong className="text-[#CBD5E1]">{doc.cluster}</strong></span>
                    <span>•</span>
                    <span>{doc.vectorDim}-dim</span>
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
                <span>DOI / IDENTIFIER: <strong className="text-[#38BDF8]">{doc.doi}</strong></span>
                <span>TYPE: <strong className="text-[#CBD5E1]">{doc.type} ({doc.year})</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KnowledgeIndexSearch;
