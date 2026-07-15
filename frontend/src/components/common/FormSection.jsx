export default function FormSection({ icon, title, action, children }) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">
        <i className={`ph ${icon}`} />
        {title}
        {action}
      </h2>
      {children}
    </div>
  );
}
