import { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { improveResume, getAtsScore, matchJobDescription } from '../../services/aiService.js';

export default function AiPanel({ onExport }) {
  const { state, actions } = useResume();
  const [tab, setTab] = useState('improve');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const buildResumeText = () => {
    const sections = [];
    if (state.fields.fullName) sections.push(`Name: ${state.fields.fullName}`);
    if (state.fields.jobTitle) sections.push(`Title: ${state.fields.jobTitle}`);
    if (state.fields.summary) sections.push(`Summary: ${state.fields.summary}`);
    if (state.skills.length) sections.push(`Skills: ${state.skills.join(', ')}`);
    if (state.experiences.length) {
      sections.push(
        `Experience: ${state.experiences
          .map((exp) => `${exp.role} at ${exp.company} - ${exp.desc}`)
          .join(' | ')}`
      );
    }
    if (state.educations.length) {
      sections.push(
        `Education: ${state.educations.map((edu) => `${edu.degree} ${edu.school}`).join(' | ')}`
      );
    }
    return sections.join('\n');
  };

  const handleImprove = async () => {
    const text = resumeText.trim() || buildResumeText();
    if (!text) {
      alert('Please add some resume content first.');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await improveResume({ rawResumeText: text });
      setResult({ type: 'improve', data });
      actions.setField('summary', data.improved_text?.slice(0, 280) || state.fields.summary);
    } catch (err) {
      alert(err?.message || 'Could not improve resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleAts = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await getAtsScore({ resume: state });
      setResult({ type: 'ats', data });
    } catch (err) {
      alert(err?.message || 'Could not calculate ATS score.');
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description.');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await matchJobDescription({ resume: state, jobDescription });
      setResult({ type: 'match', data });
    } catch (err) {
      alert(err?.message || 'Could not match job description.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!onExport) return;
    setLoading(true);
    try {
      await onExport();
    } catch (err) {
      alert(err?.message || 'Could not export PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <div className="form-section__title">
        <i className="ph ph-sparkle" /> AI Assistant
      </div>
      <div className="template-switcher" style={{ marginBottom: 12 }}>
        <button className={`tpl-btn ${tab === 'improve' ? 'active' : ''}`} onClick={() => setTab('improve')}>
          Improve Resume
        </button>
        <button className={`tpl-btn ${tab === 'ats' ? 'active' : ''}`} onClick={() => setTab('ats')}>
          ATS Score
        </button>
        <button className={`tpl-btn ${tab === 'match' ? 'active' : ''}`} onClick={() => setTab('match')}>
          Job Match
        </button>
      </div>

      {tab === 'improve' && (
        <>
          <div className="field field--full">
            <label htmlFor="resumeText">Existing Resume</label>
            <textarea
              id="resumeText"
              rows={6}
              value={resumeText}
              placeholder={buildResumeText()}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <button className="btn btn--primary" onClick={handleImprove} disabled={loading}>
            {loading ? 'Improving...' : 'Improve Resume'}
          </button>
        </>
      )}

      {tab === 'ats' && (
        <>
          <button className="btn btn--primary" onClick={handleAts} disabled={loading}>
            {loading ? 'Checking ATS...' : 'Get ATS Score'}
          </button>
          {result?.type === 'ats' && (
            <div className="entry-card" style={{ marginTop: 12 }}>
              <strong>ATS Score: {result.data.score}</strong>
              <p>Missing Keywords: {result.data.missing_keywords?.join(', ') || 'None'}</p>
              <p>Strengths: {result.data.strengths?.join(', ') || 'None'}</p>
              <p>Weaknesses: {result.data.weaknesses?.join(', ') || 'None'}</p>
              <p>Suggestions: {result.data.suggestions?.join(', ') || 'None'}</p>
            </div>
          )}
        </>
      )}

      {tab === 'match' && (
        <>
          <div className="field field--full">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <button className="btn btn--primary" onClick={handleMatch} disabled={loading}>
            {loading ? 'Matching...' : 'Check Job Match'}
          </button>
          {result?.type === 'match' && (
            <div className="entry-card" style={{ marginTop: 12 }}>
              <strong>Match: {result.data.match_percentage}%</strong>
              <p>Missing Skills: {result.data.missing_skills?.join(', ') || 'None'}</p>
              <p>Missing Keywords: {result.data.missing_keywords?.join(', ') || 'None'}</p>
              <p>Recommendations: {result.data.suggestions?.join(', ') || 'None'}</p>
            </div>
          )}
        </>
      )}

      <button className="btn btn--ghost" onClick={handleExport} disabled={loading} style={{ marginTop: 12 }}>
        {loading ? 'Exporting...' : 'Export PDF'}
      </button>
    </div>
  );
}
