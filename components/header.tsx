'use client';

import React, { useState } from 'react';
import { OperatingMode, CulinaryTwinProject, GovernanceLevel } from '@/types/culinary-twin';
import { 
  Compass,
  Sparkles, 
  FlaskConical, 
  Cpu, 
  ShieldCheck, 
  Flame, 
  History, 
  Plus, 
  AlertTriangle, 
  ChefHat, 
  FileDown, 
  RotateCcw,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  twins: CulinaryTwinProject[];
  currentTwin: CulinaryTwinProject;
  onSelectTwin: (twinId: string) => void;
  onModeChange: (mode: OperatingMode) => void;
  onOpenNewTwin: () => void;
  onResetData: () => void;
  onOpenAiDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  twins,
  currentTwin,
  onSelectTwin,
  onModeChange,
  onOpenNewTwin,
  onResetData,
  onOpenAiDrawer
}) => {
  const [twinDropdownOpen, setTwinDropdownOpen] = useState(false);

  const unresolvedStopsCount = currentTwin.stopConditions.filter(s => !s.resolved).length;

  const modeTabs: { mode: OperatingMode; label: string; icon: any; governance: GovernanceLevel; badge?: string }[] = [
    { mode: 'intent_externalisation', label: 'Chef Intent Externalisation', icon: Compass, governance: 'MEDIUM', badge: 'FLAGSHIP' },
    { mode: 'exploration', label: '1. Exploration', icon: Sparkles, governance: 'LOW' },
    { mode: 'investigation', label: '2. Investigation', icon: FlaskConical, governance: 'MEDIUM' },
    { mode: 'simulation', label: '3. Simulation', icon: Cpu, governance: 'MEDIUM' },
    { mode: 'validation', label: '4. Validation', icon: ShieldCheck, governance: 'HIGH' },
    { mode: 'service', label: '5. Service & Pass', icon: Flame, governance: 'OPERATIONAL_COMMITTED' },
    { mode: 'ledger', label: '6. Ledger', icon: History, governance: 'OPERATIONAL_COMMITTED' },
  ];

  const getGovBadgeStyle = (gov: GovernanceLevel) => {
    switch (gov) {
      case 'LOW':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/50';
      case 'HIGH':
        return 'bg-rose-950/80 text-rose-300 border-rose-700/50';
      case 'OPERATIONAL_COMMITTED':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50';
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentTwin, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentTwin.code}-${currentTwin.currentVersion}-specification.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-40 text-zinc-100">
      {/* Top Banner: Substrate identity & Quick Twin Switcher */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
            <Layers className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
              Pathfinder Substrate
            </span>
          </div>
          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
          <h1 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <span className="text-amber-400 tracking-tight">PROJECT SIXES</span>
            <span className="text-xs text-zinc-500 font-mono hidden md:inline">
              Culinary Knowledge Field & Service Twin
            </span>
          </h1>
        </div>

        {/* Current Twin Selector */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setTwinDropdownOpen(!twinDropdownOpen)}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-amber-300 font-semibold">{currentTwin.code}</span>
              <span className="max-w-[140px] sm:max-w-[220px] truncate text-zinc-200">
                {currentTwin.name}
              </span>
              <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                {currentTwin.currentVersion}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {twinDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 p-2 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 px-2 py-1 uppercase tracking-wider">
                  Active Culinary Twins ({twins.length})
                </div>
                {twins.map((twin) => (
                  <button
                    key={twin.id}
                    onClick={() => {
                      onSelectTwin(twin.id);
                      setTwinDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex flex-col gap-0.5 transition ${
                      twin.id === currentTwin.id
                        ? 'bg-amber-950/60 border border-amber-800/80 text-amber-200'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-amber-400">{twin.code}</span>
                      <span className="text-[10px] text-zinc-500">{twin.currentVersion}</span>
                    </div>
                    <span className="truncate font-medium">{twin.name}</span>
                  </button>
                ))}
                <div className="pt-2 border-t border-zinc-800 flex justify-between gap-1">
                  <button
                    onClick={() => {
                      setTwinDropdownOpen(false);
                      onOpenNewTwin();
                    }}
                    className="flex-1 text-center py-1.5 px-2 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span>New Twin</span>
                  </button>
                  <button
                    onClick={() => {
                      setTwinDropdownOpen(false);
                      onResetData();
                    }}
                    className="py-1.5 px-2 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1"
                    title="Reset to initial specifications"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Culinary AI</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Bar (Cognitive Cycle Gradient) */}
      <div className="border-t border-zinc-900 bg-zinc-950/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {modeTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTwin.currentMode === tab.mode;
              return (
                <button
                  key={tab.mode}
                  onClick={() => onModeChange(tab.mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'bg-zinc-800 text-amber-300 font-semibold border border-amber-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Current Mode Governance & Safety Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {unresolvedStopsCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-700/80 animate-pulse">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span className="font-bold">{unresolvedStopsCount} STOP HOLDS</span>
              </div>
            )}

            <div className={`px-2 py-0.5 rounded border text-[11px] font-mono flex items-center gap-1 ${getGovBadgeStyle(currentTwin.governanceLevel)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>GOV: {currentTwin.governanceLevel}</span>
            </div>

            <button
              onClick={handleExportJson}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition"
              title="Export Full Twin JSON Ledger"
            >
              <FileDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
