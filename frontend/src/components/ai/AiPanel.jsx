import { useMemo, useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { improveResume, getAtsScore, matchJobDescription } from '../../services/aiService.js';
import {
  getAtsEstimate,
  getMissingKeywordHints,
  getResumeCompletion,
} from '../../utils/resumeMetrics.js';

export default function AiPanel({ onExport }) {
  const { state, actions } = useResume();
  const [tab, setTab] = useState('improve');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resumeScore = useMemo(() => getResumeCompletion(state), [state]);
  const atsEstimate = useMemo(() => getAtsEstimate(state), [state]);
  const missingKeywords = useMemo(() => getMissingKeywordHints(state), [state]);

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

  const tabs = [
    { id: 'improve', label: 'Improve', icon: 'ph-magic-wand' },
    { id: 'ats', label: 'ATS', icon: 'ph-shield-check' },
    { id: 'match', label: 'Match', icon: 'ph-crosshair' },
  ];

  return (
    <div className="ai-panel">
      <div className="ai-panel__header">
        <div className="ai-panel__icon">
          <i className="ph ph-sparkle" />
        </div>
        <div>
          <p>AI Assistant</p>
          <h3>Resume intelligence</h3>
        </div>
      </div>

      <div className="ai-score-grid">
        <div>
          <span>Resume Score</span>
          <strong>{resumeScore}</strong>
        </div>
        <div>
          <span>ATS Score</span>
          <strong>{result?.type === 'ats' ? result.data.score : atsEstimate}</strong>
        </div>
      </div>

      <div className="strength-meter">
        <div>
          <span>Resume strength</span>
          <strong>{resumeScore >= 80 ? 'Strong' : resumeScore >= 55 ? 'Getting close' : 'Needs detail'}</strong>
        </div>
        <div className="builder-progress">
          <span style={{ width: `${resumeScore}%` }} />
        </div>
      </div>

      <div className="keyword-cloud">
        <span>Missing Keywords</span>
        <div>
          {missingKeywords.length ? (
            missingKeywords.map((keyword) => <small key={keyword}>{keyword}</small>)
          ) : (
            <small>Well covered</small>
          )}
        </div>
      </div>

      <div className="ai-suggestions">
        <span>AI Suggestions</span>
        <p>Add measurable impact, mirror target job keywords, and keep bullets action-led.</p>
      </div>

      <div className="ai-tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            className={tab === item.id ? 'is-active' : ''}
            onClick={() => setTab(item.id)}
          >
            <i className={`ph ${item.icon}`} />
            {item.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading-skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

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
          <button className="btn btn--primary mt-3 w-full justify-center" onClick={handleImprove} disabled={loading}>
            <i className="ph ph-magic-wand" />
            {loading ? 'Improving...' : 'Improve Resume'}
          </button>
        </>
      )}

      {tab === 'ats' && (
        <>
          <button className="btn btn--primary w-full justify-center" onClick={handleAts} disabled={loading}>
            <i className="ph ph-shield-check" />
            {loading ? 'Checking ATS...' : 'Get ATS Score'}
          </button>
          {result?.type === 'ats' && (
            <div className="entry-card mt-3">
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
          <button className="btn btn--primary mt-3 w-full justify-center" onClick={handleMatch} disabled={loading}>
            <i className="ph ph-crosshair" />
            {loading ? 'Matching...' : 'Check Job Match'}
          </button>
          {result?.type === 'match' && (
            <div className="entry-card mt-3">
              <strong>Match: {result.data.match_percentage}%</strong>
              <p>Missing Skills: {result.data.missing_skills?.join(', ') || 'None'}</p>
              <p>Missing Keywords: {result.data.missing_keywords?.join(', ') || 'None'}</p>
              <p>Recommendations: {result.data.suggestions?.join(', ') || 'None'}</p>
            </div>
          )}
        </>
      )}

      <button className="btn btn--ghost mt-3 w-full justify-center" onClick={handleExport} disabled={loading}>
        <i className="ph ph-download-simple" />
        {loading ? 'Exporting...' : 'Export PDF'}
      </button>
    </div>
  );
}
