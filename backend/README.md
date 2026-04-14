# Backend (FastAPI)

## Quick start
1) Copy `.env.example` to `.env` and set secrets: `SECRET_KEY`, optional DB/Redis URLs.
2) Run the stack: `docker compose up -d backend db redis`.
3) Apply migrations: `docker compose run --rm backend alembic upgrade head`.
4) (Optional) Start workers/Flower: `docker compose up -d celery_worker celery_beat flower`.

## Local (without Docker)
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # or .venv\\Scripts\\activate on Windows
pip install -r requirements.txt
export $(cat ../.env | xargs)  # or set variables manually on Windows
alembic upgrade head
uvicorn app.main:app --reload
```

Docs live at `http://localhost:8000/docs`.
