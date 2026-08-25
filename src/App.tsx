import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ResearchDesk } from './components/ResearchDesk';
import { ExecutionVisualizer } from './components/ExecutionVisualizer';
import { ArtifactWorkspace } from './components/ArtifactWorkspace';
import { AgentBuilderModal } from './components/AgentBuilderModal';
import { SettingsModal } from './components/SettingsModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { InteractiveSimulatorModal } from './components/InteractiveSimulatorModal';
import { InteractiveSimulatorView } from './components/InteractiveSimulatorView';
import { AcademicSearchModal } from './components/AcademicSearchModal';
import { ShareInvestigationModal } from './components/ShareInvestigationModal';
import { TokenCostMeter } from './components/TokenCostMeter';
import { KnowledgeBase } from './components/KnowledgeBase';
import { TemplateGallery } from './components/TemplateGallery';
import { ValidationDashboard } from './components/ValidationDashboard';
import { ObservabilityDashboard } from './components/ObservabilityDashboard';
import { InvestigationHistoryView } from './components/InvestigationHistoryView';
import { KnowledgeIndexSearch } from './components/KnowledgeIndexSearch';
import { FailureRecoveryView } from './components/FailureRecoveryView';
import { SystemValidationView } from './components/SystemValidationView';
import { MessagingIntegrationsView } from './components/MessagingIntegrationsView';

import type { Agent, ExecutionStep, Artifact, ApiSettings, NavTab, KnowledgeDocument } from './types/agent';
import { DEFAULT_AGENTS, INITIAL_ARTIFACTS, DEFAULT_KNOWLEDGE } from './data/defaultData';
import { executeAgentTask } from './services/agentEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(DEFAULT_AGENTS[0].id);
  const [taskPrompt, setTaskPrompt] = useState<string>('Evaluate the feasibility of silicon carbide based multilevel inverters for high-power applications.');
  
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(DEFAULT_KNOWLEDGE);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [isAgentBuilderOpen, setIsAgentBuilderOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isAcademicSearchOpen, setIsAcademicSearchOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isTokenMeterOpen, setIsTokenMeterOpen] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>('dark');
  const [background, setBackground] = useState<string>('grid');
  const [highlight, setHighlight] = useState<string>('cyan');

  const [settings, setSettings] = useState<ApiSettings>({
    activeProvider: 'simulation',
    selectedModel: 'gpt-4o',
    executionSpeedMs: 600,
    autoRunCode: true
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  useEffect(() => {
    const savedKeys = localStorage.getItem('nexusai_api_settings');
    if (savedKeys) {
      try {
        setSettings(JSON.parse(savedKeys));
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
    const savedTheme = localStorage.getItem('nexusai_theme');
    if (savedTheme) setTheme(savedTheme);

    const savedBg = localStorage.getItem('nexusai_bg');
    if (savedBg) setBackground(savedBg);

    const savedHl = localStorage.getItem('nexusai_hl');
    if (savedHl) setHighlight(savedHl);
  }, []);

  const handleSelectTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('nexusai_theme', newTheme);
  };

  const handleSelectBg = (newBg: string) => {
    setBackground(newBg);
    localStorage.setItem('nexusai_bg', newBg);
  };

  const handleSelectHl = (newHl: string) => {
    setHighlight(newHl);
    localStorage.setItem('nexusai_hl', newHl);
  };

  const handleResetThemeDefaults = () => {
    handleSelectTheme('dark');
    handleSelectBg('grid');
    handleSelectHl('cyan');
  };

  const handleSaveSettings = (newSettings: ApiSettings) => {
    setSettings(newSettings);
    localStorage.setItem('nexusai_api_settings', JSON.stringify(newSettings));
  };

  const handleSaveAgent = (agentToSave: Agent) => {
    setAgents(prev => {
      const exists = prev.some(a => a.id === agentToSave.id);
      if (exists) {
        return prev.map(a => a.id === agentToSave.id ? agentToSave : a);
      }
      return [...prev, agentToSave];
    });
    setSelectedAgentId(agentToSave.id);
  };

  const handleStopTask = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsRunning(false);
  };

  const handleRunTask = async (customPrompt?: string) => {
    if (isRunning) return;

    const targetPrompt = customPrompt || taskPrompt;
    if (!targetPrompt.trim()) return;

    setIsRunning(true);
    setSteps([]);
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await executeAgentTask(
        selectedAgent,
        targetPrompt,
        settings,
        (step: ExecutionStep) => setSteps(prev => [...prev, step]),
        (art: Artifact) => setArtifacts(prev => [...prev, art]),
        controller.signal
      );
    } catch (err: any) {
      console.error("Analysis Execution error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStartInvestigation = (prompt: string, _scope: string[], _sources: string, _depth: string, _verification: string) => {
    setTaskPrompt(prompt);
    handleRunTask(prompt);
  };

  const handleAddDocument = (doc: KnowledgeDocument) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleRunDemoStep = (stepIndex: number) => {
    setActiveTab('dashboard');
    if (stepIndex === 0) {
      setTaskPrompt('Evaluate the feasibility of silicon carbide based multilevel inverters for 100 kW industrial applications.');
    } else if (stepIndex === 1) {
      handleStartInvestigation('Evaluate the feasibility of silicon carbide based multilevel inverters for 100 kW industrial applications.', ['Technical'], 'All', 'Detailed', 'Strict');
    }
  };

  return (
    <div 
      data-theme={theme}
      data-highlight={highlight}
      className={`min-h-screen h-screen flex flex-col text-[#F1F5F9] font-sans overflow-hidden select-none bg-texture-${background}`}
      style={{ backgroundColor: 'var(--bg-main, #0F141C)' }}
    >
      {/* 1. HEADER */}
      <Header
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAgentBuilder={() => setIsAgentBuilderOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenAcademicSearch={() => setIsAcademicSearchOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenTokenMeter={() => setIsTokenMeterOpen(true)}
        onRunDemoStep={handleRunDemoStep}
      />

      {/* MAIN WORKSPACE GRID */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2. SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={(agentId) => {
            setSelectedAgentId(agentId);
            setActiveTab('dashboard');
            const agent = agents.find(a => a.id === agentId);
            if (agent) {
              const prompt = `Execute analytical research using ${agent.name} (${agent.role}) capabilities for silicon carbide inverter feasibility.`;
              setTaskPrompt(prompt);
              handleStartInvestigation(prompt, ['Technical'], 'All', 'Detailed', 'Strict');
            }
          }}
          onNewAgent={() => setIsAgentBuilderOpen(true)}
        />

        {/* 3. RIGHT CONTENT PANE */}
        <main className="flex-1 overflow-y-auto bg-[#0F141C] p-4">
          {activeTab === 'dashboard' && (
            /* User Specification: Exact Vertical Stack Order Layout */
            <div className="space-y-4 max-w-7xl mx-auto pb-8">
              {/* RESEARCH OBJECTIVE, 7-STAGE PIPELINE, FINDINGS & EVIDENCE */}
              <ResearchDesk
                selectedAgent={selectedAgent}
                taskPrompt={taskPrompt}
                onPromptChange={setTaskPrompt}
                isRunning={isRunning}
                onStartInvestigation={handleStartInvestigation}
                onStopInvestigation={handleStopTask}
                steps={steps}
              />

              {/* TELEMETRY / ACTIVITY STREAM */}
              <div className="h-96">
                <ExecutionVisualizer
                  steps={steps}
                  isRunning={isRunning}
                />
              </div>

              {/* RESEARCH DOSSIER DELIVERABLE */}
              <div className="min-h-[500px]">
                <ArtifactWorkspace
                  artifacts={artifacts}
                />
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="h-full">
              <InteractiveSimulatorView />
            </div>
          )}

          {activeTab === 'runs' && (
            <div className="h-full">
              <InvestigationHistoryView onOpenDossier={() => setActiveTab('dashboard')} />
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="h-full">
              <KnowledgeBase 
                documents={documents} 
                agents={agents} 
                onAddDocument={handleAddDocument} 
                onDeleteDocument={handleDeleteDocument} 
              />
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="h-full">
              <ValidationDashboard />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="h-full">
              <TemplateGallery 
                agents={agents} 
                onLaunchTask={(ag: Agent, prompt: string) => {
                  setSelectedAgentId(ag.id);
                  setActiveTab('dashboard');
                  handleStartInvestigation(prompt, ['Technical'], 'All', 'Detailed', 'Strict');
                }}
              />
            </div>
          )}

          {activeTab === 'index' && (
            <div className="h-full">
              <KnowledgeIndexSearch />
            </div>
          )}

          {activeTab === 'system_validation' && (
            <div className="h-full">
              <SystemValidationView />
            </div>
          )}

          {activeTab === 'resilience' && (
            <div className="h-full">
              <FailureRecoveryView />
            </div>
          )}

          {activeTab === 'messaging' && (
            <div className="h-full">
              <MessagingIntegrationsView />
            </div>
          )}

          {activeTab === 'observability' && (
            <div className="h-full">
              <ObservabilityDashboard />
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AgentBuilderModal
        isOpen={isAgentBuilderOpen}
        onClose={() => setIsAgentBuilderOpen(false)}
        onSaveAgent={handleSaveAgent}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onResetAll={() => {
          setAgents(DEFAULT_AGENTS);
          setSettings({
            activeProvider: 'simulation',
            selectedModel: 'gpt-4o',
            executionSpeedMs: 600,
            autoRunCode: true
          });
        }}
      />

      <ThemeCustomizerModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={theme}
        onSelectTheme={handleSelectTheme}
        currentBackground={background}
        onSelectBackground={handleSelectBg}
        currentHighlight={highlight}
        onSelectHighlight={handleSelectHl}
        onResetDefaults={handleResetThemeDefaults}
      />

      <InteractiveSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      <AcademicSearchModal
        isOpen={isAcademicSearchOpen}
        onClose={() => setIsAcademicSearchOpen(false)}
        onIngestPaper={(newDoc) => handleAddDocument(newDoc)}
      />

      <ShareInvestigationModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <TokenCostMeter
        isOpen={isTokenMeterOpen}
        onClose={() => setIsTokenMeterOpen(false)}
      />
    </div>
  );
}

export default App;
