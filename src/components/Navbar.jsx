import React from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ isMobile, menuOpen, setMenuOpen, ...rest }) {
  return (
    <nav className="navbar" {...rest}>
      <div
        className="nav-container"
        style={
          isMobile
            ? {
                height: "60px",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }
            : {}  
        }
      >
        <div className="nav-logo-wrap">
          <a href="" className="nav-logo-link">
            <img
              src="images/ZXZ3-2.png"
              alt="Pink West Logo"
              className="nav-logo-img"
            />
          </a>
        </div>
        {/* Hamburger for mobile - inside navbar, vertically centered */}
        <button
          className={`nav-hamburger${menuOpen ? " nav-hamburger-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: isMobile ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 300,
            background: "none",
            border: "none",
            padding: 10,
            borderRadius: 8,
            boxShadow: menuOpen ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
            backgroundColor: menuOpen
              ? "rgba(255,255,255,0.95)"
              : "transparent",
            transition: "background 0.2s",
          }}
        >
          {menuOpen ? (
            <FaTimes size={32} color="#EC2C5A" />
          ) : (
            <FaBars size={32} color="#fff" />
          )}
        </button>
        <ul
          className={`nav-menu${menuOpen ? " nav-menu-open" : ""}`}
          style={
            isMobile
              ? {
                  position: "absolute",
                  top: 60,
                  left: 0,
                  width: "100vw",
                  background: "#fff",
                  flexDirection: "column",
                  alignItems: "center", // Center items horizontally
                  justifyContent: "center", // Center items vertically
                  display: "flex", // Ensure flex is applied
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  maxHeight: menuOpen ? 400 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)",
                  zIndex: 200,
                  padding: menuOpen ? "10px 0" : "0",
                  marginTop: 0,
                  minHeight: menuOpen ? "240px" : 0, // Give enough height for vertical centering
                }
              : {
                  display: "flex",
                  alignItems: "center", // Center vertically in navbar
                  height: "100%", // Take full navbar height
                  marginLeft: "auto",
            
                }
          }
        >
          {[
            { to: "home", label: "Home" },
            { to: "units", label: "Units" },
            { to: "amenities", label: "Amenities" },
            { to: "gallery", label: "Gallery" },
            { to: "location", label: "Location" },
            { to: "contact", label: "Contact" },
          ].map((item) => (
            <li key={item.to} style={isMobile ? { width: "100%" } : {}}>
              <Link
                to={item.to}
                smooth={true}
                duration={500}
                className="nav-link"
                style={
                  isMobile
                    ? {
                        padding: "18px 28px",
                        fontSize: 20,
                        borderBottom: "1px solid #f3f3f3",
                        color: "#374151",
                        width: "100%",
                      }
                    : {}
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
