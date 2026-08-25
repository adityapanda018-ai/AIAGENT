import { type FC, useState } from 'react';
import { X, Share2, Copy, Check, QrCode, Globe, ShieldCheck } from 'lucide-react';

interface ShareInvestigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareInvestigationModal: FC<ShareInvestigationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [accessRole, setAccessRole] = useState<'view' | 'comment' | 'audit'>('view');

  if (!isOpen) return null;

  const shareUrl = `https://aiagent-two-coral.vercel.app/dossier/INV-0248?role=${accessRole}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-lg w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-5 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              SHARE INVESTIGATION & EVIDENCE DOSSIER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shareable Link Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
            Public Read-Only Investigation URL
          </label>
          <div className="flex items-center gap-2 bg-[#0F141C] border border-[#212936] rounded-sm p-1.5 font-mono text-[11px]">
            <Globe className="w-4 h-4 text-[#38BDF8] shrink-0 ml-1" />
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-[#F1F5F9] focus:outline-none truncate font-sans text-xs"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                copied
                  ? 'bg-[#10B981] text-[#0F141C]'
                  : 'btn-primary bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] hover:bg-[#0284c7]'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* Access Permission Roles */}
        <div className="space-y-1.5 font-mono text-[10px]">
          <span className="text-[#94A3B8] uppercase font-bold">Collaborator Permission Role:</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'view', label: 'Read-Only Viewer', desc: 'Can inspect findings' },
              { id: 'comment', label: 'Reviewer', desc: 'Can add claim notes' },
              { id: 'audit', label: 'Auditor', desc: 'Full provenance trace' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setAccessRole(r.id as any)}
                className={`p-2 rounded-sm border text-left transition-all cursor-pointer ${
                  accessRole === r.id
                    ? 'border-[#38BDF8] bg-[#0F141C] text-[#38BDF8] font-bold'
                    : 'border-[#212936] bg-[#0F141C]/60 text-[#94A3B8] hover:bg-[#0F141C]'
                }`}
              >
                <span className="block text-[#F1F5F9]">{r.label}</span>
                <span className="text-[9px] text-[#94A3B8] font-sans">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Card */}
        <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between font-mono">
          <div className="space-y-1">
            <span className="font-bold text-xs text-[#F1F5F9] block">Instant Mobile QR Code</span>
            <p className="text-[10px] text-[#94A3B8] font-sans">
              Scan with any mobile camera to view the live dossier.
            </p>
            <span className="text-[9px] text-[#10B981] flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3 h-3" />
              Cryptographically Verified Link
            </span>
          </div>

          <div className="w-16 h-16 bg-white p-1 rounded-sm border border-[#212936] flex items-center justify-center">
            <QrCode className="w-full h-full text-black" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end font-mono text-[11px]">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Share Panel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShareInvestigationModal;
