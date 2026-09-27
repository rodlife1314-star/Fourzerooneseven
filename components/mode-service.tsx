'use client';

import React, { useState, useEffect } from 'react';
import { 
  CulinaryTwinProject, 
  LiveTicket, 
  ServiceObservation 
} from '@/types/culinary-twin';
import { 
  Flame, 
  Clock, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Play, 
  RotateCcw, 
  Send, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  FileSpreadsheet
} from 'lucide-react';
import { generateHash, formatTimeSafe } from '@/lib/utils';

interface ModeServiceProps {
  twin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onNavigateToMode: (mode: any) => void;
  onTriggerAiAction: (actionName: string, promptText: string) => void;
}

export const ModeService: React.FC<ModeServiceProps> = ({
  twin,
  onUpdateTwin,
  onNavigateToMode,
  onTriggerAiAction,
}) => {
  // Live ticker for countdown timers
  const [seconds, setSeconds] = useState(0);

  // New Observation form state
  const [isLoggingObs, setIsLoggingObs] = useState(false);
  const [obsStation, setObsStation] = useState('Pass');
  const [obsMetricType, setObsMetricType] = useState<'temperature' | 'yield' | 'timing' | 'sensory' | 'waste' | 'recovery'>('temperature');
  const [obsTargetVal, setObsTargetVal] = useState('54.0°C core');
  const [obsActualVal, setObsActualVal] = useState('');
  const [obsNotes, setObsNotes] = useState('');
  const [obsVariance, setObsVariance] = useState('');

  // Add Ticket state
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [newTableNo, setNewTableNo] = useState('Table 9');
  const [newCovers, setNewCovers] = useState(2);
  const [newDietary, setNewDietary] = useState('');

  // Timer interval for real-time kitchen feel
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFireTicket = (ticketId: string) => {
    onUpdateTwin((prev) => ({
      ...prev,
      activeTickets: prev.activeTickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'FIRING',
              fireTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              stationProgress: t.stationProgress.map((sp) => ({
                ...sp,
                status: 'firing',
                timerRemainingSec: sp.station === 'Sauté' ? 360 : 480,
              })),
            }
          : t
      ),
    }));
  };

  const handleBumpStation = (ticketId: string, stationName: string) => {
    onUpdateTwin((prev) => ({
      ...prev,
      activeTickets: prev.activeTickets.map((t) => {
        if (t.id !== ticketId) return t;
        const updatedProgress = t.stationProgress.map((sp) =>
          sp.station === stationName ? { ...sp, status: 'plated' as const, timerRemainingSec: 0 } : sp
        );
        const allPlated = updatedProgress.every((sp) => sp.status === 'plated');
        return {
          ...t,
          stationProgress: updatedProgress,
          status: allPlated ? ('AT_PASS' as const) : t.status,
        };
      }),
    }));
  };

  const handleDispatchTicket = (ticketId: string) => {
    onUpdateTwin((prev) => ({
      ...prev,
      activeTickets: prev.activeTickets.map((t) =>
        t.id === ticketId ? { ...t, status: 'DISPATCHED' as const } : t
      ),
    }));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTkt: LiveTicket = {
      id: `tkt-${Date.now()}`,
      tableNumber: newTableNo.trim(),
      covers: newCovers,
      course: 'Main',
      dietaries: newDietary.trim() ? [newDietary.trim()] : [],
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stationProgress: [
        { station: 'Sauté', status: 'pending', timerRemainingSec: 600 },
        { station: 'Pass', status: 'pending', timerRemainingSec: 900 },
      ],
      status: 'QUEUED',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      activeTickets: [newTkt, ...prev.activeTickets],
    }));

    setNewTableNo('');
    setNewDietary('');
    setIsAddingTicket(false);
  };

  const handleLogObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsActualVal.trim()) return;

    const obs: ServiceObservation = {
      id: `obs-${Date.now()}`,
      timestamp: new Date().toISOString(),
      station: obsStation,
      metricType: obsMetricType,
      targetValue: obsTargetVal,
      actualObservedValue: obsActualVal.trim(),
      variance: obsVariance.trim() || 'Observed live variance recorded',
      notes: obsNotes.trim(),
      recordedBy: twin.chefAuthor,
    };

    onUpdateTwin((prev) => ({
      ...prev,
      serviceObservations: [obs, ...prev.serviceObservations],
      auditRecords: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: prev.chefAuthor,
          actionType: 'SERVICE_VARIANCE_RECORDED',
          details: `Service Observation [${obsStation} - ${obsMetricType}]: Target ${obsTargetVal} vs Actual ${obsActualVal}. Variance: ${obsVariance}`,
          previousHash: prev.auditRecords[0]?.recordHash || '0x000000000000',
          recordHash: generateHash(`OBS-${obs.id}`),
          modeAtTime: 'service',
        },
        ...prev.auditRecords,
      ],
    }));

    setObsActualVal('');
    setObsNotes('');
    setObsVariance('');
    setIsLoggingObs(false);
  };

  return (
    <div className="space-y-6">
      {/* Service Doctrine Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-indigo-950/40 border border-indigo-500/40 text-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Mode 5: Live Service & KDS Pass
            </span>
            <span className="text-xs text-zinc-400 font-mono">Governance: OPERATIONAL COMMITTED</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Real-Time Kitchen Display & Service Observation Feedback</h2>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Service is where the digital twin encounters physical reality. Actual temperatures, timings, and yields return to the system as observations rather than being rewritten to match the model.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => onTriggerAiAction('Service Recovery Protocol', `An unexpected delay of 6 minutes occurred on the Sauté station for Table 12. Suggest immediate recovery protocol for the resting duck crown to prevent fat seizure without overcooking core.`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-indigo-300 text-xs font-medium border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Service Recovery
          </button>
          <button
            onClick={() => onNavigateToMode('ledger')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
          >
            View Immutable Ledger
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main KDS Grid (8 cols) & Observation Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Kitchen Display System Tickets (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Live Pass & KDS Rail ({twin.activeTickets.filter(t => t.status !== 'DISPATCHED').length} Active)
              </h3>
            </div>

            <button
              onClick={() => setIsAddingTicket(!isAddingTicket)}
              className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Fire Walk-In Ticket
            </button>
          </div>

          {/* New Ticket Form */}
          {isAddingTicket && (
            <form onSubmit={handleCreateTicket} className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl space-y-2 text-xs">
              <div className="font-mono text-zinc-300 font-bold uppercase">New Order Ticket</div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Table (e.g. Table 6)"
                  value={newTableNo}
                  onChange={(e) => setNewTableNo(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <input
                  type="number"
                  placeholder="Covers"
                  value={newCovers}
                  onChange={(e) => setNewCovers(parseInt(e.target.value))}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <input
                  type="text"
                  placeholder="Dietary (e.g. Celery Allergy)"
                  value={newDietary}
                  onChange={(e) => setNewDietary(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingTicket(false)}
                  className="text-zinc-400 hover:text-zinc-200 px-2 py-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-0.5 rounded"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          )}

          {/* Tickets Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {twin.activeTickets.map((tkt) => {
              const isDispatched = tkt.status === 'DISPATCHED';
              return (
                <div
                  key={tkt.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    isDispatched
                      ? 'bg-zinc-950/40 border-zinc-850 opacity-60'
                      : tkt.status === 'AT_PASS'
                      ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-lg'
                      : tkt.status === 'FIRING'
                      ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/40 shadow-md'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  {/* Ticket Header */}
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{tkt.tableNumber}</span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                        {tkt.covers} covers
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        tkt.status === 'AT_PASS'
                          ? 'bg-emerald-500 text-zinc-950'
                          : tkt.status === 'FIRING'
                          ? 'bg-amber-500 text-zinc-950 animate-pulse'
                          : tkt.status === 'DISPATCHED'
                          ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {tkt.status}
                    </span>
                  </div>

                  {/* Dietary flags */}
                  {tkt.dietaries.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tkt.dietaries.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-700 text-[10px] font-mono font-bold"
                        >
                          ⚠️ {d}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Station countdown rails */}
                  <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                    {tkt.stationProgress.map((sp) => (
                      <div key={sp.station} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              sp.status === 'plated'
                                ? 'bg-emerald-400'
                                : sp.status === 'firing'
                                ? 'bg-amber-400 animate-ping'
                                : 'bg-zinc-600'
                            }`}
                          />
                          {sp.station} Station
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-zinc-400">{sp.status.toUpperCase()}</span>
                          {sp.status !== 'plated' && tkt.status !== 'DISPATCHED' && (
                            <button
                              onClick={() => handleBumpStation(tkt.id, sp.station)}
                              className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition"
                            >
                              Bump
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
                    <div className="text-[10px] font-mono text-zinc-500">
                      In: {tkt.orderTime} {tkt.fireTime ? `• Fired: ${tkt.fireTime}` : ''}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {tkt.status === 'QUEUED' && (
                        <button
                          onClick={() => handleFireTicket(tkt.id)}
                          className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold font-mono transition shadow flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-current" /> Fire
                        </button>
                      )}
                      {tkt.status === 'AT_PASS' && (
                        <button
                          onClick={() => handleDispatchTicket(tkt.id)}
                          className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold font-mono transition shadow flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Dispatch to Floor
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Service Observations & Variance Feedback (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400" />
              Service Observations ({twin.serviceObservations.length})
            </h3>
            <button
              onClick={() => setIsLoggingObs(!isLoggingObs)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Log Reality
            </button>
          </div>

          {/* Add Observation Form */}
          {isLoggingObs && (
            <form onSubmit={handleLogObservation} className="p-3 bg-zinc-900 border border-indigo-900/60 rounded-xl space-y-2 text-xs">
              <div className="font-mono text-indigo-300 font-bold uppercase">Log Kitchen Reality</div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={obsStation}
                  onChange={(e) => setObsStation(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200 text-xs"
                >
                  <option value="Pass">Pass / Carving</option>
                  <option value="Sauté">Sauté / Grill</option>
                  <option value="Garde Manger">Garde Manger</option>
                  <option value="Pastry">Pastry</option>
                </select>
                <select
                  value={obsMetricType}
                  onChange={(e: any) => setObsMetricType(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200 text-xs"
                >
                  <option value="temperature">Core Temperature</option>
                  <option value="yield">Yield / Trim Weight</option>
                  <option value="timing">Ticket Timing Delay</option>
                  <option value="sensory">Sensory Texture/Flavor</option>
                  <option value="waste">Wastage Event</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Target Model Value"
                  value={obsTargetVal}
                  onChange={(e) => setObsTargetVal(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
                <input
                  type="text"
                  placeholder="Actual Observed Value"
                  required
                  value={obsActualVal}
                  onChange={(e) => setObsActualVal(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
              </div>

              <input
                type="text"
                placeholder="Observed Variance (e.g. +1.8°C higher than model)"
                value={obsVariance}
                onChange={(e) => setObsVariance(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
              />

              <textarea
                rows={2}
                placeholder="Notes on physical conditions, cause of drift..."
                value={obsNotes}
                onChange={(e) => setObsNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsLoggingObs(false)}
                  className="text-zinc-400 hover:text-zinc-200 px-2 py-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-0.5 rounded"
                >
                  Record Observation
                </button>
              </div>
            </form>
          )}

          {/* Observations List */}
          <div className="space-y-3">
            {twin.serviceObservations.map((obs) => (
              <div
                key={obs.id}
                className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-indigo-300 text-[10px] uppercase font-bold">
                    {obs.station} • {obs.metricType}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {formatTimeSafe(obs.timestamp)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-850">
                    <span className="text-zinc-500 block text-[10px]">Model Target:</span>
                    <span className="text-zinc-300 font-medium">{obs.targetValue}</span>
                  </div>
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-850">
                    <span className="text-zinc-500 block text-[10px]">Actual Reality:</span>
                    <span className="text-amber-400 font-bold">{obs.actualObservedValue}</span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-300">
                  <strong className="font-mono text-zinc-400">Variance:</strong> {obs.variance}
                </div>

                {obs.notes && <p className="text-[11px] text-zinc-400 italic">{obs.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
