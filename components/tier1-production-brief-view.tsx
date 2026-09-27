'use client';

import React, { useState, useMemo } from 'react';
import { ProductionBrief, ProductionRecipeSpec } from '@/types/culinary-twin';
import { 
  ClipboardCheck, 
  Flame, 
  Snowflake, 
  Sparkles, 
  ChefHat, 
  ArrowRight, 
  SlidersHorizontal, 
  Layers, 
  Scale, 
  CheckCircle2, 
  Search, 
  Utensils, 
  Info,
  Clock,
  Printer,
  Copy,
  Check
} from 'lucide-react';

interface Tier1ProductionBriefViewProps {
  brief: ProductionBrief;
}

export const Tier1ProductionBriefView: React.FC<Tier1ProductionBriefViewProps> = ({ brief }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceState, setSelectedServiceState] = useState<string>('all');
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coversScale, setCoversScale] = useState<number>(50);
  const [copiedSpecId, setCopiedSpecId] = useState<string | null>(null);

  const scaleFactor = coversScale / 50;

  const categories = useMemo(() => {
    const set = new Set(brief.specs.map(s => s.category));
    return ['all', ...Array.from(set)];
  }, [brief.specs]);

  const serviceStates = ['all', 'Cold-held', 'Hot-held / refreshed', 'Fired / finished to order', 'Last-second garnish'];
  const stations = ['all', 'Garde Manger', 'Sauté', 'Grill/Rotisserie', 'Entremetier', 'Pass'];

  const filteredSpecs = useMemo(() => {
    return brief.specs.filter(spec => {
      if (selectedCategory !== 'all' && spec.category !== selectedCategory) return false;
      if (selectedServiceState !== 'all' && spec.serviceState !== selectedServiceState) return false;
      if (selectedStation !== 'all' && spec.station !== selectedStation) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = spec.name.toLowerCase().includes(query);
        const matchesIng = spec.ingredients.some(i => i.ingredient.toLowerCase().includes(query));
        const matchesMethod = spec.method.some(m => m.toLowerCase().includes(query));
        const matchesStandard = spec.tier1Standard.toLowerCase().includes(query);
        if (!matchesName && !matchesIng && !matchesMethod && !matchesStandard) return false;
      }
      return true;
    });
  }, [brief.specs, selectedCategory, selectedServiceState, selectedStation, searchQuery]);

  const getServiceStateBadge = (state: string) => {
    switch (state) {
      case 'Cold-held':
        return {
          icon: <Snowflake className="w-3.5 h-3.5 text-cyan-400" />,
          style: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
        };
      case 'Hot-held / refreshed':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
          style: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
        };
      case 'Fired / finished to order':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-rose-400" />,
          style: 'bg-rose-950/80 text-rose-300 border-rose-700/60 font-semibold',
        };
      case 'Last-second garnish':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-emerald-400" />,
          style: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
        };
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-zinc-400" />,
          style: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        };
    }
  };

  const scaleQuantity = (qtyStr: string): string => {
    if (scaleFactor === 1) return qtyStr;
    // Attempt to scale numbers followed by kg, g, ml, L, medium, lemons, scallops, leaves
    return qtyStr.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      if (isNaN(num)) return match;
      const scaled = num * scaleFactor;
      return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
    });
  };

  const handleCopySpec = (spec: ProductionRecipeSpec) => {
    const text = `
SPEC: ${spec.name} (${spec.productionTarget})
Station: ${spec.station} | State: ${spec.serviceState}
Tier 1 Standard: ${spec.tier1Standard}
${spec.servicePlateRule ? `Plating: ${spec.servicePlateRule}` : ''}
${spec.positiveDelta ? `Positive Delta: ${spec.positiveDelta}` : ''}

INGREDIENTS (${coversScale} covers):
${spec.ingredients.map(i => `- ${i.ingredient}: ${scaleQuantity(i.quantity)}`).join('\n')}

METHOD:
${spec.method.join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedSpecId(spec.id);
    setTimeout(() => setCopiedSpecId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Doctrine Banner */}
      <div className="rounded-xl bg-gradient-to-r from-amber-950/70 via-zinc-900 to-zinc-950 border border-amber-500/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <ChefHat className="w-48 h-48 text-amber-400" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded bg-amber-500 text-zinc-950 font-mono font-black text-xs tracking-wider uppercase">
                {brief.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono">
                {brief.tier} Working Brief
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
                50 Covers (+10% Buffer)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {brief.title}
            </h2>

            <p className="text-base text-amber-200/90 font-medium italic">
              &ldquo;{brief.operatingDoctrine}&rdquo;
            </p>

            <div className="text-xs font-mono text-zinc-400 flex flex-wrap items-center gap-2 pt-1">
              <span className="text-zinc-500">Primary Standard:</span>
              <span className="text-amber-400 font-bold tracking-wide">{brief.primaryStandard}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Dynamic Cover Scaler */}
            <div className="flex items-center gap-2 bg-zinc-900/90 p-2 rounded-lg border border-zinc-700">
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-zinc-400 font-mono">Scale Covers:</span>
              <select
                id="tier1-covers-scale-select"
                name="coversScale"
                autoComplete="off"
                data-lpignore="true"
                suppressHydrationWarning
                value={coversScale}
                onChange={(e) => setCoversScale(Number(e.target.value))}
                className="bg-zinc-800 text-amber-300 font-mono text-xs font-bold px-2 py-1 rounded border border-zinc-600 focus:outline-none focus:border-amber-500"
              >
                <option value={25}>25 covers (0.5x)</option>
                <option value={50}>50 covers (1.0x standard)</option>
                <option value={75}>75 covers (1.5x)</option>
                <option value={100}>100 covers (2.0x)</option>
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium transition"
              title="Print production specs"
            >
              <Printer className="w-4 h-4 text-zinc-300" />
              <span className="hidden sm:inline">Print Specs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 1 Service Doctrine: The 7 Pillars */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" />
            <span>1. Tier 1 Service Doctrine (Standard of the Pass)</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-500">Non-negotiable operational laws</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {brief.tier1DoctrineRules.map((rule, idx) => (
            <div 
              key={idx} 
              className="p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-500/40 transition-colors flex items-start gap-3 text-xs text-zinc-300 leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-200">Rule {idx + 1}: </span>
                {rule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positive Deltas Architecture */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            <span>Positive Delta: Evolution to Service Architecture</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-500">Traditional Indian Menu → Tier 1 SIXES Engineering</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {brief.positiveDeltas.map((delta, i) => (
            <div key={i} className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between text-xs space-y-2">
              <div className="text-zinc-500 line-through text-[11px] font-mono">{delta.from}</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                <span>{delta.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service-State Station Checklist & Pass Rule */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>2. Service-State Checklist & Station Deployment</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-500">Strict temperature & timing segregation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {brief.serviceStateChecklist.map((item, idx) => {
            const badge = getServiceStateBadge(item.state);
            return (
              <div key={idx} className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2">
                  {badge.icon}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${badge.style}`}>
                    {item.state}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                  {item.componentsAndRules}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pass Rule Banner */}
        <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-600/40 flex items-center gap-3 text-xs text-amber-200">
          <ChefHat className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold tracking-wide uppercase text-amber-300 mr-2">PASS RULE:</span>
            <span>{brief.passRule}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="tier1-brief-search-input"
              name="tier1-brief-search"
              type="text"
              placeholder="Search recipes, ingredients, techniques, standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              suppressHydrationWarning
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            {/* Service State Filter */}
            <select
              id="tier1-service-state-select"
              name="serviceStateFilter"
              autoComplete="off"
              data-lpignore="true"
              suppressHydrationWarning
              value={selectedServiceState}
              onChange={(e) => setSelectedServiceState(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Service States</option>
              {serviceStates.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Station Filter */}
            <select
              id="tier1-station-filter-select"
              name="stationFilter"
              autoComplete="off"
              data-lpignore="true"
              suppressHydrationWarning
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Stations</option>
              {stations.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              id="tier1-category-filter-select"
              name="categoryFilter"
              autoComplete="off"
              data-lpignore="true"
              suppressHydrationWarning
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500 capitalize"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/60">
          <span>Showing {filteredSpecs.length} of {brief.specs.length} Tier 1 component recipes</span>
          {scaleFactor !== 1 && (
            <span className="text-amber-400 font-semibold">Scaled for {coversScale} covers ({scaleFactor}x base recipe)</span>
          )}
        </div>
      </div>

      {/* Recipe Specs Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSpecs.map((spec) => {
          const stateBadge = getServiceStateBadge(spec.serviceState);

          return (
            <div
              key={spec.id}
              className={`rounded-xl bg-zinc-900 border transition-all duration-200 overflow-hidden flex flex-col ${
                spec.isReferenceOnly 
                  ? 'border-dashed border-zinc-700/80 opacity-90' 
                  : 'border-zinc-800 hover:border-zinc-700 shadow-lg'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 bg-zinc-950/70 border-b border-zinc-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {spec.station}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${stateBadge.style}`}>
                      {stateBadge.icon}
                      <span>{spec.serviceState}</span>
                    </span>
                    {spec.isReferenceOnly && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                        Reference Only (For Adam)
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    <span>{spec.name}</span>
                  </h4>
                  <div className="text-xs font-mono text-amber-400/90 font-medium">
                    Target: {spec.productionTarget}
                  </div>
                </div>

                <button
                  onClick={() => handleCopySpec(spec)}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition border border-zinc-700"
                  title="Copy recipe spec"
                >
                  {copiedSpecId === spec.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4 flex-1">
                {/* Ingredients Table */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Ingredients ({coversScale} covers)</span>
                    <span className="text-[10px] text-zinc-500">{spec.ingredients.length} items</span>
                  </div>
                  <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-950/40">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-900/80 text-zinc-400 font-mono text-[10px] border-b border-zinc-800">
                        <tr>
                          <th className="px-3 py-1.5">Ingredient</th>
                          <th className="px-3 py-1.5 text-right">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850">
                        {spec.ingredients.map((ing, i) => (
                          <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                            <td className="px-3 py-1.5 text-zinc-300 font-medium">{ing.ingredient}</td>
                            <td className="px-3 py-1.5 text-right font-mono text-amber-300/90">
                              {scaleQuantity(ing.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Method */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Method & Execution
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-300">
                    {spec.method.map((step, sIdx) => (
                      <div key={sIdx} className="p-2 rounded bg-zinc-950/50 border border-zinc-850/60 leading-relaxed font-mono">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 1 Standard Box */}
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/40 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tier 1 Standard</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    {spec.tier1Standard}
                  </p>
                </div>

                {/* Service / Plating Rule */}
                {spec.servicePlateRule && (
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                    <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Service / Plating Architecture</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                      {spec.servicePlateRule}
                    </p>
                  </div>
                )}

                {/* Positive Delta */}
                {spec.positiveDelta && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-700/40 space-y-1">
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      <span>Positive Delta</span>
                    </div>
                    <p className="text-xs text-cyan-200/90 leading-relaxed">
                      {spec.positiveDelta}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
