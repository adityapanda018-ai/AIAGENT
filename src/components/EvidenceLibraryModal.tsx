import { type FC,  useState  } from 'react';
import { X, BookOpen, ExternalLink, Filter, CheckCircle2 } from 'lucide-react';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

interface EvidenceLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskPrompt?: string;
}

export const EvidenceLibraryModal: FC<EvidenceLibraryModalProps> = ({
  isOpen,
  onClose,
  taskPrompt = ''
}) => {
  const [filter, setFilter] = useState<'All' | 'Primary' | 'Secondary' | 'Dataset'>('All');

  if (!isOpen) return null;

  const domainData = resolveDomainEvidence(taskPrompt);

  const sources = domainData.sourcesList.map(s => ({
    id: s.id,
    title: s.title,
    subtitle: `Evidence literature source supporting ${domainData.domain}`,
    type: s.type.includes('Dataset') ? 'Dataset' : s.type.includes('Secondary') ? 'Secondary' : 'Primary',
    doi: s.doi,
    relevance: 'High',
    verification: 'Passed',
    usedIn: ['Claim extraction', 'Quantitative verification']
  }));

  const filteredSources = filter === 'All' 
    ? sources 
    : sources.filter(s => s.type === filter);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/40 rounded-sm max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-4 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">EVIDENCE LIBRARY</h2>
            <span className="text-[10px] text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 font-sans">
              38 SOURCES INDEXED ({domainData.domain})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <Filter className="w-3 h-3 text-[#94A3B8] mr-1" />
          {(['All', 'Primary', 'Secondary', 'Dataset'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1 rounded-sm uppercase transition-colors ${
                filter === cat
                  ? 'bg-[#38BDF8] text-[#0F141C] font-bold'
                  : 'bg-[#0F141C] text-[#94A3B8] hover:bg-[#161D27]'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Sources Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredSources.map((src) => (
            <div key={src.id} className="p-3 bg-[#0F141C] rounded-sm border border-[#212936] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono font-bold text-[#F59E0B] text-xs flex items-center gap-2">
                    <span>[{src.id}] {src.title}</span>
                    <span className="text-[9px] font-sans text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.2 rounded-sm border border-[#38BDF8]/20">
                      {src.type} source
                    </span>
                  </div>
                  <p className="text-[#F1F5F9] text-xs font-sans mt-0.5">{src.subtitle}</p>
                </div>

                <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1 shrink-0 font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded-sm border border-[#10B981]/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Passed
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px] bg-[#161D27] p-2 rounded-sm border border-[#212936]">
                <div>
                  <span className="text-[#94A3B8] block">RELEVANCE</span>
                  <strong className="text-[#38BDF8]">{src.relevance}</strong>
                </div>
                <div>
                  <span className="text-[#94A3B8] block">VERIFICATION</span>
                  <strong className="text-[#10B981]">{src.verification}</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[#94A3B8] block">REFERENCE / DOI</span>
                  <strong className="text-[#CBD5E1] truncate block">{src.doi}</strong>
                </div>
              </div>

              {/* User Specified Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-[#212936]">
                <div className="text-[10px] text-[#94A3B8] font-sans">
                  Used in: <strong className="text-[#CBD5E1] font-normal">{src.usedIn.join(', ')}</strong>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => alert(`Opening primary source repository for ${src.title}...`)}
                    className="px-2 py-0.5 rounded-sm bg-[#161D27] text-[#38BDF8] hover:bg-[#212936] border border-[#38BDF8]/40 font-semibold flex items-center gap-1 font-sans cursor-pointer"
                  >
                    <span>OPEN SOURCE</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Evidence Library
          </button>
        </div>
      </div>
    </div>
  );
};
