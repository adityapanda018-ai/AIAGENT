export type AgentRole = 
  | 'Systems Architecture' 
  | 'Technical Research' 
  | 'Quantitative Analysis' 
  | 'Technical Synthesis'
  | 'Technical Writing'
  | 'Custom';

export type NavTab = 'dashboard' | 'simulator' | 'runs' | 'knowledge' | 'templates' | 'index' | 'validation' | 'observability' | 'resilience' | 'system_validation' | 'messaging';

export type LLMModel = 'gpt-4o' | 'gpt-4-turbo' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'claude-3-5-sonnet' | 'llama-3.1-70b' | 'deepseek-r1' | 'simulation' | string;

export interface Agent {
  id: string;
  agentId?: string;
  name: string;
  role: AgentRole;
  avatar: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  model: LLMModel;
  capabilities?: string[];
  tools: any[];
  memoryContextSize?: number;
  maxTokens?: number;
  color?: string;
  createdAt?: number;
  isCustom?: boolean;
}

export interface ExecutionStep {
  id: string;
  stepNumber?: number;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  type: 'research' | 'tool_activity' | 'validation' | 'synthesis' | 'thought' | 'tool_call' | 'subagent_spawn';
  title: string;
  content: string;
  toolName?: string;
  toolInput?: any;
  toolOutput?: any;
  status?: string;
  provenanceSources?: string[];
  timestamp: number;
  durationMs?: number;
  confidenceScore?: number;
}

export interface ArtifactProvenance {
  sources?: string[];
  stepIds?: string[];
  verificationStatus?: 'verified' | 'unverified' | 'pending';
  auditHash?: string;
  citations?: string[];
  confidence?: number;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'code' | 'markdown' | 'chart';
  content: string;
  description?: string;
  language?: string;
  createdAt: number;
  provenance?: ArtifactProvenance;
}

export interface SwarmTeam {
  id: string;
  name: string;
  description: string;
  leadRole: string;
  workflowType: string;
  members: Agent[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category?: string;
  summary?: string;
  sourceCount?: number;
  lastIndexed?: string;
  content?: string;
  tokenCount: number;
  sizeBytes: number;
  uploadedAt: number;
  agentIds?: string[];
}

export interface ApiSettings {
  openaiKey?: string;
  geminiKey?: string;
  anthropicKey?: string;
  openrouterKey?: string;
  activeProvider: 'openai' | 'gemini' | 'anthropic' | 'openrouter' | 'simulation';
  selectedModel: string;
  executionSpeedMs?: number;
  autoRunCode?: boolean;
  customModel?: string;
}

export interface ScopeOption {
  id: string;
  label: string;
  active: boolean;
}
