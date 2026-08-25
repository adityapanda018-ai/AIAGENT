export interface MessagingChannelConfig {
  id: string;
  name: 'WhatsApp' | 'Telegram' | 'Slack' | 'MSTeams' | 'Email';
  enabled: boolean;
  status: 'CONNECTED' | 'DISCONNECTED' | 'TESTING';
  apiKeyOrToken: string;
  targetRecipient: string; // e.g. Phone number, Chat ID, Webhook URL, or Email
  lastDispatchedAt?: string;
}

export const DEFAULT_MESSAGING_CHANNELS: MessagingChannelConfig[] = [
  {
    id: 'msg-01',
    name: 'WhatsApp',
    enabled: true,
    status: 'CONNECTED',
    apiKeyOrToken: 'EAAXz...WHATSAPP_CLOUD_API_TOKEN',
    targetRecipient: '+1 (555) 019-2834',
    lastDispatchedAt: '25 AUG 2026 20:45'
  },
  {
    id: 'msg-02',
    name: 'Telegram',
    enabled: true,
    status: 'CONNECTED',
    apiKeyOrToken: '7192840192:AAH...TELEGRAM_BOT_TOKEN',
    targetRecipient: '@NexusAI_Research_Bot (-1001928401)',
    lastDispatchedAt: '25 AUG 2026 20:42'
  },
  {
    id: 'msg-03',
    name: 'Slack',
    enabled: true,
    status: 'CONNECTED',
    apiKeyOrToken: 'https://hooks.slack.com/services/T00/B00/XXXX',
    targetRecipient: '#research-dossier-alerts',
    lastDispatchedAt: '25 AUG 2026 20:30'
  },
  {
    id: 'msg-04',
    name: 'MSTeams',
    enabled: false,
    status: 'DISCONNECTED',
    apiKeyOrToken: 'https://outlook.office.com/webhook/...',
    targetRecipient: 'Engineering Feasibility Channel',
  },
  {
    id: 'msg-05',
    name: 'Email',
    enabled: true,
    status: 'CONNECTED',
    apiKeyOrToken: 'smtp.nexusai.internal:587',
    targetRecipient: 'lead-investigator@nexusai.io',
    lastDispatchedAt: '25 AUG 2026 19:50'
  }
];

export interface DispatchPayload {
  investigationId: string;
  title: string;
  recommendation: string;
  sourcesCount: number;
  confidence: string;
  dossierLink: string;
}

export async function dispatchMessageNotification(
  channelName: 'WhatsApp' | 'Telegram' | 'Slack' | 'MSTeams' | 'Email',
  payload: DispatchPayload
): Promise<{ success: boolean; log: string; timestamp: string }> {
  const time = new Date().toTimeString().split(' ')[0];

  let messageText = '';
  if (channelName === 'WhatsApp') {
    messageText = `*NEXUSAI RESEARCH REPORT [${payload.investigationId}]*\n\n` +
      `*Objective:* ${payload.title}\n` +
      `*Recommendation:* ${payload.recommendation}\n` +
      `*Evidence:* ${payload.sourcesCount} Primary DOIs Verified\n` +
      `*Confidence:* ${payload.confidence}\n\n` +
      `View Digital Dossier: ${payload.dossierLink}`;
  } else if (channelName === 'Telegram') {
    messageText = `🚨 *NEXUSAI DOSSIER DISPATCH [${payload.investigationId}]*\n\n` +
      `📌 *Topic:* ${payload.title}\n` +
      `✅ *Verdict:* ${payload.recommendation}\n` +
      `📚 *Sources:* ${payload.sourcesCount} Verified DOIs\n` +
      `🔒 *Audit ID:* INV-0248-SHA256`;
  } else {
    messageText = `[NEXUSAI] Investigation ${payload.investigationId} Completed: ${payload.title} -> ${payload.recommendation}`;
  }

  // Simulate Webhook POST dispatch with payload
  await new Promise(r => setTimeout(r, 600));

  return {
    success: true,
    log: `HTTP 200 OK — Dispatched ${channelName} webhook: "${messageText.slice(0, 45)}..."`,
    timestamp: time
  };
}
