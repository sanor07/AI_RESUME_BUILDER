import { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { rewriteExperience } from '../../services/aiService';
import FormSection from '../common/FormSection.jsx';
import Field from '../common/Field.jsx';

export default function ExperienceList() {
  const { state, actions } = useResume();
  const [loadingId, setLoadingId] = useState(null);

  const handleRewrite = async (exp) => {
    if (!exp.role || !exp.company || !exp.desc) {
      alert('Please fill Role, Company and Description first.');
      return;
    }

    setLoadingId(exp.id);

    try {
      const result = await rewriteExperience({
        role: exp.role,
        company: exp.company,
        desc: exp.desc,
      });

      const rewrittenDesc = result?.description || result?.desc || exp.desc;
      actions.updateExperience(exp.id, 'desc', rewrittenDesc);
    } catch (err) {
      alert(err?.message || 'Failed to rewrite experience.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <FormSection
      icon="ph-briefcase"
      title="Work Experience"
      action={
        <button type="button" className="add-btn" onClick={actions.addExperience}>
          <i className="ph ph-plus" /> Add
        </button>
      }
    >
      <div className="entries-list">
        {state.experiences.length === 0 && <p className="empty-entries">No experience added yet.</p>}
        {state.experiences.map((exp) => {
          const isRewriting = loadingId === exp.id;

          return (
            <div className="entry-card" key={exp.id}>
              <button
                type="button"
                className="entry-card__remove"
                title="Remove entry"
                onClick={() => actions.removeExperience(exp.id)}
              >
                <i className="ph ph-x" />
              </button>
              <div className="entry-grid">
                <Field
                  label="Job Title / Role"
                  placeholder="e.g. Product Designer"
                  value={exp.role}
                  onChange={(e) => actions.updateExperience(exp.id, 'role', e.target.value)}
                />
                <Field
                  label="Company"
                  placeholder="e.g. Google"
                  value={exp.company}
                  onChange={(e) => actions.updateExperience(exp.id, 'company', e.target.value)}
                />
                <Field
                  label="Start Date"
                  placeholder="Jan 2021"
                  value={exp.startDate}
                  onChange={(e) => actions.updateExperience(exp.id, 'startDate', e.target.value)}
                />
                <Field
                  label="End Date"
                  placeholder="Present"
                  value={exp.endDate}
                  onChange={(e) => actions.updateExperience(exp.id, 'endDate', e.target.value)}
                />
                <div className="field-group field-group--full">
                  <Field
                    as="textarea"
                    rows={3}
                    full
                    label="Description / Responsibilities"
                    placeholder="• Key responsibilities and achievements…"
                    value={exp.desc}
                    onChange={(e) => actions.updateExperience(exp.id, 'desc', e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-btn mt-2"
                    onClick={() => handleRewrite(exp)}
                    disabled={isRewriting}
                  >
                    <i className="ph ph-sparkle" />
                    {isRewriting ? 'Rewriting...' : '✨ Rewrite with AI'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
