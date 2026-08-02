import React from 'react';
import CapturedPieces from './CapturedPieces.jsx';
import MoveHistory from './MoveHistory.jsx';
import Controls from './Controls.jsx';
import ClockPanel from './ClockPanel.jsx';
import AdPanel from './AdPanel.jsx';

export default function Sidebar({ game, settings, onSettingsChange, onFlip, onNewGame, onTimeUp, clockResetSignal, aiTurnActive }) {
  return (
    <aside className="flex w-full max-w-sm flex-col gap-3 md:w-80">
      <div className="rounded-2xl border border-white/10 bg-ink-800/70 p-4">
        <CapturedPieces
          capturedByWhite={game.capturedByWhite}
          capturedByBlack={game.capturedByBlack}
          materialDiff={game.materialDiff}
          pieceStyle={settings.pieceStyle}
        />
      </div>

      <MoveHistory history={game.history} pointer={game.pointer} onJump={game.jumpTo} />

      <Controls
        game={game}
        onFlip={onFlip}
        onNewGame={onNewGame}
        flipDisabled={settings.mode === 'ai'}
        undoRedoDisabled={aiTurnActive}
      />

      <ClockPanel
        enabled={settings.clockEnabled}
        onToggle={(v) => onSettingsChange({ clockEnabled: v })}
        minutes={settings.clockMinutes}
        turn={game.turn}
        isGameOver={game.status.isGameOver}
        resetSignal={clockResetSignal}
        onTimeUp={onTimeUp}
      />

      <AdPanel />
    </aside>
  );
}
