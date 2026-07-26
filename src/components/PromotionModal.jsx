import React from 'react';
import ChessPiece from '../pieces/ChessPiece.jsx';

const CHOICES = [
  { code: 'q', label: 'Queen' },
  { code: 'r', label: 'Rook' },
  { code: 'b', label: 'Bishop' },
  { code: 'n', label: 'Knight' },
];

export default function PromotionModal({ pending, pieceStyle, onChoose, onCancel }) {
  if (!pending) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-brass-500/30 bg-ink-800 p-6 shadow-2xl animate-floatIn">
        <h3 className="mb-1 font-display text-2xl text-parchment">Promote pawn</h3>
        <p className="mb-4 text-sm text-muted">Choose the piece to promote to.</p>
        <div className="grid grid-cols-4 gap-2">
          {CHOICES.map((c) => (
            <button
              key={c.code}
              onClick={() => onChoose(c.code)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-ink-700/60 p-3 transition hover:border-brass-500/60 hover:bg-brass-500/10"
            >
              <ChessPiece type={c.code} color={pending.color} styleId={pieceStyle} size={40} />
              <span className="text-xs text-parchment/80">{c.label}</span>
            </button>
          ))}
        </div>
        <button onClick={onCancel} className="mt-4 w-full rounded-xl py-2 text-sm text-muted hover:text-parchment">
          Cancel
        </button>
      </div>
    </div>
  );
}
