import { useEffect, useMemo, useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { getResumeCompletion, getSectionProgress } from '../../utils/resumeMetrics.js';
import PersonalInfoForm from '../form/PersonalInfoForm.jsx';
import ContactForm from '../form/ContactForm.jsx';
import SkillsInput from '../form/SkillsInput.jsx';
import ExperienceList from '../form/ExperienceList.jsx';
import EducationList from '../form/EducationList.jsx';
import ProjectList from '../form/ProjectList.jsx';
import AiPanel from '../ai/AiPanel.jsx';

const SECTIONS = [
  { id: 'personal', label: 'Profile', icon: 'ph-user-circle' },
  { id: 'contact', label: 'Contact', icon: 'ph-address-book' },
  { id: 'skills', label: 'Skills', icon: 'ph-lightning' },
  { id: 'experience', label: 'Experience', icon: 'ph-briefcase' },
  { id: 'projects', label: 'Projects', icon: 'ph-projector-screen' },
  { id: 'education', label: 'Education', icon: 'ph-graduation-cap' },
  { id: 'assistant', label: 'AI Coach', icon: 'ph-sparkle' },
];

function BuilderSidebar({ activeSection, progress, completion, isOpen, onToggle }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onToggle(false);
  };

  return (
    <nav className="builder-sidebar" aria-label="Resume sections">
      <button type="button" className="builder-sidebar__toggle md:hidden" onClick={() => onToggle(!isOpen)}>
        <i className={`ph ${isOpen ? 'ph-x' : 'ph-list'}`} />
        <span>Sections</span>
        <strong>{completion}%</strong>
      </button>

      <div className={`builder-sidebar__body ${isOpen ? 'is-open' : ''}`}>
        <div className="builder-sidebar__summary">
          <span>Resume completion</span>
          <strong>{completion}%</strong>
          <div className="builder-progress">
            <span style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="builder-sidebar__links">
          {SECTIONS.map((section) => {
            const itemProgress = section.id === 'assistant' ? completion : progress[section.id] || 0;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`builder-nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                <i className={`ph ${section.icon}`} />
                <span>{section.label}</span>
                <small>{itemProgress}%</small>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function FormPanel({ errors, onGenerateSummary, generatingSummary, onExport }) {
  const { state } = useResume();
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const progress = useMemo(() => getSectionProgress(state), [state]);
  const completion = useMemo(() => getResumeCompletion(state), [state]);

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.35, 0.65] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="builder-shell">
      <BuilderSidebar
        activeSection={activeSection}
        progress={progress}
        completion={completion}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
      />

      <div className="builder-form">
        <div className="builder-form__intro">
          <div>
            <p>Builder</p>
            <h2>Craft your standout resume</h2>
          </div>
          <div className="builder-form__badge">
            <span />
            Live editing
          </div>
        </div>

        <div className="builder-form__stack">
          <PersonalInfoForm
            errors={errors}
            onGenerateSummary={onGenerateSummary}
            generatingSummary={generatingSummary}
          />
          <ContactForm errors={errors} />
          <SkillsInput />
          <ExperienceList />
          <ProjectList />
          <EducationList />
          <section id="assistant" className="scroll-mt-28">
            <AiPanel onExport={onExport} />
          </section>
        </div>
      </div>
    </aside>
  );
}
