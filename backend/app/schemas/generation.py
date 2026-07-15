"""Request/response models for the AI generation endpoints."""
from pydantic import BaseModel, Field


class ExperienceItem(BaseModel):
    role: str = ""
    company: str = ""
    startDate: str = ""
    endDate: str = ""
    desc: str = ""


class GenerateSummaryRequest(BaseModel):
    job_title: str = Field(..., min_length=1)
    experiences: list[ExperienceItem] = []
    skills: list[str] = []


class GenerateSummaryResponse(BaseModel):
    summary: str


class RewriteExperienceRequest(BaseModel):
    role: str = Field(..., min_length=1)
    company: str = ""
    desc: str = Field(..., min_length=1)


class RewriteExperienceResponse(BaseModel):
    description: str
    rewritten: str | None = None


class GenerateProjectRequest(BaseModel):
    project_name: str = Field(..., min_length=1)
    tech_stack: list[str] = []
    raw_notes: str = ""


class GenerateProjectResponse(BaseModel):
    description: str


class GenerateSkillsRequest(BaseModel):
    job_title: str = Field(..., min_length=1)
    experience_summary: str = ""


class GenerateSkillsResponse(BaseModel):
    skills: list[str]


class ImproveResumeRequest(BaseModel):
    raw_resume_text: str = Field(..., min_length=1)


class ImproveResumeResponse(BaseModel):
    improved_text: str
    changes_summary: list[str]
