import React from 'react';
import ChessPiece from '../pieces/ChessPiece.jsx';

function Tray({ label, pieces, opponentColor, pieceStyle, diff }) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
        {diff > 0 && (
          <span className="text-xs font-mono text-brass-400">+{diff}</span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-0.5 min-h-[28px] rounded-lg bg-ink-950/50 px-2 py-1">
        {pieces.length === 0 && <span className="text-xs text-muted/60">—</span>}
        {pieces.map((p, i) => (
          <div key={i} className="-mr-2">
            <ChessPiece type={p} color={opponentColor} styleId={pieceStyle} size={22} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapturedPieces({ capturedByWhite, capturedByBlack, materialDiff, pieceStyle }) {
  return (
    <div className="flex gap-3">
      <Tray
        label="White captured"
        pieces={capturedByWhite}
        opponentColor="b"
        pieceStyle={pieceStyle}
        diff={materialDiff > 0 ? materialDiff : 0}
      />
      <Tray
        label="Black captured"
        pieces={capturedByBlack}
        opponentColor="w"
        pieceStyle={pieceStyle}
        diff={materialDiff < 0 ? -materialDiff : 0}
      />
    </div>
  );
}
