'use client';

import React, { useState } from 'react';
import { CulinaryTwinProject } from '@/types/culinary-twin';
import { formatDateTimeSafe } from '@/lib/utils';
import { 
  History, 
  ShieldCheck, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ChefHat, 
  Lock, 
  GitBranch, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ModeLedgerProps {
  twin: CulinaryTwinProject;
  onNavigateToMode: (mode: any) => void;
}

export const ModeLedger: React.FC<ModeLedgerProps> = ({ twin, onNavigateToMode }) => {
  const [copied, setCopied] = useState(false);
  const [activeLedgerTab, setActiveLedgerTab] = useState<'AUDIT_CHAIN' | 'DECISIONS' | 'REVISIONS' | 'JSON_EXPORT'>('AUDIT_CHAIN');

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(twin, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCertificate = () => {
    const cert = {
      projectTitle: 'PROJECT SIXES — PATHFINDER DIGITAL TWIN CERTIFICATE',
      twinCode: twin.code,
      twinName: twin.name,
      currentVersion: twin.currentVersion,
      governanceStatus: twin.status,
      chefOperator: twin.chefAuthor,
      generatedTimestamp: new Date().toISOString(),
      cryptographicRootHash: twin.auditRecords[0]?.recordHash || '0x000000000000',
      totalAuditBlocks: twin.auditRecords.length,
      totalDecisions: twin.decisions.length,
      statutoryAllergensConfirmed: twin.allergensConfirmed,
      auditChain: twin.auditRecords,
    };

    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${twin.code}-PATHFINDER-AUDIT-CERTIFICATE.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Ledger Doctrine Header */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-amber-950/30 border border-amber-500/30 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 6: Ledger & Provenance
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: IMMUTABLE HISTORICAL LEDGER</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Traceable Provenance, Revisions & Authority Decisions</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            The ledger remembers. Every material transition, Chef sign-off, hypothesis, and service observation is preserved in a cryptographic hash chain.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={handleDownloadCertificate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download Audit Certificate
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-mono">
        {[
          { id: 'AUDIT_CHAIN', label: `Cryptographic Hash Chain (${twin.auditRecords.length})` },
          { id: 'DECISIONS', label: `Chef Decisions (${twin.decisions.length})` },
          { id: 'REVISIONS', label: `Version Revisions (${twin.revisions.length})` },
          { id: 'JSON_EXPORT', label: 'Raw Twin State JSON' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLedgerTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeLedgerTab === tab.id
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Cryptographic Audit Hash Chain */}
      {activeLedgerTab === 'AUDIT_CHAIN' && (
        <div className="space-y-3">
          <div className="text-xs text-zinc-400 font-mono">
            Sequential immutable ledger blocks linked via previous block hash validation:
          </div>

          <div className="space-y-3">
            {twin.auditRecords.map((block, idx) => (
              <div
                key={block.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-mono relative pl-6"
              >
                {/* Visual chain marker */}
                <div className="absolute left-2.5 top-4 bottom-0 w-0.5 bg-amber-500/30" />
                <div className="absolute left-1.5 top-4 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-zinc-950" />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-300 font-bold text-[10px]">
                      BLOCK #{twin.auditRecords.length - idx} • {block.actionType}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {formatDateTimeSafe(block.timestamp)}
                    </span>
                  </div>

                  <span className="text-[10px] text-zinc-400">Actor: {block.actor}</span>
                </div>

                <p className="text-zinc-200 text-xs font-sans leading-relaxed">{block.details}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-zinc-400 pt-1 border-t border-zinc-850">
                  <div className="truncate">
                    <span className="text-zinc-600">Prev Hash: </span>
                    <span className="text-zinc-400">{block.previousHash}</span>
                  </div>
                  <div className="truncate text-right">
                    <span className="text-zinc-600">Record Hash: </span>
                    <span className="text-amber-400 font-bold">{block.recordHash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Chef Decisions Ledger */}
      {activeLedgerTab === 'DECISIONS' && (
        <div className="space-y-4">
          {twin.decisions.map((dec) => (
            <div
              key={dec.id}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-sm">{dec.chefName}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                    ACTION: {dec.action}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500">{formatDateTimeSafe(dec.timestamp)}</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Operator Rationale:</div>
                <p className="text-zinc-200 text-xs leading-relaxed">{dec.rationale}</p>
              </div>

              {dec.acknowledgedUncertainties.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-amber-400">Acknowledged Uncertainties:</div>
                  <ul className="list-disc pl-4 text-[11px] text-zinc-400 space-y-0.5">
                    {dec.acknowledgedUncertainties.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-zinc-850 text-zinc-500">
                <span>Transition: {dec.fromStatus} → {dec.toStatus}</span>
                <span className="text-emerald-400 font-bold">Signature: {dec.digitalSignature}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Version Revisions */}
      {activeLedgerTab === 'REVISIONS' && (
        <div className="space-y-4">
          {twin.revisions.map((rev) => (
            <div key={rev.version} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold text-sm">
                    {rev.version}
                  </span>
                  <span className="text-zinc-400">by {rev.author}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{formatDateTimeSafe(rev.timestamp)}</span>
              </div>
              <p className="text-zinc-300 text-xs">{rev.summary}</p>
              <ul className="list-disc pl-4 text-[11px] text-zinc-400 space-y-0.5 font-mono">
                {rev.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Raw JSON Export */}
      {activeLedgerTab === 'JSON_EXPORT' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Standard Pathfinder Schema JSON Payload:</span>
            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[500px]">
            {JSON.stringify(twin, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
