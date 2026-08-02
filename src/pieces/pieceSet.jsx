import React from 'react';
import ChessPiece from './ChessPiece.jsx';

const TYPES = ['p', 'n', 'b', 'r', 'q', 'k'];
const COLORS = ['w', 'b'];

// react-chessboard expects an object like { wP: ({ squareWidth }) => <JSX/>, ... }
export function buildCustomPieces(pieceStyleId) {
  const map = {};
  for (const color of COLORS) {
    for (const type of TYPES) {
      const code = `${color}${type.toUpperCase()}`;
      map[code] = ({ squareWidth }) => (
        <div className="flex items-center justify-center w-full h-full">
          <ChessPiece
            type={type}
            color={color}
            styleId={pieceStyleId}
            size={squareWidth * 0.88}
          />
        </div>
      );
    }
  }
  return map;
}
