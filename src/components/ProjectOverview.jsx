import React from "react";
import { MdApartment, MdBusinessCenter } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import CountUp from "react-countup";

export default function ProjectOverview({
  unitsRef,
  statsRef,
  statsInView,
  unitsInView,
}) {
  return (
    <section id="units" className="project-overview-section" ref={unitsRef}>
      <h2 className="section-title">Project Overview & Available Units</h2>
      {/* Combined Stats & Units Cards */}
      <div className="combined-grid" ref={statsRef}>
        {[
          {
            type: "stat",
            icon: <MdApartment key="apt" size={35} />,
            number: 290,
            label: "Studio Apartments",
            price: "₹44 Lac",
            area: "303 sq ft",
            note: "Ideal for rental investment",
            image: "images/project-overview/2-5.png", // Example path
          },
          {
            type: "stat",
            icon: <MdBusinessCenter key="off" size={35} />,
            number: 228,
            label: "Office Suites",
            price: "₹51 Lac",
            area: "529 sq ft",
            note: "Premium workspace",
            image: "images/project-overview/2-6.png", // Example path
          },
          {
            type: "stat",
            icon: <FaStore key="ret" size={35} />,
            number: 287,
            label: "Retail Outlets",
            price: "₹57.5 Lac",
            area: "119 sq ft",
            note: "6% assured rental yield",
            image: "images/project-overview/2-7.png", // Example path
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`combined-card ${item.type}-card`}
            style={{
              opacity: unitsInView ? 1 : 0,
              transform: unitsInView ? "translateX(0)" : "translateX(-40px)",
              transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.22}s`,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              color: "#fff",
            }}
          >
            {/* Overlay for readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 0,
                borderRadius: "1rem",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              {item.type === "stat" ? (
                <>
                  <div className="stat-icon">{item.icon}</div>
                  <h2 className="stat-number">
                    {statsInView ? (
                      <CountUp
                        end={item.number}
                        duration={2.5}
                        delay={idx * 0.3}
                        useEasing={true}
                      />
                    ) : (
                      "0"
                    )}
                  </h2>
                  <p className="stat-label">{item.label}</p>
                  <div className="unit-details">
                    <p className="unit-detail">Price: {item.price}</p>
                    <p className="unit-detail">Area: {item.area}</p>
                    <p className="unit-note">{item.note}</p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
