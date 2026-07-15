"""Request/response models for the analysis endpoints (ATS score, job match)."""
from typing import Any

from pydantic import BaseModel, Field


class AtsScoreRequest(BaseModel):
    # Accepts the full resume object as-is from the frontend (ResumeContext
    # shape) rather than a rigid schema, since new resume fields shouldn't
    # require a backend change to keep working with this endpoint.
    resume: dict[str, Any] = Field(..., description="Full resume data object")


class AtsScoreResponse(BaseModel):
    score: int
    missing_keywords: list[str]
    suggestions: list[str]
    strengths: list[str]
    weaknesses: list[str]


class JobMatchRequest(BaseModel):
    resume: dict[str, Any]
    job_description: str = Field(..., min_length=1)


class JobMatchResponse(BaseModel):
    match_percentage: int
    missing_skills: list[str]
    missing_keywords: list[str]
    suggestions: list[str]
