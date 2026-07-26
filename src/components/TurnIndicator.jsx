import React from 'react';
import { Crown } from 'lucide-react';
import { BOARD_THEMES } from '../data/themes.js';

export default function TurnIndicator({ turn, status, boardTheme }) {
  const theme = BOARD_THEMES[boardTheme];
  const isWhite = turn === 'w';

  let label = `${isWhite ? 'White' : 'Black'}'s turn`;
  if (status.isCheckmate) label = `Checkmate — ${status.winner === 'w' ? 'White' : 'Black'} wins`;
  else if (status.isStalemate) label = 'Stalemate — draw';
  else if (status.isDraw) label = 'Draw';
  else if (status.isCheck) label = `${isWhite ? 'White' : 'Black'} is in check`;

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-800/80 px-5 py-4 ${theme.accentGlow} animate-floatIn`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${
          isWhite ? 'bg-parchment/95 border-ink-600' : 'bg-ink-950 border-parchment/40'
        } ${!status.isGameOver ? 'animate-pulseGlow' : ''}`}
      >
        <Crown size={18} className={isWhite ? 'text-ink-800' : 'text-parchment'} />
      </div>
      <div>
        <p className="font-display text-xl leading-tight tracking-wide">{label}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {status.isGameOver ? 'Game over' : 'In progress'}
        </p>
      </div>
    </div>
  );
}
