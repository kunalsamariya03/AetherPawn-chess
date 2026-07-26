// Each board theme provides:
//  - frameClass: Tailwind classes for the wrapper div that frames the board
//  - boardStyle: inline style object passed to react-chessboard's customBoardStyle
//  - lightSquareStyle / darkSquareStyle: inline style objects for the squares
//    (react-chessboard requires plain style objects here, so the hex values below
//    are the literal values behind their Tailwind-token equivalents, noted in comments)
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
    // light: frosted bright white glass | dark: deep charcoal obsidian glass
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
    // light: slate-100/70 tinted cyan | dark: slate-800/60 tinted cyan
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
    // light: amber-100 wood | dark: deep walnut brown
    lightSquareStyle: { backgroundColor: '#ead9b4' },
    darkSquareStyle: { backgroundColor: '#6b3f22' },
    accentGlow: 'shadow-glow',
    accentText: 'text-brass-400',
    accentRing: 'ring-brass-500/40',
  },
  neon: {
    id: 'neon',
    label: 'Futuristic Neon',
    blurb: 'Circuit-etched, high voltage',
    frameClass: 'bg-black border border-neon-cyan/30 shadow-2xl shadow-neon-cyan/20 rounded-2xl p-1 md:p-4',
    // Grid backdrop is expressed as an inline style (not a Tailwind arbitrary
    // class) since it contains raw spaces/commas that Tailwind's class
    // parser can't tokenize safely.
    frameStyle: {
      backgroundImage:
        'linear-gradient(rgba(62,242,208,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(62,242,208,0.06) 1px, transparent 1px)',
      backgroundSize: '16px 16px',
    },
    boardStyle: {
      borderRadius: '10px',
      boxShadow: '0 0 30px rgba(62,242,208,0.15)',
    },
    // light: near-black graphite | dark: deep violet
    lightSquareStyle: { backgroundColor: '#12141c' },
    darkSquareStyle: { backgroundColor: '#241a3d' },
    accentGlow: 'shadow-[0_0_24px_-2px_rgba(62,242,208,0.6)]',
    accentText: 'text-neon-cyan',
    accentRing: 'ring-neon-cyan/40',
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
  boardTheme: 'wood',
  pieceStyle: 'glossy',
  boardOrientation: 'white',
  clockEnabled: false,
  clockMinutes: 10,
};