'use client';

import React, { useState } from 'react';
import { CulinaryTwinProject, CulinarySimulation } from '@/types/culinary-twin';
import { 
  Cpu, 
  Flame, 
  Scale, 
  TrendingDown, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface ModeSimulationProps {
  twin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onNavigateToMode: (mode: any) => void;
  onTriggerAiAction: (actionName: string, promptText: string) => void;
}

export const ModeSimulation: React.FC<ModeSimulationProps> = ({
  twin,
  onUpdateTwin,
  onNavigateToMode,
  onTriggerAiAction
}) => {
  const [coversCount, setCoversCount] = useState<number>(twin.latestSimulation?.coversCount || 45);
  const [ambientTempC, setAmbientTempC] = useState<number>(24);
  const [holdingHeatLamps, setHoldingHeatLamps] = useState<boolean>(true);
  const [stressScenario, setStressScenario] = useState<string>('NORMAL');

  // Base raw weight per cover calculated from ingredients
  const totalBaseRawGrams = twin.components.reduce(
    (sum, comp) => sum + comp.ingredients.reduce((iSum, ing) => iSum + ing.quantity, 0),
    0
  );

  // Scaled calculations
  const totalRawWeightKg = Number(((totalBaseRawGrams * (coversCount / 2)) / 1000).toFixed(1));
  const moistureLossPct = stressScenario === 'DRAFT' ? 19.5 : stressScenario === 'RUSH' ? 13.8 : 15.5;
  const estimatedFinishedWeightKg = Number((totalRawWeightKg * (1 - moistureLossPct / 100)).toFixed(1));
  const baseCost = twin.components.reduce(
    (sum, comp) =>
      sum +
      comp.ingredients.reduce((iSum, ing) => iSum + (ing.quantity * (ing.costPerUnit || 0.02)), 0),
    0
  );
  const costPerCover = Number(((baseCost / 2) * 1.15).toFixed(2)); // 15% wastage factor

  // Thermal decay curve generation based on holding parameters
  const getThermalCurve = () => {
    const lampBonus = holdingHeatLamps ? 0 : -3.5;
    const ambientPenalty = (24 - ambientTempC) * 0.15;
    const baseCurve = [
      { minutes: 0, coreTempC: 54.5, sensoryScore: 9.6 },
      { minutes: 5, coreTempC: Number((54.2 + lampBonus * 0.2 - ambientPenalty * 0.5).toFixed(1)), sensoryScore: 9.8 },
      { minutes: 10, coreTempC: Number((53.6 + lampBonus * 0.5 - ambientPenalty * 1.0).toFixed(1)), sensoryScore: 9.5 },
      { minutes: 15, coreTempC: Number((52.8 + lampBonus * 0.9 - ambientPenalty * 1.5).toFixed(1)), sensoryScore: 9.0 },
      { minutes: 20, coreTempC: Number((51.5 + lampBonus * 1.4 - ambientPenalty * 2.0).toFixed(1)), sensoryScore: 8.2 },
      { minutes: 25, coreTempC: Number((49.8 + lampBonus * 2.0 - ambientPenalty * 2.5).toFixed(1)), sensoryScore: 7.0 },
      { minutes: 30, coreTempC: Number((47.0 + lampBonus * 2.8 - ambientPenalty * 3.2).toFixed(1)), sensoryScore: 5.5 },
    ];
    return baseCurve;
  };

  const currentCurve = getThermalCurve();

  // Station loads based on covers
  const sauteLoad = Math.min(100, Math.round(20 + (coversCount / 60) * 65));
  const passLoad = Math.min(100, Math.round(15 + (coversCount / 60) * 55));
  const gardeLoad = Math.min(100, Math.round(10 + (coversCount / 60) * 30));

  const handleApplySimulation = () => {
    const sim: CulinarySimulation = {
      id: `sim-${Date.now()}`,
      timestamp: new Date().toISOString(),
      coversCount,
      batchMultiplier: coversCount / 2,
      totalRawWeightKg,
      estimatedFinishedWeightKg,
      projectedMoistureLossPct: moistureLossPct,
      thermalDecayCurve: currentCurve,
      stationLoads: [
        {
          station: 'Grill / Sauté',
          peakPrepTimeMins: 18,
          equipmentBottleneck: 'Pan induction slots (max 6 simultaneously)',
          loadPercentage: sauteLoad,
        },
        {
          station: 'Pass / Carving',
          peakPrepTimeMins: 4,
          equipmentBottleneck: 'Heated carving block & resting cabinet space',
          loadPercentage: passLoad,
        },
        {
          station: 'Garde Manger',
          peakPrepTimeMins: 3,
          equipmentBottleneck: 'Emulsion bath holding',
          loadPercentage: gardeLoad,
        },
      ],
      projectedCostPerCover: costPerCover,
      recoveryRiskScore: sauteLoad > 85 ? 'HIGH' : sauteLoad > 65 ? 'MEDIUM' : 'LOW',
      assumptions: [
        `Ambient pass temperature modelled at ${ambientTempC}°C with ${holdingHeatLamps ? 'active quartz lamps' : 'no heat lamps'}.`,
        `Batch scaled for ${coversCount} covers (${coversCount / 2} duck crowns).`,
        `Stress scenario preset: ${stressScenario}.`,
      ],
    };

    onUpdateTwin((prev) => ({
      ...prev,
      latestSimulation: sim,
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'SIMULATION_RUN',
          details: `Simulated service load for ${coversCount} covers (Moisture loss: ${moistureLossPct}%, Peak Sauté Load: ${sauteLoad}%)`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: '0x' + Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0'),
          modeAtTime: 'simulation',
        },
        ...prev.auditRecords,
      ],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Simulation Mode Doctrine Header */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-amber-950/30 border border-amber-500/30 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 3: Simulation & Capacity Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: MEDIUM (Hypothetical Behaviour)</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Yield, Thermal Decay & Brigade Load Modeling</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Simulation represents possible behaviour—never equivalent to observed physical reality. Test portion scaling, thermal decay curves, equipment bottlenecks, and stress recovery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => onTriggerAiAction('Simulate Service Rush', `Simulate an intense 80-cover dinner service rush with 3 VIP walk-ins for ${twin.name}. Identify where the Sauté and Pass stations will fail and propose recovery timing offsets.`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Rush Simulation
          </button>
          <button
            onClick={() => onNavigateToMode('validation')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            Proceed to Validation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Control Panel: Sliders & Scenario Presets */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            Simulation Boundary Variables
          </h3>
          <button
            onClick={handleApplySimulation}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            <Play className="w-3 h-3 fill-current" />
            Commit Simulation State
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Covers Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Target Covers Count:</span>
              <span className="text-amber-400 font-bold text-sm">{coversCount} Covers</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={coversCount}
              onChange={(e) => setCoversCount(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>10 (Boutique)</span>
              <span>60 (Standard)</span>
              <span>120 (Banquet Rush)</span>
            </div>
          </div>

          {/* Pass Ambient Temp */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Ambient Pass Temperature:</span>
              <span className="text-cyan-400 font-bold text-sm">{ambientTempC}°C</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              step="1"
              value={ambientTempC}
              onChange={(e) => setAmbientTempC(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>16°C (Drafty Pass)</span>
              <span>24°C (Nominal)</span>
              <span>32°C (Hot Line)</span>
            </div>
          </div>

          {/* Stress Presets & Heat Lamp Toggle */}
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs font-mono block">Environmental Stress Preset:</span>
            <div className="grid grid-cols-3 gap-1 text-[11px] font-mono">
              {[
                { id: 'NORMAL', label: 'Nominal' },
                { id: 'RUSH', label: 'Overdrive' },
                { id: 'DRAFT', label: 'Cold Draft' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setStressScenario(sc.id)}
                  className={`py-1.5 rounded border text-center transition ${
                    stressScenario === sc.id
                      ? 'bg-amber-500 text-zinc-950 font-bold border-amber-500'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="lamps"
                checked={holdingHeatLamps}
                onChange={(e) => setHoldingHeatLamps(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <label htmlFor="lamps" className="text-xs text-zinc-300 font-mono cursor-pointer">
                Pass Quartz Heat Lamps Active (+52°C envelope)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">Total Raw Batch Mass</div>
          <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1">
            {totalRawWeightKg} <span className="text-xs text-zinc-400 font-normal">kg</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400">Scaled for {coversCount} covers</div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">Projected Finished Yield</div>
          <div className="text-xl font-bold font-mono text-emerald-400 flex items-baseline gap-1">
            {estimatedFinishedWeightKg} <span className="text-xs text-zinc-400 font-normal">kg</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400">Moisture Loss: ~{moistureLossPct}%</div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">Estimated Food Cost / Cover</div>
          <div className="text-xl font-bold font-mono text-amber-400 flex items-baseline gap-1">
            ${costPerCover}
          </div>
          <div className="text-[10px] font-mono text-zinc-400">Includes 15% trim & yield delta</div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">Sauté Station Capacity</div>
          <div className={`text-xl font-bold font-mono ${sauteLoad > 85 ? 'text-rose-400' : sauteLoad > 65 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {sauteLoad}% Load
          </div>
          <div className="text-[10px] font-mono text-zinc-400">
            {sauteLoad > 85 ? 'BOTTLENECK WARNING' : 'Within throughput threshold'}
          </div>
        </div>
      </div>

      {/* Two-Column Simulation Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Interactive Thermal Decay Curve */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Thermal Decay & Sensory Degradation at Pass
            </h4>
            <span className="text-[10px] font-mono text-zinc-500">Core Temp vs Holding Time</span>
          </div>

          {/* Simulated Chart Container */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono text-zinc-400">
              {currentCurve.map((point) => (
                <div key={point.minutes} className="space-y-2">
                  {/* Temp Bar Height */}
                  <div className="h-32 flex flex-col justify-end items-center">
                    <div
                      className={`w-full max-w-[28px] rounded-t transition-all duration-300 ${
                        point.coreTempC >= 53
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                          : point.coreTempC >= 50
                          ? 'bg-gradient-to-t from-orange-600 to-orange-400'
                          : 'bg-gradient-to-t from-rose-800 to-rose-500'
                      }`}
                      style={{ height: `${Math.max(15, (point.coreTempC - 40) * 6)}%` }}
                    />
                  </div>
                  <div className="font-bold text-zinc-200">{point.coreTempC}°C</div>
                  <div className="text-[9px] text-amber-400">{point.sensoryScore}/10</div>
                  <div className="text-zinc-500 border-t border-zinc-850 pt-1">{point.minutes}m</div>
                </div>
              ))}
            </div>

            {/* Threshold Legend */}
            <div className="flex flex-wrap items-center justify-between text-[10px] font-mono pt-2 border-t border-zinc-850 text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Optimal Window (0-15 min: &gt;52.5°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Degradation Zone (&gt;20 min: &lt;50°C fat seizes)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Station Load & Bottleneck Analysis */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Brigade Station Pressure Loads
            </h4>
            <span className="text-[10px] font-mono text-zinc-500">{coversCount} covers peak</span>
          </div>

          <div className="space-y-3">
            {/* Station 1: Sauté / Grill */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-200 font-bold">Grill & Sauté Station</span>
                <span className={`font-bold ${sauteLoad > 80 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {sauteLoad}% Load
                </span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    sauteLoad > 80 ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${sauteLoad}%` }}
                />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                <span>Bottleneck: Induction pan slots (max 6)</span>
                <span className="text-amber-300">18 min prep</span>
              </div>
            </div>

            {/* Station 2: Pass & Carving */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-200 font-bold">Pass / Plating Station</span>
                <span className="text-emerald-400 font-bold">{passLoad}% Load</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${passLoad}%` }}
                />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                <span>Bottleneck: Heat lamp holding space</span>
                <span className="text-emerald-300">4 min prep</span>
              </div>
            </div>

            {/* Station 3: Garde Manger */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-200 font-bold">Garde Manger Station</span>
                <span className="text-cyan-400 font-bold">{gardeLoad}% Load</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${gardeLoad}%` }}
                />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                <span>Bottleneck: Emulsion warm bath</span>
                <span className="text-cyan-300">3 min prep</span>
              </div>
            </div>
          </div>

          {/* Recovery Suggestion */}
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-200 space-y-1 font-mono">
            <span className="font-bold flex items-center gap-1 text-amber-400 uppercase">
              <Zap className="w-3 h-3" />
              Dynamic Recovery Strategy:
            </span>
            <p className="text-zinc-300">
              When covers &gt; 60, stagger ticket firing by 8 minutes or pre-sear duck crowns into resting cabinet at 50°C to flatten the Sauté induction spike.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
