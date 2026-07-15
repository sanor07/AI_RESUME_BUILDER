"""
ORM models. Kept minimal for now — the frontend is the source of truth
for an in-progress resume (it lives in ResumeContext); persistence here
is for saved resumes and an audit trail of AI-generated content, not for
every keystroke.
"""
import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.session import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, default=_uuid)
    full_name = Column(String, nullable=False)
    job_title = Column(String, nullable=False)
    data_json = Column(Text, nullable=False)  # serialized resume payload (fields, skills, experiences, educations)
    template = Column(String, default="1")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    generated_content = relationship("GeneratedContent", back_populates="resume", cascade="all, delete-orphan")


class GeneratedContent(Base):
    """Audit trail of every AI generation, so results can be re-shown
    without re-calling the API and so usage can be reviewed later."""

    __tablename__ = "generated_content"

    id = Column(String, primary_key=True, default=_uuid)
    resume_id = Column(String, ForeignKey("resumes.id"), nullable=False)
    feature = Column(String, nullable=False)  # e.g. "summary", "ats_score", "job_match"
    prompt_input = Column(Text, nullable=False)
    result = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    resume = relationship("Resume", back_populates="generated_content")
