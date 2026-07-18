export default function FormSection({ id, icon, title, action, children }) {
  return (
    <section id={id} className="form-section scroll-mt-28">
      <div className="form-section__header">
        <h2 className="form-section__title">
          <i className={`ph ${icon}`} />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
