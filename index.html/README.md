# The White Room Archives • 2026

A premium, world-class, 100% free digital library dedicated to behavioral psychology, emotional regulation, decision-making matrices, core self-discipline, and tactical interpersonal communication.

## ☯ Mission Statement

To democratize elite psychological intelligence and tactical decision-making frameworks. We believe that critical cognitive tools should never be stored under expensive paywalls, locked memberships, or annoying advertisement margins. All knowledge is completely free, open-access, and public service forever.

---

## 🎨 Design Philosophy (Luxury Minimalism)

*   **Japanese architectural vibe**: Minimalist layout featuring spacious negative space, thin high-contrast borders, and professional grid lines.
*   **Editorial Typography**: Highly readable pairing of **Playfair Display** (traditional editorial body font) and **Inter** (clean general UI) combined with **JetBrains Mono** for structural statistics and indicators.
*   **State-driven comfort**: Integrated local storage synchronization, light/dark modes, custom text sizes, and font-families adjustments.

---

## 🏗 Folder Architecture

```text
/
├── server.ts                 # Full-stack Express backend with server-side Gemini AI integration
├── package.json              # Full project scripts compiling Client & Server (esbuild commonJS)
├── vite.config.ts            # Vite asset configurations
├── metadata.json             # AI Studio general application permission and capabilities index
├── src/
│   ├── App.tsx               # Main routing tab router, daily lesson engines and quote carousels
│   ├── main.tsx              # React client initial mount file
│   ├── index.css             # Unified CSS declarations importing Playfair and Inter fonts
│   ├── types.ts              # Declarative TypeScript interfaces for handbook rules and notes
│   ├── data/
│   │   ├── store.ts          # Core react state manager synchronizing notes and streaks locally
│   │   ├── books.ts          # Handbooks catalog dataset combined with index definitions
│   │   ├── quizzes.ts        # Auditing laboratory questions dataset
│   │   └── roadmaps.ts       # Sequential learning milestones dataset
│   └── components/
│       ├── Navbar.tsx        # Navigation tabs, growth indicators, and theme switches
│       ├── HeroSection.tsx   # Premium hero banner and the Free Will Manifesto
│       ├── LibraryExplorer.5 # Index browser mapping Handbook indexes
│       ├── ReadingInterface. # Long-form reader panel, Scholar chat panels and note pads
│       ├── UserDashboard.tsx # Combined progress dashboard, highlights index, and daily rituals
│       ├── QuizSystem.tsx    # Multiple choice psychological audits
│       └── RoadmapsView.tsx  # Timeline milestones for sequential study
```

---

## ⚡ Key Technical Features

### 1. Server-Side AI Reading Assistant
All calls to the Gemini API are handled securely on the server via `server.ts` to keep `process.env.GEMINI_API_KEY` hidden from the client browser. Under `src/components/ReadingInterface.tsx`, readers select lines or use the scholar chat box to ask deep, contextual prompt innuendos.

### 2. Infinite Dynamic handbook Formulator
To avoid hitting bundle limits, handbooks pre-load core handcrafted samples. However, all remaining 100 Rules, 50 Scenarios, and 12 Chapters contain AI hooks. Clicking them commands the server (`/api/generate-content`) to compile an intellectually superior, beautifully formulated textbook page live!

### 3. Integrated Growth Scoring Lab
An auditing laboratory testing psychological biases, de-escalation, and leverage. Correct answers award `+30 PTS` directly in the user profile store, increasing their global Level.

---

## 🎛 Environment Variables (`.env`)

Create a `.env` file at root level:

```env
# REQUIRED: Your Secure API Key from Google AI Studio Secrets Panel
GEMINI_API_KEY="YOUR_API_KEY_HERE"

# OPTIONAL: Host URL for self-referring references inside production environments
APP_URL="http://localhost:3000"
```

---

## 💻 Local Setup Guide

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Launch the full-stack development server**:
    ```bash
    npm run dev
    ```
    *Access the live client inside browser at `http://localhost:3000`*

3.  **Compile production bundle**:
    ```bash
    npm run build
    ```
    *This runs `vite build` for standard React client assets and compiles the backend into `dist/server.cjs` using esbuild.*

4.  **Launch Production Server**:
    ```bash
    npm run start
    ```

---

## ⚙ GitHub Actions Deployment Workflow (`.github/workflows/deploy.yml`)

The project is fully modular and compatible with Cloud Run, Vercel, or Heroku. Here is a baseline deployment workflow to target a container container registry:

```yaml
name: Continuous Integration & Deploy

on:
  push:
    branches: [ "main" ]

jobs:
  build_and_validate:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
```
