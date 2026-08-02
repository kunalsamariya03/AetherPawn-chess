import React, { useId } from 'react';

// Self-contained, hand-drawn silhouettes for all six piece types.
// Each shape is defined once; color + rendering style (minimal vs glossy)
// are applied on top via fills/gradients/filters so we never depend on
// external image assets or network fetches.

const SHAPES = {
  p: (
    <>
      <circle cx="50" cy="30" r="13" />
      <path d="M40 46 C40 40 44 36 50 36 C56 36 60 40 60 46 L66 72 L34 72 Z" />
      <rect x="30" y="72" width="40" height="8" rx="2" />
    </>
  ),
  r: (
    <>
      <rect x="30" y="24" width="9" height="12" />
      <rect x="45.5" y="24" width="9" height="12" />
      <rect x="61" y="24" width="9" height="12" />
      <rect x="30" y="34" width="40" height="8" />
      <path d="M35 42 L65 42 L61 72 L39 72 Z" />
      <rect x="28" y="72" width="44" height="8" rx="2" />
    </>
  ),
  n: (
    <>
      <path
        d="M32 78 L32 64 C32 58 35 54 39 51 L33 47 C29 43 29 37 33 32 L44 20 C48 16 54 15 60 17 L69 21 C73 23 75 27 74 32 L71 40 C77 42 71 20 81 58 L81 78 Z"
      />
      <circle cx="47" cy="30" r="2.4" className="piece-eye" />
      <rect x="28" y="78" width="46" height="7" rx="2" />
    </>
  ),
  b: (
    <>
      <circle cx="50" cy="16" r="4.5" />
      <path d="M50 22 C40 24 34 32 34 40 C34 47 39 52 43 55 L36 74 L64 74 L57 55 C61 52 66 47 66 40 C66 32 60 24 50 22 Z" />
      <rect x="42" y="46" width="4" height="9" transform="rotate(35 44 50)" className="piece-slit" />
      <rect x="30" y="74" width="40" height="8" rx="2" />
    </>
  ),
  q: (
    <>
      <circle cx="26" cy="22" r="4.2" />
      <circle cx="50" cy="14" r="4.6" />
      <circle cx="74" cy="22" r="4.2" />
      <circle cx="38" cy="17" r="4" />
      <circle cx="62" cy="17" r="4" />
      <path d="M26 24 L74 24 L68 44 C72 47 74 51 74 55 C74 60 70 63 66 65 L60 78 L40 78 L34 65 C30 63 26 60 26 55 C26 51 28 47 32 44 Z" />
      <rect x="28" y="78" width="44" height="8" rx="2" />
    </>
  ),
  k: (
    <>
      <rect x="47" y="8" width="6" height="14" rx="1" />
      <rect x="41" y="14" width="18" height="6" rx="1" />
      <path d="M32 26 L68 26 L64 46 C69 49 72 53 72 58 C72 64 66 68 60 70 L64 80 L36 80 L40 70 C34 68 28 64 28 58 C28 53 31 49 36 46 Z" />
      <rect x="26" y="80" width="48" height="8" rx="2" />
    </>
  ),
};

const VIEWBOX = '0 0 100 96';

export default function ChessPiece({ type, color, styleId = 'glossy', size = 56 }) {
  const uid = useId();
  const isWhite = color === 'w';
  const glossy = styleId === 'glossy';

  const gradId = `grad-${uid}`;
  const shadowId = `shadow-${uid}`;

  const fill = glossy
    ? `url(#${gradId})`
    : isWhite
    ? '#f1ede4'
    : '#2b2f38';

  const stroke = isWhite ? (glossy ? '#7a6a3a' : '#3f3a2c') : glossy ? '#000000' : '#0d0f13';
  const strokeWidth = glossy ? 1.4 : 2.2;

  return (
    <svg
      viewBox={VIEWBOX}
      width={size}
      height={size}
      style={{ filter: glossy ? `drop-shadow(0 4px 4px rgba(0,0,0,0.55))` : 'none' }}
    >
      <defs>
        {glossy && isWhite && (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f2ede0" />
            <stop offset="70%" stopColor="#d8cba3" />
            <stop offset="100%" stopColor="#a8996b" />
          </linearGradient>
        )}
        {glossy && !isWhite && (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7180" />
            <stop offset="35%" stopColor="#3a3f4c" />
            <stop offset="70%" stopColor="#1c1f27" />
            <stop offset="100%" stopColor="#08090b" />
          </linearGradient>
        )}
        <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        {glossy && (
          <radialGradient id={`spec-${uid}`} cx="35%" cy="18%" r="45%">
            <stop offset="0%" stopColor={isWhite ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)'} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        )}
        <clipPath id={`clip-${uid}`}>{SHAPES[type]}</clipPath>
      </defs>

      <ellipse cx="50" cy="90" rx="26" ry="5" fill={`url(#${shadowId})`} />

      <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
        {SHAPES[type]}
      </g>
      {glossy && (
        <g clipPath={`url(#clip-${uid})`} style={{ pointerEvents: 'none' }}>
          <ellipse cx="42" cy="22" rx="16" ry="10" fill={`url(#spec-${uid})`} />
        </g>
      )}
    </svg>
  );
}
