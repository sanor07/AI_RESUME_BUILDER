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

  const zoomBy = (delta) => actions.setZoom(state.zoomLevel + delta);
  const wrapperPadBottom =
    state.zoomLevel < 1 ? `${40 + (1 - state.zoomLevel) * 220}px` : '40px';

  return (
    <section className="preview-panel">
      <div className="preview-panel__shell">
        <div className="preview-panel__toolbar">
          <div>
            <span>
              <i className="ph ph-eye" /> Live Preview
            </span>
            <strong>A4 page 1 of 1</strong>
          </div>
          <div className="zoom-controls" aria-label="Preview zoom controls">
            <button className="zoom-btn" onClick={() => zoomBy(-0.1)} title="Zoom out">
              <i className="ph ph-minus" />
            </button>
            <span id="zoomLabel">{Math.round(state.zoomLevel * 100)}%</span>
            <button className="zoom-btn" onClick={() => zoomBy(0.1)} title="Zoom in">
              <i className="ph ph-plus" />
            </button>
          </div>
        </div>

        <div className="preview-canvas-wrapper" style={{ paddingBottom: wrapperPadBottom }}>
          <ResumePreviewCanvas
            ref={canvasRef}
            data={data}
            template={state.currentTemplate}
            style={{ transform: `scale(${state.zoomLevel})` }}
          />
        </div>
      </div>
    </section>
  );
});

export default PreviewPanel;
