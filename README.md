<div align="center">

  # ♟️ AetherPawn
  ### *Aesthetic & High-Performance Pass & Play Chess*

  <p align="center">
    A modern, sleek, zero-latency 2-player chess engine featuring custom 3D/Vector SVG sets, dynamic glassmorphism UI themes, interactive state history, and mobile-responsive layout scaling.
  </p>

</div>

---

## 🌟 Highlights

<table>
  <tr>
    <td width="50%">
      <h3>🎨 Dynamic Glassmorphism</h3>
      <p>Fluid dark mode glass UI, custom vector & 3D SVG piece options, and three board style presets (Glass, Wood, Neon).</p>
    </td>
    <td width="50%">
      <h3>⚡ State-Tree Undo / Redo</h3>
      <p>Full position history stack. Jump to any past move, preview outcomes, and branch off into new variations effortlessly.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📱 Mobile-First Scaling</h3>
      <p>Seamlessly scales from ultra-wide displays down to mobile devices with optimized layout containers and ad unit spaces.</p>
    </td>
    <td width="50%">
      <h3>💾 Zero-Lag Local Persistence</h3>
      <p>No backend, no signups needed. Automatically saves game states, clocks, and preferences locally in real-time.</p>
    </td>
  </tr>
</table>

---

## ✨ Features at a Glance

- **♟️ Custom SVG Piece Engines:** Choose between *Minimalist Line Vector* or *Stylized 3D Gradient* piece designs.
- **🛡️ Move Validation & Highlights:** Real-time move indicators, king check glow, and forced pawn promotion overlay modals.
- **⏱️ Pass-and-Play Clocks:** Integrated countdown timers that dynamically follow active turns across historical moves.
- **🎉 Confetti Celebrations:** Rich end-of-game victory modals powered by `canvas-confetti` on checkmate/time forfeits.
- **📈 Ad Unit Placeholders:** Non-intrusive 320x50 and 300x250 native ad container spots ready for monetization.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology / Library | Usage |
| :--- | :--- | :--- |
| **Frontend** | `React 18` + `Vite` | Fast client-side SPA runtime |
| **Styling** | `Tailwind CSS` | Utility-first glassmorphism & responsive layout |
| **Logic Engine** | `chess.js` | Rules validation, FEN parsing, check/mate detection |
| **Board UI** | `react-chessboard` | Smooth piece drag-and-drop & drop targets |
| **FX & Icons** | `canvas-confetti`, `lucide-react` | Celebrations & aesthetic UI icons |

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone [https://github.com/kunalsamariya03/AetherPawn-chess.git](https://github.com/kunalsamariya03/AetherPawn-chess.git)

# 2. Navigate to project directory
cd AetherPawn-chess

# 3. Install dependencies
npm install

# 4. Fire up the development server
npm run dev
Open http://localhost:5173 in your browser to start playing!

📁 Architecture & File Overview
Plaintext
AetherPawn/
├── src/
│   ├── components/
│   │   ├── Board.jsx          # Interactive board wrapper & legal move overlays
│   │   ├── Sidebar.jsx        # Move history Ledger, clocks, captured tray, theme selector
│   │   ├── PromotionModal.jsx # Pawn promotion picker
│   │   ├── VictoryModal.jsx   # Game-over modal with confetti trigger
│   │   └── AdPanel.jsx        # Responsive ad space layout
│   ├── hooks/
│   │   ├── useChessGame.js    # FEN history stack management, move engine logic
│   │   └── useLocalStorage.js # Auto-save state persistence engine
│   ├── pieces/
│   │   ├── ChessPiece.jsx     # SVG piece renderer dispatcher
│   │   └── pieceSet.jsx       # Custom Minimalist & 3D SVG piece definitions
│   └── data/
│       └── themes.js          # Glassmorphic, Vintage Wood & Neon theme definitions
└── public/                    # Static assets & icons
📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

Commit & Push karne ki commands:
README.md file me ye poora paste kar aur save kar de.

Terminal me ye 3 lines chala:

Bash
git add README.md
git commit -m "docs: upgrade to ultra aesthetic readme format"
git push origin main