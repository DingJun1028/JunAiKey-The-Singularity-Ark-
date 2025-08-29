# JunAiKey 奇點方舟 (The Singularity Ark)

**A co-evolving, AI-powered personal operating system designed for knowledge management, code evolution, and creative generation.**

---

## 核心願景 (Core Vision)

In a world of digital fragmentation, JunAiKey serves as a personal Terminus Matrix—an AI-powered operating system that co-evolves with the user. Its purpose is to intelligently self-organize, proactively respond to personal goals, and transform the complexity of information into an augmented, intuitive capability.

Every piece of data within the system—be it a note, a proposal, or a code blueprint—is transformed into a beautifully designed, interactive **Omni-Card**. This unified interface ensures aesthetic consistency and seamless interaction, turning abstract data into tangible, actionable entities.

## ✨ 核心功能 (Core Features)

JunAiKey is structured around four primary **Realms**, each housing a distinct set of functionalities:

#### 1. 核心矩陣 (Core Matrix)
The command center of your digital space.
- **儀表板 (Dashboard):** An at-a-glance overview of your notes, proposals, and knowledge constellation (tag cloud).
- **萬能智卡 (Aitable):** A powerful, unified interface to view, filter, and search all Omni-Cards (notes, proposals, etc.) in one place.
- **通用同步中樞 (Universal Sync Hub):** A (mock) data shuttle powered by "Boost.space" to sync your matrix with external applications.

#### 2. 知識聖殿 (Knowledge Sanctum)
Where thoughts are captured, refined, and distilled.
- **萬能筆記 (Omni-Notes):** A feature-rich, Markdown-enabled note-taking system with AI-powered tag generation and a persistent draft system.
- **智慧聖殿 (Wisdom Sanctum):** An interactive architectural blueprint of the JunAiKey system itself, complete with an AI-powered TCG deck-building simulator to demonstrate system logic.

#### 3. 創生螺旋 (Genesis Spiral)
The engine for AI-driven creation and interaction.
- **神諭創生 (Agent Evolution):** Generate fully functional, self-contained React components from natural language prompts using the Gemini API, complete with a step-by-step "Chain-of-Thought" analysis.
- **矩陣控制台 (Matrix Console):** A persistent, streaming chat interface with the "Oracle" (a Gemini-powered AI) for direct queries and assistance.
- **自主通典室 (Codex Chamber):** Propose new features for the system. Other users (and yourself) can add "Resonance" to proposals, and you can use the Oracle to simulate their potential impact.

#### 4. 召喚使中樞 (Summoner's Nexus)
The heart of your co-evolutionary journey.
- **三位一體成長系統 (Trinity Growth System):** A unique, gamified progression system where your interactions with the app grant EXP to 12 distinct "Element Spirits" and their corresponding "Avatars," unlocking milestones and demonstrating your mastery over the system.
- **介面佈局 (UI Layout):** A drag-and-drop interface to fully customize the order of the main Realms and the navigation items within each Realm's sidebar.
- **主題自訂 (Theme Customization):** A powerful theme editor that allows you to change the application's entire color palette and typography in real-time, with changes persisting across sessions.

---

## 🛠️ 技術架構 (Technical Architecture)

JunAiKey is built on a modern, robust, and decoupled frontend architecture. The core philosophy is "State-Driven UI."

- **核心框架 (Framework):** **React 19** using functional components and hooks.
- **狀態管理 (State Management):** **Zustand** provides a centralized, lightweight, and powerful store for all global state. All user-generated data (notes, customizations, summoner progress) is persisted to the browser's `localStorage`, ensuring data sovereignty and full offline functionality.
- **樣式系統 (Styling):** **Tailwind CSS** is used for utility-first styling. It is uniquely combined with a **Dynamic CSS Variable System** managed by the `ThemeStore`. This allows the entire application's look and feel to be generated or modified in real-time without a build step.
- **AI 核心 (AI Core):** The official **`@google/genai`** SDK is used for all interactions with the Google Gemini API, including text generation, function calling (JSON mode), and streaming chat.
- **路由 (Routing):** **`react-router-dom`** handles all client-side navigation.
- **零依賴打包 (Zero-Dependency Bundling):** The project uses `es-module-shims` and browser-native ES Modules via import maps. This means there is **no build step required**; simply open `index.html` in a browser.

---

## 🚀 開始使用 (Getting Started)

As this project requires no build process, getting started is simple.

1.  Clone or download the repository.
2.  Open the `index.html` file in a modern web browser (like Chrome, Firefox, or Edge).
3.  The application will load with pre-seeded data for demonstration.

### Connecting the AI Oracle

To unlock the AI-powered features (component generation, AI chat, tag generation, etc.), you must provide a Google Gemini API Key.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2.  In the application, click the **"設定 (Settings)"** icon in the bottom-left sidebar.
3.  Paste your API key into the input field and click **"儲存並連接 (Save & Connect)"**.
4.  The application will verify the key. Upon success, all AI features will be enabled. Your key is stored securely and exclusively in your browser's local storage.

---

## 📁 檔案結構 (File Structure)

The project is organized to maintain a clear separation of concerns.

```
/
├── components/       # Reusable React components (Cards, Icons, Modals)
│   ├── icons/        # SVG icon components
│   └── ...
├── core/             # Core app logic and data definitions (navigation, growth system)
├── hooks/            # Custom React hooks for shared logic (useDebounce, useUndoRedo)
├── pages/            # Top-level components for each route/page
├── services/         # Modules for interacting with APIs (Gemini, mock Boost.space)
├── store/            # Zustand stores for global state management
├── utils/            # Helper functions (Markdown formatting, etc.)
├── App.tsx           # Main application component with routing
├── index.html        # The entry point of the application
├── index.tsx         # React root renderer
└── README.md         # This file
```
