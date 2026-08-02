import React from 'react';
import { ShieldAlert, Eye, X } from 'lucide-react';

export default function TournamentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-brass-500/30 bg-ink-800/80 p-8 text-center shadow-2xl shadow-black/60 backdrop-blur-xl animate-floatIn">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-muted hover:text-parchment"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-brass-500/40 bg-brass-500/10">
          <ShieldAlert size={28} className="text-brass-400" />
        </div>

        <h2 className="font-display text-3xl tracking-wide text-parchment">
          Tournament Mode
        </h2>
        <p className="mt-2 text-sm text-muted">
          You can only view previous moves, you cannot change them. This application strictly follows official tournament rules.
        </p>

        {/* Future Native Ad Slot Container
        <div className="my-5 rounded-2xl border border-white/5 bg-ink-900/50 p-4 text-xs text-muted/60">
          {/* Yahan baad me apna Native Ad component ya script insert kar dena */}
          {/* <span>[ Native Ad Space ]</span>
        </div> */}

        <button
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brass-500 px-5 py-2.5 font-medium text-ink-950 transition hover:bg-brass-400"
        >
          <Eye size={16} />
          Understood
        </button>
      </div>
    </div>
  );
}