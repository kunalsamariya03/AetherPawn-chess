// Each board theme provides:
//  - frameClass: Tailwind classes for the wrapper div that frames the board
//  - boardStyle: inline style object passed to react-chessboard's customBoardStyle
//  - lightSquareStyle / darkSquareStyle: inline style objects for the squares
//  - accentGlow: Tailwind shadow class used to tint the turn indicator / UI glows to match

export const BOARD_THEMES = {
  glassMono: {
    id: 'glassMono',
    label: 'Glassmorphic Black & White',
    blurb: 'Classic frosted white & obsidian glass',
    frameClass:
      'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-white/10 rounded-2xl p-1 md:p-4',
    boardStyle: {
      borderRadius: '12px',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)',
    },
    lightSquareStyle: { backgroundColor: 'rgba(240, 240, 245, 0.88)' },
    darkSquareStyle: { backgroundColor: 'rgba(20, 22, 28, 0.92)' },
    accentGlow: 'shadow-[0_0_20px_rgba(255,255,255,0.25)]',
    accentText: 'text-slate-100',
    accentRing: 'ring-white/40',
  },
  glass: {
    id: 'glass',
    label: 'Modern Glassmorphic',
    blurb: 'Frosted panels, soft cyan light',
    frameClass:
      'bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl shadow-cyan-500/10 rounded-2xl p-1 md:p-4',
    boardStyle: {
      borderRadius: '12px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    },
    lightSquareStyle: { backgroundColor: 'rgba(226,232,240,0.85)' },
    darkSquareStyle: { backgroundColor: 'rgba(45,64,82,0.92)' },
    accentGlow: 'shadow-glow-blue',
    accentText: 'text-sky-300',
    accentRing: 'ring-sky-400/40',
  },
  wood: {
    id: 'wood',
    label: 'Vintage Wood Grain',
    blurb: 'Warm walnut & brass study',
    frameClass:
      'bg-gradient-to-br from-[#7a4a24] via-[#5c3419] to-[#3d2110] border-[6px] border-[#8a5a2c] shadow-2xl shadow-black/50 rounded-lg p-1 md:p-4',
    boardStyle: {
      borderRadius: '4px',
      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.45)',
    },
    lightSquareStyle: { backgroundColor: '#ead9b4' },
    darkSquareStyle: { backgroundColor: '#6b3f22' },
    accentGlow: 'shadow-glow',
    accentText: 'text-brass-400',
    accentRing: 'ring-brass-500/40',
  },
  // 👇 GREEN & WHITE CLASSIC COMBO THEME 👇
  emeraldWhite: {
    id: 'emeraldWhite',
    label: 'Emerald & White',
    blurb: 'Classic tournament green and soft white',
    frameClass:
      'bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/50 rounded-2xl p-1 md:p-4',
    boardStyle: {
      borderRadius: '10px',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4), 0 5px 15px rgba(16,185,129,0.15)',
    },
    lightSquareStyle: { backgroundColor: '#eeeed2' }, 
    darkSquareStyle: { backgroundColor: '#769656' }, 
    accentGlow: 'shadow-[0_0_24px_-2px_rgba(16,185,129,0.6)]',
    accentText: 'text-emerald-400',
    accentRing: 'ring-emerald-500/60',
  },
};

export const PIECE_STYLES = {
  minimal: {
    id: 'minimal',
    label: 'Minimalist Vector Art',
    blurb: 'Clean line-art silhouettes',
  },
  glossy: {
    id: 'glossy',
    label: 'Stylized 3D Icons',
    blurb: 'Glossy gradients & depth',
  },
};

export const DEFAULT_SETTINGS = {
  boardTheme: 'wood', // Default ab 'wood' set ho gaya hai!
  pieceStyle: 'glossy',
  boardOrientation: 'white',
  clockEnabled: false,
  clockMinutes: 10,
  mode: 'local', 
  aiDifficulty: 'medium', 
  humanColor: 'w', 
  soundEnabled: true,
};

export const AI_DIFFICULTIES = [
  { id: 'easy', label: 'Easy', blurb: 'Fast, makes real mistakes' },
  { id: 'medium', label: 'Medium', blurb: 'Solid tactical lookahead' },
  { id: 'hard', label: 'Hard', blurb: 'Deep, punishing evaluation' },
];