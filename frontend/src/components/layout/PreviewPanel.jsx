import { forwardRef } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';
import ResumePreviewCanvas from './ResumePreviewCanvas.jsx';

const PreviewPanel = forwardRef(function PreviewPanel(_, canvasRef) {
  const { state, actions } = useResume();

  const data = {
    name: state.fields.fullName.trim() || 'Your Name',
    title: state.fields.jobTitle.trim() || 'Professional Title',
    summary: state.fields.summary.trim(),
    email: state.fields.email.trim(),
    phone: state.fields.phone.trim(),
    address: state.fields.address.trim(),
    linkedin: state.fields.linkedin.trim(),
    website: state.fields.website.trim(),
    skills: state.skills,
    experiences: state.experiences,
    educations: state.educations,
    projects: state.projects,
    photo: state.photoDataUrl,
  };

  // Same clamp/step as the original setZoom().
  const zoomBy = (delta) => actions.setZoom(state.zoomLevel + delta);
  const wrapperPadBottom =
    state.zoomLevel < 1 ? `${32 + (1 - state.zoomLevel) * 200}px` : '32px';

  return (
    <section className="panel panel--preview">
      <div className="preview-toolbar">
        <span className="preview-toolbar__label">
          <i className="ph ph-eye" /> Live Preview
        </span>
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => zoomBy(-0.1)}>
            <i className="ph ph-minus" />
          </button>
          <span>{Math.round(state.zoomLevel * 100)}%</span>
          <button className="zoom-btn" onClick={() => zoomBy(0.1)}>
            <i className="ph ph-plus" />
          </button>
        </div>
      </div>

      <div className="preview-canvas-wrapper" style={{ paddingBottom: wrapperPadBottom }}>
        <ResumePreviewCanvas
          ref={canvasRef}
          data={data}
          template={state.currentTemplate}
          className=""
          style={{ transform: `scale(${state.zoomLevel})` }}
        />
      </div>
    </section>
  );
});

export default PreviewPanel;
