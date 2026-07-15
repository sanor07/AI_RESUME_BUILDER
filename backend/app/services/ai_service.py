"""
AIService — the ONE place in the app that knows how to call an LLM.

Every route handler depends on this interface, never on the OpenAI SDK
directly. That means:
  - swapping providers later (Anthropic, local model, etc.) touches one file
  - the app runs and is fully testable with no API key at all (mock mode)
  - routes stay thin: validate -> build prompt -> call AIService -> shape response

Mock mode is not a toy: it returns realistic, deterministic, correctly-shaped
data so the frontend can be built and demoed before a key is ever added.
"""
import json
import logging

from app.core.config import get_settings
from app.prompts import resume_prompts as prompts

logger = logging.getLogger(__name__)


class AIServiceError(Exception):
    """Raised when the underlying provider fails or returns something we
    can't parse. Routes catch this and turn it into a 502."""


class AIService:
    def __init__(self):
        self.settings = get_settings()
        self._client = None
        if self.settings.ai_enabled:
            # Imported lazily so the package isn't a hard requirement in mock mode.
            from openai import OpenAI

            self._client = OpenAI(api_key=self.settings.OPENAI_API_KEY)

    # ── Public API ──────────────────────────────────────────────────

    def generate_summary(self, job_title: str, experiences: list[dict], skills: list[str]) -> str:
        system, user = prompts.summary_prompt(job_title, experiences, skills)
        if not self._client:
            return (
                f"Results-driven {job_title} with hands-on experience across "
                f"{', '.join(skills[:3]) or 'core tools of the trade'}. "
                "Known for translating requirements into reliable, well-tested "
                "solutions and collaborating effectively across teams."
            )
        return self._complete(system, user)

    def rewrite_experience(self, role: str, company: str, desc: str) -> str:
        system, user = prompts.rewrite_experience_prompt(role, company, desc)
        if not self._client:
            base = desc.strip() or f"Worked as {role} at {company}"
            return (
                f"- Delivered key responsibilities as {role} at {company or 'the organization'}\n"
                f"- {base[:80]}\n"
                "- Collaborated with cross-functional teams to meet project goals"
            )
        return self._complete(system, user)

    def generate_project_description(self, project_name: str, tech_stack: list[str], raw_notes: str) -> str:
        system, user = prompts.project_description_prompt(project_name, tech_stack, raw_notes)
        if not self._client:
            stack = ", ".join(tech_stack) or "modern web technologies"
            return (
                f"Built {project_name}, a project leveraging {stack} to solve a "
                f"real-world problem. {raw_notes or 'Delivered a functional, well-tested solution.'}"
            )
        return self._complete(system, user)

    def generate_skills(self, job_title: str, experience_summary: str) -> list[str]:
        system, user = prompts.skills_prompt(job_title, experience_summary)
        if not self._client:
            return [
                "Communication", "Problem Solving", "Teamwork", "Time Management",
                job_title.split()[0] if job_title else "Domain Expertise",
                "Project Management", "Analytical Thinking", "Adaptability",
            ]
        raw = self._complete(system, user)
        return self._parse_json(raw, default=[])

    def improve_resume(self, raw_resume_text: str) -> dict:
        system, user = prompts.improve_resume_prompt(raw_resume_text)
        if not self._client:
            return {
                "improved_text": raw_resume_text,
                "changes_summary": [
                    "Mock mode: add OPENAI_API_KEY to .env to enable real improvements."
                ],
            }
        raw = self._complete(system, user)
        return self._parse_json(raw, default={"improved_text": raw_resume_text, "changes_summary": []})

    def ats_score(self, resume_json: str) -> dict:
        system, user = prompts.ats_score_prompt(resume_json)
        if not self._client:
            return {
                "score": 72,
                "missing_keywords": ["leadership", "cross-functional"],
                "suggestions": ["Add measurable outcomes to each role", "Include a skills section keyword-matched to target roles"],
                "strengths": ["Clear structure", "Relevant skills listed"],
                "weaknesses": ["Summary is generic", "Few quantified achievements"],
            }
        raw = self._complete(system, user)
        return self._parse_json(raw, default={})

    def job_match(self, resume_json: str, job_description: str) -> dict:
        system, user = prompts.job_match_prompt(resume_json, job_description)
        if not self._client:
            return {
                "match_percentage": 68,
                "missing_skills": ["Docker", "CI/CD"],
                "missing_keywords": ["agile", "stakeholder management"],
                "suggestions": ["Mirror the job description's exact skill terminology", "Add a project demonstrating the missing skills"],
            }
        raw = self._complete(system, user)
        return self._parse_json(raw, default={})

    # ── Internals ───────────────────────────────────────────────────

    def _complete(self, system: str, user: str) -> str:
        try:
            resp = self._client.chat.completions.create(
                model=self.settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                temperature=0.7,
            )
            return resp.choices[0].message.content.strip()
        except Exception as exc:  # noqa: BLE001 — surfaced as a clean 502 by routes
            logger.exception("OpenAI call failed")
            raise AIServiceError(str(exc)) from exc

    @staticmethod
    def _parse_json(raw: str, default):
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            logger.warning("Model did not return valid JSON, using default. Raw: %s", raw[:200])
            return default


def get_ai_service() -> AIService:
    """FastAPI dependency factory."""
    return AIService()
