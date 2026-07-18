import { api } from './api.js';

/* ============================================================
   One function per backend AI endpoint (see backend/app/api/routes).
   Every function returns a plain promise of the response data —
   components handle loading/error state themselves, this layer
   just knows how to talk to the API.

   The backend's Pydantic schemas use snake_case (job_title,
   project_name, ...) while the rest of the frontend (ResumeContext,
   components) uses camelCase to match normal JS convention. This is
   the ONE place that translates between the two, so components never
   have to think about wire format.
   ============================================================ */

export function generateSummary({ jobTitle, experiences, skills }) {
  return api
    .post('generate-summary', { job_title: jobTitle, experiences, skills })
    .then((r) => r.data);
}

export function saveResume(resume) {
  return api.post('save-resume', { resume }).then((r) => r.data);
}

export function rewriteExperience({ role, company, desc }) {
  return api.post('rewrite-experience', { role, company, desc }).then((r) => r.data);
}

export function generateProjectDescription({ projectName, techStack, rawNotes }) {
  return api
    .post('generate-project', { project_name: projectName, tech_stack: techStack, raw_notes: rawNotes })
    .then((r) => r.data);
}

export function generateSkills({ jobTitle, experienceSummary }) {
  return api
    .post('generate-skills', { job_title: jobTitle, experience_summary: experienceSummary })
    .then((r) => r.data);
}

export function improveResume({ rawResumeText }) {
  return api
    .post('improve-resume', { raw_resume_text: rawResumeText })
    .then((r) => r.data);
}

export function getAtsScore({ resume }) {
  return api.post('ats-score', { resume }).then((r) => r.data);
}

export function matchJobDescription({ resume, jobDescription }) {
  return api
    .post('job-match', { resume, job_description: jobDescription })
    .then((r) => r.data);
}

export function exportPdf({ resume, template }) {
  return api.post('export-pdf', { resume, template }, { responseType: 'blob' }).then((r) => r.data);
}
