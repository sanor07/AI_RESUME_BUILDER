import { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import { generateProjectDescription } from '../../services/aiService';
import FormSection from '../common/FormSection.jsx';
import Field from '../common/Field.jsx';

export default function ProjectList() {
  const { state, actions } = useResume();
  const [loadingId, setLoadingId] = useState(null);

  const handleGenerate = async (project) => {
    if (!project.name || !project.techStack || !project.notes) {
      alert('Please fill Project Name, Tech Stack, and Notes first.');
      return;
    }

    setLoadingId(project.id);

    try {
      const result = await generateProjectDescription({
        projectName: project.name,
        techStack: project.techStack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        rawNotes: project.notes,
      });
      actions.updateProject(project.id, 'desc', result?.description || result?.desc || '');
    } catch (err) {
      alert(err?.message || 'Failed to generate project description.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <FormSection
      id="projects"
      icon="ph-projector-screen"
      title="Projects"
      action={
        <button type="button" className="add-btn" onClick={actions.addProject}>
          <i className="ph ph-plus" /> Add
        </button>
      }
    >
      <div className="entries-list">
        {state.projects.length === 0 && <p className="empty-entries">No projects added yet.</p>}
        {state.projects.map((project) => {
          const isGenerating = loadingId === project.id;

          return (
            <div className="entry-card" key={project.id}>
              <button
                type="button"
                className="entry-card__remove"
                title="Remove project"
                onClick={() => actions.removeProject(project.id)}
              >
                <i className="ph ph-x" />
              </button>
              <div className="entry-grid">
                <Field
                  label="Project Name"
                  placeholder="e.g. AI Resume Builder"
                  value={project.name}
                  onChange={(e) => actions.updateProject(project.id, 'name', e.target.value)}
                />
                <Field
                  label="Tech Stack"
                  placeholder="e.g. React, FastAPI, PostgreSQL"
                  value={project.techStack}
                  onChange={(e) => actions.updateProject(project.id, 'techStack', e.target.value)}
                />
                <Field
                  as="textarea"
                  rows={3}
                  full
                  label="Notes"
                  placeholder="Key features, impact, and context..."
                  value={project.notes}
                  onChange={(e) => actions.updateProject(project.id, 'notes', e.target.value)}
                />
                <div className="field-group field-group--full">
                  <Field
                    as="textarea"
                    rows={3}
                    full
                    label="Description"
                    placeholder="Generated project description will appear here..."
                    value={project.desc}
                    onChange={(e) => actions.updateProject(project.id, 'desc', e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-btn mt-2"
                    onClick={() => handleGenerate(project)}
                    disabled={isGenerating}
                  >
                    <i className="ph ph-sparkle" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
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
