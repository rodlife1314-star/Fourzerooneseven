'use client';

import React, { useState } from 'react';
import { CulinaryTwinProject } from '@/types/culinary-twin';
import { ChefHat, Sparkles, X, Plus, Layers, Flame } from 'lucide-react';
import { generateHash } from '@/lib/utils';

interface NewTwinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTwin: (newTwin: CulinaryTwinProject) => void;
}

export const NewTwinModal: React.FC<NewTwinModalProps> = ({ isOpen, onClose, onCreateTwin }) => {
  const [twinCode, setTwinCode] = useState('SX-INNO-04');
  const [twinName, setTwinName] = useState('');
  const [conceptHeadline, setConceptHeadline] = useState('');
  const [chefAuthor, setChefAuthor] = useState('Chef Rod (Operator #01)');
  const [primaryComponent, setPrimaryComponent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twinName.trim() || !twinCode.trim()) return;

    const initialTwin: CulinaryTwinProject = {
      id: `twin-${Date.now()}`,
      code: twinCode.trim().toUpperCase(),
      name: twinName.trim(),
      conceptHeadline: conceptHeadline.trim() || 'Culinary investigation into material transformations and flavor equilibria.',
      currentMode: 'exploration',
      governanceLevel: 'LOW',
      currentVersion: 'v0.1-alpha',
      status: 'DRAFT_EXPLORING',
      chefAuthor: chefAuthor.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      explorationTags: [
        {
          id: `exp-${Date.now()}-1`,
          type: 'IDEA',
          text: `Initial creative proposition for ${twinName.trim()}`,
          confidence: 0.7,
        },
      ],
      components: primaryComponent.trim()
        ? [
            {
              id: `comp-${Date.now()}`,
              name: primaryComponent.trim(),
              type: 'protein',
              description: `Primary base component for ${twinName.trim()}`,
              yieldGrams: 300,
              ingredients: [
                {
                  id: `ing-${Date.now()}`,
                  name: primaryComponent.trim(),
                  quantity: 350,
                  unit: 'g',
                  bakersPercentage: 100,
                  allergens: [],
                  moisturePercentage: 70,
                  provenance: 'Local Producer Certification',
                },
              ],
              transformations: [],
              holdingLimitMinutes: 30,
              holdingTempC: 54,
              sensoryProfile: {
                umami: 6,
                acid: 4,
                salt: 5,
                sweet: 3,
                bitter: 2,
                richness: 6,
                crunch: 4,
                herbaceous: 4,
              },
            },
          ]
        : [],
      evidenceLedger: [],
      stopConditions: [
        {
          id: `stop-${Date.now()}`,
          code: 'STOP-INIT-ALLERGEN',
          severity: 'ALLERGEN_UNRESOLVED',
          title: 'Initial Allergen Assessment Required',
          message: 'All component ingredients and sub-preparations must be audited for statutory allergens before service.',
          affectedEntities: [],
          resolutionPath: 'Audit formulation in Mode 2 and confirm in Mode 4.',
          resolved: false,
        },
      ],
      allergensConfirmed: false,
      haccpApproved: false,
      activeTickets: [],
      serviceObservations: [],
      revisions: [],
      decisions: [],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: chefAuthor.trim(),
          actionType: 'SPEC_CREATED',
          details: `Initialized Project SIXES Culinary Twin ${twinCode.trim()}: "${twinName.trim()}"`,
          previousHash: '0x000000000000',
          recordHash: generateHash(`${twinCode}-${Date.now()}`),
          modeAtTime: 'exploration',
        },
      ],
    };

    onCreateTwin(initialTwin);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-zinc-200"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-white text-base">Initialize New Culinary Digital Twin</h3>
              <p className="text-[11px] font-mono text-zinc-400">Pathfinder Frontier Substrate Spec</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 font-mono"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Twin Code</label>
            <input
              type="text"
              required
              value={twinCode}
              onChange={(e) => setTwinCode(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-amber-300 font-mono font-bold"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-mono text-zinc-400 mb-1">Chef Operator Name</label>
            <input
              type="text"
              required
              value={chefAuthor}
              onChange={(e) => setChefAuthor(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">Dish / Project Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Cold-Smoked Arctic Char with Fermented Whey Butter & Horseradish Glass"
            value={twinName}
            onChange={(e) => setTwinName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">Core Concept & Chemical Investigation</label>
          <textarea
            rows={2}
            placeholder="e.g. Investigation into cold-smoke albumin setting without thermal firming, paired with high-lactic whey emulsion..."
            value={conceptHeadline}
            onChange={(e) => setConceptHeadline(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">Primary Component Name (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Cured & Cold-Smoked Arctic Char"
            value={primaryComponent}
            onChange={(e) => setPrimaryComponent(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-200"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize Twin
          </button>
        </div>
      </form>
    </div>
  );
};
