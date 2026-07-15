# AI Resume Builder & Career Assistant

An AI-powered Resume Builder and Career Assistant that helps users create professional resumes, improve resume quality using AI, analyze ATS compatibility, match resumes with job descriptions, and export polished resumes as PDF.

---

## Features

- AI Professional Summary Generation
- AI Skills Generation
- AI Project Description Generation
- AI Experience Rewrite
- Resume Improvement Suggestions
- ATS Score Analysis
- Job Match Analysis
- Two Professional Resume Templates
- Live Resume Preview
- Photo Upload
- PDF Export
- Docker Support
- FastAPI REST API
- Responsive UI

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Python
- OpenAI API
- Pydantic

### Database
- SQLite

### DevOps
- Docker
- Docker Compose
- Git
- GitHub

---

## Project Structure

```
AI_RESUME_BUILDER
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── app
│   ├── requirements.txt
│   └── .env.example
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Installation

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env

uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## Docker

Build and run:

```bash
docker compose up --build
```

---

## AI Features

- Generate Professional Summary
- Generate Skills
- Rewrite Experience
- Generate Project Description
- Improve Resume
- ATS Score
- Job Match

---

## Resume Features

- Executive Template
- Modern Template
- Live Preview
- Photo Upload
- Contact Information
- Skills
- Experience
- Projects
- Education
- PDF Export

---

## Screenshots

(Add screenshots here before final submission.)

---

## Future Improvements

- Streaming AI responses
- More resume templates
- Cover Letter Generator
- Multi-language support
- Authentication
- Cloud storage
- Resume history
- Interview preparation

---

## Deployment

- GitHub Repository ✅
- Docker ✅
- AWS App Runner (Pending account activation)

---

## Author

**Sanowar Hussain**

GitHub:

https://github.com/sanor07

---

## License

This project is developed for educational purposes.