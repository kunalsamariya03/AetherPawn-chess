import React, { useState } from 'react';
import { Undo2, Redo2, RotateCcw, FlipVertical2 } from 'lucide-react';
import TournamentModal from './TournamentModal';

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

export default function Controls({ game, onFlip, onNewGame, flipDisabled, undoRedoDisabled }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownThisGame, setHasShownThisGame] = useState(false);

  const handleUndo = () => {
    game.undo();
    
    if (!hasShownThisGame) {
      setShowPopup(true);
      setHasShownThisGame(true);
    }
  };

  const handleNewGame = () => {
    setHasShownThisGame(false);
    onNewGame();
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <Btn onClick={handleUndo} disabled={!game.canUndo || undoRedoDisabled} title="Undo">
          <Undo2 size={16} />
          <span className="hidden sm:inline">Undo</span>
        </Btn>
        <Btn onClick={game.redo} disabled={!game.canRedo || undoRedoDisabled} title="Redo">
          <Redo2 size={16} />
          <span className="hidden sm:inline">Redo</span>
        </Btn>
        <Btn onClick={onFlip} disabled={flipDisabled} title={flipDisabled ? 'Locked to your side in AI mode' : 'Flip board'}>
          <FlipVertical2 size={16} />
          <span className="hidden sm:inline">Flip</span>
        </Btn>
        <Btn onClick={handleNewGame} title="New game">
          <RotateCcw size={16} />
          <span className="hidden sm:inline">New</span>
        </Btn>
      </div>

      <TournamentModal 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </>
  );
}