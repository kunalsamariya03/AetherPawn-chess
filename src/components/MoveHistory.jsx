import React, { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

export default function MoveHistory({ history, pointer, onJump }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history.length]);

  const pairs = [];
  for (let i = 1; i < history.length; i += 2) {
    pairs.push({
      moveNumber: Math.ceil(i / 2),
      white: history[i],
      whiteIndex: i,
      black: history[i + 1],
      blackIndex: i + 1,
    });
  }

  return (
    <div className="rounded-2xl border border-brass-500/20 bg-ink-800/70 p-4">
      <div className="mb-2 flex items-center gap-2 border-b border-brass-500/20 pb-2">
        <BookOpen size={15} className="text-brass-400" />
        <h3 className="font-display text-lg tracking-wide text-brass-400">The AetherPawn</h3>
      </div>
      <div ref={scrollRef} className="ledger-scroll max-h-48 overflow-y-auto pr-1 font-mono text-sm">
        {pairs.length === 0 && <p className="py-4 text-center text-muted/60">No moves yet</p>}
        {pairs.map((pair) => (
          <div key={pair.moveNumber} className="flex items-center gap-2 py-0.5">
            <span className="w-6 text-muted/70">{pair.moveNumber}.</span>
            <button
              onClick={() => onJump(pair.whiteIndex)}
              className={`flex-1 rounded px-1.5 py-0.5 text-left hover:bg-white/5 ${
                pointer === pair.whiteIndex ? 'bg-brass-500/20 text-brass-300' : ''
              }`}
            >
              {pair.white?.move?.san}
            </button>
            {pair.black && (
              <button
                onClick={() => onJump(pair.blackIndex)}
                className={`flex-1 rounded px-1.5 py-0.5 text-left hover:bg-white/5 ${
                  pointer === pair.blackIndex ? 'bg-brass-500/20 text-brass-300' : ''
                }`}
              >
                {pair.black?.move?.san}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
