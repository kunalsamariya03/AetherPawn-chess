import React from 'react';
import { Palette } from 'lucide-react';
import { BOARD_THEMES, PIECE_STYLES } from '../data/themes.js';

export default function ThemeSelector({ settings, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/70 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Palette size={15} className="text-brass-400" />
        <h3 className="font-display text-lg tracking-wide">Table &amp; Set</h3>
      </div>

      <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted">Board</p>
      <div className="mb-4 grid grid-cols-1 gap-1.5">
        {Object.values(BOARD_THEMES).map((t) => (
          <button
            key={t.id}
            onClick={() => onChange({ boardTheme: t.id })}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
              settings.boardTheme === t.id
                ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                : 'border-white/10 text-parchment/80 hover:bg-white/5'
            }`}
          >
            <span>{t.label}</span>
            <span className="text-[11px] text-muted">{t.blurb}</span>
          </button>
        ))}
      </div>

      <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted">Pieces</p>
      <div className="grid grid-cols-1 gap-1.5">
        {Object.values(PIECE_STYLES).map((p) => (
          <button
            key={p.id}
            onClick={() => onChange({ pieceStyle: p.id })}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
              settings.pieceStyle === p.id
                ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                : 'border-white/10 text-parchment/80 hover:bg-white/5'
            }`}
          >
            <span>{p.label}</span>
            <span className="text-[11px] text-muted">{p.blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
