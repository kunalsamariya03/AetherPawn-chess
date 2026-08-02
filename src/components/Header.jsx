import React from 'react';
import { Menu } from 'lucide-react';
import customLogo from '../assets/queen.webp';

export default function Header({ onOpenDrawer }) {
  return (
    <header className="w-full mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-xl transition-transform hover:scale-105">
          <img
            src={customLogo}
            alt="Chess Logo"
            className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wide text-parchment">AetherPawn</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Pass &amp; play, or play vs AI</p>
        </div>
      </div>

      <button
        onClick={onOpenDrawer}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-parchment/90 backdrop-blur-xl transition hover:bg-white/10 hover:border-brass-500/40"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}
