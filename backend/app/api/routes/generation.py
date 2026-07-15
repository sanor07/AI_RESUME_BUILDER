from fastapi import APIRouter, Depends, HTTPException

from app.schemas.generation import (
    GenerateProjectRequest, GenerateProjectResponse,
    GenerateSkillsRequest, GenerateSkillsResponse,
    GenerateSummaryRequest, GenerateSummaryResponse,
    ImproveResumeRequest, ImproveResumeResponse,
    RewriteExperienceRequest, RewriteExperienceResponse,
)
from app.services.ai_service import AIService, AIServiceError, get_ai_service

router = APIRouter(tags=["generation"])


@router.post("/generate-summary", response_model=GenerateSummaryResponse)
def generate_summary(req: GenerateSummaryRequest, ai: AIService = Depends(get_ai_service)):
    try:
        summary = ai.generate_summary(
            req.job_title, [e.model_dump() for e in req.experiences], req.skills
        )
        return GenerateSummaryResponse(summary=summary)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/rewrite-experience", response_model=RewriteExperienceResponse)
def rewrite_experience(req: RewriteExperienceRequest, ai: AIService = Depends(get_ai_service)):
    try:
        rewritten = ai.rewrite_experience(req.role, req.company, req.desc)
        return RewriteExperienceResponse(description=rewritten, rewritten=rewritten)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/generate-project", response_model=GenerateProjectResponse)
def generate_project(req: GenerateProjectRequest, ai: AIService = Depends(get_ai_service)):
    try:
        description = ai.generate_project_description(req.project_name, req.tech_stack, req.raw_notes)
        return GenerateProjectResponse(description=description)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/generate-skills", response_model=GenerateSkillsResponse)
def generate_skills(req: GenerateSkillsRequest, ai: AIService = Depends(get_ai_service)):
    try:
        skills = ai.generate_skills(req.job_title, req.experience_summary)
        return GenerateSkillsResponse(skills=skills)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/improve-resume", response_model=ImproveResumeResponse)
def improve_resume(req: ImproveResumeRequest, ai: AIService = Depends(get_ai_service)):
    try:
        result = ai.improve_resume(req.raw_resume_text)
        return ImproveResumeResponse(**result)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
