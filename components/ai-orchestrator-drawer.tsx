'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { CulinaryTwinProject, OperatingMode } from '@/types/culinary-twin';
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  Bot, 
  User, 
  Copy, 
  Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiOrchestratorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTwin: CulinaryTwinProject;
  activeMode: OperatingMode;
  onInsertHypothesis?: (text: string) => void;
  presetAction?: { actionName: string; promptText: string } | null;
  onClearPresetAction?: () => void;
}

export const AiOrchestratorDrawer: React.FC<AiOrchestratorDrawerProps> = ({
  isOpen,
  onClose,
  currentTwin,
  activeMode,
  presetAction,
  onClearPresetAction,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; action?: string; timestamp: string }[]
  >([
    {
      role: 'assistant',
      text: `Greetings, Chef. I am your Project SIXES Pathfinder Culinary Intelligence Engine.
I can assist with chemical decomposition, thermal modeling, classical lineage tracing, and operational recovery strategies.
*Remember: Models compare and simulate; the Chef decides.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSend = useCallback(async (customPrompt?: string, actionName?: string) => {
    const textToSend = customPrompt || promptInput;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      role: 'user' as const,
      text: textToSend,
      action: actionName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setPromptInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionName || 'Culinary Domain Inquiry',
          prompt: textToSend,
          mode: activeMode,
          twinContext: {
            code: currentTwin.code,
            name: currentTwin.name,
            version: currentTwin.currentVersion,
            status: currentTwin.status,
            componentsCount: currentTwin.components.length,
            componentsSummary: currentTwin.components.map((c) => ({
              name: c.name,
              type: c.type,
              ingredients: c.ingredients.map((i) => `${i.name} (${i.quantity}${i.unit})`),
              transformations: c.transformations.map((t) => `${t.technique} @ ${t.targetTempC}°C`),
            })),
            unresolvedStops: currentTwin.stopConditions.filter((s) => !s.resolved).map((s) => s.title),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.text,
          action: actionName,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ **Pathfinder Intelligence Error:** ${err.message || 'Unable to connect to Gemini API. Please check configuration.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [promptInput, isLoading, activeMode, currentTwin]);

  // Trigger preset action if passed
  useEffect(() => {
    if (presetAction && presetAction.promptText) {
      handleSend(presetAction.promptText, presetAction.actionName);
      if (onClearPresetAction) onClearPresetAction();
    }
  }, [presetAction, handleSend, onClearPresetAction]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getQuickPrompts = () => {
    switch (activeMode) {
      case 'exploration':
        return [
          { label: 'Speculative Flavour Pairing', prompt: `Propose 3 radical speculative flavour pairings and aroma compounds for ${currentTwin.name}.` },
          { label: 'Historical Lineage Trace', prompt: `Trace the classical French and international lineage for ${currentTwin.name} from 19th century to modernist cuisine.` },
          { label: 'Formulate Testable Hypothesis', prompt: `Formulate a testable biochemical hypothesis regarding texture or enzyme activity for ${currentTwin.name}.` },
        ];
      case 'investigation':
        return [
          { label: 'Deconstruct Chemical Kinetics', prompt: `Explain the exact physical and chemical transformation mechanisms occurring in ${currentTwin.name}.` },
          { label: 'Baker’s Ratio Analysis', prompt: `Check moisture loss percentage, salinity balance, and ratio equilibrium across components of ${currentTwin.name}.` },
          { label: 'Identify Critical Control Points', prompt: `Audit all CCPs (temperatures, holding limits, botulinum/pathogen barriers) for ${currentTwin.name}.` },
        ];
      case 'simulation':
        return [
          { label: 'Simulate 80-Cover Rush', prompt: `Simulate an 80-cover dinner rush for ${currentTwin.name}. Predict exact station bottleneck points and pan saturation.` },
          { label: 'Model Thermal Decay Curve', prompt: `Model the core temperature decay and sensory degradation curve over 30 minutes holding for ${currentTwin.name}.` },
          { label: 'Draft Recovery Protocol', prompt: `What is the operational recovery procedure if a component cools below 50°C at pass?` },
        ];
      case 'validation':
        return [
          { label: 'Statutory Allergen Scan', prompt: `Check all ingredients in ${currentTwin.name} against the 14 EU/UK statutory allergens.` },
          { label: 'Resolve Active Stop Condition', prompt: `Review active STOP conditions on ${currentTwin.name} and suggest compliant kitchen resolutions.` },
        ];
      case 'service':
        return [
          { label: 'Line Delay Intervention', prompt: `A table has waited 15 minutes due to a Sauté bottleneck. What immediate recovery action prevents plate compromise?` },
          { label: 'Analyze Observed Variance', prompt: `Actual service core temp was 51.5°C vs 54°C model. Analyze why and suggest revision.` },
        ];
      default:
        return [
          { label: 'General Twin Audit', prompt: `Summarize the current state and readiness of ${currentTwin.name}.` },
        ];
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl text-zinc-100 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Pathfinder Intelligence Engine</h3>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">
                  {activeMode}
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 truncate max-w-sm">
                Focus: {currentTwin.code} • {currentTwin.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Context Action Pills */}
        <div className="p-3 border-b border-zinc-850 bg-zinc-900/40 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          <span className="text-[10px] font-mono text-zinc-500 uppercase whitespace-nowrap pl-1">
            Mode Presets:
          </span>
          {getQuickPrompts().map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.prompt, qp.label)}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 hover:border-amber-500/50 transition"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-1.5 ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 px-1">
                {msg.role === 'user' ? (
                  <>
                    <span>Chef Operator</span>
                    <User className="w-3 h-3 text-amber-400" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-amber-400" />
                    <span>Pathfinder Orchestrator {msg.action ? `[${msg.action}]` : ''}</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs max-w-[90%] space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none prose prose-invert prose-xs max-w-none'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="space-y-2">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80 not-prose">
                      <button
                        onClick={() => handleCopy(msg.text, idx)}
                        className="text-[10px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Response
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Pathfinder compute fabric synthesizing models & evidence...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-2"
        >
          <input
            id="orchestrator-drawer-prompt-input"
            name="orchestratorPrompt"
            type="text"
            placeholder={`Ask Pathfinder Orchestrator in ${activeMode} mode...`}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            suppressHydrationWarning
          />
          <button
            type="submit"
            disabled={!promptInput.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-600 transition shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
