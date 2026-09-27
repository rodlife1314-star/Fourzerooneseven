'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { CulinaryTwinProject, OperatingMode } from '@/types/culinary-twin';
import { twinsStore } from '@/lib/twins-store';
import { Header } from '@/components/header';
import { ModeIntentExternalisation } from '@/components/mode-intent-externalisation';
import { ModeExploration } from '@/components/mode-exploration';
import { ModeInvestigation } from '@/components/mode-investigation';
import { ModeSimulation } from '@/components/mode-simulation';
import { ModeValidation } from '@/components/mode-validation';
import { ModeService } from '@/components/mode-service';
import { ModeLedger } from '@/components/mode-ledger';
import { AiOrchestratorDrawer } from '@/components/ai-orchestrator-drawer';
import { NewTwinModal } from '@/components/new-twin-modal';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const storeState = useSyncExternalStore(
    twinsStore.subscribe,
    twinsStore.getSnapshot,
    twinsStore.getServerSnapshot
  );

  const { twins, selectedTwinId } = storeState;
  const currentTwin = twins.find((t) => t.id === selectedTwinId) || twins[0];

  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isNewTwinModalOpen, setIsNewTwinModalOpen] = useState(false);
  const [presetAiAction, setPresetAiAction] = useState<{ actionName: string; promptText: string } | null>(null);

  const handleUpdateCurrentTwin = (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => {
    twinsStore.updateCurrentTwin(currentTwin.id, updater);
  };

  const handleSelectTwin = (id: string) => {
    twinsStore.setSelectedTwinId(id);
  };

  const handleModeChange = (mode: OperatingMode) => {
    handleUpdateCurrentTwin((prev) => ({
      ...prev,
      currentMode: mode,
      governanceLevel:
        mode === 'exploration'
          ? 'LOW'
          : mode === 'investigation' || mode === 'simulation' || mode === 'intent_externalisation'
          ? 'MEDIUM'
          : mode === 'validation'
          ? 'HIGH'
          : 'OPERATIONAL_COMMITTED',
    }));
  };

  const handleTriggerAiAction = (actionName: string, promptText: string) => {
    setPresetAiAction({ actionName, promptText });
    setIsAiDrawerOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all Culinary Twins back to default Project SIXES initial specifications?')) {
      twinsStore.resetData();
    }
  };

  const handleCreateNewTwin = (newTwin: CulinaryTwinProject) => {
    twinsStore.createNewTwin(newTwin);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950" suppressHydrationWarning>
      {/* Top Application Bar */}
      <Header
        twins={twins}
        currentTwin={currentTwin}
        onSelectTwin={handleSelectTwin}
        onModeChange={handleModeChange}
        onOpenNewTwin={() => setIsNewTwinModalOpen(true)}
        onResetData={handleResetData}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-20">
        {currentTwin.currentMode === 'intent_externalisation' && (
          <ModeIntentExternalisation
            key={currentTwin.activeMenuSession?.id || currentTwin.id}
            currentTwin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onTriggerAi={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'exploration' && (
          <ModeExploration
            twin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onNavigateToMode={handleModeChange}
            onTriggerAiAction={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'investigation' && (
          <ModeInvestigation
            twin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onNavigateToMode={handleModeChange}
            onTriggerAiAction={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'simulation' && (
          <ModeSimulation
            twin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onNavigateToMode={handleModeChange}
            onTriggerAiAction={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'validation' && (
          <ModeValidation
            twin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onNavigateToMode={handleModeChange}
            onTriggerAiAction={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'service' && (
          <ModeService
            twin={currentTwin}
            onUpdateTwin={handleUpdateCurrentTwin}
            onNavigateToMode={handleModeChange}
            onTriggerAiAction={handleTriggerAiAction}
          />
        )}

        {currentTwin.currentMode === 'ledger' && (
          <ModeLedger
            twin={currentTwin}
            onNavigateToMode={handleModeChange}
          />
        )}
      </main>

      {/* Global Floating Action Button for AI Intelligence */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-4 py-2.5 rounded-full shadow-2xl transition transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 fill-zinc-950" />
          <span className="text-xs tracking-wide">Pathfinder Orchestrator</span>
        </button>
      </div>

      {/* AI Intelligence Drawer */}
      <AiOrchestratorDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => {
          setIsAiDrawerOpen(false);
          setPresetAiAction(null);
        }}
        currentTwin={currentTwin}
        activeMode={currentTwin.currentMode}
        presetAction={presetAiAction}
        onClearPresetAction={() => setPresetAiAction(null)}
      />

      {/* New Twin Modal */}
      <NewTwinModal
        isOpen={isNewTwinModalOpen}
        onClose={() => setIsNewTwinModalOpen(false)}
        onCreateTwin={handleCreateNewTwin}
      />
    </div>
  );
}
