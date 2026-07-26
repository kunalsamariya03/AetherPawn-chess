♟️ AetherPawn — Aesthetic Pass & Play Chess
A modern, high-performance, local 2-player chess web application featuring a sleek glassmorphism UI, custom SVG piece sets, interactive move histories, and dynamic themes. Built completely client-side — no signups, no backend latency, just instant chess.

✨ Features
🎨 Aesthetic Themes: Modern Glassmorphic, Vintage Wood Grain, and Futuristic Neon board presets.

♟️ Custom SVG Piece Sets: Crisp, scalable SVG piece rendering with "Minimalist Vector Art" and "Stylized 3D" variants.

⚡ Interactive Move Engine: Drag-and-drop or click-to-move, legal move highlights, check indicators, and promotion modals.

⏪ Move History Ledger: Full state-tree navigation — jump back-and-forth, review positions, and branch new moves.

⏱️ Pass & Play Clocks: Optional countdown timers optimized for casual over-the-board play.

💾 Auto-Persistence: Integrated localStorage engine saves your game state, themes, and timers across page refreshes.

📱 Mobile-Optimized Layout: Responsive board scaling with built-in ad placement placeholders.

🛠️ Tech Stack
Framework: React + Vite

Styling: Tailwind CSS (Glassmorphism & Custom Themes)

Chess Engine & Validation: chess.js

Board UI: react-chessboard

Visual FX: canvas-confetti

🚀 Quick Start
Prerequisites
Make sure you have Node.js installed on your system.

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/aetherpawn-chess.git
cd aetherpawn-chess
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

Build for Production:

Bash
npm run build
npm run preview
📁 Architecture & File Structure
Plaintext
src/
├── components/
│   ├── Board.jsx            # Interactive board, highlights, check indicators
│   ├── Sidebar.jsx          # Move history, captured pieces, controls, theme selector
│   ├── PromotionModal.jsx   # Pawn promotion selection UI
│   ├── VictoryModal.jsx     # End-of-game overlay with confetti celebration
│   └── AdPanel.jsx          # Mobile/Desktop ad banner space placeholder
├── hooks/
│   ├── useChessGame.js      # Core game logic, FEN history stack, undo/redo
│   └── useLocalStorage.js   # State persistence for game progress & settings
├── pieces/
│   ├── ChessPiece.jsx       # SVG Piece renderer
│   └── pieceSet.jsx         # Minimalist vector & 3D style definitions
└── data/
    └── themes.js            # Glassmorphic, Wood, & Neon style definitions
💡 Key Design Decisions
State Tree Undo/Redo Engine: Instead of relying solely on chess.undo(), the app maintains an array of full position FENs with an active index pointer. This allows seamless jump-to-move functionality in the Ledger and clean branching when making moves from a historical position.

Responsive Timer Mechanics: Clocks run for whichever side is active at the currently viewed state. Stepping back in history adjusts the clock focus accordingly, providing an intuitive pass-and-play experience.

Native Ad Placeholder Integration: Designed with monetization in mind, featuring non-intrusive ad unit containers optimized for responsive mobile/desktop layouts.

📄 License
Distributed under the MIT License. See LICENSE for more information.

Made with ❤️ and React.

What changed & why it's better:
Top Shields/Badges: GitHub repositories with tech badges look professional and well-maintained.

Features List with Emojis: Increases scannability for recruiters or open-source contributors.

Visual Tree Structure (/src): Makes the repository structure immediately understandable.

Clean Command Blocks: Properly formatted for quick copy-pasting.