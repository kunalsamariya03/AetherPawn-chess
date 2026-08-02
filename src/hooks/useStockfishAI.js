import { useCallback, useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';

// Stockfish is loaded from a CDN as a classic Web Worker script rather than an
// npm dependency. This sidesteps Vite's wasm/worker bundling quirks entirely —
// the engine runs fully client-side (no server round-trip), it's just fetched
// from a CDN instead of being bundled. If you'd rather self-host it, download
// the file and swap this URL for a local path under /public.
const ENGINE_URL = '/stockfish.js';

// Difficulty presets:
//  - skill: Stockfish's own 0-20 "Skill Level" (lower = weaker play)
//  - depth: search depth cap
//  - blunderChance: on top of a low skill level, "Easy" additionally swaps in
//    an outright random legal move some of the time, so mistakes are obvious
//    and not just "slightly worse than perfect"
const DIFFICULTY_PRESETS = {
  easy: { skill: 1, depth: 2, blunderChance: 0.35 },
  medium: { skill: 10, depth: 6, blunderChance: 0.05 },
  hard: { skill: 20, depth: 12, blunderChance: 0 },
};

export function useStockfishAI() {
  const workerRef = useRef(null);
  const resolverRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [engineError, setEngineError] = useState(null);

  useEffect(() => {
    let worker;
    try {
      worker = new Worker(ENGINE_URL);
    } catch (err) {
      setEngineError('Could not start the chess engine (worker failed to load).');
      return undefined;
    }
    workerRef.current = worker;

    worker.onerror = () => {
      setEngineError('The chess engine hit an error and stopped.');
    };

    worker.onmessage = (event) => {
      const line = typeof event.data === 'string' ? event.data : '';
      if (line === 'uciok') {
        worker.postMessage('isready');
      } else if (line === 'readyok') {
        setReady(true);
      } else if (line.startsWith('bestmove')) {
        const uci = line.split(' ')[1];
        if (resolverRef.current) {
          const resolve = resolverRef.current;
          resolverRef.current = null;
          
          // YAHAN DELAY ADD KIYA HAI - Engine move aane ke baad 600ms wait karega
          setTimeout(() => {
            setThinking(false);
            resolve(uci && uci !== '(none)' ? uci : null);
          }, 600);
        }
      }
    };

    worker.postMessage('uci');

    return () => {
      worker.postMessage('quit');
      worker.terminate();
    };
  }, []);

  const requestMove = useCallback(
    (fen, difficulty = 'medium') =>
      new Promise((resolve) => {
        const preset = DIFFICULTY_PRESETS[difficulty] || DIFFICULTY_PRESETS.medium;

        // "Easy" occasionally hands back a uniformly random legal move instead
        // of asking the engine at all — guarantees visible, human-like blunders.
        if (preset.blunderChance > 0 && Math.random() < preset.blunderChance) {
          const probe = new Chess(fen);
          const legal = probe.moves({ verbose: true });
          if (legal.length) {
            const pick = legal[Math.floor(Math.random() * legal.length)];
            
            // YAHAN BHI DELAY ADD KIYA HAI - Blunder move ke liye
            setThinking(true);
            setTimeout(() => {
              setThinking(false);
              resolve(`${pick.from}${pick.to}${pick.promotion || ''}`);
            }, 600);
            return;
          }
        }

        const worker = workerRef.current;
        if (!worker || !ready) {
          resolve(null);
          return;
        }

        resolverRef.current = resolve;
        setThinking(true);
        worker.postMessage(`setoption name Skill Level value ${preset.skill}`);
        worker.postMessage('position fen ' + fen);
        worker.postMessage(`go depth ${preset.depth}`);
      }),
    [ready]
  );

  return { ready, thinking, engineError, requestMove };
}