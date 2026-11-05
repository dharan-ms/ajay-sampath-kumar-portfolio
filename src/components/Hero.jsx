import { useEffect, useState } from "react";
import { heroLede, heroLines, impact, profile } from "../data";

function clock() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export function Star({ id, found, onFind, className = "" }) {
  const on = found.has(id);
  return (
    <button
      type="button"
      className={`star ${className} ${on ? "on" : ""}`}
      aria-label={on ? "Star found" : "Hidden star"}
      aria-pressed={on}
      onClick={() => onFind(id)}
    >
      ✦
    </button>
  );
}

export default function Hero({ found, onFind }) {
  const [time, setTime] = useState(clock);

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="ticker-row">
        <div className="ticker">
          <span className="mark">AS</span>
          <p>Entrepreneurship · Startups · Community</p>
        </div>
      </div>

      <div className="identity">
        <div>
          <strong>{profile.first}</strong>
          <strong>{profile.last}</strong>
        </div>
        <div>
          <strong>{profile.location}</strong>
          <span>{profile.region}</span>
        </div>
        <div className="identity-role">
          <strong>{profile.role}</strong>
          <span className="sub">Entrepreneurship • Startups • Business</span>
          <p className="clock">
            Local time <b>{time} IST</b>
          </p>
        </div>
      </div>

      <div className="hero-stage">
        <Star id="hero" found={found} onFind={onFind} />
        <div className="hero-main">
          <div className="hero-copy">
            <p className="status">
              <span className="live" />
              <span>[ 00 ]</span>
              <span>{profile.status}</span>
            </p>
            <h1>
              <span>{heroLines[0]}</span>
              <span className="stroke">{heroLines[1]}</span>
              <span>{heroLines[2]}</span>
            </h1>
            {heroLede.map((paragraph) => (
              <p className="lede" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="hero-actions">
              <a className="btn" href="#work">
                See work
              </a>
              <a className="btn btn-solid" href="#contact">
                Get in touch
              </a>
            </div>
            <p className="hero-kicker">{profile.kicker}</p>
          </div>
          <aside className="hero-facts" aria-label="Selected results">
            {[impact[1], impact[0], impact[2], impact[5]].map((item) => (
              <p key={item.num}>
                {item.stat}
                <span>{item.label}</span>
              </p>
            ))}
          </aside>
        </div>
        <div className="hero-foot">
          <a href="#about">Scroll</a>
        </div>
      </div>
    </section>
  );
}
