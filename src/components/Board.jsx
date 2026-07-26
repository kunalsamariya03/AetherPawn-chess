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
        // Desktop / Tablet Landscape mode
        const maxAvailableHeight = vh - 220;
        setWidth(Math.max(380, Math.min(maxAvailableHeight, 520)));
      } else {
        // Mobile screen (tight fit to avoid overflow)
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

export default function Board({ game, boardTheme, pieceStyle, boardOrientation }) {
  const boardWidth = useBoardWidth();
  const theme = BOARD_THEMES[boardTheme];
  const customPieces = useMemo(() => buildCustomPieces(pieceStyle), [pieceStyle]);

  const customSquareStyles = useMemo(() => {
    const styles = {};

    if (game.lastMove) {
      styles[game.lastMove.from] = { ...styles[game.lastMove.from], backgroundColor: 'rgba(255, 214, 92, 0.28)' };
      styles[game.lastMove.to] = { ...styles[game.lastMove.to], backgroundColor: 'rgba(255, 214, 92, 0.28)' };
    }

    if (game.selectedSquare) {
      styles[game.selectedSquare] = {
        ...styles[game.selectedSquare],
        boxShadow: 'inset 0 0 0 3px rgba(201,162,39,0.85)',
      };
    }

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

    if (game.status.isCheck && game.status.checkSquare) {
      styles[game.status.checkSquare] = {
        ...styles[game.status.checkSquare],
        boxShadow: 'inset 0 0 0 3px rgba(239,68,68,0.9), inset 0 0 18px rgba(239,68,68,0.55)',
      };
    }

    return styles;
  }, [game]);

  return (
    <div className="flex w-full justify-center">
      <div 
        className={`inline-block overflow-hidden transition-all duration-150 rounded-lg shadow-2xl ${theme.frameClass}`} 
        style={theme.frameStyle}
      >
        <Chessboard
          position={game.fen}
          boardWidth={boardWidth}
          boardOrientation={boardOrientation}
          animationDuration={180}
          arePiecesDraggable={game.atTip}
          customBoardStyle={theme.boardStyle}
          customLightSquareStyle={theme.lightSquareStyle}
          customDarkSquareStyle={theme.darkSquareStyle}
          customSquareStyles={customSquareStyles}
          customPieces={customPieces}
          onPieceDrop={(source, target) => game.attemptMove(source, target)}
          onSquareClick={(square) => game.selectSquare(square)}
        />
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