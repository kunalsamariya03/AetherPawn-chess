import React from 'react';
import { Undo2, Redo2, RotateCcw, FlipVertical2 } from 'lucide-react';

function Btn({ onClick, disabled, children, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-ink-800/80 px-3 py-2.5 text-sm text-parchment/90 transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export default function Controls({ game, onFlip, onNewGame }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Btn onClick={game.undo} disabled={!game.canUndo} title="Undo">
        <Undo2 size={16} />
        <span className="hidden sm:inline">Undo</span>
      </Btn>
      <Btn onClick={game.redo} disabled={!game.canRedo} title="Redo">
        <Redo2 size={16} />
        <span className="hidden sm:inline">Redo</span>
      </Btn>
      <Btn onClick={onFlip} title="Flip board">
        <FlipVertical2 size={16} />
        <span className="hidden sm:inline">Flip</span>
      </Btn>
      <Btn onClick={onNewGame} title="New game">
        <RotateCcw size={16} />
        <span className="hidden sm:inline">New</span>
      </Btn>
    </div>
  );
}
