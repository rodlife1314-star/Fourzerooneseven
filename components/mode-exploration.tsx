'use client';

import React, { useState } from 'react';
import { CulinaryTwinProject } from '@/types/culinary-twin';
import { 
  Sparkles, 
  Lightbulb, 
  Compass, 
  BookOpen, 
  Plus, 
  Trash2, 
  TrendingUp, 
  HelpCircle, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  FlaskConical
} from 'lucide-react';

interface ModeExplorationProps {
  twin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onNavigateToMode: (mode: any) => void;
  onTriggerAiAction: (actionName: string, promptText: string) => void;
}

export const ModeExploration: React.FC<ModeExplorationProps> = ({
  twin,
  onUpdateTwin,
  onNavigateToMode,
  onTriggerAiAction
}) => {
  const [newTagType, setNewTagType] = useState<'IDEA' | 'HYPOTHESIS' | 'SPECULATIVE_PAIRING' | 'HISTORICAL_LINEAGE'>('IDEA');
  const [newTagText, setNewTagText] = useState('');
  const [newTagConfidence, setNewTagConfidence] = useState(0.75);
  const [newTagProvenance, setNewTagProvenance] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagText.trim()) return;

    const newTag = {
      id: `exp-${Date.now()}`,
      type: newTagType,
      text: newTagText.trim(),
      confidence: newTagConfidence,
      provenanceRef: newTagProvenance.trim() || undefined
    };

    onUpdateTwin((prev) => ({
      ...prev,
      explorationTags: [newTag, ...prev.explorationTags],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'HYPOTHESIS_ADDED',
          details: `Added ${newTagType}: "${newTagText.slice(0, 50)}..."`,
          previousHash: prev.auditRecords[prev.auditRecords.length - 1]?.recordHash || '0x000000000000',
          recordHash: '0x' + Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0'),
          modeAtTime: 'exploration'
        },
        ...prev.auditRecords
      ]
    }));

    setNewTagText('');
    setNewTagProvenance('');
    setIsAddingTag(false);
  };

  const handleDeleteTag = (id: string) => {
    onUpdateTwin((prev) => ({
      ...prev,
      explorationTags: prev.explorationTags.filter((t) => t.id !== id)
    }));
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'IDEA':
        return { label: 'Creative Idea', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Lightbulb };
      case 'HYPOTHESIS':
        return { label: 'Hypothesis', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: FlaskConical };
      case 'SPECULATIVE_PAIRING':
        return { label: 'Speculative Pairing', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: Sparkles };
      case 'HISTORICAL_LINEAGE':
        return { label: 'Historical Lineage', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: BookOpen };
      default:
        return { label: type, color: 'bg-zinc-800 text-zinc-300 border-zinc-700', icon: HelpCircle };
    }
  };

  // Average sensory radar from components
  const avgSensory = twin.components.reduce(
    (acc, comp) => {
      const p = comp.sensoryProfile;
      return {
        umami: acc.umami + p.umami,
        acid: acc.acid + p.acid,
        salt: acc.salt + p.salt,
        sweet: acc.sweet + p.sweet,
        bitter: acc.bitter + p.bitter,
        richness: acc.richness + p.richness,
        crunch: acc.crunch + p.crunch,
        herbaceous: acc.herbaceous + p.herbaceous,
      };
    },
    { umami: 0, acid: 0, salt: 0, sweet: 0, bitter: 0, richness: 0, crunch: 0, herbaceous: 0 }
  );

  const compCount = Math.max(1, twin.components.length);
  const normalizedSensory = {
    umami: Math.min(10, Math.round(avgSensory.umami / compCount)),
    acid: Math.min(10, Math.round(avgSensory.acid / compCount)),
    salt: Math.min(10, Math.round(avgSensory.salt / compCount)),
    sweet: Math.min(10, Math.round(avgSensory.sweet / compCount)),
    bitter: Math.min(10, Math.round(avgSensory.bitter / compCount)),
    richness: Math.min(10, Math.round(avgSensory.richness / compCount)),
    crunch: Math.min(10, Math.round(avgSensory.crunch / compCount)),
    herbaceous: Math.min(10, Math.round(avgSensory.herbaceous / compCount)),
  };

  return (
    <div className="space-y-6">
      {/* Exploration Doctrine Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-amber-950/30 border border-amber-500/30 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 1: Exploration
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: LOW (Maximum Creative Freedom)</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">{twin.name}</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            {twin.conceptHeadline || 'Explore flavour associations, reinterpret classical preparations, and formulate culinary hypotheses.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => onTriggerAiAction('Exploration Pairing Ideator', `Propose 3 radical speculative flavour pairings and historical lineage bridges for ${twin.name}`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Flavour Ideator
          </button>
          <button
            onClick={() => onNavigateToMode('investigation')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            Promote to Investigation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: Left = Ideas & Hypotheses, Right = Sensory Compass & Doctrine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Creative Hypotheses & Knowledge Nodes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono">
                Knowledge & Speculation Field ({twin.explorationTags.length})
              </h3>
              <span className="text-[11px] text-zinc-500">Explicitly labelled speculative items</span>
            </div>

            <button
              onClick={() => setIsAddingTag(!isAddingTag)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 border border-zinc-700 transition"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Record Idea / Hypothesis</span>
            </button>
          </div>

          {/* Add Tag Form */}
          {isAddingTag && (
            <form onSubmit={handleAddTag} className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 space-y-3 animate-in fade-in duration-200">
              <div className="text-xs font-semibold text-zinc-300 uppercase font-mono">Add Culinary Exploration Entry</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Entry Type</label>
                  <select
                    value={newTagType}
                    onChange={(e: any) => setNewTagType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="IDEA">Creative Idea</option>
                    <option value="HYPOTHESIS">Hypothesis (Testable)</option>
                    <option value="SPECULATIVE_PAIRING">Speculative Pairing</option>
                    <option value="HISTORICAL_LINEAGE">Historical Lineage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Initial Confidence ({Math.round(newTagConfidence * 100)}%)
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={newTagConfidence}
                    onChange={(e) => setNewTagConfidence(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Proposition / Formulation Idea</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 14-day cold dry-age increases endogenous calpain enzyme activity, softening muscle fibres..."
                  value={newTagText}
                  onChange={(e) => setNewTagText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Provenance / Historical Source (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Larousse Gastronomique 1938, or Modernist Cuisine Vol 3"
                  value={newTagProvenance}
                  onChange={(e) => setNewTagProvenance(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingTag(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow"
                >
                  Save Entry
                </button>
              </div>
            </form>
          )}

          {/* Tags List */}
          <div className="space-y-3">
            {twin.explorationTags.map((tag) => {
              const badge = getTypeBadge(tag.type);
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={tag.id}
                  className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-mono font-medium ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">
                        <span>Confidence:</span>
                        <span className="text-amber-400 font-bold">{Math.round(tag.confidence * 100)}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTriggerAiAction('Challenge Exploration Node', `Critique and challenge this culinary proposition: "${tag.text}"`)}
                        title="Challenge this assumption with AI"
                        className="text-[11px] font-mono text-zinc-400 hover:text-amber-300 opacity-0 group-hover:opacity-100 transition px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700"
                      >
                        Challenge Node
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-200 leading-relaxed font-normal">{tag.text}</p>

                  {tag.provenanceRef && (
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 pt-1 border-t border-zinc-850">
                      <BookOpen className="w-3 h-3 text-amber-500/70" />
                      <span>Provenance: {tag.provenanceRef}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Sensory Profile Compass & Doctrine Notes */}
        <div className="space-y-4">
          {/* Sensory Compass */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Aggregated Flavour Profile
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono">1-10 Scale</span>
            </div>

            <div className="space-y-2 pt-1">
              {Object.entries(normalizedSensory).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize text-zinc-300 font-mono">{key}</span>
                    <span className="text-amber-400 font-mono font-semibold">{val} / 10</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${val * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Doctrine Reminder */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-2.5">
            <div className="font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              Pathfinder Exploration Rules
            </div>
            <ul className="text-zinc-400 space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
              <li>Incomplete ideas and speculative combinations are permitted.</li>
              <li>Disagreement between culinary references is preserved.</li>
              <li>Outputs remain labelled as ideas, hypotheses, or interpretations.</li>
              <li>Exploration does not authorize procurement or production.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
