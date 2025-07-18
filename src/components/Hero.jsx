import React from "react";

export default function Hero({
  heroRef,
  showForm,
  setShowForm,
  setFormCollapsed,
  delay, 
  anime
}) {
  return (
    <section
      className="hero-section relative overflow-hidden"
      id="home"
      ref={heroRef}
    >
      {/* Background image fallback */}
      <video
        className="hero-video-bg absolute inset-0 w-full h-full object-cover z-10"
        src="/videos/Pinkwest finale.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="images/main-image.jpeg"
      >
        Your browser does not support the video tag. Please view the site on a
        device that supports video, or see the image below.
        <img
          src="images/main-image.jpeg"
          alt="Manglam Pink West"
          className="w-full h-full object-cover"
        />
      </video>
      <div className="hero-overlay relative z-20">
        <div className="hero-content">
          <h1 className="hero-title">Manglam Pink West</h1>
          <p className="hero-subtitle">
            Inwest in West Jaipur's commercial future 
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                } else {
                  setShowForm(true);
                  setFormCollapsed(false);
                }
              }}
            >
              Book Free Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
