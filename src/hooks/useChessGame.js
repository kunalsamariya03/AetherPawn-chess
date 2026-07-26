import { useCallback, useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import { useLocalStorage } from './useLocalStorage.js';

const START_FEN = new Chess().fen();
const PIECE_VALUE = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

const initialHistory = [{ fen: START_FEN, move: null }];

// Synthesizer helper for sound effects (Zero external files/packages needed)
function playSoundEffect(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'capture') {
      // Deep dramatic capture tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'check') {
      // High alert check tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      // Standard move click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch {
    // Fail silently if audio context is blocked
  }
}

export function useChessGame() {
  const [saved, setSaved] = useLocalStorage('chess-ledger:game', {
    history: initialHistory,
    pointer: 0,
  });

  const { history, pointer } = saved;

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [pendingPromotion, setPendingPromotion] = useState(null);

  const chess = useMemo(() => {
    const c = new Chess();
    c.load(history[pointer].fen);
    return c;
  }, [history, pointer]);

  const atTip = pointer === history.length - 1;
  const turn = chess.turn();

  const status = useMemo(() => {
    const isCheckmate = chess.isCheckmate();
    const isStalemate = chess.isStalemate();
    const isDraw = chess.isDraw();
    const isCheck = chess.isCheck();
    const isGameOver = chess.isGameOver();

    let checkSquare = null;
    if (isCheck) {
      for (const row of chess.board()) {
        for (const sq of row) {
          if (sq && sq.type === 'k' && sq.color === turn) {
            checkSquare = sq.square;
          }
        }
      }
    }

    return {
      isCheck,
      isCheckmate,
      isStalemate,
      isDraw,
      isGameOver,
      checkSquare,
      winner: isCheckmate ? (turn === 'w' ? 'b' : 'w') : null,
    };
  }, [chess, turn]);

  const lastMove = history[pointer].move;

  const { capturedByWhite, capturedByBlack, materialDiff } = useMemo(() => {
    const byWhite = [];
    const byBlack = [];
    for (let i = 1; i <= pointer; i++) {
      const m = history[i].move;
      if (m && m.captured) {
        if (m.color === 'w') byWhite.push(m.captured);
        else byBlack.push(m.captured);
      }
    }
    const valueOf = (arr) => arr.reduce((sum, p) => sum + (PIECE_VALUE[p] || 0), 0);
    return {
      capturedByWhite: byWhite,
      capturedByBlack: byBlack,
      materialDiff: valueOf(byWhite) - valueOf(byBlack),
    };
  }, [history, pointer]);

  const legalTargets = useMemo(() => {
    if (!selectedSquare) return [];
    return chess.moves({ square: selectedSquare, verbose: true }).map((m) => m.to);
  }, [chess, selectedSquare]);

  const commitMove = useCallback(
    (from, to, promotion) => {
      const trial = new Chess();
      trial.load(history[pointer].fen);
      let result;
      try {
        result = trial.move({ from, to, promotion });
      } catch {
        result = null;
      }
      if (!result) return false;

      // Play Sound effects
      if (trial.isCheck()) {
        playSoundEffect('check');
      } else if (result.captured) {
        playSoundEffect('capture');
      } else {
        playSoundEffect('move');
      }

      const nextEntry = { fen: trial.fen(), move: result };
      const truncated = history.slice(0, pointer + 1);
      setSaved({ history: [...truncated, nextEntry], pointer: truncated.length });
      setSelectedSquare(null);
      setPendingPromotion(null);
      return true;
    },
    [history, pointer, setSaved]
  );

  const attemptMove = useCallback(
    (from, to) => {
      if (!atTip) return false;

      const piece = chess.get(from);
      const isPromotion =
        piece?.type === 'p' && ((piece.color === 'w' && to[1] === '8') || (piece.color === 'b' && to[1] === '1'));

      if (isPromotion) {
        const trial = new Chess();
        trial.load(history[pointer].fen);
        let probe;
        try {
          probe = trial.move({ from, to, promotion: 'q' });
        } catch {
          probe = null;
        }
        if (!probe) return false;
        setSelectedSquare(null);
        setPendingPromotion({ from, to, color: piece.color, previewFen: trial.fen() });
        return true;
      }

      return commitMove(from, to, undefined);
    },
    [atTip, chess, commitMove, history, pointer]
  );

  const resolvePromotion = useCallback(
    (pieceLetter) => {
      if (!pendingPromotion) return;
      commitMove(pendingPromotion.from, pendingPromotion.to, pieceLetter);
    },
    [pendingPromotion, commitMove]
  );

  const cancelPromotion = useCallback(() => setPendingPromotion(null), []);

  const selectSquare = useCallback(
    (square) => {
      if (!atTip) return;
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }
      const piece = chess.get(square);
      if (selectedSquare && legalTargets.includes(square)) {
        attemptMove(selectedSquare, square);
        return;
      }
      if (piece && piece.color === turn) {
        setSelectedSquare(square);
      } else {
        setSelectedSquare(null);
      }
    },
    [atTip, chess, selectedSquare, legalTargets, turn, attemptMove]
  );

  const undo = useCallback(() => {
    if (pointer > 0) setSaved({ history, pointer: pointer - 1 });
    setSelectedSquare(null);
  }, [history, pointer, setSaved]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) setSaved({ history, pointer: pointer + 1 });
    setSelectedSquare(null);
  }, [history, pointer, setSaved]);

  const jumpTo = useCallback(
    (index) => {
      if (index < 0 || index > history.length - 1) return;
      setSaved({ history, pointer: index });
      setSelectedSquare(null);
    },
    [history, setSaved]
  );

  const resetGame = useCallback(() => {
    setSaved({ history: initialHistory, pointer: 0 });
    setSelectedSquare(null);
    setPendingPromotion(null);
  }, [setSaved]);

  return {
    fen: pendingPromotion ? pendingPromotion.previewFen : history[pointer].fen,
    turn,
    status,
    atTip,
    history,
    pointer,
    lastMove,
    selectedSquare,
    legalTargets,
    capturedByWhite,
    capturedByBlack,
    materialDiff,
    pendingPromotion,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    attemptMove,
    selectSquare,
    resolvePromotion,
    cancelPromotion,
    undo,
    redo,
    jumpTo,
    resetGame,
  };
}