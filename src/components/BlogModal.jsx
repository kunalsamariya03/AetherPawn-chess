import React from 'react';
import { X, BookOpen, Trophy } from 'lucide-react';

// Added your YouTube Video ID here
const YOUTUBE_VIDEO_ID = '2qjofONTgp8';

const QUICK_RULES = [
  'Each side moves one piece per turn; pawns move forward but capture diagonally.',
  'Castling: king and rook can move together once, if neither has moved and the squares between them are empty and unattacked.',
  'En passant: a pawn that advances two squares can be captured "in passing" by an enemy pawn beside it, but only on the very next move.',
  'A pawn reaching the far rank must promote — usually to a queen.',
  'Checkmate ends the game immediately; stalemate (no legal move, but not in check) is a draw.',
];

const PRACTICE_TIPS = [
  'Control the center early (e4/d4/e5/d5) — it gives your pieces more squares to work with.',
  'Develop knights and bishops before moving the same piece twice.',
  'Castle early to get your king to safety before opening the position.',
  'Before every move, check: "does this hang a piece, or miss a threat?"',
  'Review your losses move-by-move — most rating gains come from cutting blunders, not finding brilliancies.',
];

export default function BlogModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto ledger-scroll rounded-3xl border border-brass-500/30 bg-ink-800/90 p-6 shadow-2xl animate-floatIn">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-brass-400" />
            <h2 className="font-display text-2xl text-parchment">Guides &amp; Rules</h2>
          </div>
          <button onClick={onClose} className="text-muted hover:text-parchment">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          {YOUTUBE_VIDEO_ID ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="Chess gameplay walkthrough"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-900/60 text-center px-4">
              <BookOpen size={22} className="text-muted" />
              <p className="text-sm text-muted">
                Add a gameplay video: set <code className="text-brass-400">YOUTUBE_VIDEO_ID</code> in{' '}
                <code className="text-brass-400">BlogModal.jsx</code>.
              </p>
            </div>
          )}
        </div>

        <section className="mb-6">
          <h3 className="mb-2 font-display text-lg text-brass-400">Quick Chess Rules</h3>
          <ul className="space-y-1.5 text-sm text-parchment/85">
            {QUICK_RULES.map((rule, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brass-500">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-1.5 font-display text-lg text-brass-400">
            <Trophy size={16} /> Tournament Practice Tips
          </h3>
          <ul className="space-y-1.5 text-sm text-parchment/85">
            {PRACTICE_TIPS.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brass-500">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}