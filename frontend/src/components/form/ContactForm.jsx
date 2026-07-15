import { useResume } from '../../contexts/ResumeContext.jsx';
import FormSection from '../common/FormSection.jsx';
import Field from '../common/Field.jsx';

export default function ContactForm({ errors }) {
  const { state, actions } = useResume();
  const { fields } = state;
  const set = (key) => (e) => actions.setField(key, e.target.value);

  return (
    <FormSection icon="ph-address-book" title="Contact Details">
      <div className="form-grid">
        <Field
          id="email"
          type="email"
          label="Email"
          required
          placeholder="alex@example.com"
          value={fields.email}
          onChange={set('email')}
          error={errors.email}
        />
        <Field
          id="phone"
          type="tel"
          label="Phone"
          placeholder="+1 (555) 000-0000"
          value={fields.phone}
          onChange={set('phone')}
        />
        <Field
          id="address"
          label="Address / Location"
          full
          placeholder="San Francisco, CA, USA"
          value={fields.address}
          onChange={set('address')}
        />
        <Field
          id="linkedin"
          type="url"
          label="LinkedIn URL"
          placeholder="linkedin.com/in/username"
          value={fields.linkedin}
          onChange={set('linkedin')}
        />
        <Field
          id="website"
          type="url"
          label="Website / Portfolio"
          placeholder="yoursite.com"
          value={fields.website}
          onChange={set('website')}
        />
      </div>
    </FormSection>
  );
}
