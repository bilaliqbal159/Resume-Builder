# Resume Builder

Fill out a form, watch your resume update in real time, and export it as a
clean PDF. No sign-up, no server — everything runs in your browser and saves
locally as you go.

**[Live Demo →](resumebuilderxo.netlify.app)**
## Features

- Live preview as you type
- Two resume templates (Classic and Modern)
- Drag-and-drop reordering for experience, education, and projects
- Month/year date pickers
- One-click PDF export
- Auto-saves to your browser's local storage — no account needed

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- react-to-print (PDF export)
- @dnd-kit (drag and drop)

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

Outputs to `dist/`, ready to deploy anywhere that serves static files (Netlify, Vercel, etc.).
