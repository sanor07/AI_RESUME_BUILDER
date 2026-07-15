"""
Prompt templates for each AI feature.

Kept separate from app/services/ai_service.py on purpose: prompts get
iterated on constantly (wording, few-shot examples, tone) and that
churn shouldn't touch the service/API-calling logic at all.

Every function returns (system_prompt, user_prompt).
"""


def summary_prompt(job_title: str, experiences: list[dict], skills: list[str]) -> tuple[str, str]:
    system = (
        "You are an expert resume writer. Write a concise, ATS-friendly "
        "professional summary (2-3 sentences, no first person pronouns, "
        "no generic filler like 'hardworking team player'). Return only "
        "the summary text, nothing else."
    )
    exp_lines = "\n".join(
        f"- {e.get('role', '')} at {e.get('company', '')}: {e.get('desc', '')}"
        for e in experiences
        if e.get("role") or e.get("company")
    ) or "- (no prior experience listed)"
    user = (
        f"Target role: {job_title}\n"
        f"Skills: {', '.join(skills) or '(none listed)'}\n"
        f"Experience:\n{exp_lines}\n\n"
        "Write the professional summary."
    )
    return system, user


def rewrite_experience_prompt(role: str, company: str, desc: str) -> tuple[str, str]:
    system = (
        "You are an expert resume writer. Rewrite the given work experience "
        "description into 2-4 professional, achievement-oriented bullet points. "
        "Use strong action verbs, quantify impact where plausible, and keep each "
        "bullet under 20 words. Return only the bullets, one per line, each "
        "starting with '- '."
    )
    user = f"Role: {role}\nCompany: {company}\nOriginal description:\n{desc}"
    return system, user


def project_description_prompt(project_name: str, tech_stack: list[str], raw_notes: str) -> tuple[str, str]:
    system = (
        "You are an expert resume writer. Write a professional 2-3 sentence "
        "project description suitable for a resume, highlighting the problem "
        "solved, the technical approach, and the outcome/impact. Return only "
        "the description."
    )
    user = (
        f"Project: {project_name}\n"
        f"Tech stack: {', '.join(tech_stack) or '(not specified)'}\n"
        f"Notes: {raw_notes or '(none provided)'}"
    )
    return system, user


def skills_prompt(job_title: str, experience_summary: str) -> tuple[str, str]:
    system = (
        "You are an expert resume writer and technical recruiter. Suggest "
        "8-12 relevant skills (mix of technical and soft skills as appropriate "
        "for the role) for the given job title and experience. Return ONLY a "
        "JSON array of strings, nothing else, no markdown fences."
    )
    user = f"Job title: {job_title}\nExperience summary: {experience_summary or '(not provided)'}"
    return system, user


def improve_resume_prompt(raw_resume_text: str) -> tuple[str, str]:
    system = (
        "You are an expert resume editor. Improve grammar, tighten language, "
        "and improve ATS compatibility (clear section structure, standard "
        "terminology, quantified achievements) of the given resume text. "
        "Return ONLY a JSON object with two keys: 'improved_text' (the full "
        "improved resume as plain text) and 'changes_summary' (a JSON array "
        "of short strings describing what changed). No markdown fences."
    )
    user = raw_resume_text
    return system, user


def ats_score_prompt(resume_json: str) -> tuple[str, str]:
    system = (
        "You are an ATS (Applicant Tracking System) compatibility analyzer. "
        "Score the given resume from 0-100 on ATS-friendliness. Return ONLY "
        "a JSON object with keys: 'score' (int 0-100), 'missing_keywords' "
        "(array of strings), 'suggestions' (array of strings), 'strengths' "
        "(array of strings), 'weaknesses' (array of strings). No markdown fences."
    )
    user = f"Resume data (JSON):\n{resume_json}"
    return system, user


def job_match_prompt(resume_json: str, job_description: str) -> tuple[str, str]:
    system = (
        "You compare a resume against a job description. Return ONLY a JSON "
        "object with keys: 'match_percentage' (int 0-100), 'missing_skills' "
        "(array of strings), 'missing_keywords' (array of strings), "
        "'suggestions' (array of strings). No markdown fences."
    )
    user = f"Resume data (JSON):\n{resume_json}\n\nJob description:\n{job_description}"
    return system, user
