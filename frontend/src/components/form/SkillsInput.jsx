import { useRef, useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import FormSection from '../common/FormSection.jsx';
import { generateSkills } from '../../services/aiService';

export default function SkillsInput() {
  const { state, actions } = useResume();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const commit = (raw) => {
    const name = raw.trim();
    if (name) actions.addSkill(name);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit(value.replace(',', ''));
    } else if (e.key === 'Backspace' && value === '' && state.skills.length > 0) {
      actions.removeSkill(state.skills.length - 1);
    }
  };

  const handleBlur = () => {
    if (value.trim()) commit(value);
  };
  const handleGenerateSkills = async () => {
  if (!state.fields.jobTitle) {
    alert("Please enter a Job Title first.");
    return;
  }

  setLoading(true);

  try {
    const result = await generateSkills({
      jobTitle: state.fields.jobTitle,
      experienceSummary: state.experiences
        .map((e) => e.desc)
        .join("\n"),
    });

    result.skills.forEach((skill) => {
      if (!state.skills.includes(skill)) {
        actions.addSkill(skill);
      }
    });
  } catch (err) {
    alert(err.message || "Failed to generate skills.");
  } finally {
    setLoading(false);
  }
};
  return (
    <FormSection icon="ph-lightning" title="Skills">
      <div className="field">
        <label htmlFor="skillsInput">Add Skills (press Enter or comma to add)</label>
        <div className="tag-input-wrapper" onClick={() => inputRef.current?.focus()}>
          <div className="tags-list">
            {state.skills.map((skill, i) => (
              <span className="tag" key={`${skill}-${i}`}>
                {skill}
                <button
                  type="button"
                  className="tag__remove"
                  title="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.removeSkill(i);
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            id="skillsInput"
            type="text"
            placeholder="e.g. React, Python, Figma…"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <button
  type="button"
  className="add-btn mt-2"
  onClick={handleGenerateSkills}
  disabled={loading}
>
  <i className="ph ph-sparkle" />
  {loading ? "Generating..." : "Generate Skills"}
</button>
        </div>
      </div>
    </FormSection>
  );
}
