/**
 * Single labeled field — input or textarea depending on `as`.
 * Mirrors the original .field markup exactly (label + input + .field__error).
 */
export default function Field({
  label,
  required,
  full,
  as = 'input',
  error,
  className = '',
  ...inputProps
}) {
  const Tag = as;
  return (
    <div className={`field ${full ? 'field--full' : ''} ${className}`}>
      <label htmlFor={inputProps.id}>
        {label} {required && <span className="req">*</span>}
      </label>
      <Tag className={error ? 'error' : ''} {...inputProps} />
      {error && <span className="field__error visible">{error}</span>}
    </div>
  );
}
