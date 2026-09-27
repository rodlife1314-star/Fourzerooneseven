'use client';

import React, { useState } from 'react';
import { 
  CulinaryTwinProject, 
  CulinaryComponent, 
  EvidenceRecord, 
  EvidenceType,
  AllergenType,
  TransformationStep
} from '@/types/culinary-twin';
import { 
  FlaskConical, 
  Scale, 
  Thermometer, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight,
  Info,
  BookOpen
} from 'lucide-react';

interface ModeInvestigationProps {
  twin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onNavigateToMode: (mode: any) => void;
  onTriggerAiAction: (actionName: string, promptText: string) => void;
}

export const ModeInvestigation: React.FC<ModeInvestigationProps> = ({
  twin,
  onUpdateTwin,
  onNavigateToMode,
  onTriggerAiAction
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(twin.components[0]?.id || '');
  const [evidenceFilter, setEvidenceFilter] = useState<string>('ALL');
  const [isAddingEvidence, setIsAddingEvidence] = useState(false);
  const [newEvidenceType, setNewEvidenceType] = useState<EvidenceType>('temperature');
  const [newEvidenceTitle, setNewEvidenceTitle] = useState('');
  const [newEvidenceValue, setNewEvidenceValue] = useState('');
  const [newEvidenceUnit, setNewEvidenceUnit] = useState('');
  const [newEvidenceProvenance, setNewEvidenceProvenance] = useState('');
  const [newEvidenceConfidence, setNewEvidenceConfidence] = useState(0.95);
  const [newEvidenceNotes, setNewEvidenceNotes] = useState('');

  // Add Component Form state
  const [isAddingComp, setIsAddingComp] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompType, setNewCompType] = useState<'protein' | 'sauce' | 'puree' | 'garnish' | 'oil' | 'crisp' | 'infusion' | 'base'>('sauce');
  const [newCompDesc, setNewCompDesc] = useState('');

  const selectedComponent = twin.components.find((c) => c.id === selectedCompId) || twin.components[0];

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidenceTitle.trim() || !newEvidenceValue.trim()) return;

    const record: EvidenceRecord = {
      id: `ev-${Date.now()}`,
      type: newEvidenceType,
      title: newEvidenceTitle.trim(),
      value: newEvidenceValue.trim(),
      unit: newEvidenceUnit.trim() || undefined,
      provenance: newEvidenceProvenance.trim() || 'Kitchen Calibrated Instrument',
      confidence: newEvidenceConfidence,
      recordedAt: new Date().toISOString(),
      author: twin.chefAuthor,
      isHypothesis: false,
      notes: newEvidenceNotes.trim() || undefined
    };

    onUpdateTwin((prev) => ({
      ...prev,
      evidenceLedger: [record, ...prev.evidenceLedger],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'SPEC_CREATED',
          details: `Logged calibrated evidence [${newEvidenceType}]: ${newEvidenceTitle} = ${newEvidenceValue} ${newEvidenceUnit}`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: '0x' + Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0'),
          modeAtTime: 'investigation'
        },
        ...prev.auditRecords
      ]
    }));

    setNewEvidenceTitle('');
    setNewEvidenceValue('');
    setNewEvidenceUnit('');
    setNewEvidenceProvenance('');
    setNewEvidenceNotes('');
    setIsAddingEvidence(false);
  };

  const handleCreateComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    const newComp: CulinaryComponent = {
      id: `comp-${Date.now()}`,
      name: newCompName.trim(),
      type: newCompType,
      description: newCompDesc.trim(),
      yieldGrams: 250,
      ingredients: [],
      transformations: [],
      holdingLimitMinutes: 60,
      holdingTempC: 60,
      sensoryProfile: {
        umami: 5,
        acid: 5,
        salt: 5,
        sweet: 5,
        bitter: 2,
        richness: 5,
        crunch: 3,
        herbaceous: 5
      }
    };

    onUpdateTwin((prev) => ({
      ...prev,
      components: [...prev.components, newComp]
    }));

    setSelectedCompId(newComp.id);
    setNewCompName('');
    setNewCompDesc('');
    setIsAddingComp(false);
  };

  const filteredEvidence = twin.evidenceLedger.filter((ev) => {
    if (evidenceFilter === 'ALL') return true;
    return ev.type === evidenceFilter;
  });

  return (
    <div className="space-y-6">
      {/* Investigation Mode Header */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-cyan-950/30 border border-cyan-500/30 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 2: Investigation & Knowledge Field
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: MEDIUM (Evidence & Mechanics)</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Formulations, Mechanics & Calibrated Evidence</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Separate recorded facts from model inferences. Calculate exact baker ratios, track physical/chemical transformation mechanics, and verify critical temperature limits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => onTriggerAiAction('Deconstruct Chemical Mechanics', `Analyze the chemical and physical transformations in component "${selectedComponent?.name || twin.name}". Identify collagen hydrolysis, lipid phase changes, Maillard kinetics, and water activity risks.`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Chemical Breakdown
          </button>
          <button
            onClick={() => onNavigateToMode('simulation')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            Advance to Simulation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Investigation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Components List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Culinary Components ({twin.components.length})
            </h3>
            <button
              onClick={() => setIsAddingComp(!isAddingComp)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
            >
              <Plus className="w-3.5 h-3.5" /> New Component
            </button>
          </div>

          {/* Add Component Form */}
          {isAddingComp && (
            <form onSubmit={handleCreateComponent} className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl space-y-2 text-xs">
              <div className="font-mono text-zinc-300 font-semibold uppercase">Add Component</div>
              <input
                type="text"
                placeholder="Component Name (e.g. Lacto Cherry Emulsion)"
                required
                value={newCompName}
                onChange={(e) => setNewCompName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newCompType}
                  onChange={(e: any) => setNewCompType(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-300 text-xs"
                >
                  <option value="protein">Protein</option>
                  <option value="sauce">Sauce</option>
                  <option value="puree">Puree</option>
                  <option value="garnish">Garnish</option>
                  <option value="oil">Oil / Emulsion</option>
                  <option value="crisp">Crisp</option>
                  <option value="infusion">Infusion</option>
                  <option value="base">Base</option>
                </select>
                <input
                  type="text"
                  placeholder="Short Description"
                  value={newCompDesc}
                  onChange={(e) => setNewCompDesc(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingComp(false)}
                  className="text-zinc-400 hover:text-zinc-200 px-2 py-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-bold px-3 py-0.5 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          {/* Component Selection Cards */}
          <div className="space-y-2">
            {twin.components.map((comp) => {
              const isSelected = comp.id === selectedComponent?.id;
              const allAllergens = Array.from(new Set(comp.ingredients.flatMap(i => i.allergens)));
              const ccpCount = comp.transformations.filter(t => t.criticalControlPoint).length;

              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-500/70 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      <span className="capitalize px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] font-mono text-cyan-300">
                        {comp.type}
                      </span>
                      {comp.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {comp.yieldGrams}g yield
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2">{comp.description}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-zinc-800/60">
                    <span className="text-zinc-400">{comp.ingredients.length} ingredients</span>
                    <div className="flex items-center gap-2">
                      {ccpCount > 0 && (
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          <ShieldAlert className="w-3 h-3" /> {ccpCount} CCP
                        </span>
                      )}
                      {allAllergens.length > 0 && (
                        <span className="text-rose-400 font-bold">
                          {allAllergens.length} Allergen
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Evidence Ledger Quick Module */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                Calibrated Evidence Ledger ({twin.evidenceLedger.length})
              </h4>
              <button
                onClick={() => setIsAddingEvidence(!isAddingEvidence)}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Log
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              {['ALL', 'temperature', 'salinity_ph', 'measured_weight', 'sensory_observation', 'historical_ref'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setEvidenceFilter(filter)}
                  className={`px-2 py-0.5 rounded ${
                    evidenceFilter === filter
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Add Evidence Form */}
            {isAddingEvidence && (
              <form onSubmit={handleAddEvidence} className="p-3 bg-zinc-950 border border-zinc-700 rounded-lg space-y-2 text-xs animate-in fade-in">
                <div className="font-mono text-amber-400 font-bold text-[11px] uppercase">New Calibrated Reading</div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newEvidenceType}
                    onChange={(e: any) => setNewEvidenceType(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200 text-xs"
                  >
                    <option value="temperature">Temperature (°C)</option>
                    <option value="salinity_ph">Salinity / pH</option>
                    <option value="measured_weight">Measured Weight</option>
                    <option value="time">Time / Duration</option>
                    <option value="sensory_observation">Sensory Observation</option>
                    <option value="historical_ref">Historical Reference</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Unit (e.g. °C, pH, g)"
                    value={newEvidenceUnit}
                    onChange={(e) => setNewEvidenceUnit(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Observation Title (e.g. Core Temp at 15 min rest)"
                  required
                  value={newEvidenceTitle}
                  onChange={(e) => setNewEvidenceTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <input
                  type="text"
                  placeholder="Recorded Value (e.g. 53.8)"
                  required
                  value={newEvidenceValue}
                  onChange={(e) => setNewEvidenceValue(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <input
                  type="text"
                  placeholder="Provenance / Instrument (e.g. TC-800 Thermocouple probe)"
                  value={newEvidenceProvenance}
                  onChange={(e) => setNewEvidenceProvenance(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingEvidence(false)}
                    className="text-zinc-400 hover:text-zinc-200 px-2 py-0.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-0.5 rounded"
                  >
                    Log Evidence
                  </button>
                </div>
              </form>
            )}

            {/* Evidence items */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredEvidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-zinc-200 font-semibold truncate">{ev.title}</span>
                    <span className="text-amber-400 font-bold ml-2">
                      {ev.value} {ev.unit || ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="truncate">{ev.provenance}</span>
                    <span className="text-emerald-400">{Math.round(ev.confidence * 100)}% conf</span>
                  </div>
                  {ev.notes && <p className="text-[11px] text-zinc-400 pt-0.5 italic">{ev.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Component Deep Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedComponent ? (
            <>
              {/* Component Overview Card */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono uppercase">
                      Component Spec
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{selectedComponent.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-zinc-300">
                    <div className="bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                      <span className="text-zinc-500">Hold Limit: </span>
                      <span className="text-amber-400 font-bold">{selectedComponent.holdingLimitMinutes} min</span>
                    </div>
                    <div className="bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                      <span className="text-zinc-500">Hold Temp: </span>
                      <span className="text-cyan-400 font-bold">{selectedComponent.holdingTempC}°C</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedComponent.description}</p>
              </div>

              {/* Formulation & Ingredients Table */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    Formulation & Baker&apos;s Percentage Ledger
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Base: {selectedComponent.ingredients[0]?.name || 'Primary'}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                      <tr>
                        <th className="pb-2 font-medium">Ingredient</th>
                        <th className="pb-2 font-medium">Quantity</th>
                        <th className="pb-2 font-medium">Baker&apos;s %</th>
                        <th className="pb-2 font-medium">Moisture %</th>
                        <th className="pb-2 font-medium">Allergens</th>
                        <th className="pb-2 font-medium">Provenance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                      {selectedComponent.ingredients.map((ing) => (
                        <tr key={ing.id} className="hover:bg-zinc-850/50">
                          <td className="py-2.5 font-semibold text-zinc-100">{ing.name}</td>
                          <td className="py-2.5 text-amber-400 font-bold">
                            {ing.quantity} {ing.unit}
                          </td>
                          <td className="py-2.5 text-cyan-300">{ing.bakersPercentage ?? '-'}%</td>
                          <td className="py-2.5 text-zinc-400">{ing.moisturePercentage}%</td>
                          <td className="py-2.5">
                            {ing.allergens.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {ing.allergens.map((a) => (
                                  <span
                                    key={a}
                                    className="px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px]"
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-zinc-500 text-[10px]">None</span>
                            )}
                          </td>
                          <td className="py-2.5 text-[11px] text-zinc-400 truncate max-w-[160px]">
                            {ing.provenance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Physical & Chemical Transformation Mechanisms */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                    Physical & Chemical Transformation Sequence ({selectedComponent.transformations.length})
                  </h4>
                  <span className="text-[11px] text-zinc-500 font-mono">Thermodynamic & enzymatic controls</span>
                </div>

                <div className="space-y-3">
                  {selectedComponent.transformations.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-mono font-bold text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-zinc-100 text-sm">{step.technique}</span>
                          <span className="px-2 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">
                            {step.station} Station
                          </span>
                        </div>

                        {step.criticalControlPoint && (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-700 text-[10px] font-mono font-bold">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            CRITICAL CONTROL POINT (CCP)
                          </div>
                        )}
                      </div>

                      {/* Mechanism explanation */}
                      <div className="p-2 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs">
                        <span className="font-mono text-cyan-400 font-semibold block text-[11px] uppercase">
                          Transformation Mechanism:
                        </span>
                        {step.mechanism}
                      </div>

                      {/* Metrics bar */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono pt-1">
                        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                          <span className="text-zinc-500 block">Target Temp</span>
                          <span className="text-amber-400 font-bold">{step.targetTempC}°C</span>
                        </div>
                        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                          <span className="text-zinc-500 block">Duration</span>
                          <span className="text-cyan-400 font-bold">{step.targetDurationMinutes} min</span>
                        </div>
                        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                          <span className="text-zinc-500 block">Moisture Loss Est.</span>
                          <span className="text-rose-400 font-bold">{step.moistureLossEstimatedPct}%</span>
                        </div>
                        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                          <span className="text-zinc-500 block">Equipment</span>
                          <span className="text-zinc-300 font-medium truncate block">{step.equipment}</span>
                        </div>
                      </div>

                      {/* Failure risk and recovery action */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2 rounded bg-rose-950/20 border border-rose-900/50 text-rose-200">
                          <span className="font-mono font-bold text-rose-400 block text-[10px] uppercase">
                            Failure Risk:
                          </span>
                          {step.failureRisk}
                        </div>
                        <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/50 text-emerald-200">
                          <span className="font-mono font-bold text-emerald-400 block text-[10px] uppercase">
                            Operational Recovery:
                          </span>
                          {step.recoveryAction}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-zinc-500 font-mono">
              No component selected. Create or select a component.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
