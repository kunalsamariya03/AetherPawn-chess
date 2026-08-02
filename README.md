<div align="center">

  # ♟️ AetherPawn
  ### *Aesthetic Chess — Pass & Play, or Play vs Computer*

  <p align="center">
    A modern, sleek, zero-latency chess app: local 2-player pass-and-play <em>or</em> a fully client-side Stockfish AI opponent, custom 3D/Vector SVG piece sets, dynamic glassmorphism UI themes, interactive move history, and mobile-responsive layout scaling. No backend, no login.
  </p>

</div>

---

## 🌟 What's new in v2.0

- **🤖 Play vs Computer:** A Stockfish chess engine running entirely in a browser Web Worker — Easy / Medium / Hard difficulty, choose White or Black. Zero server round-trip.
- **☰ Hamburger drawer:** Mode switcher, AI difficulty & side, board/piece theme picker, move-sound toggle, and a Guides & Rules panel, all in one sliding glassmorphic drawer.
- **📖 Guides & Rules modal:** Embedded gameplay video slot, quick chess rules, and practice tips.
- **🔍 SEO pass:** `og:site_name` + JSON-LD `WebSite` schema so Google has a clear brand name to show, plus a refreshed title/description/keywords.
- **♟️ Bigger, richer pieces:** pieces now fill ~88% of each square, with a brighter gradient and a clipped specular highlight for a more tactile, 3D look.

## ✨ Features at a Glance

- **♟️ Custom SVG Piece Engines:** Choose between *Minimalist Line Vector* or *Stylized 3D Gradient* piece designs.
- **🤖 Client-side AI:** Stockfish via Web Worker, three difficulty presets, no backend.
- **🛡️ Move Validation & Highlights:** Real-time move indicators, king check glow, and forced pawn promotion overlay modal.
- **⏱️ Pass-and-Play Clocks:** Integrated countdown timers that dynamically follow active turns across historical moves.
- **🎉 Confetti Celebrations:** Rich end-of-game victory modals powered by `canvas-confetti` on checkmate/time forfeits.
- **🔊 Move sounds:** Lightweight synthesized move/capture/check tones, mutable from the drawer.
- **📈 Ad Unit Placeholder:** Non-intrusive native ad container spot ready for monetization.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology / Library | Usage |
| :--- | :--- | :--- |
| **Frontend** | `React 18` + `Vite` | Fast client-side SPA runtime |
| **Styling** | `Tailwind CSS` | Utility-first glassmorphism & responsive layout |
| **Logic Engine** | `chess.js` | Rules validation, FEN parsing, check/mate detection |
| **AI Opponent** | `Stockfish` (loaded from CDN as a Web Worker) | Client-side move search, no server |
| **Board UI** | `react-chessboard` | Smooth piece drag-and-drop & drop targets |
| **FX & Icons** | `canvas-confetti`, `lucide-react` | Celebrations & aesthetic UI icons |
| **Analytics** | `@vercel/analytics`, `@vercel/speed-insights` | Deployment analytics on Vercel |

> **Note on the AI:** `useStockfishAI.js` loads Stockfish from a public CDN
> (`cdnjs.cloudflare.com/.../stockfish.js`) as a classic Web Worker, rather than
> as an npm dependency. This sidesteps Vite's wasm/worker bundling quirks and
> keeps `package.json` unchanged. It still runs 100% client-side — the CDN is
> only where the *file* comes from, not a server that plays moves for you. If
> you'd rather self-host the engine file, download it into `/public` and swap
> `ENGINE_URL` in `useStockfishAI.js`.

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/kunalsamariya03/AetherPawn-chess.git

# 2. Navigate to project directory
cd AetherPawn-chess

# 3. Install dependencies
npm install

# 4. Fire up the development server
npm run dev
```

Open http://localhost:5173 in your browser to start playing!

## 📁 Architecture & File Overview

```
AetherPawn/
├── index.html                  # SEO meta, OpenGraph, JSON-LD WebSite schema
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Logo/title bar + hamburger button
│   │   ├── SideDrawer.jsx       # Sliding glassmorphic drawer (mode, AI, theme, sound, guides)
│   │   ├── BlogModal.jsx        # Guides & Rules modal (video slot, rules, tips)
│   │   ├── Board.jsx            # Interactive board wrapper & legal move overlays
│   │   ├── Sidebar.jsx          # Move history Ledger, clocks, captured tray
│   │   ├── PromotionModal.jsx   # Pawn promotion picker
│   │   ├── VictoryModal.jsx     # Game-over modal with confetti trigger
│   │   └── AdPanel.jsx          # Responsive ad space layout
│   ├── hooks/
│   │   ├── useChessGame.js      # FEN history stack, move engine logic, mutable sound
│   │   ├── useStockfishAI.js    # Stockfish Web Worker wrapper + difficulty presets
│   │   └── useLocalStorage.js   # Auto-save state persistence engine
│   ├── pieces/
│   │   ├── ChessPiece.jsx       # SVG piece renderer dispatcher
│   │   └── pieceSet.jsx         # Custom Minimalist & 3D SVG piece definitions
│   └── data/
│       └── themes.js            # Board/piece themes + default settings (incl. AI/mode)
└── public/                      # Static assets, favicon, Google site verification file
```

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
