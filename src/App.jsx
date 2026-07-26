import React, { useEffect, useState } from 'react';
// Custom icon image import from src/assets/
import customLogo from './assets/queen.webp'; 

import { useChessGame } from './hooks/useChessGame.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { DEFAULT_SETTINGS } from './data/themes.js';

import Board from './components/Board.jsx';
import Sidebar from './components/Sidebar.jsx';
import TurnIndicator from './components/TurnIndicator.jsx';
import PromotionModal from './components/PromotionModal.jsx';
import VictoryModal from './components/VictoryModal.jsx';

export default function App() {
  const game = useChessGame();
  const [settings, setSettings] = useLocalStorage('chess-ledger:settings', DEFAULT_SETTINGS);
  const [result, setResult] = useState(null);
  const [clockResetSignal, setClockResetSignal] = useState(0);

  const updateSettings = (patch) => setSettings((prev) => ({ ...prev, ...patch }));

  const handleFlip = () =>
    updateSettings({ boardOrientation: settings.boardOrientation === 'white' ? 'black' : 'white' });

  const handleNewGame = () => {
    game.resetGame();
    setResult(null);
    setClockResetSignal((n) => n + 1);
  };

  const handleTimeUp = (winner) => {
    if (result) return;
    setResult({ type: 'time', winner });
  };

  useEffect(() => {
    if (!game.atTip) return;
    if (result) return;
    const s = game.status;
    if (s.isCheckmate) setResult({ type: 'checkmate', winner: s.winner });
    else if (s.isStalemate) setResult({ type: 'stalemate', winner: null });
    else if (s.isDraw) setResult({ type: 'draw', winner: null });
  }, [game.atTip, game.status, result]);

  return (
    <div className="min-h-screen px-3 py-4 md:px-8 md:py-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Top Header Bar */}
        <header className="w-full mb-4 flex items-center justify-start gap-3">
          
          {/* Glassmorphic Icon Container */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-xl transition-transform hover:scale-105">
            <img 
              src={customLogo} 
              alt="Chess Logo" 
              className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold tracking-wide text-parchment">AetherPawn</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Pass &amp; play chess</p>
          </div>
        </header>

        {/* Main Content Layout */}
        <main className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6">
          {/* Left Column: Turn Indicator + Board */}
          <div className="flex w-full md:w-auto flex-col items-center gap-3">
            <TurnIndicator turn={game.turn} status={game.status} boardTheme={settings.boardTheme} />
            <Board
              game={game}
              boardTheme={settings.boardTheme}
              pieceStyle={settings.pieceStyle}
              boardOrientation={settings.boardOrientation}
            />
          </div>

          {/* Right Column: Game Sidebar */}
          <div className="w-full max-w-[400px]">
            <Sidebar
              game={game}
              settings={settings}
              onSettingsChange={updateSettings}
              onFlip={handleFlip}
              onNewGame={handleNewGame}
              onTimeUp={handleTimeUp}
              clockResetSignal={clockResetSignal}
            />
          </div>
        </main>
      </div>

      <PromotionModal
        pending={game.pendingPromotion}
        pieceStyle={settings.pieceStyle}
        onChoose={game.resolvePromotion}
        onCancel={game.cancelPromotion}
      />

      <VictoryModal result={result} onClose={() => setResult(null)} onNewGame={handleNewGame} />
    </div>
  );
}