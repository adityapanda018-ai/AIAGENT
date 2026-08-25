import React, { useState } from 'react';
import { Database, Plus, Trash2, ShieldCheck, Table, FileText, CheckCircle2 } from 'lucide-react';
import type { KnowledgeDocument, Agent } from '../types/agent';
import { relationalEvidenceDB } from '../services/evidenceDatabase';

interface KnowledgeBaseProps {
  documents: KnowledgeDocument[];
  agents: Agent[];
  onAddDocument: (doc: KnowledgeDocument) => void;
  onDeleteDocument: (id: string) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  documents,
  agents: _agents,
  onAddDocument,
  onDeleteDocument
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Literature');
  const [newContent, setNewContent] = useState('');
  const [activeTable, setActiveTable] = useState<'claims' | 'evidence' | 'verification'>('claims');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const doc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      content: newContent,
      tokenCount: Math.round(newContent.length / 4) + 120,
      sizeBytes: newContent.length + 500,
      uploadedAt: Date.now()
    };
    onAddDocument(doc);
    setShowAddModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const totalTokens = documents.reduce((sum, d) => sum + d.tokenCount, 0);

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-mono select-none">
      {/* Header */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-sans">KNOWLEDGE INDEX & RELATIONAL EVIDENCE STORE</h2>
            <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">
              Authoritative database linking claims, primary evidence excerpts, and multi-specialist verification logs.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary py-1 px-3 text-[11px]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>INGEST TO EVIDENCE STORE</span>
        </button>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel p-3 rounded-sm space-y-0.5 border border-[#212936] bg-[#0F141C]">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">EVIDENCE DOCUMENTS</span>
          <div className="text-sm font-bold text-[#F1F5F9]">{documents.length} FILES INGESTED</div>
        </div>
        <div className="glass-panel p-3 rounded-sm space-y-0.5 border border-[#212936] bg-[#0F141C]">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">KNOWLEDGE INDEX SIZE</span>
          <div className="text-sm font-bold text-[#38BDF8]">{totalTokens.toLocaleString()} TOKENS</div>
        </div>
        <div className="glass-panel p-3 rounded-sm space-y-0.5 border border-[#212936] bg-[#0F141C]">
          <span className="text-[9px] uppercase font-bold text-[#94A3B8]">PROVENANCE AUDIT</span>
          <div className="text-sm font-bold text-[#10B981] flex items-center gap-1 font-sans">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Relational DB Verified
          </div>
        </div>
      </div>

      {/* User Specification: Relational Evidence Store Query Engine */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#212936] pb-2">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              RELATIONAL EVIDENCE DATABASE ENGINE
            </h3>
          </div>

          <div className="flex items-center gap-1">
            {(['claims', 'evidence', 'verification'] as const).map((tbl) => (
              <button
                key={tbl}
                type="button"
                onClick={() => setActiveTable(tbl)}
                className={`px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase border ${
                  activeTable === tbl
                    ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] font-bold'
                    : 'bg-[#0F141C] text-[#94A3B8] border-[#212936] hover:bg-[#161D27]'
                }`}
              >
                [{tbl}]
              </button>
            ))}
          </div>
        </div>

        {/* Database Tables Display */}
        <div className="overflow-x-auto border border-[#212936] rounded-sm bg-[#0F141C] text-[10px]">
          {activeTable === 'claims' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                  <th className="p-2">claim_id</th>
                  <th className="p-2">investigation_id</th>
                  <th className="p-2">claim_text</th>
                  <th className="p-2">claim_type</th>
                  <th className="p-2">status</th>
                  <th className="p-2">confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                {relationalEvidenceDB.claims.map((c) => (
                  <tr key={c.claim_id}>
                    <td className="p-2 font-bold text-[#F59E0B]">{c.claim_id}</td>
                    <td className="p-2">{c.investigation_id}</td>
                    <td className="p-2 font-sans text-[11px] text-[#F1F5F9] max-w-[300px]">{c.claim_text}</td>
                    <td className="p-2 text-[#38BDF8]">{c.claim_type}</td>
                    <td className="p-2 text-[#10B981] font-bold">{c.status}</td>
                    <td className="p-2">{c.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTable === 'evidence' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                  <th className="p-2">evidence_id</th>
                  <th className="p-2">claim_id</th>
                  <th className="p-2">source_id</th>
                  <th className="p-2">excerpt</th>
                  <th className="p-2">page</th>
                  <th className="p-2">relevance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                {relationalEvidenceDB.evidence.map((ev) => (
                  <tr key={ev.evidence_id}>
                    <td className="p-2 font-bold text-[#38BDF8]">{ev.evidence_id}</td>
                    <td className="p-2 text-[#F59E0B]">{ev.claim_id}</td>
                    <td className="p-2">{ev.source_id}</td>
                    <td className="p-2 font-sans text-[11px] text-[#F1F5F9] max-w-[300px]">{ev.excerpt}</td>
                    <td className="p-2">{ev.page}</td>
                    <td className="p-2 text-[#10B981]">{ev.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTable === 'verification' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
                  <th className="p-2">verification_id</th>
                  <th className="p-2">claim_id</th>
                  <th className="p-2">specialist</th>
                  <th className="p-2">result</th>
                  <th className="p-2">reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
                {relationalEvidenceDB.verifications.map((vr) => (
                  <tr key={vr.verification_id}>
                    <td className="p-2 font-bold text-[#10B981]">{vr.verification_id}</td>
                    <td className="p-2 text-[#F59E0B]">{vr.claim_id}</td>
                    <td className="p-2 font-bold text-[#F1F5F9]">{vr.specialist}</td>
                    <td className="p-2 text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      {vr.result}
                    </td>
                    <td className="p-2 font-sans text-[11px] text-[#CBD5E1] max-w-[300px]">{vr.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Document Ingestion List */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3">
        <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">INGESTED INDEX DOCUMENTS</h3>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <span className="font-bold text-[#F1F5F9]">{doc.title}</span>
                  <p className="text-[10px] text-[#94A3B8] font-sans">{doc.content}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="p-1 rounded text-[#94A3B8] hover:text-[#EF4444]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161D27] border border-[#212936] rounded-sm p-4 max-w-md w-full space-y-3 font-sans">
            <h3 className="text-xs font-bold text-[#F1F5F9] font-mono">INGEST DOCUMENT TO KNOWLEDGE INDEX</h3>
            <input
              type="text"
              placeholder="Document Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full glass-input text-xs"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full glass-input text-xs bg-[#0F141C]"
            >
              <option value="Literature">Literature</option>
              <option value="Datasheets">Datasheets</option>
              <option value="Datasets">Datasets</option>
            </select>
            <textarea
              rows={4}
              placeholder="Document Content Excerpt..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full glass-input text-xs resize-none"
            />
            <div className="flex justify-end gap-2 font-mono">
              <button onClick={() => setShowAddModal(false)} className="btn-secondary text-xs">CANCEL</button>
              <button onClick={handleAdd} className="btn-primary text-xs">INGEST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
