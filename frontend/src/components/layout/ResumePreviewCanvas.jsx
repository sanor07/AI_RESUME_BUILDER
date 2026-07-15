import { forwardRef } from 'react';
import ExecutiveTemplate from '../templates/ExecutiveTemplate.jsx';
import ModernTemplate from '../templates/ModernTemplate.jsx';

const ResumePreviewCanvas = forwardRef(function ResumePreviewCanvas(
  { data, template, className = '', style = {} },
  ref
) {
  const previewData = {
    name: data?.name || 'Your Name',
    title: data?.title || 'Professional Title',
    summary: data?.summary || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || '',
    linkedin: data?.linkedin || '',
    website: data?.website || '',
    skills: data?.skills || [],
    experiences: data?.experiences || [],
    educations: data?.educations || [],
    projects: data?.projects || [],
    photo: data?.photo || '',
  };

  return (
    <div ref={ref} className={['preview-canvas', className].filter(Boolean).join(' ')} style={style}>
      {template === 1 ? <ExecutiveTemplate data={previewData} /> : <ModernTemplate data={previewData} />}
    </div>
  );
});

export default ResumePreviewCanvas;
