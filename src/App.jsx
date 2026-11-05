import { useEffect, useRef, useState } from "react";
import { marquee, nav, profile } from "./data";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";

function Loader() {
  const [n, setN] = useState(9);

  useEffect(() => {
    const id = setInterval(() => setN((value) => (value > 0 ? value - 1 : 0)), 240);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader-top">
        <span>Ajay Sampath — Portfolio</span>
        <span>©2026</span>
      </div>
      <p className="loader-cmd">
        <span>&gt; init renderer</span>
        <i />
      </p>
      <div className="loader-count">{String(n).padStart(3, "0")}</div>
      <div className="loader-bar">
        <span style={{ width: `${((9 - n) / 9) * 100}%` }} />
      </div>
    </div>
  );
}

function Menu({ onClose }) {
  return (
    <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <button className="menu-close" type="button" onClick={onClose}>
        Close
      </button>
      <nav className="menu-list">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={onClose}>
            <span>{item.id}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="menu-meta">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.phoneHref}>{profile.phone}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.resume} target="_blank" rel="noreferrer">
          Resume ↗
        </a>
      </div>
    </div>
  );
}

function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const move = (event) => {
      node.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [found, setFound] = useState(() => new Set());

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setBooting(false), reduce ? 400 : 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onFind(id) {
    setFound((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  return (
    <>
      {booting && <Loader />}
      <a className="skip" href="#about">
        Skip to main content
      </a>
      <div className="frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <header className="nav">
        <a className="brand" href="#top">
          Ajay.Sampath
        </a>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.id} {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="mark" href="#top" aria-label="Ajay Sampath home">
            AS
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
      <Cursor />
      <main id="main">
        <Hero found={found} onFind={onFind} />
        <div className="ribbon" aria-hidden="true">
          <div className="ribbon-track">
            {[0, 1].map((copy) => (
              <div className="ribbon-group" key={copy}>
                {marquee.map((item) => (
                  <span key={`${copy}-${item}`}>
                    {item}
                    <i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="ribbon-note">Communities, startups and partnerships creating real-world impact.</p>
        <About found={found} onFind={onFind} />
        <Experience />
        <Work />
        <Contact found={found} onFind={onFind} />
      </main>
      <footer className="footer">
        <div className="foot-grid">
          <div>
            <h2>
              {profile.location}
              <br />
              <span className="stroke">Tamil Nadu</span>
            </h2>
            <p>{profile.region}</p>
            <p>{profile.coords}</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    {item.id} {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Social</h3>
            <ul>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>Email ↗</a>
              </li>
              <li>
                <a href={profile.phoneHref}>Phone ↗</a>
              </li>
              <li>
                <a href={profile.resume} download="Ajay-Sampath-Kumar-Resume.pdf">
                  Resume PDF ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 {profile.full}. All rights reserved.</span>
          <span>
            {found.size} / 3 stars found · Built with React
          </span>
        </div>
      </footer>
    </>
  );
}
