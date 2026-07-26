import React, { useEffect, useRef, useState } from 'react';
import { Timer, TimerOff } from 'lucide-react';

function format(seconds) {
  const m = Math.max(0, Math.floor(seconds / 60));
  const s = Math.max(0, Math.floor(seconds % 60));
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ClockPanel({ enabled, onToggle, minutes, turn, isGameOver, resetSignal, onTimeUp }) {
  const [times, setTimes] = useState({ w: minutes * 60, b: minutes * 60 });
  const tickRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  // Reset the clocks whenever a new game starts or the configured minutes change
  useEffect(() => {
    setTimes({ w: minutes * 60, b: minutes * 60 });
  }, [minutes, resetSignal]);

  useEffect(() => {
    if (!enabled || isGameOver) return undefined;

    tickRef.current = setInterval(() => {
      setTimes((prev) => {
        const next = { ...prev, [turn]: Math.max(0, prev[turn] - 1) };
        if (next[turn] === 0) {
          onTimeUpRef.current?.(turn === 'w' ? 'b' : 'w');
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(tickRef.current);
  }, [enabled, isGameOver, turn]);

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {enabled ? <Timer size={15} className="text-brass-400" /> : <TimerOff size={15} className="text-muted" />}
          <h3 className="font-display text-lg tracking-wide">Clocks</h3>
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            enabled ? 'bg-brass-500/20 text-brass-300' : 'bg-white/5 text-muted'
          }`}
        >
          {enabled ? 'On' : 'Off'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`rounded-xl border px-3 py-2 text-center font-mono text-lg transition ${
            enabled && turn === 'w' && !isGameOver
              ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
              : 'border-white/10 text-parchment/70'
          }`}
        >
          {format(times.w)}
          <div className="text-[10px] uppercase tracking-widest text-muted">White</div>
        </div>
        <div
          className={`rounded-xl border px-3 py-2 text-center font-mono text-lg transition ${
            enabled && turn === 'b' && !isGameOver
              ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
              : 'border-white/10 text-parchment/70'
          }`}
        >
          {format(times.b)}
          <div className="text-[10px] uppercase tracking-widest text-muted">Black</div>
        </div>
      </div>
    </div>
  );
}
