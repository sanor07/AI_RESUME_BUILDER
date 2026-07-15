import { useResume } from '../../contexts/ResumeContext.jsx';
import FormSection from '../common/FormSection.jsx';
import Field from '../common/Field.jsx';

export default function EducationList() {
  const { state, actions } = useResume();

  return (
    <FormSection
      icon="ph-graduation-cap"
      title="Education"
      action={
        <button type="button" className="add-btn" onClick={actions.addEducation}>
          <i className="ph ph-plus" /> Add
        </button>
      }
    >
      <div className="entries-list">
        {state.educations.length === 0 && (
          <p className="empty-entries">No education added yet.</p>
        )}
        {state.educations.map((edu) => (
          <div className="entry-card" key={edu.id}>
            <button
              type="button"
              className="entry-card__remove"
              title="Remove entry"
              onClick={() => actions.removeEducation(edu.id)}
            >
              <i className="ph ph-x" />
            </button>
            <div className="entry-grid">
              <Field
                label="Degree / Qualification"
                placeholder="e.g. B.Sc. Computer Science"
                value={edu.degree}
                onChange={(e) => actions.updateEducation(edu.id, 'degree', e.target.value)}
              />
              <Field
                label="School / University"
                placeholder="e.g. MIT"
                value={edu.school}
                onChange={(e) => actions.updateEducation(edu.id, 'school', e.target.value)}
              />
              <Field
                label="Year / Period"
                placeholder="2018 – 2022"
                value={edu.year}
                onChange={(e) => actions.updateEducation(edu.id, 'year', e.target.value)}
              />
              <Field
                as="textarea"
                rows={2}
                full
                label="Additional Info (optional)"
                placeholder="GPA, honours, relevant coursework…"
                value={edu.desc}
                onChange={(e) => actions.updateEducation(edu.id, 'desc', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
}
