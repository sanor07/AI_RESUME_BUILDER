import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.resume import GeneratedContent, Resume

router = APIRouter(tags=["persistence"])


@router.post("/save-resume")
def save_resume(payload: dict, db: Session = Depends(get_db)):
    try:
        resume_data = payload.get("resume") or {}
        resume_text = json.dumps(resume_data)
        resume = Resume(
            full_name=resume_data.get("fields", {}).get("fullName", "Untitled"),
            job_title=resume_data.get("fields", {}).get("jobTitle", ""),
            data_json=resume_text,
            template=str(resume_data.get("currentTemplate", 1)),
        )
        db.add(resume)
        db.commit()
        db.refresh(resume)
        return {"id": resume.id, "saved": True}
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        raise HTTPException(status_code=500, detail=str(exc)) from exc
