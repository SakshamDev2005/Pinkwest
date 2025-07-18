import React, { useState } from "react";

export default function Gallery({
  galleryType,
  setGalleryType,
  galleryImages,
  galleryTitle,
}) {
  const [center, setCenter] = useState(0);
  const total = galleryImages.length;

  // Assign class for each image based on its position
  function getClass(idx) {
    if (idx === center) return "gallery-center";
    if (idx === (center - 1 + total) % total) return "gallery-left";
    if (idx === (center + 1) % total) return "gallery-right";
    if (idx === (center - 2 + total) % total) return "gallery-far-left";
    if (idx === (center + 2) % total) return "gallery-far-right";
    return "gallery-hidden";
  }

  // Navigation
  const prev = () => setCenter((center - 1 + total) % total);
  const next = () => setCenter((center + 1) % total);

  return (
    <section id="gallery" className="gallery-section">
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-buttons-container">
        <button
          className={`btn btn-primary gallery-btn${
            galleryType === "exterior" ? " active" : ""
          }`}
          onClick={() => setGalleryType("exterior")}
        >
          Exterior Images
        </button>
        <button
          className={`btn btn-primary gallery-btn${
            galleryType === "interior" ? " active" : ""
          }`}
          onClick={() => setGalleryType("interior")}
        >
          Interior Images
        </button>
      </div>
      <div className="gallery-wrapper">
        <button className="btn btn-primary gallery-arrow" onClick={prev}>
          &lt;
        </button>
        <div className="gallery-coverflow">
          {galleryImages.map((src, idx) => (
            <div key={idx} className={`gallery-item ${getClass(idx)}`}>
              <img
                src={src}
                alt={`${galleryTitle} ${idx + 1}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary gallery-arrow" onClick={next}>
          &gt;
        </button>
      </div>
    </section>
  );
}
