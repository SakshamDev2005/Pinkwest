import React from "react";

export default function Contact({ setShowForm }) {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Schedule Your Visit Today</h2>
      <p className="contact-subtitle">
        Connect with us to know more about unit availability, pricing, and
        offers.
      </p>
      <div className="contact-buttons">
        <button className="btn btn-primary">Download Brochure</button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowForm((v) => !v)}
        >
          Book a Site Visit
        </button>
      </div>
    </section>
  );
}
