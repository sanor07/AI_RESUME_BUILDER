import json

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.analysis import (
    AtsScoreRequest, AtsScoreResponse,
    JobMatchRequest, JobMatchResponse,
)
from app.services.ai_service import AIService, AIServiceError, get_ai_service

router = APIRouter(tags=["analysis"])


@router.post("/ats-score", response_model=AtsScoreResponse)
def ats_score(req: AtsScoreRequest, ai: AIService = Depends(get_ai_service)):
    try:
        result = ai.ats_score(json.dumps(req.resume))
        return AtsScoreResponse(**result)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/job-match", response_model=JobMatchResponse)
def job_match(req: JobMatchRequest, ai: AIService = Depends(get_ai_service)):
    try:
        result = ai.job_match(json.dumps(req.resume), req.job_description)
        return JobMatchResponse(**result)
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
