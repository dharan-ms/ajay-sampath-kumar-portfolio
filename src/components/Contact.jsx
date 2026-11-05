import { useState } from "react";
import { profile } from "../data";
import { Star } from "./Hero";

export default function Contact({ found, onFind }) {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setNote("Name, email, and a message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote("Enter a valid email address.");
      return;
    }

    setNote("Opening your email app with this message.");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section" id="contact">
      <p className="kicker">[ 04 / 04 ] · Contact</p>
      <h2 className="display">
        Let’s work
        <br />
        <span className="stroke">together</span>
      </h2>
      <div className="contact-grid">
        <div>
          <p className="prose">
            I am open to collaborations, ecosystem programmes, founder communities, and venture-building work. Reach
            Ajay Sampath Kumar directly.
          </p>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>
                {profile.location}, {profile.region}
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  {profile.linkedinLabel} ↗
                </a>
              </dd>
            </div>
          </dl>
          <Star id="contact" found={found} onFind={onFind} className="inline" />
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">01 · Name</label>
            <input id="name" name="name" autoComplete="name" placeholder="Your name" required />
          </div>
          <div className="field">
            <label htmlFor="email">02 · Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
          </div>
          <div className="field">
            <label htmlFor="message">03 · Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={600}
              placeholder="Your message..."
              required
              onChange={(event) => setCount(event.target.value.length)}
            />
            <div className="counter">{count} / 600</div>
          </div>
          <p className="form-note" role="status">
            {note}
          </p>
          <button className="btn" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
