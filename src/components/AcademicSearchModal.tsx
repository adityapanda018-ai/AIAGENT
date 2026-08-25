import { type FC, useState } from 'react';
import { X, Search, BookOpen, Plus, Check, Filter } from 'lucide-react';
import type { KnowledgeDocument } from '../types/agent';

interface AcademicSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngestPaper: (doc: KnowledgeDocument) => void;
}

export interface AcademicPaper {
  id: string;
  title: string;
  authors: string;
  source: 'arXiv' | 'IEEE' | 'PubMed' | 'Semantic Scholar';
  year: number;
  doi: string;
  abstract: string;
  citations: number;
  isIngested?: boolean;
}

const SAMPLE_PAPERS: AcademicPaper[] = [
  {
    id: 'paper-01',
    title: 'High-Efficiency 3-Level Active Neutral-Point-Clamped (ANPC) Inverter Using 1200V SiC MOSFETs for 100 kW Industrial Drives',
    authors: 'Zhang, L., Mueller, K., et al.',
    source: 'IEEE',
    year: 2025,
    doi: '10.1109/TPEL.2025.3341890',
    abstract: 'Demonstrates 42.8% reduction in switching losses using 3-level ANPC topology with 1200V Silicon Carbide MOSFETs operating at 10 kHz PWM frequency with continuous 100 kW load rating.',
    citations: 28
  },
  {
    id: 'paper-02',
    title: 'Thermal Resistance Modeling and Junction Temperature Bounds in Multilevel SiC Power Conversion Modules',
    authors: 'Chen, H., Patel, R., Vance, E.',
    source: 'arXiv',
    year: 2024,
    doi: '10.48550/arXiv.2409.12845',
    abstract: 'Evaluates junction-to-case thermal resistance R_th,jc <= 0.18 K/W requirements to maintain T_j under 125°C under continuous high-power operation.',
    citations: 45
  },
  {
    id: 'paper-03',
    title: 'Deep Learning for OTDR Optical Fiber Fault Localization and Gradual Micro-Bending Attenuation Detection',
    authors: 'Svensson, A., Thorne, B., Kim, D.',
    source: 'Semantic Scholar',
    year: 2025,
    doi: '10.1016/j.yofte.2025.103412',
    abstract: 'CNN-LSTM neural networks applied to OTDR backscatter traces detect micro-bending loss and gradual attenuation with 99.1% localization accuracy in passive optical networks.',
    citations: 19
  },
  {
    id: 'paper-04',
    title: 'Benchmark Dataset for High-Voltage Semiconductor Reliability and Avalanche Breakdown Failure Margins',
    authors: 'European Power Consortium',
    source: 'PubMed',
    year: 2024,
    doi: '10.5281/zenodo.9876543',
    abstract: 'Primary experimental stress-testing dataset covering 10,000 thermal cycles for 1200V planar and trench SiC MOSFETs.',
    citations: 62
  }
];

export const AcademicSearchModal: FC<AcademicSearchModalProps> = ({
  isOpen,
  onClose,
  onIngestPaper
}) => {
  const [query, setQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [ingestedIds, setIngestedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const filteredPapers = SAMPLE_PAPERS.filter(p => {
    const matchesSource = selectedSource === 'All' || p.source === selectedSource;
    const matchesQuery = !query.trim() || 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.abstract.toLowerCase().includes(query.toLowerCase()) ||
      p.authors.toLowerCase().includes(query.toLowerCase());
    return matchesSource && matchesQuery;
  });

  const handleIngest = (paper: AcademicPaper) => {
    const doc: KnowledgeDocument = {
      id: `doc-acad-${Date.now()}`,
      title: paper.title,
      category: 'Paper',
      summary: `${paper.source} (DOI: ${paper.doi}) - ${paper.abstract.slice(0, 100)}...`,
      sourceCount: 1,
      lastIndexed: 'Just now',
      content: `Title: ${paper.title}\nAuthors: ${paper.authors}\nSource: ${paper.source} (${paper.year})\nDOI: ${paper.doi}\n\nAbstract:\n${paper.abstract}`,
      tokenCount: 450,
      sizeBytes: 1820,
      uploadedAt: Date.now()
    };
    onIngestPaper(doc);
    setIngestedIds(prev => ({ ...prev, [paper.id]: true }));
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-5 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              ACADEMIC RETRIEVAL CONNECTORS (arXiv, IEEE, PubMed, Semantic Scholar)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar & Source Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peer-reviewed papers, DOIs, or author keywords... (e.g. SiC ANPC multilevel inverter)"
              className="w-full bg-[#0F141C] border border-[#212936] focus:border-[#38BDF8] rounded-sm py-2 pl-9 pr-4 text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="text-[#94A3B8] flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Source Index:
            </span>
            {['All', 'arXiv', 'IEEE', 'PubMed', 'Semantic Scholar'].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2 py-0.5 rounded-sm border transition-colors cursor-pointer ${
                  selectedSource === src
                    ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                    : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
                }`}
              >
                {src}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredPapers.length === 0 ? (
            <div className="p-8 text-center text-[#94A3B8] font-mono text-xs">
              No indexed papers matched your query.
            </div>
          ) : (
            filteredPapers.map((p) => {
              const isIngested = ingestedIds[p.id];
              return (
                <div 
                  key={p.id}
                  className="p-3 bg-[#0F141C] border border-[#212936] hover:border-[#38BDF8]/40 rounded-sm space-y-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 py-0.2 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 rounded text-[9px] font-mono font-bold">
                          {p.source}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-mono">{p.year}</span>
                        <span className="text-[10px] text-[#10B981] font-mono font-semibold">
                          {p.citations} citations
                        </span>
                      </div>
                      <h3 className="font-bold text-xs text-[#F1F5F9] mt-1 leading-snug font-sans">
                        {p.title}
                      </h3>
                      <p className="text-[10px] text-[#94A3B8] font-sans mt-0.5">
                        Authors: {p.authors}
                      </p>
                    </div>

                    <button
                      onClick={() => handleIngest(p)}
                      disabled={isIngested}
                      className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isIngested
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                          : 'btn-primary bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] hover:bg-[#0284c7]'
                      }`}
                    >
                      {isIngested ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>INGESTED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>INGEST PAPER</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#CBD5E1] font-sans leading-relaxed line-clamp-2">
                    {p.abstract}
                  </p>

                  <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8] pt-1 border-t border-[#212936]">
                    <span>DOI: <strong className="text-[#38BDF8]">{p.doi}</strong></span>
                    <span className="text-[#10B981] font-semibold">Verified Open Access Paper</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end font-mono text-[11px]">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Academic Browser
          </button>
        </div>
      </div>
    </div>
  );
};
export default AcademicSearchModal;
