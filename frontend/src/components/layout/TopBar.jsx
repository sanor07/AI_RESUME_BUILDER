import { useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { getAtsEstimate, getResumeCompletion } from '../../utils/resumeMetrics.js';

const TEMPLATES = [
  { id: 1, label: 'Executive', icon: 'ph-layout' },
  { id: 2, label: 'Modern', icon: 'ph-squares-four' },
];

export default function TopBar({ onExport, onReset }) {
  const { state, actions } = useResume();
  const completion = useMemo(() => getResumeCompletion(state), [state]);
  const atsScore = useMemo(() => getAtsEstimate(state), [state]);
  const resumeTitle = state.fields.fullName?.trim()
    ? `${state.fields.fullName.trim()}'s Resume`
    : 'Untitled Resume';

  return (
    <header className="builder-topbar">
      <div className="builder-topbar__brand">
        <div className="builder-topbar__mark">RF</div>
        <div>
          <p>{resumeTitle}</p>
          <span>ResumeForge Builder</span>
        </div>
      </div>

      <div className="builder-topbar__status">
        <div className="status-pill status-pill--saved">
          <i className="ph ph-cloud-check" />
          <span>Auto saved</span>
        </div>
        <div className="status-pill">
          <i className="ph ph-chart-donut" />
          <span>{completion}% complete</span>
        </div>
        <div className="status-pill">
          <i className="ph ph-shield-check" />
          <span>ATS {atsScore}</span>
        </div>
      </div>

      <div className="builder-topbar__actions">
        <div className="template-switcher hidden sm:flex">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`tpl-btn ${state.currentTemplate === t.id ? 'active' : ''}`}
              title={`Template: ${t.label}`}
              onClick={() => actions.setTemplate(t.id)}
            >
              <i className={`ph ${t.icon}`} /> {t.label}
            </button>
          ))}
        </div>

        <button className="btn btn--ghost" onClick={onReset} title="Reset resume">
          <i className="ph ph-arrow-counter-clockwise" />
          <span>Reset</span>
        </button>
        <button className="btn btn--primary" onClick={onExport}>
          <i className="ph ph-download-simple" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
