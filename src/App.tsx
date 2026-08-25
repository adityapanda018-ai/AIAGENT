import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ResearchDesk } from './components/ResearchDesk';
import { ExecutionVisualizer } from './components/ExecutionVisualizer';
import { ArtifactWorkspace } from './components/ArtifactWorkspace';
import { AgentBuilderModal } from './components/AgentBuilderModal';
import { SettingsModal } from './components/SettingsModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { QuantumNeuralCanvas } from './components/QuantumNeuralCanvas';
import { InteractiveSimulatorModal } from './components/InteractiveSimulatorModal';
import { InteractiveSimulatorView } from './components/InteractiveSimulatorView';
import { AcademicSearchModal } from './components/AcademicSearchModal';
import { ShareInvestigationModal } from './components/ShareInvestigationModal';
import { TokenCostMeter } from './components/TokenCostMeter';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { CircuitTopologyModal } from './components/CircuitTopologyModal';
import { RunComparisonModal } from './components/RunComparisonModal';
import { FloatingTelemetryDock } from './components/FloatingTelemetryDock';
import { FullSystemTestModal } from './components/FullSystemTestModal';
import { ProductTourModal } from './components/ProductTourModal';
import { UserAuthModal } from './components/UserAuthModal';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { DeveloperApiDocsModal } from './components/DeveloperApiDocsModal';
import { KnowledgeBase } from './components/KnowledgeBase';
import { TemplateGallery } from './components/TemplateGallery';
import { ValidationDashboard } from './components/ValidationDashboard';
import { ObservabilityDashboard } from './components/ObservabilityDashboard';
import { InvestigationHistoryView } from './components/InvestigationHistoryView';
import { KnowledgeIndexSearch } from './components/KnowledgeIndexSearch';
import { FailureRecoveryView } from './components/FailureRecoveryView';
import { SystemValidationView } from './components/SystemValidationView';
import { MessagingIntegrationsView } from './components/MessagingIntegrationsView';
import { isSoundEnabled, setSoundEnabled, playSwitchSound } from './services/soundFx';
import { downloadBlob, generateJupyterNotebook, generateLatexPaper } from './services/exportGenerators';
import { loadUserProfile, saveUserProfile, DEFAULT_GUEST_PROFILE } from './services/authStore';

import type { Agent, ExecutionStep, Artifact, ApiSettings, NavTab, KnowledgeDocument } from './types/agent';
import type { UserProfile } from './types/auth';
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

  const [userProfile, setUserProfile] = useState<UserProfile>(loadUserProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [isAgentBuilderOpen, setIsAgentBuilderOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isAcademicSearchOpen, setIsAcademicSearchOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isTokenMeterOpen, setIsTokenMeterOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCircuitTopologyOpen, setIsCircuitTopologyOpen] = useState<boolean>(false);
  const [isRunComparisonOpen, setIsRunComparisonOpen] = useState<boolean>(false);
  const [isFullTestOpen, setIsFullTestOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState<boolean>(false);
  const [isApiDocsModalOpen, setIsApiDocsModalOpen] = useState<boolean>(false);
  const [isSplitView, setIsSplitView] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>('dark');
  const [background, setBackground] = useState<string>('grid');
  const [highlight, setHighlight] = useState<string>('cyan');
  const [particleIntensity, setParticleIntensity] = useState<'off' | 'subtle' | 'high'>('subtle');
  const [soundActive, setSoundActive] = useState<boolean>(isSoundEnabled());
  const [isHologramMode, setIsHologramMode] = useState<boolean>(false);

  const [settings, setSettings] = useState<ApiSettings>({
    activeProvider: 'simulation',
    selectedModel: 'gpt-4o',
    executionSpeedMs: 600,
    autoRunCode: true
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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

    const savedParticle = localStorage.getItem('nexusai_particle') as 'off' | 'subtle' | 'high';
    if (savedParticle) setParticleIntensity(savedParticle);

    const savedHologram = localStorage.getItem('nexusai_hologram') === 'true';
    setIsHologramMode(savedHologram);

    const tourSeen = localStorage.getItem('nexusai_tour_seen');
    if (!tourSeen) {
      setIsTourOpen(true);
      localStorage.setItem('nexusai_tour_seen', 'true');
    }
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

  const handleSelectParticleIntensity = (intensity: 'off' | 'subtle' | 'high') => {
    setParticleIntensity(intensity);
    localStorage.setItem('nexusai_particle', intensity);
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  const handleToggleHologram = () => {
    const next = !isHologramMode;
    setIsHologramMode(next);
    localStorage.setItem('nexusai_hologram', String(next));
  };

  const handleResetThemeDefaults = () => {
    handleSelectTheme('dark');
    handleSelectBg('grid');
    handleSelectHl('cyan');
    handleSelectParticleIntensity('subtle');
    setSoundActive(true);
    setSoundEnabled(true);
    setIsHologramMode(false);
    localStorage.setItem('nexusai_hologram', 'false');
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  const handleSignOut = () => {
    const guest: UserProfile = { ...DEFAULT_GUEST_PROFILE, isLoggedIn: false };
    setUserProfile(guest);
    saveUserProfile(guest);
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    saveUserProfile(profile);
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

  const handleExportJupyter = () => {
    const activeArt = artifacts[artifacts.length - 1] || INITIAL_ARTIFACTS[0];
    const ipynbContent = generateJupyterNotebook(activeArt.content || '', activeArt.title || 'SiC Investigation');
    downloadBlob(ipynbContent, `NexusAI_Investigation_${activeArt.id || '0248'}.ipynb`, 'application/json');
  };

  const handleExportLatex = () => {
    const activeArt = artifacts[artifacts.length - 1] || INITIAL_ARTIFACTS[0];
    const texContent = generateLatexPaper(activeArt.content || '', activeArt.title || 'SiC Feasibility Analysis');
    downloadBlob(texContent, `NexusAI_Paper_${activeArt.id || '0248'}.tex`, 'text/plain');
  };

  return (
    <div 
      data-theme={theme}
      data-highlight={highlight}
      className={`min-h-screen h-screen flex flex-col text-[#F1F5F9] font-sans overflow-hidden select-none bg-texture-${background} ${isHologramMode ? 'hologram-mode' : ''}`}
      style={{ backgroundColor: 'var(--bg-main, #0F141C)' }}
    >
      {/* Interactive Quantum Neural Canvas Background */}
      <QuantumNeuralCanvas intensity={particleIntensity} highlightColor={highlight} />

      {/* 1. HEADER */}
      <Header
        settings={settings}
        userProfile={userProfile}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAgentBuilder={() => setIsAgentBuilderOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenAcademicSearch={() => setIsAcademicSearchOpen(true)}
        onOpenCircuitTopology={() => setIsCircuitTopologyOpen(true)}
        onOpenRunComparison={() => setIsRunComparisonOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenTokenMeter={() => setIsTokenMeterOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onUpdateProfile={handleUpdateProfile}
        onSignOut={handleSignOut}
      />

      {/* MAIN WORKSPACE GRID */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* 2. SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            playSwitchSound();
            setActiveTab(tab);
          }}
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={(agentId) => {
            playSwitchSound();
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
            isSplitView ? (
              /* Split View: Dual Pane Layout */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full pb-12">
                <div className="space-y-4 overflow-y-auto pr-1">
                  <ResearchDesk
                    selectedAgent={selectedAgent}
                    taskPrompt={taskPrompt}
                    onPromptChange={setTaskPrompt}
                    isRunning={isRunning}
                    onStartInvestigation={handleStartInvestigation}
                    onStopInvestigation={handleStopTask}
                    steps={steps}
                  />
                  <div className="h-80">
                    <ExecutionVisualizer
                      steps={steps}
                      isRunning={isRunning}
                    />
                  </div>
                  <ArtifactWorkspace artifacts={artifacts} />
                </div>
                <div className="overflow-y-auto h-full pl-1">
                  <InteractiveSimulatorView />
                </div>
              </div>
            ) : (
              /* Standard Vertical Stack Order Layout */
              <div className="space-y-4 max-w-7xl mx-auto pb-12">
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

                {/* VERIFIED RESEARCH ARTIFACT DOSSIERS */}
                <ArtifactWorkspace artifacts={artifacts} />
              </div>
            )
          )}

          {activeTab === 'simulator' && (
            <div className="max-w-7xl mx-auto h-full pb-12">
              <InteractiveSimulatorView />
            </div>
          )}

          {activeTab === 'runs' && (
            <div className="max-w-7xl mx-auto pb-12">
              <InvestigationHistoryView
                onOpenDossier={() => setActiveTab('dashboard')}
              />
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="max-w-7xl mx-auto pb-12">
              <KnowledgeBase
                documents={documents}
                agents={agents}
                onAddDocument={handleAddDocument}
                onDeleteDocument={handleDeleteDocument}
              />
            </div>
          )}

          {(activeTab === 'index' || activeTab === 'search') && (
            <div className="max-w-7xl mx-auto pb-12">
              <KnowledgeIndexSearch />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="max-w-7xl mx-auto pb-12">
              <TemplateGallery
                agents={agents}
                onLaunchTask={(ag, prompt) => {
                  setSelectedAgentId(ag.id);
                  setActiveTab('dashboard');
                  handleStartInvestigation(prompt, ['Technical'], 'All', 'Detailed', 'Strict');
                }}
              />
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="max-w-7xl mx-auto pb-12">
              <ValidationDashboard />
            </div>
          )}

          {activeTab === 'observability' && (
            <div className="max-w-7xl mx-auto pb-12">
              <ObservabilityDashboard />
            </div>
          )}

          {(activeTab === 'resilience' || activeTab === 'failure') && (
            <div className="max-w-7xl mx-auto pb-12">
              <FailureRecoveryView />
            </div>
          )}

          {(activeTab === 'system_validation' || activeTab === 'tests') && (
            <div className="max-w-7xl mx-auto pb-12">
              <SystemValidationView />
            </div>
          )}

          {(activeTab === 'messaging' || activeTab === 'integrations') && (
            <div className="max-w-7xl mx-auto pb-12">
              <MessagingIntegrationsView />
            </div>
          )}
        </main>
      </div>

      {/* Floating Telemetry Mini-Dock */}
      <FloatingTelemetryDock
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCircuitTopology={() => setIsCircuitTopologyOpen(true)}
        onOpenRunComparison={() => setIsRunComparisonOpen(true)}
        isSoundActive={soundActive}
        onToggleSound={handleToggleSound}
        isSplitView={isSplitView}
        onToggleSplitView={() => setIsSplitView(!isSplitView)}
      />

      {/* 4. MODALS */}
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
        particleIntensity={particleIntensity}
        onSelectParticleIntensity={handleSelectParticleIntensity}
        isSoundEnabled={soundActive}
        onToggleSound={handleToggleSound}
        isHologramMode={isHologramMode}
        onToggleHologram={handleToggleHologram}
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

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={(tab) => { setActiveTab(tab); }}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenAcademicSearch={() => setIsAcademicSearchOpen(true)}
        onOpenTopology={() => setIsCircuitTopologyOpen(true)}
        onOpenComparison={() => setIsRunComparisonOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenTestModal={() => setIsFullTestOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenRoiCalculator={() => setIsRoiModalOpen(true)}
        onOpenApiDocs={() => setIsApiDocsModalOpen(true)}
        onExportJupyter={handleExportJupyter}
        onExportLatex={handleExportLatex}
      />

      <CircuitTopologyModal
        isOpen={isCircuitTopologyOpen}
        onClose={() => setIsCircuitTopologyOpen(false)}
      />

      <RunComparisonModal
        isOpen={isRunComparisonOpen}
        onClose={() => setIsRunComparisonOpen(false)}
      />

      <FullSystemTestModal
        isOpen={isFullTestOpen}
        onClose={() => setIsFullTestOpen(false)}
      />

      <ProductTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartSampleRun={() => {
          const prompt = 'Evaluate the feasibility of silicon carbide based multilevel inverters for 100 kW industrial applications.';
          setTaskPrompt(prompt);
          setActiveTab('dashboard');
          handleStartInvestigation(prompt, ['Technical'], 'All', 'Detailed', 'Strict');
        }}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenCircuitTopology={() => setIsCircuitTopologyOpen(true)}
        onOpenRunComparison={() => setIsRunComparisonOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <RoiCalculatorModal
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
      />

      <DeveloperApiDocsModal
        isOpen={isApiDocsModalOpen}
        onClose={() => setIsApiDocsModalOpen(false)}
      />
    </div>
  );
}

export default App;
