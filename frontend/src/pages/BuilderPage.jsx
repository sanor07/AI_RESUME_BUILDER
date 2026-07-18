import { useEffect, useRef, useState } from 'react';
import { useResume } from '../contexts/ResumeContext.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import FormPanel from '../components/layout/FormPanel.jsx';
import PreviewPanel from '../components/layout/PreviewPanel.jsx';
import { validateResumeFields } from '../utils/validation.js';
import { generateSummary, saveResume } from '../services/aiService.js';
import { exportResumePdf } from '../utils/pdfExport.js';

export default function BuilderPage() {
  const { state, actions } = useResume();
  const [errors, setErrors] = useState({});
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume(state).catch(() => {});
    }, 700);
    return () => clearTimeout(timer);
  }, [state]);

  const handleExport = async () => {
    try {
      const previewNode = previewRef.current;
      if (!previewNode) {
        throw new Error('Preview unavailable for export.');
      }
      const blob = await exportResumePdf(previewNode);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err?.message || 'Could not export PDF.');
    }
  };

  const handleReset = () => {
    if (!confirm('Reset all fields and start fresh? This cannot be undone.')) return;
    actions.reset();
    setErrors({});
  };

  const handleGenerateSummary = async () => {
    const fieldErrors = validateResumeFields(state.fields);
    setErrors(fieldErrors);
    if (fieldErrors.jobTitle) return;

    setGeneratingSummary(true);
    try {
      const { summary } = await generateSummary({
        jobTitle: state.fields.jobTitle,
        experiences: state.experiences,
        skills: state.skills,
      });
      actions.setField('summary', summary);
    } catch (err) {
      alert(err.message || 'Could not generate a summary right now.');
    } finally {
      setGeneratingSummary(false);
    }
  };

  return (
    <div className="builder-page">
      <TopBar onExport={handleExport} onReset={handleReset} />
      <main className="builder-workspace">
        <FormPanel
          errors={errors}
          onGenerateSummary={handleGenerateSummary}
          generatingSummary={generatingSummary}
          onExport={handleExport}
        />
        <PreviewPanel ref={previewRef} />
      </main>
    </div>
  );
}
