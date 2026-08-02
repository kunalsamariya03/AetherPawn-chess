import React, { useState, useEffect } from 'react';
import { X, Bot, Users, Volume2, VolumeX, BookOpen, Wifi, WifiOff, Smartphone } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';
import BlogModal from './BlogModal.jsx';
import { AI_DIFFICULTIES } from '../data/themes.js';

export default function SideDrawer({ open, onClose, settings, onSettingsChange, onModeChange }) {
  const [blogOpen, setBlogOpen] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert("To install AetherPawn:\n\n• On Chrome / Android: Tap the 3 dots menu top-right and select 'Add to Home Screen' or 'Install App'.\n• On iPhone / Safari: Tap the Share button at bottom and select 'Add to Home Screen'.");
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/15 bg-ink-900/85 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto ledger-scroll p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl text-parchment">Menu</h2>
            <button onClick={onClose} aria-label="Close menu" className="text-muted hover:text-parchment">
              <X size={22} />
            </button>
          </div>

          <div className="mb-5 flex items-center gap-2 rounded-xl border border-white/10 bg-ink-800/60 px-3 py-2 text-xs">
            {online ? <Wifi size={14} className="text-emerald-400" /> : <WifiOff size={14} className="text-red-400" />}
            <span className="text-muted">{online ? 'Online' : 'Offline'} — everything here runs locally in your browser</span>
          </div>

          <section className="mb-5">
            <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted">Game mode</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onModeChange({ mode: 'local' })}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                  settings.mode === 'local'
                    ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                    : 'border-white/10 text-parchment/80 hover:bg-white/5'
                }`}
              >
                <Users size={15} /> Pass &amp; Play
              </button>
              <button
                onClick={() => onModeChange({ mode: 'ai' })}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                  settings.mode === 'ai'
                    ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                    : 'border-white/10 text-parchment/80 hover:bg-white/5'
                }`}
              >
                <Bot size={15} /> vs Computer
              </button>
            </div>
          </section>

          {settings.mode === 'ai' && (
            <section className="mb-5">
              <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted">AI difficulty</p>
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {AI_DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSettingsChange({ aiDifficulty: d.id })}
                    title={d.blurb}
                    className={`rounded-xl border px-2 py-2 text-xs transition ${
                      settings.aiDifficulty === d.id
                        ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                        : 'border-white/10 text-parchment/80 hover:bg-white/5'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted">Play as</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onModeChange({ humanColor: 'w' })}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    settings.humanColor === 'w'
                      ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                      : 'border-white/10 text-parchment/80 hover:bg-white/5'
                  }`}
                >
                  White
                </button>
                <button
                  onClick={() => onModeChange({ humanColor: 'b' })}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    settings.humanColor === 'b'
                      ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                      : 'border-white/10 text-parchment/80 hover:bg-white/5'
                  }`}
                >
                  Black
                </button>
              </div>
            </section>
          )}

          <section className="mb-5">
            <ThemeSelector settings={settings} onChange={onSettingsChange} />
          </section>

          <section className="mb-5">
            <button
              onClick={() => onSettingsChange({ soundEnabled: !settings.soundEnabled })}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-ink-800/60 px-3 py-2.5 text-sm text-parchment/90 transition hover:bg-white/5"
            >
              <span className="flex items-center gap-2">
                {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                Move sounds
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  settings.soundEnabled ? 'bg-brass-500/20 text-brass-300' : 'bg-white/5 text-muted'
                }`}
              >
                {settings.soundEnabled ? 'On' : 'Off'}
              </span>
            </button>
          </section>

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={handleInstallClick}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-brass-500 px-3 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-brass-500/20 transition hover:brightness-110 active:scale-[0.98]"
            >
              <Smartphone size={16} /> Install App
            </button>

            <button
              onClick={() => setBlogOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-brass-500/40 bg-brass-500/10 px-3 py-2.5 text-sm font-medium text-brass-300 transition hover:bg-brass-500/20"
            >
              <BookOpen size={16} /> Guides &amp; Rules
            </button>
          </div>
        </div>
      </aside>

      <BlogModal open={blogOpen} onClose={() => setBlogOpen(false)} />
    </>
  );
}