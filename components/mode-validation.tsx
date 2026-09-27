'use client';

import React, { useState } from 'react';
import { 
  CulinaryTwinProject, 
  StopCondition, 
  AllergenType, 
  ChefDecision, 
  TwinRevision 
} from '@/types/culinary-twin';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ChefHat, 
  Lock, 
  Unlock, 
  FileCheck, 
  Sparkles, 
  Plus, 
  ArrowRight,
  HelpCircle,
  FileSignature
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateHash } from '@/lib/utils';

interface ModeValidationProps {
  twin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onNavigateToMode: (mode: any) => void;
  onTriggerAiAction: (actionName: string, promptText: string) => void;
}

const STATUTORY_ALLERGENS: AllergenType[] = [
  'Gluten/Wheat',
  'Crustaceans',
  'Eggs',
  'Fish',
  'Peanuts',
  'Soybeans',
  'Milk/Dairy',
  'Tree Nuts',
  'Celery',
  'Mustard',
  'Sesame',
  'Sulphites',
  'Lupin',
  'Molluscs',
];

export const ModeValidation: React.FC<ModeValidationProps> = ({
  twin,
  onUpdateTwin,
  onNavigateToMode,
  onTriggerAiAction,
}) => {
  // Sign-off modal state
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const [chefSignName, setChefSignName] = useState(twin.chefAuthor);
  const [decisionAction, setDecisionAction] = useState<'ACCEPT' | 'REVISE' | 'COMMIT_TO_SERVICE'>('COMMIT_TO_SERVICE');
  const [decisionRationale, setDecisionRationale] = useState('All statutory allergen declarations verified, CCPs within thermal tolerances, simulation verified for service.');
  const [targetVersion, setTargetVersion] = useState(twin.currentVersion);
  const [uncertainty1, setUncertainty1] = useState(true);
  const [uncertainty2, setUncertainty2] = useState(true);
  const [customUncertainty, setCustomUncertainty] = useState('');

  // Resolve Stop Modal state
  const [selectedStopToResolve, setSelectedStopToResolve] = useState<StopCondition | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // Add Stop Condition state
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [newStopCode, setNewStopCode] = useState('STOP-OP-01');
  const [newStopSeverity, setNewStopSeverity] = useState<any>('SAFETY_CRITICAL');
  const [newStopTitle, setNewStopTitle] = useState('');
  const [newStopMsg, setNewStopMsg] = useState('');
  const [newStopResolution, setNewStopResolution] = useState('');

  // Collect detected allergens across all components
  const detectedAllergens = Array.from(
    new Set(twin.components.flatMap((c) => c.ingredients.flatMap((i) => i.allergens)))
  );

  const unresolvedStops = twin.stopConditions.filter((s) => !s.resolved);
  const canCommit = unresolvedStops.length === 0 && twin.allergensConfirmed;

  const handleResolveStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStopToResolve || !resolutionNote.trim()) return;

    onUpdateTwin((prev) => ({
      ...prev,
      stopConditions: prev.stopConditions.map((s) =>
        s.id === selectedStopToResolve.id
          ? {
              ...s,
              resolved: true,
              resolvedBy: prev.chefAuthor,
              resolvedAt: new Date().toISOString(),
              resolutionNote: resolutionNote.trim(),
            }
          : s
      ),
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'STOP_RESOLVED',
          details: `Resolved STOP Condition ${selectedStopToResolve.code}: "${selectedStopToResolve.title}". Note: ${resolutionNote.trim()}`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: generateHash(`STOP-RESOLVED-${selectedStopToResolve.id}`),
          modeAtTime: 'validation',
        },
        ...prev.auditRecords,
      ],
    }));

    setSelectedStopToResolve(null);
    setResolutionNote('');
  };

  const handleCreateStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopTitle.trim() || !newStopMsg.trim()) return;

    const stop: StopCondition = {
      id: `stop-${Date.now()}`,
      code: newStopCode.trim(),
      severity: newStopSeverity,
      title: newStopTitle.trim(),
      message: newStopMsg.trim(),
      affectedEntities: twin.components.map((c) => c.id),
      resolutionPath: newStopResolution.trim() || 'Operator must review and authorize.',
      resolved: false,
    };

    onUpdateTwin((prev) => ({
      ...prev,
      stopConditions: [stop, ...prev.stopConditions],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'STOP_TRIGGERED',
          details: `Triggered STOP Condition ${stop.code}: ${stop.title}`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: generateHash(`STOP-TRIGGERED-${stop.id}`),
          modeAtTime: 'validation',
        },
        ...prev.auditRecords,
      ],
    }));

    setNewStopTitle('');
    setNewStopMsg('');
    setNewStopResolution('');
    setIsAddingStop(false);
  };

  const handleChefCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCommit || !chefSignName.trim()) return;

    const signature = `CHEF-SIGN-${Date.now()}-${generateHash(chefSignName).slice(2, 8).toUpperCase()}`;

    const newDecision: ChefDecision = {
      id: `dec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      chefName: chefSignName.trim(),
      action: decisionAction,
      fromStatus: twin.status,
      toStatus: 'COMMITTED_OPERATIONAL',
      rationale: decisionRationale.trim(),
      targetVersion: targetVersion.trim() || 'v1.4',
      acknowledgedUncertainties: [
        uncertainty1 ? 'Acknowledged seasonal raw ingredient moisture & fat variance.' : '',
        uncertainty2 ? 'Acknowledged peak dinner rush service pressure threshold.' : '',
        customUncertainty.trim() ? customUncertainty.trim() : '',
      ].filter(Boolean),
      digitalSignature: signature,
    };

    const newRevision: TwinRevision = {
      version: targetVersion.trim() || 'v1.4',
      timestamp: new Date().toISOString(),
      author: chefSignName.trim(),
      summary: `Chef formal sign-off: Promoted to COMMITTED_OPERATIONAL.`,
      changes: ['Resolved all statutory STOP conditions', 'HACCP thermal CCP validation complete'],
      chefDecisionId: newDecision.id,
      status: 'COMMITTED_SERVICE',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      status: 'COMMITTED_OPERATIONAL',
      governanceLevel: 'OPERATIONAL_COMMITTED',
      currentVersion: targetVersion.trim() || 'v1.4',
      decisions: [newDecision, ...prev.decisions],
      revisions: [newRevision, ...prev.revisions],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: chefSignName.trim(),
          actionType: 'COMMITTED_TO_SERVICE',
          details: `Chef committed twin to COMMITTED_OPERATIONAL with Signature: ${signature}`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: generateHash(`CHEF-COMMIT-${signature}`),
          modeAtTime: 'validation',
        },
        ...prev.auditRecords,
      ],
    }));

    setIsSignOffModalOpen(false);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (_) {}
  };

  return (
    <div className="space-y-6">
      {/* Validation Mode Doctrine Header */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-rose-950/30 border border-rose-500/30 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 4: Validation & Stop Conditions
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: HIGH (Operational Gatekeeper)</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Food Safety, Allergen Declarations & Chef Sign-Off</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Convert selected formulations into controlled culinary specifications. Resolve all allergen and safety STOP triggers before authorizing live kitchen service.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => onTriggerAiAction('Audit Allergen & Safety Risks', `Perform a rigorous HACCP & allergen cross-contact audit on "${twin.name}". Check for unstated hidden allergens in stocks, emulsions, and seasonings.`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-rose-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Safety Audit
          </button>
          
          <button
            onClick={() => setIsSignOffModalOpen(true)}
            disabled={!canCommit}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs shadow transition ${
              canCommit
                ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 ring-2 ring-emerald-400/50'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
            }`}
          >
            <FileSignature className="w-4 h-4" />
            Chef Authority Sign-Off
          </button>
        </div>
      </div>

      {/* Stop Conditions Section */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Pathfinder Stop & Hold Conditions ({twin.stopConditions.length})
            </h3>
            {unresolvedStops.length > 0 ? (
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-mono animate-pulse">
                {unresolvedStops.length} UNRESOLVED (BLOCKING SERVICE)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                ALL STOPS RESOLVED
              </span>
            )}
          </div>

          <button
            onClick={() => setIsAddingStop(!isAddingStop)}
            className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Trigger Stop Condition
          </button>
        </div>

        {/* Add Stop Form */}
        {isAddingStop && (
          <form onSubmit={handleCreateStop} className="p-3 bg-zinc-950 border border-rose-900/60 rounded-xl space-y-2 text-xs">
            <div className="font-mono text-rose-400 font-bold uppercase">Trigger New Stop Condition</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Code (e.g. STOP-TEMP-03)"
                value={newStopCode}
                onChange={(e) => setNewStopCode(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
              />
              <select
                value={newStopSeverity}
                onChange={(e: any) => setNewStopSeverity(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200 text-xs"
              >
                <option value="SAFETY_CRITICAL">Safety Critical (HACCP / Microbial)</option>
                <option value="ALLERGEN_UNRESOLVED">Allergen Unresolved</option>
                <option value="UNSUPPORTED_CLAIM">Unsupported Claim</option>
                <option value="EQUIPMENT_CAPACITY_EXCEEDED">Equipment Capacity Exceeded</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Stop Title (e.g. Core Temp Below Safe 54°C Threshold)"
              required
              value={newStopTitle}
              onChange={(e) => setNewStopTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
            />
            <textarea
              rows={2}
              placeholder="Detailed Message explaining why promotion is blocked..."
              required
              value={newStopMsg}
              onChange={(e) => setNewStopMsg(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
            />
            <input
              type="text"
              placeholder="Resolution Pathway (What must be proven/done to clear this stop)"
              value={newStopResolution}
              onChange={(e) => setNewStopResolution(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingStop(false)}
                className="text-zinc-400 hover:text-zinc-200 px-2 py-0.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-0.5 rounded shadow"
              >
                Assert Stop
              </button>
            </div>
          </form>
        )}

        {/* List of Stop Conditions */}
        <div className="space-y-3">
          {twin.stopConditions.map((stop) => (
            <div
              key={stop.id}
              className={`p-3.5 rounded-xl border transition-all text-xs space-y-2 ${
                stop.resolved
                  ? 'bg-zinc-950/70 border-zinc-800 text-zinc-300'
                  : 'bg-rose-950/30 border-rose-600/80 text-rose-100 ring-1 ring-rose-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-400 text-[11px]">{stop.code}</span>
                    <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300">
                      {stop.severity}
                    </span>
                    {stop.resolved ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> RESOLVED by {stop.resolvedBy}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-mono text-[10px] font-bold">
                        <AlertTriangle className="w-3 h-3" /> ACTIVE STOP
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-zinc-100 text-sm">{stop.title}</h4>
                </div>

                {!stop.resolved && (
                  <button
                    onClick={() => {
                      setSelectedStopToResolve(stop);
                      setResolutionNote(stop.resolutionPath);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow whitespace-nowrap"
                  >
                    Resolve Stop
                  </button>
                )}
              </div>

              <p className="text-zinc-300 text-xs leading-relaxed">{stop.message}</p>

              <div className="p-2 rounded bg-zinc-900 border border-zinc-850 text-[11px] font-mono text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>
                  <strong className="text-zinc-300">Required Resolution:</strong> {stop.resolutionPath}
                </span>
                {stop.triggerEvidence && (
                  <span className="text-amber-400">Trigger: {stop.triggerEvidence}</span>
                )}
              </div>

              {stop.resolved && stop.resolutionNote && (
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-200">
                  <strong className="font-mono">Resolution Action:</strong> {stop.resolutionNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Statutory 14 Allergen Matrix */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Statutory 14 Allergen Verification Matrix
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onUpdateTwin((prev) => ({
                  ...prev,
                  allergensConfirmed: !prev.allergensConfirmed,
                }))
              }
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition ${
                twin.allergensConfirmed
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-rose-950 text-rose-300 border border-rose-700'
              }`}
            >
              {twin.allergensConfirmed ? 'Allergens Verified by Chef' : 'Allergens Unconfirmed (Click to Confirm)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STATUTORY_ALLERGENS.map((allergen) => {
            const isPresent = detectedAllergens.includes(allergen);
            return (
              <div
                key={allergen}
                className={`p-2.5 rounded-lg border text-center font-mono text-xs transition ${
                  isPresent
                    ? 'bg-rose-950/60 border-rose-600 text-rose-200 ring-1 ring-rose-500/50'
                    : 'bg-zinc-950 border-zinc-850 text-zinc-400'
                }`}
              >
                <div className="text-[10px] uppercase text-zinc-500">
                  {isPresent ? 'CONTAINS' : 'ABSENT'}
                </div>
                <div className="font-bold text-zinc-100 truncate mt-0.5">{allergen}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resolve Stop Modal */}
      {selectedStopToResolve && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleResolveStop}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Resolve Stop: {selectedStopToResolve.code}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStopToResolve(null)}
                className="text-zinc-500 hover:text-zinc-300 font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-300">{selectedStopToResolve.title}</div>
              <p className="text-xs text-zinc-400">{selectedStopToResolve.message}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-300">
                Resolution Action & Evidence Note (Required):
              </label>
              <textarea
                rows={3}
                required
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Describe specific kitchen action, backup stock batch, or probe calibration that clears this condition..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSelectedStopToResolve(null)}
                className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow"
              >
                Clear Stop & Log Resolution
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chef Authority Sign-off Modal */}
      {isSignOffModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleChefCommit}
            className="bg-zinc-900 border border-amber-500/50 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl text-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Pathfinder Chef Sign-Off Protocol</h3>
                  <p className="text-[11px] font-mono text-zinc-400">The Chef is the sovereign operator authority.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSignOffModalOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 font-mono"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Authorizing Chef Name</label>
                <input
                  type="text"
                  required
                  value={chefSignName}
                  onChange={(e) => setChefSignName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Target Version</label>
                <input
                  type="text"
                  required
                  value={targetVersion}
                  onChange={(e) => setTargetVersion(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-zinc-400">Chef Operational Rationale</label>
              <textarea
                rows={2}
                required
                value={decisionRationale}
                onChange={(e) => setDecisionRationale(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100"
              />
            </div>

            {/* Acknowledged Uncertainties */}
            <div className="space-y-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                Acknowledged Uncertainties (Project SIXES Doctrine)
              </div>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={uncertainty1}
                    onChange={(e) => setUncertainty1(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Acknowledge seasonal raw ingredient moisture & fat variance.</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={uncertainty2}
                    onChange={(e) => setUncertainty2(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Acknowledge peak dinner rush station throughput constraints.</span>
                </label>
                <input
                  type="text"
                  placeholder="Additional acknowledged operational uncertainty (optional)..."
                  value={customUncertainty}
                  onChange={(e) => setCustomUncertainty(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setIsSignOffModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign & Commit to Service Mode
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
