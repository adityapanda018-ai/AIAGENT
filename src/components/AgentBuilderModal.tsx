import React, { useState } from 'react';
import { X, Save, Terminal } from 'lucide-react';
import type { Agent, AgentRole, LLMModel } from '../types/agent';
import { DEFAULT_TOOLS } from '../data/defaultData';

interface AgentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAgent: (agent: Agent) => void;
  initialAgent?: Agent | null;
}

const ICON_AVATARS = [
  { id: 'Terminal', label: 'Systems (Terminal)' },
  { id: 'Search', label: 'Intelligence (Search)' },
  { id: 'BarChart2', label: 'Analytics (Chart)' },
  { id: 'Database', label: 'Vector Data (DB)' },
  { id: 'Shield', label: 'Strategy & Audit (Shield)' },
  { id: 'Globe', label: 'Web Retrieval (Globe)' }
];

const MODEL_OPTIONS: { id: LLMModel; name: string; provider: string }[] = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta' }
];

const ROLES: AgentRole[] = [
  'Systems Architecture',
  'Technical Research',
  'Quantitative Analysis',
  'Technical Writing',
  'Custom'
];

export const AgentBuilderModal: React.FC<AgentBuilderModalProps> = ({
  isOpen,
  onClose,
  onSaveAgent,
  initialAgent
}) => {
  const [name, setName] = useState(initialAgent?.name || 'Apex');
  const [role, setRole] = useState<AgentRole>(initialAgent?.role || 'Systems Architecture');
  const [avatar, setAvatar] = useState(initialAgent?.avatar || 'Terminal');
  const [description, setDescription] = useState(initialAgent?.description || 'Autonomous research and verification module for technical systems.');
  const [systemPrompt, setSystemPrompt] = useState(initialAgent?.systemPrompt || 'You are an analytical research module. Deconstruct requirements, execute verification routines, and cite data provenance.');
  const [temperature, setTemperature] = useState(initialAgent?.temperature ?? 0.2);
  const [model, setModel] = useState<LLMModel>(initialAgent?.model || 'claude-3-5-sonnet');
  const [selectedTools, setSelectedTools] = useState<string[]>(initialAgent?.tools || ['code_interpreter', 'file_workspace', 'web_search']);
  const [memoryContextSize, setMemoryContextSize] = useState(initialAgent?.memoryContextSize || 128);

  if (!isOpen) return null;

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId) ? prev.filter(t => t !== toolId) : [...prev, toolId]
    );
  };

  const handleSave = () => {
    const newAgent: Agent = {
      id: initialAgent?.id || `agent-custom-${Date.now()}`,
      name,
      role,
      avatar,
      color: 'from-amber-500 to-slate-900',
      description,
      systemPrompt,
      temperature,
      maxTokens: 4096,
      model,
      tools: selectedTools,
      memoryContextSize,
      createdAt: initialAgent?.createdAt || Date.now()
    };
    onSaveAgent(newAgent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono select-none">
      <div className="w-full max-w-xl bg-[#07080c] border border-[#1e2330] rounded shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-[#1e2330] flex items-center justify-between bg-[#040507]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <h2 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
              {initialAgent ? 'EDIT EXPERT MODULE' : 'CONFIGURE EXPERT MODULE'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-[10px] font-bold text-slate-400 mb-1">MODULE ICON</label>
              <select
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full glass-input bg-[#07080c] text-[10px]"
              >
                {ICON_AVATARS.map((icon) => (
                  <option key={icon.id} value={icon.id}>{icon.label}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">EXPERT MODULE NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input"
                  placeholder="e.g. Apex Architecture Core"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">SPECIALIST ROLE</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AgentRole)}
                    className="w-full glass-input bg-[#07080c]"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">MODEL ARCHITECTURE</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value as LLMModel)}
                    className="w-full glass-input bg-[#07080c] text-[10px]"
                  >
                    {MODEL_OPTIONS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">FUNCTIONAL DESCRIPTION</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full glass-input"
              placeholder="What research routines does this module execute?"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">SYSTEM INSTRUCTION PROTOCOL</label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full glass-input font-mono text-[10px]"
              placeholder="Define operational boundaries, research protocols, and provenance requirements..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2.5 rounded bg-[#040507] border border-[#1e2330]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400">PRECISION (TEMPERATURE)</span>
                <span className="font-mono text-amber-400 font-bold text-[10px]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400">CONTEXT WINDOW</span>
                <span className="font-mono text-slate-300 font-bold text-[10px]">{memoryContextSize} KB</span>
              </div>
              <input
                type="range"
                min="32"
                max="512"
                step="32"
                value={memoryContextSize}
                onChange={(e) => setMemoryContextSize(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">TOOL CAPABILITIES SUITE</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {DEFAULT_TOOLS.map((toolName) => {
                const isChecked = selectedTools.includes(toolName);
                return (
                  <div
                    key={toolName}
                    onClick={() => toggleTool(toolName)}
                    className={`p-1.5 rounded border cursor-pointer transition-all flex items-start gap-2 ${
                      isChecked
                        ? 'bg-[#38BDF8]/10 border-[#38BDF8]/40 text-[#F1F5F9]'
                        : 'bg-[#0F141C] border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 accent-[#38BDF8] rounded"
                    />
                    <div>
                      <div className="font-semibold text-[11px] text-[#F1F5F9]">{toolName}</div>
                      <div className="text-[9px] text-[#94A3B8] leading-tight mt-0.5">Specialist technical capability tool</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#1e2330] bg-[#040507] flex items-center justify-end gap-2">
          <button onClick={onClose} className="btn-secondary py-1 px-3 text-[10px]">
            CANCEL
          </button>
          <button onClick={handleSave} className="btn-primary py-1 px-4 text-[10px]">
            <Save className="w-3.5 h-3.5" />
            <span>SAVE EXPERT MODULE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
