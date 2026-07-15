import PersonalInfoForm from '../form/PersonalInfoForm.jsx';
import ContactForm from '../form/ContactForm.jsx';
import SkillsInput from '../form/SkillsInput.jsx';
import ExperienceList from '../form/ExperienceList.jsx';
import EducationList from '../form/EducationList.jsx';
import ProjectList from '../form/ProjectList.jsx';
import AiPanel from '../ai/AiPanel.jsx';

export default function FormPanel({ errors, onGenerateSummary, generatingSummary, onExport }) {
  return (
    <aside className="panel panel--form">
      <div className="panel__inner">
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
        <AiPanel onExport={onExport} />
      </div>
    </aside>
  );
}
