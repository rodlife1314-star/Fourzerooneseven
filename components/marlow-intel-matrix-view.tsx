'use client';

import React, { useState, useMemo } from 'react';
import {
  MarlowIntelDossier,
  MarlowMatrixEntry,
  EpistemicState,
  ProvenanceWeight,
  ServiceObservationDebrief,
} from '@/types/culinary-twin';
import {
  Compass,
  Award,
  Sparkles,
  Search,
  Filter,
  Flame,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Utensils,
  Layers,
  ChefHat,
  Eye,
  CheckCircle2,
  TrendingDown,
  Activity,
  Thermometer,
  UserCheck,
  Plus,
  FileText,
  RotateCcw,
  Check,
  X,
  Zap,
} from 'lucide-react';

interface MarlowIntelMatrixViewProps {
  intel: MarlowIntelDossier;
  serviceDebriefs?: ServiceObservationDebrief[];
  chefAuthor?: string;
  onUpdateTwin?: (updater: any) => void;
}

export const MarlowIntelMatrixView: React.FC<MarlowIntelMatrixViewProps> = ({
  intel,
  serviceDebriefs = [],
  chefAuthor = 'Chef Rod (Operator)',
  onUpdateTwin,
}) => {
  // Navigation between Matrix and Service Reality Debrief
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'service_debrief' | 'epistemic_doctrine'>('matrix');

  // Matrix Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstablishment, setSelectedEstablishment] = useState<string>('ALL');
  const [selectedEpistemicState, setSelectedEpistemicState] = useState<string>('ALL');
  const [selectedProvenance, setSelectedProvenance] = useState<string>('ALL');
  const [selectedHolding, setSelectedHolding] = useState<string>('ALL');
  const [activeFormulaStage, setActiveFormulaStage] = useState<number | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<MarlowMatrixEntry | null>(null);

  // Local state for interactive promotions (D_O -> D_H -> D_T -> D_V)
  const [matrixEntries, setMatrixEntries] = useState<MarlowMatrixEntry[]>(intel.matrixEntries);

  // New Debrief Form State
  const [isAddingDebrief, setIsAddingDebrief] = useState(false);
  const [debriefList, setDebriefList] = useState<ServiceObservationDebrief[]>(serviceDebriefs);
  const [newDebriefCovers, setNewDebriefCovers] = useState('50');
  const [newDebriefDate, setNewDebriefDate] = useState('2026-09-10');
  const [newDebriefNotes, setNewDebriefNotes] = useState('');
  const [newWhatHeldWell, setNewWhatHeldWell] = useState('');
  const [newWhatSlowedDown, setNewWhatSlowedDown] = useState('');
  const [newWhatStruggled, setNewWhatStruggled] = useState('');
  const [newWhatWorkedBetter, setNewWhatWorkedBetter] = useState('');
  const [newWhatChangedPressure, setNewWhatChangedPressure] = useState('');
  const [newWhatCustomerReceived, setNewWhatCustomerReceived] = useState('');

  // Promote / adjust epistemic state
  const handlePromoteEntry = (entryId: string, targetState: EpistemicState, chefNote?: string) => {
    setMatrixEntries((prev) =>
      prev.map((item) => {
        if (item.id === entryId) {
          const isNowAuth = targetState === 'V_VALIDATED_DOCTRINE';
          return {
            ...item,
            epistemicState: targetState,
            isAuthoritative: isNowAuth,
            chefTrialValidation: {
              status: isNowAuth ? 'VALIDATED_DOCTRINE' : targetState === 'T_TRIAL' ? 'TRIAL_ACTIVE' : 'PROPOSED_HYPOTHESIS',
              chefNotes: chefNote || `Chef Rod authorized elevation to ${targetState} on ${new Date().toISOString().split('T')[0]}`,
              testedDate: new Date().toISOString().split('T')[0],
            },
          };
        }
        return item;
      })
    );

    if (selectedEntry?.id === entryId) {
      setSelectedEntry((prev) =>
        prev
          ? {
              ...prev,
              epistemicState: targetState,
              isAuthoritative: targetState === 'V_VALIDATED_DOCTRINE',
              chefTrialValidation: {
                status: targetState === 'V_VALIDATED_DOCTRINE' ? 'VALIDATED_DOCTRINE' : targetState === 'T_TRIAL' ? 'TRIAL_ACTIVE' : 'PROPOSED_HYPOTHESIS',
                chefNotes: chefNote || `Chef Rod authorized elevation to ${targetState}`,
                testedDate: new Date().toISOString().split('T')[0],
              },
            }
          : null
      );
    }
  };

  // Submit new debrief
  const handleSaveDebrief = () => {
    if (!newWhatHeldWell.trim() && !newWhatSlowedDown.trim()) {
      alert('Please fill in at least what held well and what slowed us down.');
      return;
    }

    const created: ServiceObservationDebrief = {
      id: `debrief-${Date.now()}`,
      serviceDate: newDebriefDate || new Date().toISOString().split('T')[0],
      coversServed: parseInt(newDebriefCovers, 10) || 50,
      menuVersion: 'v1.1-TIER1-POST-TRIAL',
      operatorNotes: newDebriefNotes || 'Matchday Wembley 50-cover service observation.',
      whatHeldWell: newWhatHeldWell,
      whatSlowedUsDown: newWhatSlowedDown,
      whatChefsStruggledWith: newWhatStruggled,
      whatWorkedBetterThanExpected: newWhatWorkedBetter,
      whatChangedUnderPressure: newWhatChangedPressure,
      whatCustomerActuallyReceived: newWhatCustomerReceived,
      candidateAdjustments: [
        {
          component: 'Halftime Flow Optimization',
          observedFailureOrGain: newWhatSlowedDown || 'Bottleneck identified at pass.',
          proposedHypothesis: 'Engineer pre-portioned cold components to reduce pass handling time under 15-minute pressure.',
          trialStatus: 'SCHEDULED',
        },
      ],
      recordedBy: chefAuthor,
      chefSignedOff: true,
      chefSignOffDate: new Date().toISOString(),
    };

    setDebriefList((prev) => [created, ...prev]);
    setIsAddingDebrief(false);

    // Reset inputs
    setNewWhatHeldWell('');
    setNewWhatSlowedDown('');
    setNewWhatStruggled('');
    setNewWhatWorkedBetter('');
    setNewWhatChangedPressure('');
    setNewWhatCustomerReceived('');
    setNewDebriefNotes('');
  };

  // Filter matrix entries
  const filteredEntries = useMemo(() => {
    return matrixEntries.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hero.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sauce.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.wembleyParallel4017.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.britishAnchor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEstablishment =
        selectedEstablishment === 'ALL' || item.establishment === selectedEstablishment;

      const matchesEpistemic =
        selectedEpistemicState === 'ALL' || item.epistemicState === selectedEpistemicState;

      const matchesProvenance =
        selectedProvenance === 'ALL' || item.provenance === selectedProvenance;

      const matchesHolding =
        selectedHolding === 'ALL' || item.holdingPotential === selectedHolding;

      return matchesSearch && matchesEstablishment && matchesEpistemic && matchesProvenance && matchesHolding;
    });
  }, [matrixEntries, searchQuery, selectedEstablishment, selectedEpistemicState, selectedProvenance, selectedHolding]);

  const getEpistemicBadge = (state: EpistemicState) => {
    switch (state) {
      case 'O_OBSERVATION':
        return {
          code: 'D_O',
          title: 'Observation',
          desc: 'External or Service What Happened',
          bg: 'bg-blue-950/80 text-blue-300 border-blue-700/60',
          dot: 'bg-blue-400',
        };
      case 'H_HYPOTHESIS':
        return {
          code: 'D_H',
          title: 'Hypothesis',
          desc: 'Candidate Explanation / Potential Mechanism',
          bg: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
          dot: 'bg-purple-400',
        };
      case 'T_TRIAL':
        return {
          code: 'D_T',
          title: 'Trial',
          desc: 'Controlled Testing in 4017',
          bg: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
          dot: 'bg-amber-400',
        };
      case 'V_VALIDATED_DOCTRINE':
        return {
          code: 'D_V',
          title: 'Validated Doctrine',
          desc: 'Repeatable Matchday Service Standard',
          bg: 'bg-emerald-950/90 text-emerald-300 border-emerald-600',
          dot: 'bg-emerald-400',
        };
      default:
        return {
          code: 'D_?',
          title: 'Undefined',
          desc: 'Unclassified',
          bg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
          dot: 'bg-zinc-400',
        };
    }
  };

  const getProvenanceBadge = (prov: ProvenanceWeight) => {
    switch (prov) {
      case 'CHEF_FIRSTHAND':
        return {
          label: 'Chef Rod Firsthand Experience',
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'ALICE_INFERRED':
        return {
          label: 'Alice AI Inferred Analysis',
          bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        };
      case 'EXTERNAL_SYSTEM_INPUT':
        return {
          label: 'External System Input (Kerridge / Marlow)',
          bg: 'bg-zinc-800/90 text-zinc-300 border-zinc-700',
        };
      case 'SERVICE_FEEDBACK_DATA':
        return {
          label: '50-Cover Service Matchday Log',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
    }
  };

  const getHoldingBadge = (potential: MarlowMatrixEntry['holdingPotential']) => {
    switch (potential) {
      case 'HOT_HELD_STABLE':
        return {
          bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
          label: 'Hot-Held Stable (Combi/Drawer)',
        };
      case 'FLASH_FINISH':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
          label: 'Flash Finish (<4 min)',
        };
      case 'COLD_PLATED':
        return {
          bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
          label: 'Cold Plated (Pre-Service Cloche)',
        };
      case 'SALAMANDER_GLAZE':
        return {
          bg: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
          label: 'Salamander Glaze (90s Pass)',
        };
      case 'ORDER_ASSEMBLED':
        return {
          bg: 'bg-blue-950/80 text-blue-300 border-blue-700/60',
          label: 'Live Assembled (Modular)',
        };
      default:
        return {
          bg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
          label: potential,
        };
    }
  };

  return (
    <div id="marlow-intel-root" className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header & Epistemic Separation Banner */}
      <div className="rounded-xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-950 border border-amber-800/40 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>D — Observation of Systems Layer</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                Epistemic State: D = &#123;O, H, T, V&#125;
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                Non-Authoritative By Default
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-3">
              <span>Observation of Systems &amp; Epistemic Service Helix</span>
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-300">Observation ≠ Doctrine.</strong> Observation informs; Chef Rod authorizes. 
              Marlow is an observed external system (<span className="font-mono text-xs text-sky-400">D_O</span>), not the authority. 
              Kerridge is an input into 4017; 4017 does not become Kerridge. Every rule passes through controlled trials 
              (<span className="font-mono text-xs text-amber-400">D_T</span>) before becoming validated doctrine (<span className="font-mono text-xs text-emerald-400">D_V</span>).
            </p>

            {/* The Sixes Helix Formula Box */}
            <div className="p-3.5 rounded-lg bg-zinc-950/90 border border-amber-900/40 font-mono text-xs text-zinc-300 space-y-1.5">
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                <span>The Epistemic Helix Formula:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-zinc-200 text-xs">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">E_t (Menu Reality)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">P_t (Production 50 Covers)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">D_O (Observe)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">D_H (Hypothesize)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">D_T (Trial in 4017)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">D_V (Validated Doctrine)</span>
                <span className="text-amber-500">→</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">E_&#123;t+1&#125; (Next Revision)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
              <ChefHat className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Chef Rod Operational Provenance: </span>
                {intel.chefProvenanceNote}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 text-right">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Primary Authority</div>
              <div className="text-sm font-bold text-amber-300">{chefAuthor}</div>
              <div className="text-[11px] text-zinc-500 font-mono mt-0.5">Wembley Box 4017 Executive</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 text-right">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Degradation Model</div>
              <div className="text-xs font-mono font-bold text-emerald-400">Q(t) = Q_0 - ΔQ(t)</div>
              <div className="text-[11px] text-zinc-500 font-mono mt-0.5">Non-Binary Holding Curve</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'matrix'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>12-Dish Translation Matrix (Kerridge ↔ 4017)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-zinc-950/60 text-[10px] font-mono">
            {matrixEntries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('service_debrief')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'service_debrief'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Service Reality Debrief (50 Covers)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-zinc-950/60 text-[10px] font-mono">
            {debriefList.length} Logs
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('epistemic_doctrine')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'epistemic_doctrine'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Epistemic Principles &amp; Five-Part Formula</span>
        </button>
      </div>

      {/* VIEW A: TRANSLATION MATRIX */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          {/* Epistemic State Legend & Filter Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { state: 'O_OBSERVATION', code: 'D_O', title: 'Observation', desc: 'What actually happened / seen in venue', border: 'border-blue-700/60', text: 'text-blue-400' },
              { state: 'H_HYPOTHESIS', code: 'D_H', title: 'Hypothesis', desc: 'What we think explains it', border: 'border-purple-700/60', text: 'text-purple-400' },
              { state: 'T_TRIAL', code: 'D_T', title: 'Trial', desc: 'Controlled 4017 kitchen application', border: 'border-amber-700/60', text: 'text-amber-400' },
              { state: 'V_VALIDATED_DOCTRINE', code: 'D_V', title: 'Validated Doctrine', desc: 'Proven under 50-cover matchday pressure', border: 'border-emerald-600', text: 'text-emerald-400' },
            ].map((st) => (
              <button
                key={st.state}
                onClick={() => setSelectedEpistemicState(selectedEpistemicState === st.state ? 'ALL' : st.state)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedEpistemicState === st.state
                    ? 'bg-zinc-850 ring-2 ring-amber-500/50 ' + st.border
                    : 'bg-zinc-900/60 hover:bg-zinc-850 ' + st.border
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-extrabold ${st.text}`}>{st.code} — {st.title}</span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {matrixEntries.filter((e) => e.epistemicState === st.state).length}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 leading-tight">{st.desc}</div>
              </button>
            ))}
          </div>

          {/* Search & Filter Controls */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col lg:flex-row gap-3 items-center justify-between" suppressHydrationWarning>
            <div className="relative w-full lg:w-96" suppressHydrationWarning>
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                id="marlow-intel-search-query"
                name="marlow-intel-search-query"
                type="text"
                autoComplete="off"
                data-lpignore="true"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, hero, sauce, or 4017 parallel..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
                suppressHydrationWarning
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono shrink-0">
                <Filter className="w-3.5 h-3.5 text-zinc-500" />
                <span>Venue:</span>
              </div>
              {['ALL', 'The Hand & Flowers', 'The Coach'].map((est) => (
                <button
                  key={est}
                  onClick={() => setSelectedEstablishment(est)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    selectedEstablishment === est
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {est === 'ALL' ? 'All Venues' : est}
                </button>
              ))}

              <div className="h-4 w-px bg-zinc-700 mx-1 hidden sm:block" />

              <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono shrink-0">
                <span>Holding:</span>
              </div>
              <select
                id="holding-potential-select"
                name="holdingPotential"
                autoComplete="off"
                data-lpignore="true"
                suppressHydrationWarning
                value={selectedHolding}
                onChange={(e) => setSelectedHolding(e.target.value)}
                className="px-2.5 py-1 rounded-md text-xs bg-zinc-950 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Holding Protocols</option>
                <option value="HOT_HELD_STABLE">Hot-Held Stable</option>
                <option value="FLASH_FINISH">Flash Finish</option>
                <option value="COLD_PLATED">Cold Plated</option>
                <option value="SALAMANDER_GLAZE">Salamander Glaze</option>
                <option value="ORDER_ASSEMBLED">Order Assembled</option>
              </select>
            </div>
          </div>

          {/* Matrix Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntries.map((entry) => {
              const holdingBadge = getHoldingBadge(entry.holdingPotential);
              const epistemicBadge = getEpistemicBadge(entry.epistemicState);
              const provBadge = getProvenanceBadge(entry.provenance);

              return (
                <div
                  key={entry.id}
                  id={`matrix-card-${entry.id}`}
                  className="rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/60 transition shadow-lg flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 ${epistemicBadge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${epistemicBadge.dot}`} />
                            <span>{epistemicBadge.code}</span>
                          </span>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                            {entry.establishment}
                          </span>

                          {entry.isAuthoritative ? (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>4017 Doctrine</span>
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-500 border border-zinc-800">
                              Candidate (Non-Auth)
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition leading-snug">
                          {entry.dishName}
                        </h4>
                      </div>
                    </div>

                    {/* British Anchor & The Powerful Idea */}
                    <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80 space-y-1.5 text-xs">
                      <div>
                        <span className="font-semibold text-amber-400/90">Anchor: </span>
                        <span className="text-zinc-300">{entry.britishAnchor}</span>
                      </div>
                      <div className="text-zinc-300">
                        <span className="font-semibold text-zinc-200">The Idea: </span>
                        {entry.onePowerfulIdea}
                      </div>
                    </div>

                    {/* Breakdown Attributes */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
                      <div className="p-2 rounded bg-zinc-950/50 border border-zinc-800/60">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Hero &amp; Sauce</div>
                        <div className="font-semibold text-zinc-200 truncate">{entry.hero}</div>
                        <div className="text-amber-400/90 truncate">{entry.sauce}</div>
                      </div>
                      <div className="p-2 rounded bg-zinc-950/50 border border-zinc-800/60">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Acid &amp; Texture</div>
                        <div className="text-zinc-200 truncate">{entry.acid}</div>
                        <div className="text-zinc-400 truncate">{entry.texture}</div>
                      </div>
                    </div>

                    {/* Quality Degradation Indicator Q(t) */}
                    {entry.degradationCurve && (
                      <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-zinc-400 flex items-center gap-1">
                            <TrendingDown className="w-3 h-3 text-amber-400" />
                            <span>Degradation Q(t)</span>
                          </span>
                          <span className="text-emerald-400 font-bold">Peak: {entry.degradationCurve.peakWindow}</span>
                        </div>
                        <div className="text-zinc-400 text-[10px] truncate">
                          Half-Life: {entry.degradationCurve.criticalLossVectors[0]?.description}
                        </div>
                      </div>
                    )}

                    {/* Wembley 4017 Direct Parallel */}
                    <div className="p-3 rounded-lg bg-amber-950/25 border border-amber-800/40 text-xs">
                      <div className="font-bold text-amber-300 flex items-center gap-1 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Wembley 4017 Parallel:</span>
                      </div>
                      <div className="text-zinc-200 font-semibold">{entry.wembleyParallel4017}</div>
                      <div className="text-zinc-400 text-[11px] mt-1 leading-relaxed line-clamp-2">
                        {entry.translationDoctrine}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${holdingBadge.bg}`}>
                      {holdingBadge.label}
                    </span>

                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition flex items-center gap-1"
                    >
                      <span>Examine &amp; Epistemic Gate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: SERVICE REALITY DEBRIEF (50 COVERS) */}
      {activeSubTab === 'service_debrief' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>Service Reality Debrief: Design → Cook → Watch → Learn → Improve → Repeat</span>
              </h3>
              <p className="text-xs text-zinc-400 max-w-2xl mt-1">
                A system that watches what actually happens in the real world. We produce for 50 covers, watch what held, what slowed us down, 
                and feed those lessons back into the next version of the production brief without confusing an observation with an unquestionable doctrine.
              </p>
            </div>

            <button
              onClick={() => setIsAddingDebrief(!isAddingDebrief)}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingDebrief ? 'Close Debrief Form' : 'Log New Service Debrief'}</span>
            </button>
          </div>

          {/* New Debrief Input Form */}
          {isAddingDebrief && (
            <div className="p-6 rounded-xl bg-zinc-900/95 border border-amber-500/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  <span>Log 50-Cover Matchday Observation Debrief</span>
                </div>
                <button
                  onClick={() => setIsAddingDebrief(false)}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Service Date</label>
                  <input
                    id="debrief-service-date-input"
                    name="debriefDate"
                    type="date"
                    value={newDebriefDate}
                    onChange={(e) => setNewDebriefDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Covers Served</label>
                  <input
                    id="debrief-covers-input"
                    name="debriefCovers"
                    type="number"
                    value={newDebriefCovers}
                    onChange={(e) => setNewDebriefCovers(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Pass Pressure Context</label>
                  <input
                    id="debrief-notes-input"
                    name="debriefNotes"
                    type="text"
                    value={newDebriefNotes}
                    onChange={(e) => setNewDebriefNotes(e.target.value)}
                    placeholder="e.g. 15-minute halftime rush, 38 mains fired simultaneously"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* The 6 Real-World Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-400 block">1. What held well?</label>
                  <textarea
                    id="debrief-held-well-textarea"
                    name="whatHeldWell"
                    rows={2}
                    value={newWhatHeldWell}
                    onChange={(e) => setNewWhatHeldWell(e.target.value)}
                    placeholder="e.g. Lamb belly in vacuum bath held texture and collagen moisture perfectly for 90 minutes."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-red-400 block">2. What slowed us down?</label>
                  <textarea
                    id="debrief-slowed-down-textarea"
                    name="whatSlowedUsDown"
                    rows={2}
                    value={newWhatSlowedDown}
                    onChange={(e) => setNewWhatSlowedDown(e.target.value)}
                    placeholder="e.g. Tweezing individual micro-herbs on the scallop plate created a 45-second bottleneck per plate."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-400 block">3. What did the chefs struggle with?</label>
                  <textarea
                    id="debrief-struggled-textarea"
                    name="whatChefsStruggledWith"
                    rows={2}
                    value={newWhatStruggled}
                    onChange={(e) => setNewWhatStruggled(e.target.value)}
                    placeholder="e.g. Commis hesitated on salamander door height; two trays caramelized unevenly."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-sky-400 block">4. What worked better than expected?</label>
                  <textarea
                    id="debrief-worked-better-textarea"
                    name="whatWorkedBetterThanExpected"
                    rows={2}
                    value={newWhatWorkedBetter}
                    onChange={(e) => setNewWhatWorkedBetter(e.target.value)}
                    placeholder="e.g. Boulangère potato terrine re-crisped in combi in 4.5 minutes instead of 7 minutes."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-400 block">5. What changed under pressure?</label>
                  <textarea
                    id="debrief-changed-pressure-textarea"
                    name="whatChangedUnderPressure"
                    rows={2}
                    value={newWhatChangedPressure}
                    onChange={(e) => setNewWhatChangedPressure(e.target.value)}
                    placeholder="e.g. Switched strictly to thermos pump dispensers for sauce; stopped using spoons at peak rush."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-300 block">6. What did the customer actually receive?</label>
                  <textarea
                    id="debrief-customer-received-textarea"
                    name="whatCustomerActuallyReceived"
                    rows={2}
                    value={newWhatCustomerReceived}
                    onChange={(e) => setNewWhatCustomerReceived(e.target.value)}
                    placeholder="e.g. 58°C core lamb with mirror-gloss jus. Four delayed plates suffered ~25% aroma loss."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  onClick={() => setIsAddingDebrief(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDebrief}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Commit Debrief to Helix Ledger</span>
                </button>
              </div>
            </div>
          )}

          {/* List of Debrief Records */}
          <div className="space-y-5">
            {debriefList.map((log) => (
              <div
                key={log.id}
                className="p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold font-mono text-xs">
                      50c
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                        <span>Matchday Service Debrief — {log.serviceDate}</span>
                        {log.chefSignedOff && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Chef Rod Signed Off</span>
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{log.operatorNotes}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono text-zinc-400">
                    <div>Recorded by: <span className="text-amber-300">{log.recordedBy}</span></div>
                    <div className="text-[10px] text-zinc-500">Menu: {log.menuVersion}</div>
                  </div>
                </div>

                {/* The 6 Grid Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                    <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>1. What held well:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatHeldWell}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/40">
                    <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>2. What slowed us down:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatSlowedUsDown}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40">
                    <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span>3. What chefs struggled with:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatChefsStruggledWith}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/40">
                    <div className="font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>4. What worked better than expected:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatWorkedBetterThanExpected}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40">
                    <div className="font-bold text-purple-400 mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>5. What changed under pressure:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatChangedUnderPressure}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>6. Customer actually received:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{log.whatCustomerActuallyReceived}</p>
                  </div>
                </div>

                {/* Candidate Adjustments Feed into Next Revision */}
                {log.candidateAdjustments && log.candidateAdjustments.length > 0 && (
                  <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-2">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold flex items-center justify-between">
                      <span>Candidate Adjustments Feeding Helix (E_&#123;t+1&#125;):</span>
                      <span className="text-amber-400">Design → Cook → Watch → Learn → Improve</span>
                    </div>
                    <div className="space-y-2">
                      {log.candidateAdjustments.map((adj, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-zinc-200">{adj.component}</div>
                            <div className="text-zinc-400 text-[11px]">{adj.proposedHypothesis}</div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                              {adj.trialStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW C: EPISTEMIC DOCTRINE & FIVE-PART FORMULA */}
      {activeSubTab === 'epistemic_doctrine' && (
        <div className="space-y-6">
          {/* Five Part Formula */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>The Five-Part British Formula (Principle Translation)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Translation preserves principle, not necessarily raw ingredient. British recognisability + deep technique + one disruptive idea.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {intel.fivePartFormula.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFormulaStage(activeFormulaStage === idx ? null : idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    activeFormulaStage === idx
                      ? 'bg-amber-950/70 border-amber-500 text-zinc-100 shadow-xl ring-1 ring-amber-500/50'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-amber-400 mb-1">{step.stage}</div>
                  <div className="font-bold text-sm text-zinc-100 mb-1.5">{step.title}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{step.rule}</p>
                  <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <span className="text-amber-400 font-semibold">Ex: </span>
                    {step.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stadium Operational Dilemmas as Candidate Rules */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Operational Dilemmas: Stadium Realities vs Candidate Rules</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {intel.operationalRules20to40.map((op, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span>{op.headline}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950/80 border border-red-900/30 text-xs text-zinc-300">
                      <span className="font-semibold text-red-400">Stadium Vulnerability: </span>
                      {op.stadiumChallenge}
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950/80 border border-amber-900/30 text-xs text-zinc-300">
                      <span className="font-semibold text-amber-400">Marlow/Kerridge Precedent: </span>
                      {op.kerridgePrecedent}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Box 4017 Candidate Resolution:</span>
                    </div>
                    {op.box4017Resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: DEEP DIVE & EPISTEMIC ELEVATION GATE */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${getEpistemicBadge(selectedEntry.epistemicState).bg}`}>
                    {getEpistemicBadge(selectedEntry.epistemicState).code} — {getEpistemicBadge(selectedEntry.epistemicState).title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {selectedEntry.establishment}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getHoldingBadge(selectedEntry.holdingPotential).bg}`}>
                    {getHoldingBadge(selectedEntry.holdingPotential).label}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100">{selectedEntry.dishName}</h3>
                <div className="text-xs text-amber-400 font-mono mt-0.5">{selectedEntry.britishAnchor}</div>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Epistemic Authority Warning */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-amber-900/40 text-xs flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Epistemic Status: </span>
                {selectedEntry.isAuthoritative ? (
                  <span className="text-emerald-400 font-bold">Authorized 4017 Operational Doctrine.</span>
                ) : (
                  <span className="text-zinc-300">Candidate Observation. Non-authoritative by default until tested and signed off by Chef Rod.</span>
                )}
                {selectedEntry.chefTrialValidation?.chefNotes && (
                  <div className="text-zinc-400 font-mono text-[11px] mt-1">
                    Notes: {selectedEntry.chefTrialValidation.chefNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Quality Degradation Curve Q(t) */}
            {selectedEntry.degradationCurve && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    <span>Holding Quality Degradation Curve: Q(t) = Q_0 - ΔQ(t)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Optimal Window: {selectedEntry.degradationCurve.peakWindow}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {selectedEntry.degradationCurve.criticalLossVectors.map((v, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] font-mono text-amber-400 uppercase">{v.vector}</div>
                      <div className="text-zinc-300 text-[11px] mt-0.5">{v.description}</div>
                      <div className="text-[10px] font-mono text-zinc-500 mt-1">Half-life: ~{v.halfLifeMinutes}m</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantified Service Pressure */}
            {selectedEntry.servicePressure && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>Quantified Service Pressure (Wembley Box 4017 Matchday)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Covers:</span>
                    <span className="text-zinc-200 font-bold">{selectedEntry.servicePressure.covers} Covers</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Pass Operators:</span>
                    <span className="text-zinc-200 font-bold">{selectedEntry.servicePressure.operatorsAtPass} Chefs</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Halftime Window:</span>
                    <span className="text-zinc-200 font-bold">{selectedEntry.servicePressure.firingWindowMinutes} Minutes</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Target Plate-Out:</span>
                    <span className="text-amber-300 font-bold">{selectedEntry.servicePressure.targetPlateOutRatePerMin} plates/min</span>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Wembley 4017 Solution */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-700/60 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Wembley Box 4017 Operational Twin Formulation:</span>
              </div>
              <div className="text-sm font-bold text-zinc-100">{selectedEntry.wembleyParallel4017}</div>
              <div className="text-xs text-zinc-300 leading-relaxed font-sans">{selectedEntry.translationDoctrine}</div>
            </div>

            {/* Epistemic Elevation Controls (Chef Authority Gate) */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-700 space-y-3">
              <div className="text-xs font-bold text-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>Chef Authority Elevation Gate (D = &#123;O, H, T, V&#125;)</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Current: {selectedEntry.epistemicState}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handlePromoteEntry(selectedEntry.id, 'O_OBSERVATION', 'Retained as external observation only.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedEntry.epistemicState === 'O_OBSERVATION'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Set as D_O (Observation)
                </button>

                <button
                  onClick={() => handlePromoteEntry(selectedEntry.id, 'H_HYPOTHESIS', 'Accepted as candidate operational hypothesis.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedEntry.epistemicState === 'H_HYPOTHESIS'
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Set as D_H (Hypothesis)
                </button>

                <button
                  onClick={() => handlePromoteEntry(selectedEntry.id, 'T_TRIAL', 'Scheduled for 4017 controlled kitchen test.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedEntry.epistemicState === 'T_TRIAL'
                      ? 'bg-amber-600 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Elevate to D_T (Kitchen Trial)
                </button>

                <button
                  onClick={() => handlePromoteEntry(selectedEntry.id, 'V_VALIDATED_DOCTRINE', 'Chef Rod authorized as 4017 Operating Doctrine under 50-cover matchday conditions.')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedEntry.epistemicState === 'V_VALIDATED_DOCTRINE'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorize as D_V (4017 Doctrine)</span>
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
