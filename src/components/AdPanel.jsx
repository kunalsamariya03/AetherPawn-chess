import React from 'react';
import { Megaphone, Sparkles } from 'lucide-react';

export default function AdPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl shadow-lg">
      <span className="absolute right-3 top-3 rounded-full border border-brass-500/30 bg-brass-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-brass-400">
        Sponsor Space
      </span>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brass-500/20 to-brass-600/10 shadow-inner">
          <Megaphone size={22} className="text-brass-400" />
        </div>

        <div className="min-w-0 pr-16">
          <p className="flex items-center gap-1.5 truncate font-display text-base font-medium text-parchment">
            Ads Coming Soon <Sparkles size={13} className="shrink-0 text-brass-400 animate-pulse" />
          </p>
          <p className="truncate text-xs text-muted">
            Monetization space ready for Google AdSense &amp; Brands.
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex w-full items-center justify-center rounded-xl border border-white/10 bg-black/20 py-2 text-xs font-medium text-muted/80 backdrop-blur-md">
        Partner Sponsorships Reserved
      </div>
    </div>
  );
}

// import React from 'react';
// import { Puzzle, ArrowUpRight, Sparkles } from 'lucide-react';

// export default function AdPanel() {
//   return (
//     <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800/80 to-ink-700/50 p-4">
//       <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted">
//         Sponsored
//       </span>
//       <div className="flex items-center gap-3">
//         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brass-500 to-brass-600 shadow-inner">
//           <Puzzle size={24} className="text-ink-950" />
//         </div>
//         <div className="min-w-0">
//           <p className="flex items-center gap-1 truncate font-display text-base text-parchment">
//             Sponsored Puzzle Challenge <Sparkles size={12} className="shrink-0 text-brass-400" />
//           </p>
//           <p className="truncate text-xs text-muted">Daily tactics, rated 1200–2400. New puzzle every morning.</p>
//         </div>
//       </div>
//       <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-brass-500/40 bg-brass-500/10 py-2 text-sm font-medium text-brass-300 transition hover:bg-brass-500/20">
//         Try today's puzzle
//         <ArrowUpRight size={14} />
//       </button>
//     </div>
//   );
// }
