import React from "react";

export default function Location() {
  return (
    <section id="location" className="location-section">
      <h2 className="location-title">Unbeatable Location</h2>
      <div className="location-container">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.901797167539!2d75.70797631113439!3d26.87486096161869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b0fe7816f5b%3A0x83c8451d27ab3be1!2sManglam%20Pinkwest!5e0!3m2!1sen!2sin!4v1751625799686!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{
              border: 0,
              maxWidth: "100vw",
              display: "block",
              overflow: "hidden",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-iframe"
          ></iframe>
        </div>
        <div className="location-info">
          <p className="location-description">
            Strategically located in the Ajmer Road corridor, Manglam Pink West
            offers unmatched connectivity to major landmarks in Jaipur:
          </p>
          <ul className="location-list">
            <li>5 mins from World Trade Park</li>
            <li>10 mins from Jaipur International Airport</li>
            <li>Near Fortis and EHCC Hospitals</li>
            <li>
              Close to major educational institutions like JECRC and Gyan Vihar
            </li>
            <li>
              Easy access to Jagatpura Railway Station and Sitapura Industrial
              Area
            </li>
            <li>Well-connected to Tonk Road and Ring Road</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
