import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Trash2 } from 'lucide-react';
import type { ApiSettings, LLMModel } from '../types/agent';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSaveSettings: (settings: ApiSettings) => void;
  onResetAll: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetAll
}) => {
  const [activeProvider, setActiveProvider] = useState<'simulation' | 'openai' | 'gemini' | 'anthropic' | 'openrouter'>(settings.activeProvider);
  const [openaiKey, setOpenaiKey] = useState(settings.openaiKey);
  const [geminiKey, setGeminiKey] = useState(settings.geminiKey);
  const [anthropicKey, setAnthropicKey] = useState(settings.anthropicKey);
  const [openrouterKey, setOpenrouterKey] = useState(settings.openrouterKey);
  const [selectedModel, setSelectedModel] = useState<string>(settings.selectedModel || 'gpt-4o');
  const [executionSpeedMs, setExecutionSpeedMs] = useState(settings.executionSpeedMs || 800);
  const [autoRunCode, setAutoRunCode] = useState(settings.autoRunCode ?? true);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({
      openaiKey,
      geminiKey,
      anthropicKey,
      openrouterKey,
      activeProvider,
      selectedModel,
      executionSpeedMs,
      autoRunCode
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono select-none">
      <div className="w-full max-w-lg bg-[#07080c] border border-[#1e2330] rounded shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-[#1e2330] flex items-center justify-between bg-[#040507]">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <h2 className="font-bold text-xs text-slate-100 uppercase tracking-wider">ENGINE CONFIGURATION & API KEYS</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-300">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">EXECUTION ENGINE PROVIDER</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { id: 'simulation', label: 'SIMULATOR (ZERO SETUP)', icon: '⚡' },
                { id: 'openai', label: 'OPENAI GPT-4O', icon: '🤖' },
                { id: 'gemini', label: 'GOOGLE GEMINI', icon: '✨' },
                { id: 'anthropic', label: 'ANTHROPIC CLAUDE', icon: '🧠' },
                { id: 'openrouter', label: 'OPENROUTER UNIFIED', icon: '🌐' },
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => setActiveProvider(prov.id as any)}
                  className={`p-2 rounded border text-left font-bold text-[10px] flex items-center gap-1.5 transition-all ${
                    activeProvider === prov.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-[#040507] border-[#1e2330] text-slate-400 hover:bg-[#0c0e14]'
                  }`}
                >
                  <span>{prov.icon}</span>
                  <span className="truncate">{prov.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">DEFAULT MODEL ARCHITECTURE</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as LLMModel)}
              className="w-full glass-input bg-[#07080c] text-[10px]"
            >
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Anthropic)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Google)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Google)</option>
              <option value="gpt-4o">GPT-4o (OpenAI)</option>
              <option value="deepseek-r1">DeepSeek R1 (DeepSeek)</option>
              <option value="llama-3.1-70b">Llama 3.1 70B (Meta)</option>
            </select>
          </div>

          {activeProvider !== 'simulation' && (
            <div className="space-y-2 p-2.5 rounded bg-[#040507] border border-[#1e2330] animate-fade-in text-[10px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CLIENT API STORAGE</span>
              </div>
              <p className="text-[9px] text-slate-400">
                Keys are retained securely in local browser memory and used directly for model inference requests.
              </p>

              {activeProvider === 'openai' && (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">OPENAI API KEY</label>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="w-full glass-input"
                    placeholder="sk-..."
                  />
                </div>
              )}

              {activeProvider === 'gemini' && (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">GOOGLE GEMINI API KEY</label>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full glass-input"
                    placeholder="AIzaSy..."
                  />
                </div>
              )}

              {activeProvider === 'anthropic' && (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">ANTHROPIC API KEY</label>
                  <input
                    type="password"
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    className="w-full glass-input"
                    placeholder="sk-ant-..."
                  />
                </div>
              )}

              {activeProvider === 'openrouter' && (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 mb-1">OPENROUTER API KEY</label>
                  <input
                    type="password"
                    value={openrouterKey}
                    onChange={(e) => setOpenrouterKey(e.target.value)}
                    className="w-full glass-input"
                    placeholder="sk-or-..."
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2.5 rounded bg-[#040507] border border-[#1e2330]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400">STREAM INTERVAL</span>
                <span className="font-mono text-amber-400 font-bold text-[10px]">{executionSpeedMs} MS</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={executionSpeedMs}
                onChange={(e) => setExecutionSpeedMs(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold text-slate-200 block">CODE AUTORUN</span>
                <span className="text-[9px] text-slate-500 block">Execute JS sandbox</span>
              </div>
              <input
                type="checkbox"
                checked={autoRunCode}
                onChange={(e) => setAutoRunCode(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#1e2330] bg-[#040507] flex items-center justify-between">
          <button
            onClick={onResetAll}
            className="text-rose-400 hover:text-rose-300 text-[10px] flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>RESET LOCAL STORAGE</span>
          </button>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary py-1 px-3 text-[10px]">
              CANCEL
            </button>
            <button onClick={handleSave} className="btn-primary py-1 px-4 text-[10px]">
              <Check className="w-3.5 h-3.5" />
              <span>SAVE SETTINGS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
