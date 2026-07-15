import { useResume } from '../../contexts/ResumeContext.jsx';
import FormSection from '../common/FormSection.jsx';
import Field from '../common/Field.jsx';
import PhotoUpload from './PhotoUpload.jsx';

export default function PersonalInfoForm({ errors, onGenerateSummary, generatingSummary }) {
  const { state, actions } = useResume();
  const { fields } = state;

  const set = (key) => (e) => actions.setField(key, e.target.value);

  return (
    <FormSection icon="ph-user-circle" title="Personal Info">
      <PhotoUpload />

      <div className="form-grid">
        <Field
          id="fullName"
          label="Full Name"
          required
          placeholder="e.g. Alexandra Chen"
          value={fields.fullName}
          onChange={set('fullName')}
          error={errors.fullName}
        />
        <Field
          id="jobTitle"
          label="Job Title / Role"
          required
          placeholder="e.g. Senior Product Designer"
          value={fields.jobTitle}
          onChange={set('jobTitle')}
          error={errors.jobTitle}
        />
      </div>

      <Field
        id="summary"
        label="Professional Summary"
        as="textarea"
        rows={3}
        full
        placeholder="A brief statement about your professional background and goals…"
        value={fields.summary}
        onChange={set('summary')}
        className="mt-3"
      />
      {onGenerateSummary && (
        <button
          type="button"
          className="add-btn mt-2"
          onClick={onGenerateSummary}
          disabled={generatingSummary}
        >
          <i className="ph ph-sparkle" />
          {generatingSummary ? 'Generating…' : 'Generate with AI'}
        </button>
      )}
    </FormSection>
  );
}
