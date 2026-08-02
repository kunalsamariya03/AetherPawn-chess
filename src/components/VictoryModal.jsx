import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Handshake, RotateCcw, X } from 'lucide-react';

export default function VictoryModal({ result, onClose, onNewGame }) {
  const fired = useRef(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer;
    if (result) {
      timer = setTimeout(() => {
        setShowModal(true);

        if (!fired.current) {
          fired.current = true;
          if (result.type === 'checkmate' || result.type === 'time') {
            const duration = 1400;
            const end = Date.now() + duration;
            (function frame() {
              confetti({
                particleCount: 4,
                angle: 60,
                spread: 65,
                origin: { x: 0 },
                colors: ['#c9a227', '#e0bb52', '#e8e6e1'],
              });
              confetti({
                particleCount: 4,
                angle: 120,
                spread: 65,
                origin: { x: 1 },
                colors: ['#c9a227', '#e0bb52', '#e8e6e1'],
              });
              if (Date.now() < end) requestAnimationFrame(frame);
            })();
          }
        }
      }, 6000);
    } else {
      setShowModal(false);
      fired.current = false;
    }

    return () => clearTimeout(timer);
  }, [result]);

  if (!result || !showModal) return null;

  const isDraw = result.type === 'stalemate' || result.type === 'draw';
  const winnerLabel = result.winner === 'w' ? 'White' : 'Black';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-3xl border border-brass-500/30 bg-ink-800/80 p-8 text-center shadow-2xl shadow-black/60 backdrop-blur-xl animate-floatIn">
        {/* <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-parchment transition-colors"
        >
          <X size={18} />
        </button> */}

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-brass-500/40 bg-brass-500/10">
          {isDraw ? (
            <Handshake size={28} className="text-brass-400" />
          ) : (
            <Crown size={28} className="text-brass-400" />
          )}
        </div>

        <h2 className="font-display text-3xl tracking-wide text-parchment">
          {isDraw ? "It's a draw" : `${winnerLabel} wins`}
        </h2>
        
        <p className="mt-2 text-sm text-muted">
          {result.type === 'checkmate' && 'By checkmate.'}
          {result.type === 'time' && 'On time.'}
          {result.type === 'stalemate' && 'By stalemate — no legal moves remain.'}
          {result.type === 'draw' && 'By the fifty-move rule, repetition, or insufficient material.'}
        </p>

        <button
          onClick={onNewGame}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brass-500 px-5 py-2.5 font-medium text-ink-950 transition hover:bg-brass-400 active:scale-[0.98]"
        >
          <RotateCcw size={16} />
          Start a new game
        </button>
      </div>
    </div>
  );
}