import { focus, profile, projects } from "../data";
import PixelArt from "./Graphics";

export default function Work() {
  return (
    <section className="section" id="work">
      <p className="kicker">[ 03 / 04 ] · Selected work</p>
      <h2 className="display">
        Initiatives
        <br />
        <span className="stroke">shipped</span>
      </h2>
      <p className="prose">
        Communities, cohorts, products, and institutional programmes — built, scaled, and carried through to a result.
      </p>
      {projects.map((project) => (
        <article className="project" key={project.id} id={`work-${project.id}`}>
          <div>
            <p className="project-id">
              {project.id} · {project.tag}
            </p>
            <PixelArt className="thumb" variant={project.variant} width={320} height={180} />
          </div>
          <div>
            <h3>{project.title}</h3>
            <p className="sub">{project.subtitle}</p>
          </div>
          <div>
            <p>{project.text}</p>
            <div className="tags">
              {project.meta.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="text-link"
              href={`mailto:${profile.email}?subject=${encodeURIComponent(project.title)}`}
            >
              Discuss {project.title} ↗
            </a>
          </div>
        </article>
      ))}

      <div id="focus" style={{ marginTop: 64 }}>
        <p className="kicker">Focus</p>
        <h2 className="display">
          Where the
          <br />
          <span className="stroke">energy</span>
          goes
        </h2>
        <ol className="focus-list">
          {focus.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
