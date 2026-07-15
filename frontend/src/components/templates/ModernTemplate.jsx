import { splitDescLines } from '../../utils/textFormat.js';

function ContactStrip({ d }) {
  const items = [
    d.email && { icon: 'ph-envelope', text: d.email },
    d.phone && { icon: 'ph-phone', text: d.phone },
    d.address && { icon: 'ph-map-pin', text: d.address },
    d.linkedin && { icon: 'ph-linkedin-logo', text: d.linkedin.replace(/^https?:\/\//, '') },
    d.website && { icon: 'ph-globe', text: d.website.replace(/^https?:\/\//, '') },
  ].filter(Boolean);

  return items.map((item, i) => (
    <span className="contact-item" key={i}>
      <i className={`ph ${item.icon}`} />
      {item.text}
    </span>
  ));
}

function EntryDesc({ text }) {
  const lines = splitDescLines(text);
  if (!text) return null;
  if (lines.length <= 1) return <div className="entry-desc"><p>{text}</p></div>;
  return (
    <div className="entry-desc">
      <ul style={{ paddingLeft: 16, margin: 0 }}>
        {lines.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </div>
  );
}

export default function ModernTemplate({ data: d }) {
  const expEntries = d.experiences.filter((e) => e.role || e.company);
  const eduEntries = d.educations.filter((e) => e.degree || e.school);

  return (
    <div className="tpl tpl--modern">
      <div className="tpl__header-band">
        <div className="tpl__header-photo-wrap">
          {d.photo ? (
            <img className="tpl__header-photo" src={d.photo} alt="" />
          ) : (
            <div className="tpl__header-photo-placeholder"><i className="ph ph-user" /></div>
          )}
        </div>
        <div className="tpl__header-info">
          <h1 className="tpl__name">{d.name || 'Your Name'}</h1>
          <p className="tpl__title">{d.title || 'Professional Title'}</p>
          {d.summary && <p className="tpl__summary">{d.summary}</p>}
        </div>
      </div>

      <div className="tpl__contact-strip"><ContactStrip d={d} /></div>

      <div className="tpl__body">
        <div className="tpl__body-left">
          {d.skills.length > 0 && (
            <div className="tpl__skills-block">
              <h2 className="tpl__section-heading"><span>Skills</span></h2>
              <div className="tpl__skills-list">
                {d.skills.map((s, i) => <div className="skill-badge" key={i}>{s}</div>)}
              </div>
            </div>
          )}

          {d.projects && d.projects.length > 0 && (
            <div className="tpl__skills-block">
              <h2 className="tpl__section-heading"><span>Projects</span></h2>
              {d.projects.map((project) => (
                <div className="edu-entry" key={project.id}>
                  <div className="entry-degree">{project.name || 'Project'}</div>
                  {project.techStack && <div className="entry-school">{project.techStack}</div>}
                  {project.desc && <div className="entry-desc"><p>{project.desc}</p></div>}
                </div>
              ))}
            </div>
          )}

          {eduEntries.length > 0 && (
            <div className="tpl__edu-block">
              <h2 className="tpl__section-heading"><span>Education</span></h2>
              {eduEntries.map((e) => (
                <div className="edu-entry" key={e.id}>
                  <div className="entry-degree">{e.degree || 'Degree'}</div>
                  <div className="entry-school">{e.school || ''}</div>
                  {e.year && <div className="entry-date">{e.year}</div>}
                  {e.desc && <div className="entry-desc">{e.desc}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tpl__body-right">
          {expEntries.length > 0 && (
            <div className="tpl__exp-block">
              <h2 className="tpl__section-heading"><span>Experience</span></h2>
              {expEntries.map((e) => (
                <div className="exp-entry" key={e.id}>
                  <div className="entry-role">{e.role || 'Role'}</div>
                  <div className="entry-company">{e.company || ''}</div>
                  {(e.startDate || e.endDate) && (
                    <div className="entry-date">
                      {e.startDate} {(e.startDate || e.endDate) && '–'} {e.endDate}
                    </div>
                  )}
                  <EntryDesc text={e.desc} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
