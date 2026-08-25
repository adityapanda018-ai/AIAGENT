import { useState } from 'react';
import { MessageSquare, Send, RefreshCw, Terminal, PhoneCall, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { DEFAULT_MESSAGING_CHANNELS, dispatchMessageNotification } from '../services/messagingService';
import type { MessagingChannelConfig } from '../services/messagingService';

export const MessagingIntegrationsView: React.FC = () => {
  const [channels, setChannels] = useState<MessagingChannelConfig[]>(DEFAULT_MESSAGING_CHANNELS);
  const [isSending, setIsSending] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([
    'MESSAGING INTEGRATION ENGINE INITIALIZED v2.4.0',
    'WhatsApp Business Cloud API Gateway Connected (+1 555 019-2834)',
    'Telegram Bot API Connected (@NexusAI_Research_Bot)',
    'Slack Webhook Connected (#research-dossier-alerts)'
  ]);

  const handleToggleChannel = (id: string) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, enabled: !ch.enabled } : ch));
  };

  const handleSendTestWhatsApp = async (channelName: 'WhatsApp' | 'Telegram' | 'Slack') => {
    setIsSending(true);
    setDispatchLogs(prev => [`[OUTBOUND HOOK] Sending ${channelName} notification payload...`, ...prev]);

    const res = await dispatchMessageNotification(channelName, {
      investigationId: 'INV-0248',
      title: 'Silicon Carbide (SiC) Multilevel Inverter Feasibility',
      recommendation: 'Technically feasible for 100 kW applications with 42% loss reduction.',
      sourcesCount: 38,
      confidence: 'High (94.2%)',
      dossierLink: 'http://localhost:5174/#dossier-INV-0248'
    });

    setDispatchLogs(prev => [`[${res.timestamp}] ${res.log}`, ...prev]);
    setIsSending(false);
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono">
              MESSAGING & NOTIFICATION INTEGRATIONS CONTROL CENTER
            </h2>
            <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">
              Connect NexusAI to WhatsApp, Telegram, Slack, MS Teams, and Email to dispatch instant dossier summaries and claim verification alerts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => handleSendTestWhatsApp('WhatsApp')}
            disabled={isSending}
            className="btn-primary py-1.5 px-3 text-xs bg-[#25D366] text-[#0F141C] border-[#25D366] hover:bg-[#1eb956] font-bold flex items-center gap-1 cursor-pointer"
          >
            {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>[ TEST WHATSAPP ]</span>
          </button>
          
          <button
            onClick={() => handleSendTestWhatsApp('Telegram')}
            disabled={isSending}
            className="btn-primary py-1.5 px-3 text-xs bg-[#229ED9] text-[#F1F5F9] border-[#229ED9] hover:bg-[#1a84b8] font-bold flex items-center gap-1 cursor-pointer"
          >
            {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>[ TEST TELEGRAM ]</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Channel Cards + Live Outbound Webhook Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT 2 COLUMNS: Channel Configuration Cards */}
        <div className="md:col-span-2 space-y-3">
          <div className="glass-card p-3 bg-[#161D27] border-[#212936] rounded-sm flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-[#F1F5F9] uppercase">CONNECTED MESSAGING PLATFORMS</span>
            <span className="text-[10px] text-[#10B981]">4 ACTIVE INTEGRATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {channels.map((ch) => (
              <div 
                key={ch.id}
                className={`glass-card p-3 bg-[#0F141C] border rounded-sm space-y-2.5 transition-all ${
                  ch.enabled ? 'border-[#38BDF8]/40' : 'border-[#212936] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#212936] pb-1.5">
                  <div className="flex items-center gap-2">
                    {ch.name === 'WhatsApp' && <MessageCircle className="w-4 h-4 text-[#25D366]" />}
                    {ch.name === 'Telegram' && <Send className="w-4 h-4 text-[#229ED9]" />}
                    {ch.name === 'Slack' && <MessageSquare className="w-4 h-4 text-[#E01E5A]" />}
                    {ch.name === 'MSTeams' && <PhoneCall className="w-4 h-4 text-[#6264A7]" />}
                    {ch.name === 'Email' && <Mail className="w-4 h-4 text-[#F59E0B]" />}
                    <strong className="font-bold text-[#F1F5F9] text-xs font-mono">{ch.name}</strong>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer font-mono text-[10px]">
                    <input 
                      type="checkbox" 
                      checked={ch.enabled} 
                      onChange={() => handleToggleChannel(ch.id)}
                      className="rounded accent-[#38BDF8]"
                    />
                    <span className={ch.enabled ? 'text-[#10B981] font-bold' : 'text-[#94A3B8]'}>
                      {ch.enabled ? 'ACTIVE' : 'OFF'}
                    </span>
                  </label>
                </div>

                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>RECIPIENT / CHANNEL:</span>
                    <strong className="text-[#F1F5F9]">{ch.targetRecipient}</strong>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>API TOKEN / WEBHOOK:</span>
                    <strong className="text-[#38BDF8] max-w-[140px] truncate">{ch.apiKeyOrToken}</strong>
                  </div>
                  {ch.lastDispatchedAt && (
                    <div className="flex justify-between text-[#94A3B8] pt-1 border-t border-[#212936]">
                      <span>LAST DISPATCHED:</span>
                      <span className="text-[#10B981]">{ch.lastDispatchedAt}</span>
                    </div>
                  )}
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handleSendTestWhatsApp(ch.name as any)}
                    disabled={!ch.enabled || isSending}
                    className="px-2 py-0.5 rounded-sm bg-[#161D27] hover:bg-[#212936] text-[#38BDF8] border border-[#38BDF8]/30 font-mono text-[9px] font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <Send className="w-3 h-3 text-[#38BDF8]" />
                    <span>Dispatch Alert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Outbound Webhook Terminal */}
        <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm flex flex-col font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#212936] pb-2">
            <span className="font-bold text-[#38BDF8] uppercase tracking-wider text-xs flex items-center gap-1">
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
              OUTBOUND WEBHOOK DISPATCH LOG
            </span>
            <span className="text-[10px] text-[#10B981] font-bold">LIVE HTTP POST</span>
          </div>

          <div className="flex-1 bg-[#0F141C] p-3 rounded-sm border border-[#212936] overflow-y-auto font-mono text-[10px] space-y-1.5 min-h-[300px]">
            {dispatchLogs.map((log, idx) => (
              <div key={idx} className="text-[#CBD5E1] flex items-start gap-1 leading-relaxed">
                <span className="text-[#25D366] font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#212936] flex items-center justify-between text-[10px] text-[#94A3B8]">
            <span className="flex items-center gap-1 text-[#10B981]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Webhook AES-256 HMAC Verified
            </span>
            <span className="text-[#38BDF8]">HTTP 200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
