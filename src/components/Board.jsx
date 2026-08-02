import React, { useMemo, useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { BOARD_THEMES } from '../data/themes.js';
import { buildCustomPieces } from '../pieces/pieceSet.jsx';

function useBoardWidth() {
  const [width, setWidth] = useState(480);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw >= 768) {
        const maxAvailableHeight = vh - 220;
        setWidth(Math.max(380, Math.min(maxAvailableHeight, 520)));
      } else {
        const maxAvailableWidth = vw - 36;
        setWidth(Math.max(260, Math.min(maxAvailableWidth, 420)));
      }
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return width;
}

export default function Board({ game, boardTheme, pieceStyle, boardOrientation, disabled }) {
  const boardWidth = useBoardWidth();
  const theme = BOARD_THEMES[boardTheme];
  const customPieces = useMemo(() => buildCustomPieces(pieceStyle), [pieceStyle]);

  // State to handle delayed smooth entry of the Checkmate Glass Banner
  const [showCheckmateBanner, setShowCheckmateBanner] = useState(false);

  useEffect(() => {
    let timer;
    if (game.status.isCheckmate) {
      // 400ms delay gives piece animation enough time to settle cleanly on the board square
      timer = setTimeout(() => {
        setShowCheckmateBanner(true);
      }, 400);
    } else {
      setShowCheckmateBanner(false);
    }

    return () => clearTimeout(timer);
  }, [game.status.isCheckmate]);

  const customSquareStyles = useMemo(() => {
    const styles = {};

    // 1. Last Move Highlighting
    if (game.lastMove) {
      styles[game.lastMove.from] = { ...styles[game.lastMove.from], backgroundColor: 'rgba(255, 214, 92, 0.28)' };
      styles[game.lastMove.to] = { ...styles[game.lastMove.to], backgroundColor: 'rgba(255, 214, 92, 0.28)' };
    }

    // 2. Selected Square Highlighting
    if (game.selectedSquare) {
      styles[game.selectedSquare] = {
        ...styles[game.selectedSquare],
        boxShadow: 'inset 0 0 0 3px rgba(201,162,39,0.85)',
      };
    }

    // 3. Legal Targets Dots
    for (const target of game.legalTargets) {
      styles[target] = {
        ...styles[target],
        backgroundImage: isOccupied(game, target)
          ? 'radial-gradient(circle, transparent 55%, rgba(201,162,39,0.55) 58%, rgba(201,162,39,0.55) 68%, transparent 71%)'
          : 'radial-gradient(circle, rgba(201,162,39,0.55) 17%, transparent 20%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
    }

    // 4. Normal Check Highlighting
    if (game.status.isCheck && game.status.checkSquare && !game.status.isCheckmate) {
      styles[game.status.checkSquare] = {
        ...styles[game.status.checkSquare],
        boxShadow: 'inset 0 0 0 3px rgba(239,68,68,0.9), inset 0 0 18px rgba(239,68,68,0.55)',
      };
    }

    // 5. Multi-directional Checkmate Glow Lines
    if (game.status.isCheckmate) {
      if (game.status.checkSquare) {
        styles[game.status.checkSquare] = {
          ...styles[game.status.checkSquare],
          backgroundColor: 'rgba(239, 68, 68, 0.55)',
          boxShadow: 'inset 0 0 0 4px rgba(239, 68, 68, 1), 0 0 30px rgba(239, 68, 68, 0.9)',
          borderRadius: '6px',
        };
      }

      const attackSquares = game.status.attackPaths || [];
      attackSquares.forEach((sq) => {
        styles[sq] = {
          ...styles[sq],
          backgroundColor: 'rgba(245, 158, 11, 0.45)',
          boxShadow: 'inset 0 0 0 2px rgba(245, 158, 11, 0.9), 0 0 15px rgba(245, 158, 11, 0.6)',
        };
      });
    }

    return styles;
  }, [game]);

  return (
    <div className="flex w-full justify-center">
      <div
        className={`relative inline-block overflow-hidden transition-all duration-150 rounded-lg shadow-2xl ${theme.frameClass}`}
        style={theme.frameStyle}
      >
        <Chessboard
          position={game.fen}
          boardWidth={boardWidth}
          boardOrientation={boardOrientation}
          animationDuration={180}
          arePiecesDraggable={game.atTip && !disabled}
          customBoardStyle={theme.boardStyle}
          customLightSquareStyle={theme.lightSquareStyle}
          customDarkSquareStyle={theme.darkSquareStyle}
          customSquareStyles={customSquareStyles}
          customPieces={customPieces}
          onPieceDrop={(source, target) => (disabled ? false : game.attemptMove(source, target))}
          onSquareClick={(square) => !disabled && game.selectSquare(square)}
        />

        {/* Delayed Cinematic Glassmorphism Checkmate Banner */}
        {showCheckmateBanner && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-checkmate-glass rounded-2xl border border-red-500/30 bg-black/80 px-10 py-5 text-center shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              <h1 className="font-sans text-5xl font-black uppercase tracking-widest text-red-600 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] sm:text-6xl">
                CHECKMATE
              </h1>
              <p className="mt-1 text-xs font-mono font-bold tracking-[0.3em] text-amber-400 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                VICTORY DECIDED
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function isOccupied(game, square) {
  const file = square.charCodeAt(0) - 97;
  const rank = 8 - parseInt(square[1], 10);
  const rows = game.fen.split(' ')[0].split('/');
  const row = rows[rank];
  let col = 0;
  for (const ch of row) {
    if (/\d/.test(ch)) {
      col += parseInt(ch, 10);
    } else {
      if (col === file) return true;
      col += 1;
    }
  }
  return false;
}