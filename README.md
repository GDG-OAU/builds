# GDG OAU Builder Jam Gallery

The official showcase and leaderboard web platform for **Google Developer Groups on Campus - Obafemi Awolowo University (GDG on Campus OAU) Builder Jam**.

Built with React, Vite, Tailwind CSS, Framer Motion, and Firebase.

---

## Features
- **GDG on Campus OAU Design & Animations:** Official 4-color palette (`#4285F4`, `#EA4335`, `#FBBC04`, `#188038`), bracket logo `{ < > }`, card animations, and confetti particle bursts.
- **Landing Page:** Interactive hero with live project counters, 9 track community cards, and "How It Works" guide.
- **Project Gallery:** Real-time search, filter by community track & Google tool, sort by newest, and responsive modal view with deep linking.
- **Submissions:** Validated form with GitHub URL checks, duplicate prevention, and screenshot upload (Firebase Storage + URL paste fallback).
- **Anti-Abuse Voting:** 1 vote per project, self-voting prevention, max 10 votes per account per day, and secret vote counts until voting is closed by an admin.
- **Dual-Tab Leaderboards:**
  - **Individual Board:** 40% Completeness (Demo link > Google tools > Description) + 30% Number of projects (capped at 3) + 30% Community votes (capped at 50).
  - **Community Board:** 70% Submission rate + 30% Multi-submission builder ratio, with "Coming Soon / Event Live Soon" badges.
  - Fully adjustable in `src/config/leaderboard.config.ts`.
- **Admin Console:** Whitelisted access for organizers (`rebeccaayodele08@gmail.com`) to delete projects, toggle voting open/close, edit community event dates, and export data to CSV.

---

## Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure Firebase (Optional for testing)
The app runs seamlessly in mock mode with 6 preloaded seed projects. When ready to connect your production Firebase project:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Firebase Web App credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 3. Run development server
```bash
pnpm dev
```

### 4. Build for production
```bash
pnpm run build
```
