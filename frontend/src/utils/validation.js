export function isValidEmail(value) {
  return value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validates the fields the original form required: fullName, jobTitle,
 * email. Returns a { fieldKey: errorMessage } map — empty object means valid.
 */
export function validateResumeFields(fields) {
  const errors = {};
  if (!fields.fullName.trim()) errors.fullName = 'Name is required';
  if (!fields.jobTitle.trim()) errors.jobTitle = 'Job title is required';
  if (!isValidEmail(fields.email.trim())) errors.email = 'Valid email required';
  return errors;
}
