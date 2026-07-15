# AI Resume Builder & Career Assistant

Converting the original vanilla-JS **ResuméForge** into a full-stack app:
React/Vite frontend + FastAPI backend + OpenAI-powered career tools.

## Status: Phase 2 complete (architecture scaffold)

- ✅ Frontend: Vite + React + Tailwind wired up, design tokens ported 1:1
  from the original `style.css`, routing, `ResumeContext` (state shape
  mirrors the old `script.js` globals), Axios client + AI service layer.
- ✅ Backend: FastAPI app boots, CORS configured, SQLAlchemy models,
  all 7 AI endpoints implemented against an `AIService` abstraction that
  runs in **mock mode** (no API key needed) until you add one.
- ⏭️ Phase 3 (next): convert the actual form/preview UI from `script.js`
  into React components and assemble the two-panel workspace.

## Quick start

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Visit `http://localhost:8000/api/docs` for interactive API docs.
Leave `OPENAI_API_KEY` blank in `.env` to run fully in mock mode.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`. Vite proxies `/api/*` to the backend automatically.

## Adding your OpenAI key later
Edit `backend/.env` and set `OPENAI_API_KEY=sk-...`. Nothing else changes —
`AIService` detects the key and switches from mock responses to real calls
automatically (see `backend/app/services/ai_service.py`).

## Folder structure
```
frontend/src/
  components/   # form + template + layout + ai components (Phase 3)
  contexts/     # ResumeContext — single source of truth for resume state
  services/     # api.js (Axios instance), aiService.js (one fn per endpoint)
  pages/        # BuilderPage (the two-panel workspace)

backend/app/
  api/routes/   # generation.py, analysis.py, health.py
  services/     # ai_service.py — the only file that talks to OpenAI
  prompts/      # prompt templates, kept separate from service logic
  models/       # SQLAlchemy ORM (Resume, GeneratedContent)
  schemas/      # Pydantic request/response models
  core/         # settings (env vars)
  database/     # engine/session setup
```

## Roadmap
- Phase 3 — convert `script.js` logic into React components (form panel,
  live preview, both resume templates)
- Phase 4 — (folded into Phase 2/3 above; backend already scaffolded)
- Phase 5 — AI features wired into the UI (buttons → aiService → live update)
- Phase 6 — ATS score UI
- Phase 7 — job description matching UI
- Phase 8 — PDF export polish
- Phase 9 — Docker
- Phase 10 — AWS App Runner deployment
