import React, { useEffect, useRef, useState } from 'react';

import { useChessGame } from './hooks/useChessGame.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useStockfishAI } from './hooks/useStockfishAI.js';
import { DEFAULT_SETTINGS } from './data/themes.js';

import Header from './components/Header.jsx';
import SideDrawer from './components/SideDrawer.jsx';
import Board from './components/Board.jsx';
import Sidebar from './components/Sidebar.jsx';
import TurnIndicator from './components/TurnIndicator.jsx';
import PromotionModal from './components/PromotionModal.jsx';
import VictoryModal from './components/VictoryModal.jsx';

export default function App() {
  const [settings, setSettings] = useLocalStorage('chess-ledger:settings', DEFAULT_SETTINGS);
  const game = useChessGame({ soundEnabled: settings.soundEnabled });
  const ai = useStockfishAI();

  const [result, setResult] = useState(null);
  const [clockResetSignal, setClockResetSignal] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const updateSettings = (patch) => setSettings((prev) => ({ ...prev, ...patch }));

  const handleFlip = () =>
    updateSettings({ boardOrientation: settings.boardOrientation === 'white' ? 'black' : 'white' });

  const handleNewGame = () => {
    game.resetGame();
    setResult(null);
    setClockResetSignal((n) => n + 1);
  };

  // Mode / side switches start a fresh game so the board and AI don't get confused mid-match
  const handleModeChange = (patch) => {
    updateSettings(patch);
    handleNewGame();
  };

  const handleTimeUp = (winner) => {
    if (result) return;
    setResult({ type: 'time', winner });
  };

  // Detect checkmate / stalemate / draw only when viewing the live tip of the game
  useEffect(() => {
    if (!game.atTip) return;
    if (result) return;
    const s = game.status;
    if (s.isCheckmate) setResult({ type: 'checkmate', winner: s.winner });
    else if (s.isStalemate) setResult({ type: 'stalemate', winner: null });
    else if (s.isDraw) setResult({ type: 'draw', winner: null });
  }, [game.atTip, game.status, result]);

  // --- AI mode: whenever it's the engine's turn, ask Stockfish for a move and play it
  const aiTurnActive =
    settings.mode === 'ai' && game.atTip && !game.status.isGameOver && game.turn !== settings.humanColor;

  const requestIdRef = useRef(0);
  useEffect(() => {
    if (!aiTurnActive || game.pendingPromotion) return undefined;
    if (!ai.ready) return undefined;

    const requestId = ++requestIdRef.current;
    let cancelled = false;

    ai.requestMove(game.fen, settings.aiDifficulty).then((uci) => {
      if (cancelled || requestId !== requestIdRef.current || !uci) return;
      const from = uci.slice(0, 2);
      const to = uci.slice(2, 4);
      const promotion = uci.length > 4 ? uci[4] : undefined;
      game.applyEngineMove(from, to, promotion);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiTurnActive, game.fen, settings.aiDifficulty, game.pendingPromotion, ai.ready]);

  const effectiveOrientation =
    settings.mode === 'ai' ? (settings.humanColor === 'w' ? 'white' : 'black') : settings.boardOrientation;

  return (
    <div className="min-h-screen px-3 py-4 md:px-8 md:py-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Header onOpenDrawer={() => setDrawerOpen(true)} />

        <main className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6">
          <div className="flex w-full md:w-auto flex-col items-center gap-3">
            <TurnIndicator turn={game.turn} status={game.status} boardTheme={settings.boardTheme} />
            {settings.mode === 'ai' && !game.status.isGameOver && (
              <p className="text-xs text-muted -mt-1">
                {aiTurnActive
                  ? ai.thinking
                    ? 'AetherPawn is thinking…'
                    : 'Waiting on the engine…'
                  : `You're playing ${settings.humanColor === 'w' ? 'White' : 'Black'}`}
                {ai.engineError && <span className="text-red-400"> — {ai.engineError}</span>}
              </p>
            )}
            <Board
              game={game}
              boardTheme={settings.boardTheme}
              pieceStyle={settings.pieceStyle}
              boardOrientation={effectiveOrientation}
              disabled={aiTurnActive}
            />
          </div>

          <div className="w-full max-w-[400px]">
            <Sidebar
              game={game}
              settings={settings}
              onSettingsChange={updateSettings}
              onFlip={handleFlip}
              onNewGame={handleNewGame}
              onTimeUp={handleTimeUp}
              clockResetSignal={clockResetSignal}
              aiTurnActive={aiTurnActive}
            />
          </div>
        </main>
      </div>

      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        onModeChange={handleModeChange}
      />

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
