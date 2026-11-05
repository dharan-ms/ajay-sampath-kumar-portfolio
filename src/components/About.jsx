import { useEffect, useState } from "react";
import { about, expertise, profile, profileRows, skillGroups } from "../data";
import { Star } from "./Hero";

export default function About({ found, onFind }) {
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    if (!resumeOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setResumeOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [resumeOpen]);

  return (
    <section className="section" id="about">
      <p className="kicker">[ 01 / 04 ] · About</p>
      <h2 className="display">
        From
        <br />
        <span className="stroke">communities</span>
        <br />
        to impact
      </h2>
      <div className="about-layout">
        <div className="about-copy">
          <p className="about-lead">{about[0]}</p>
          <div className="prose">
            {about.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Star id="about" found={found} onFind={onFind} />
        </div>
        <aside className="profile-card">
          <p className="profile-label">Profile</p>
          <dl className="profile">
            {profileRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  ajaysampath97
                </a>
              </dd>
            </div>
            <div>
              <dt>Index</dt>
              <dd>{profile.coords}</dd>
            </div>
          </dl>
          <div className="resume-actions">
            <button className="btn btn-solid" type="button" onClick={() => setResumeOpen(true)}>
              <span>View resume</span>
              <span aria-hidden="true">→</span>
            </button>
            <a className="btn" href={profile.resume} download="Ajay-Sampath-Kumar-Resume.pdf">
              <span>Download resume</span>
              <span>PDF</span>
            </a>
          </div>
        </aside>
      </div>
      {resumeOpen && (
        <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Ajay Sampath Kumar resume">
          <div className="resume-bar">
            <p>Ajay Sampath Kumar — Resume</p>
            <div>
              <a href={profile.resume} download="Ajay-Sampath-Kumar-Resume.pdf">
                Download PDF
              </a>
              <button type="button" onClick={() => setResumeOpen(false)}>
                Close
              </button>
            </div>
          </div>
          <iframe title="Ajay Sampath Kumar resume" src={profile.resume} />
        </div>
      )}

      <div className="cards">
        {expertise.map((item) => (
          <article className="card" key={item.id}>
            <p className="code">
              #{item.id} · {item.code}
            </p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="skills">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
