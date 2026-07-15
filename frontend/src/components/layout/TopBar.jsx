import { useResume } from '../../contexts/ResumeContext.jsx';

const TEMPLATES = [
  { id: 1, label: 'Executive', icon: 'ph-layout' },
  { id: 2, label: 'Modern', icon: 'ph-squares-four' },
];

export default function TopBar({ onExport, onReset }) {
  const { state, actions } = useResume();

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo-mark">RF</span>
        <span className="topbar__name">
          Resumé<strong>Forge</strong>
        </span>
      </div>

      <div className="topbar__actions">
        <div className="template-switcher">
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

        <button className="btn btn--ghost" onClick={onReset}>
          <i className="ph ph-arrow-counter-clockwise" /> <span>Reset</span>
        </button>
        <button className="btn btn--primary" onClick={onExport}>
          <i className="ph ph-printer" /> <span>Print / Save PDF</span>
        </button>
      </div>
    </header>
  );
}
