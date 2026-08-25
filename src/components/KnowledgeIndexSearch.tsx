import React, { useState } from 'react';
import { Search, Database, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const KnowledgeIndexSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('silicon carbide switching losses');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const indexedDocs = [
    {
      id: 'DOC-101',
      title: 'IEEE Transactions on Power Electronics (2025)',
      category: 'Papers',
      doi: '10.1109/TPE.2025.340912',
      year: 2025,
      type: 'Primary Research Paper',
      relevanceScore: 0.98,
      excerpt: 'Evaluates switching loss dissipation in 3-level ANPC SiC power modules relative to Si IGBT benchmarks at 10kHz PWM.'
    },
    {
      id: 'DOC-102',
      title: 'Zenodo Converter Loss Benchmark Dataset #07',
      category: 'Datasets',
      doi: '10.5281/zenodo.849201',
      year: 2024,
      type: 'Empirical Dataset',
      relevanceScore: 0.95,
      excerpt: 'Contains N=2,418 observed current, voltage, and loss observations across 2kHz, 5kHz, 8kHz, and 10kHz frequencies.'
    },
    {
      id: 'DOC-103',
      title: 'SiC MOSFET 1200V 15mΩ Module Datasheet',
      category: 'Datasheets',
      doi: 'DS-SIC-1200V-ANPC',
      year: 2025,
      type: 'Manufacturer Specification',
      relevanceScore: 0.92,
      excerpt: 'Low E_on and E_off switching energy ratings, R_ds(on) thermal coefficient limits, and junction-to-case resistance bounds.'
    },
    {
      id: 'DOC-104',
      title: 'Active Neutral Point Clamped Converter Topology Patent',
      category: 'Patents',
      doi: 'US-PATENT-11928421',
      year: 2023,
      type: 'Patent Specification',
      relevanceScore: 0.88,
      excerpt: 'Switching gate drive sequence and auxiliary clamping diode commutation logic for 3-level ANPC converters.'
    },
    {
      id: 'DOC-105',
      title: 'High-Power Converter Thermal Management Technical Report',
      category: 'Technical Reports',
      doi: 'TR-2024-POWER-88',
      year: 2024,
      type: 'Technical Report',
      relevanceScore: 0.86,
      excerpt: 'Evaluates heatsink volume reduction and liquid cooling requirements for 100kW+ SiC inverter designs.'
    }
  ];

  const categories = ['All', 'Papers', 'Datasets', 'Patents', 'Technical Reports', 'Datasheets'];

  const filteredDocs = indexedDocs.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              KNOWLEDGE INDEX SEARCH & FILTER ENGINE
            </h2>
            <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">
              Query 12,482 indexed papers, datasheets, datasets, and patents in the vector store.
            </p>
          </div>
        </div>

        <span className="text-[#10B981] font-bold text-[10px] bg-[#10B981]/10 px-2.5 py-1 rounded-sm border border-[#10B981]/30 font-mono flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          12,482 INDEXED DOCUMENTS
        </span>
      </div>

      {/* User Specification: Search Bar & Category Filters */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3 font-mono">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 12,482 indexed documents (e.g. silicon carbide switching losses)..."
            className="w-full glass-input text-xs pl-9 py-2 bg-[#0F141C] border-[#212936] text-[#F1F5F9] rounded-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="text-[#94A3B8] mr-1 uppercase font-bold">CATEGORY:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-sm border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>INDEXED RESULTS FOUND: <strong>{filteredDocs.length} DOCUMENTS</strong></span>
          <span>VECTOR RETRIEVAL: <strong>COSINE SIMILARITY</strong></span>
        </div>

        {filteredDocs.map((doc) => (
          <div key={doc.id} className="p-4 bg-[#161D27] border border-[#212936] rounded-sm space-y-2">
            <div className="flex items-center justify-between border-b border-[#212936] pb-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="font-bold text-xs text-[#F1F5F9] font-sans">{doc.title}</h3>
              </div>

              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-[#F59E0B] font-bold">[{doc.category}]</span>
                <span className="text-[#10B981] font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  Relevance: {(doc.relevanceScore * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <p className="text-[#CBD5E1] text-[11px] font-sans leading-relaxed">
              "{doc.excerpt}"
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-[#212936] text-[9px] text-[#94A3B8]">
              <span>DOI / REF: <strong className="text-[#38BDF8]">{doc.doi}</strong></span>
              <span>TYPE: <strong className="text-[#CBD5E1]">{doc.type} ({doc.year})</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
