'use client';

import React, { useState } from 'react';
import { 
  TeachingEdition4017, 
  TeachingChapter 
} from '@/lib/teaching-edition-4017';
import { 
  BookOpen, 
  Flame, 
  Target, 
  Sparkles, 
  Layers, 
  Feather, 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  Scale, 
  Dna, 
  HelpCircle, 
  Award,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface Tier1TeachingEditionViewProps {
  edition: TeachingEdition4017;
}

export function Tier1TeachingEditionView({ edition }: Tier1TeachingEditionViewProps) {
  const [selectedChapterNum, setSelectedChapterNum] = useState<string>('I');
  const [activeDomain, setActiveDomain] = useState<'USA Football' | 'Indian' | 'French' | 'Caribbean' | 'Japanese'>(
    edition.title.includes('Football') || edition.subtitle.includes('Football') ? 'USA Football' : 'Indian'
  );
  const [copiedChapter, setCopiedChapter] = useState(false);
  const [activeSubView, setActiveSubView] = useState<'chapters' | 'helix' | 'arc' | 'doctrine'>('chapters');

  const currentChapter = edition.chapters.find(c => c.number === selectedChapterNum) || edition.chapters[0];

  const handleCopyChapter = (ch: TeachingChapter) => {
    const text = `4017 PROJECT SIXES — CHAPTER ${ch.number}: ${ch.title}
${ch.subtitle}
Arc Stage: ${ch.arcTheme} — ${ch.arcSummary}

1. IDENTITY:
${ch.identity}

2. THE "WHY" & ORIGIN:
${ch.why}

3. LAROUSSE LENS:
${ch.larousse}

4. ESCOFFIER LENS:
${ch.escoffier}

5. 4017 EDGE (95/5):
FIXED (95%):
${ch.edgeFixed}
ADAPTIVE (5%):
${ch.edgeAdaptive}

6. GEOMETRY:
${ch.geometry}

7. PALATE CONCLUSION:
${ch.palateConclusion}

8. TEACHING QUESTIONS:
${ch.questions.map(q => `• ${q}`).join('\n')}

9. POSITIVE DELTA:
${ch.positiveDelta}
`;
    navigator.clipboard.writeText(text);
    setCopiedChapter(true);
    setTimeout(() => setCopiedChapter(false), 2000);
  };

  const getArcIcon = (theme: string) => {
    switch (theme) {
      case 'Fire': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'Precision': return <Target className="w-4 h-4 text-emerald-400" />;
      case 'Comfort': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Depth': return <Layers className="w-4 h-4 text-purple-400" />;
      case 'Release': return <Feather className="w-4 h-4 text-cyan-400" />;
      case 'Resolution': return <Award className="w-4 h-4 text-lime-400" />;
      default: return <BookOpen className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header & Master Doctrine */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                4017 SKELETON
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-zinc-300 bg-zinc-800 border border-zinc-700">
                Tier 1 Teaching Architecture
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60">
                Domain: D_{activeDomain}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> C₀ Coordinate Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100 uppercase">
              {edition.title} — Six-Chapter Teaching Edition
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              {edition.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyChapter(currentChapter)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition"
              title="Copy current chapter specification to clipboard"
            >
              {copiedChapter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copiedChapter ? 'Chapter Copied' : 'Copy Chapter'}</span>
            </button>
          </div>
        </div>

        {/* Operating Doctrine Banner */}
        <div className="mt-5 p-4 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-zinc-300">
          <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span>Operating Doctrine</span>
          </div>
          <p className="italic text-zinc-300 leading-relaxed font-sans">
            &ldquo;{edition.operatingDoctrine}&rdquo;
          </p>
          <div className="mt-2 pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-amber-300/80">
            <span>Primary Equation: <code className="text-amber-200 bg-amber-900/40 px-1.5 py-0.5 rounded">{edition.epistemicFormula}</code></span>
            <span>Invariant Skeleton: <code className="text-amber-200 bg-amber-900/40 px-1.5 py-0.5 rounded">S_4017 = &#123;heritage, why, technique, geometry, refinement, service, reflection&#125;</code></span>
          </div>
        </div>

        {/* Sub-navigation Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveSubView('chapters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeSubView === 'chapters'
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Six Chapters (I to VI)</span>
            </button>

            <button
              onClick={() => setActiveSubView('helix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeSubView === 'helix'
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>4017 Double Helix & Domain Engine</span>
            </button>

            <button
              onClick={() => setActiveSubView('arc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeSubView === 'arc'
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Menu Arc Movement</span>
            </button>

            <button
              onClick={() => setActiveSubView('doctrine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeSubView === 'doctrine'
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Starting Coordinate C₀ & Provenance</span>
            </button>
          </div>

          {/* Real-time Domain Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Domain Switch:</span>
            {(['USA Football', 'Indian', 'French', 'Caribbean', 'Japanese'] as const).map(dom => (
              <button
                key={dom}
                onClick={() => setActiveDomain(dom)}
                className={`px-2 py-1 rounded text-xs font-mono transition ${
                  activeDomain === dom
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/60 font-bold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700'
                }`}
              >
                D_{dom}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: SIX CHAPTERS DEEP DIVE */}
      {activeSubView === 'chapters' && (
        <div className="space-y-6">
          {/* Chapter Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {edition.chapters.map(ch => {
              const isSelected = ch.number === selectedChapterNum;
              return (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapterNum(ch.number)}
                  className={`p-3 rounded-xl text-left border transition relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-800 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        Ch. {ch.number}
                      </span>
                      <div className="flex items-center gap-1">
                        {getArcIcon(ch.arcTheme)}
                        <span className="text-[10px] font-mono text-zinc-400">{ch.arcTheme}</span>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-100 line-clamp-1">
                      {ch.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2 line-clamp-1 font-mono">
                    {ch.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Sheet */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl space-y-6">
            {/* Chapter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    CHAPTER {currentChapter.number}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {getArcIcon(currentChapter.arcTheme)}
                    <span>Arc Stage: {currentChapter.arcTheme}</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100 mt-2 uppercase">
                  {currentChapter.title}
                </h3>
                <p className="text-sm font-mono text-amber-400/90 mt-0.5">
                  {currentChapter.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400 block">Arc Function</span>
                <span className="text-xs text-zinc-200 max-w-xs block font-sans">
                  {currentChapter.arcSummary}
                </span>
              </div>
            </div>

            {/* 1. Beginning & Origin */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Beginning — Identity & Palette Recognition</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.identity}
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Origin — The Why</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.why}
                </p>
              </div>
            </div>

            {/* 2. Classical Technical Lenses: Larousse & Escoffier */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Larousse Lens — Canonical Ingredient Truth</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.larousse}
                </p>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Escoffier Lens — Operational Control & Brigade Order</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.escoffier}
                </p>
              </div>
            </div>

            {/* 3. 4017 Edge 95/5 Breakdown */}
            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-950/80">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-100 font-mono">
                    4017 Edge — 95 / 5 Operational Discipline
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  Acceleration ≠ Authority
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-2 uppercase">
                    95% Fixed — Non-Negotiable
                  </span>
                  <div className="text-xs text-zinc-300 space-y-1 whitespace-pre-line font-sans">
                    {currentChapter.edgeFixed}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-xs font-mono font-bold text-emerald-400 block mb-2 uppercase">
                    5% Adaptive — Chef Discretion
                  </span>
                  <div className="text-xs text-zinc-300 space-y-1 whitespace-pre-line font-sans">
                    {currentChapter.edgeAdaptive}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Geometry & Palate Resolution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  <span>Geometry & Visual Hierarchy</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.geometry}
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Palate Sequence & Flavor Resolution</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                  {currentChapter.palateConclusion}
                </p>
              </div>
            </div>

            {/* 5. Teaching Questions (Every Chef Must Answer) */}
            <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  Pre-Service Epistemic Examination — Teaching Questions
                </h4>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Before any cook plates this course, they must be able to articulate the reasoning behind each parameter:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentChapter.questions.map((q, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-zinc-900/90 border border-amber-900/40 text-xs text-zinc-200 flex items-start gap-2">
                    <span className="font-mono text-amber-400 font-bold text-[11px] mt-0.5">Q{idx + 1}.</span>
                    <span className="font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Positive Delta Transformation */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-emerald-400 mb-2 uppercase">
                <Award className="w-4 h-4" />
                <span>Positive Delta (Δ⁺) Transformation</span>
              </div>
              <div className="text-zinc-300 whitespace-pre-line leading-relaxed font-sans">
                {currentChapter.positiveDelta}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 4017 DOUBLE HELIX & DOMAIN ENGINE */}
      {activeSubView === 'helix' && (
        <div className="space-y-6">
          {/* Theoretical Breakdown Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Dna className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-100 font-mono">
                The 4017 Double Helix: H_4017(D) = P(θ) ⊕ T(θ)
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Chef Rod and Alice identified that 4017 does not run isolated recipes. The culinary domain/menu serves as the central axis, while the <strong>Production Brief (P)</strong> and the <strong>Teaching Layer (T)</strong> wrap around it as two coupled, phase-linked strands.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1 uppercase">
                  Central Axis: Domain (D)
                </span>
                <p className="text-xs text-zinc-400">
                  The cultural domain provides identity, ingredient heritage, and authentic spice logic (e.g., D_Indian).
                </p>
                <div className="mt-3 font-mono text-[11px] text-amber-300/90 bg-zinc-900 p-2 rounded border border-zinc-800">
                  D_active = {activeDomain}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono font-bold text-emerald-400 block mb-1 uppercase">
                  Strand 1: Production Brief (P)
                </span>
                <p className="text-xs text-zinc-400">
                  Answers: <em>&ldquo;How do we execute this across 50 covers?&rdquo;</em> Grammages, prep targets, holding states, MEP, thermal windows.
                </p>
                <div className="mt-3 font-mono text-[11px] text-emerald-300/90 bg-zinc-900 p-2 rounded border border-zinc-800">
                  P_θ = 17 Specs | 50 Covers + 10%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono font-bold text-purple-400 block mb-1 uppercase">
                  Strand 2: Teaching Layer (T)
                </span>
                <p className="text-xs text-zinc-400">
                  Answers: <em>&ldquo;Why does this technique exist?&rdquo;</em> Larousse lens, Escoffier control, 95/5 edge, geometry, palate journey.
                </p>
                <div className="mt-3 font-mono text-[11px] text-purple-300/90 bg-zinc-900 p-2 rounded border border-zinc-800">
                  T_θ = Six-Chapter Pedagogical Arc
                </div>
              </div>
            </div>

            {/* Expression Layer & Recursive Feedback Coupling */}
            <div className="mt-6 p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
              <h4 className="font-mono font-bold uppercase text-zinc-200 mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Recursive Feedback Coupling & Real-Time Emergence</span>
              </h4>
              <div className="p-3 bg-zinc-900 rounded font-mono text-amber-400 border border-zinc-800 mb-3">
                {edition.couplingEquation}
              </div>
              <p className="text-zinc-400 leading-relaxed">
                During live service, feedback from the pass (F) does not disappear into kitchen noise. It actively triggers deltas in both the Production Brief (ΔP, e.g. pan staging recovery) and the Teaching Layer (ΔT, e.g. explaining why acid balance needs tighter margin in humid weather). The twin updates recursively: (P_n+1, T_n+1) = (P_n, T_n) + Δ(F_n).
              </p>
            </div>
          </div>

          {/* Epistemic Authority Hierarchy */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-100 font-mono mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>The 4-Tier Epistemic Authority Stack</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {edition.epistemicHierarchy.map((tier, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-amber-400 font-bold">LEVEL 0{idx + 1}</span>
                      <span className="text-[10px] font-mono text-zinc-500">Tier {idx + 1}</span>
                    </div>
                    <h5 className="text-sm font-bold text-zinc-100 mb-1">{tier.authority}</h5>
                    <span className="text-xs font-mono text-amber-400/90 block mb-2">{tier.role}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans mt-2 pt-2 border-t border-zinc-850">
                    {tier.principle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MENU ARC MOVEMENT */}
      {activeSubView === 'arc' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-100 font-mono">
                The Six-Chapter Arc: Fire → Precision → Comfort → Depth → Release → Resolution
              </h3>
            </div>
            <p className="text-sm text-zinc-400 max-w-3xl">
              The dishes form one continuous narrative movement. The guest experiences a deliberate emotional and gustatory progression from initial char to structural resolution.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {edition.menuArc.map((arc, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition cursor-pointer"
                  onClick={() => {
                    setSelectedChapterNum(arc.chapterNumber);
                    setActiveSubView('chapters');
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-amber-400 border border-zinc-700">
                      Ch. {arc.chapterNumber}
                    </span>
                    <div className="flex items-center gap-1">
                      {getArcIcon(arc.stage)}
                      <span className="text-xs font-mono font-bold text-zinc-200">{arc.stage}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-100 mb-1">{arc.dish}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{arc.description}</p>
                  <div className="mt-3 pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-amber-400 font-mono">
                    <span>Inspect Chapter</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: STARTING COORDINATE C0 & PROVENANCE */}
      {activeSubView === 'doctrine' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-100 font-mono">
                Starting Coordinate C₀: (t₀, x₀, a₀, o₀)
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Project SIXES stopped being an abstract theoretical conversation and anchored directly to the physical world as a verified operational artifact. Every future adjustment is a verifiable delta from this coordinate: C_(n+1) = C_n + Δ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Origin Parameters
                </span>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-zinc-500 font-mono block">Timestamp (t₀):</span>
                    <span className="text-zinc-200 font-mono">{edition.startingCoordinate.t0}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono block">Human Actors (a₀):</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {edition.startingCoordinate.actors.map((actor, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono block">Cryptographic Hash:</span>
                    <span className="text-[11px] text-emerald-400 font-mono break-all">{edition.startingCoordinate.verificationHash}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Operational Outcome (o₀)
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {edition.startingCoordinate.operationalOutcome}
                </p>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-400">
                  <span className="font-mono text-amber-400 font-bold block mb-1">State Transition Rule:</span>
                  If next week Harry modifies a course, Adam assigns station ownership, or the menu moves to live service, those are not isolated events; they are state transitions from this known origin.
                </div>
              </div>
            </div>

            {/* Invariant Skeleton Doctrine */}
            <div className="mt-6 pt-5 border-t border-zinc-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                The 11 Invariant Pillars of the 4017 Skeleton
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {edition.skeletonDoctrine.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono">
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
