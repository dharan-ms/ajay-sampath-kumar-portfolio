import { certifications, education, experience, impact, leadership } from "../data";

function Role({ item }) {
  return (
    <article className="role" id={`exp-${item.id}`}>
      <div>
        <p className="role-index">
          #{item.id} · {item.dates}
        </p>
      </div>
      <div>
        <h3>{item.role}</h3>
        <p className="org">{item.org}</p>
        <p className="summary">{item.summary}</p>
        <ul className="bullets">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <p className="kicker">[ 02 / 04 ] · Path</p>
      <h2 className="display">
        Professional
        <br />
        <span className="stroke">experience</span>
      </h2>
      <div className="path">
        {experience.map((item) => (
          <Role key={item.id} item={item} />
        ))}
        <Role item={leadership} />
      </div>

      <div className="split">
        <div className="edu">
          <h3>Education</h3>
          <p>{education.degree}</p>
          <p className="school">{education.school}</p>
          <p className="school">{education.dates}</p>
          <p className="cgpa">{education.note}</p>
        </div>
        <div className="certs">
          <h3>Certifications</h3>
          {certifications.map((item) => (
            <article className="cert" key={item.title}>
              <span>{item.year}</span>
              <div>
                <b>{item.title}</b>
                <small>{item.org}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="impact">
        <p className="kicker" style={{ marginTop: 56 }}>
          Impact & results
        </p>
        <h2 className="display">
          Numbers
          <br />
          <span className="stroke">with names</span>
        </h2>
        <p className="prose">
          Contributed to scaling an entrepreneurial community from 2,200 to 8,000 paid members, organising 100+ events,
          developing founder networks, and supporting startup acceleration programmes.
        </p>
        <div className="impact">
          {impact.map((item) => (
            <article className="metric" key={item.num}>
              <em>{item.num}</em>
              <strong>{item.stat}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
