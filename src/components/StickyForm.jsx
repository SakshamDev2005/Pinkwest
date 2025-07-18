import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function StickyForm({
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  showTooltips,
  setShowTooltips,
  handleInputChange,
  handleInputBlur,
  handleInputFocus,
  handleSubmit,
  isMobile,
  showForm,
  stickyFormRef,
  fabRef,
  formCollapsed,
  setFormCollapsed,
  formFieldsRef,
}) {
  return (
    <div
      className="contact-form-fixed"
      ref={stickyFormRef}
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: 100,
        background: "var(--primary)",
        color: "#fff",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.10)",
        opacity: 0,
        transform: "translateY(100px)",
        pointerEvents: "none",
      }}
    >
      {/* Toggle button at the top of the form (mobile only) */}
      {isMobile && (
        <button
          className="contact-form-fab btn btn-primary"
          style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            top: 10,
            marginBottom: 10,
            zIndex: 200,
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onClick={() => setFormCollapsed((v) => !v)}
          aria-label={formCollapsed ? "Expand Form" : "Collapse Form"}
        >
          {formCollapsed ? (
            <FaChevronUp size={22} />
          ) : (
            <FaChevronDown size={22} />
          )}
          {formCollapsed ? "Book a Visit" : "Hide Form"}
        </button>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Collapsible form fields and submit button (mobile), always expanded on desktop */}
        {isMobile ? (
          <div
            ref={formFieldsRef}
            style={{ overflow: "hidden", transition: "height 0.4s" }}
          >
            <div className="form-field">
              <select
                className="form-input"
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("lookingFor")}
                onFocus={() => handleInputFocus("lookingFor")}
              >
                <option value="" disabled>
                  I'm looking for
                </option>
                <option value="Studio Apartment">Studio Apartment</option>
                <option value="Retail Spaces">Retail Spaces</option>
                <option value="Office Spaces">Office Spaces</option>
              </select>
              {showTooltips.lookingFor && formErrors.lookingFor && (
                <div className="form-tooltip">{formErrors.lookingFor}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("name")}
                onFocus={() => handleInputFocus("name")}
                autoComplete="off"
              />
              {showTooltips.name && formErrors.name && (
                <div className="form-tooltip">{formErrors.name}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("phone")}
                onFocus={() => handleInputFocus("phone")}
                autoComplete="off"
              />
              {showTooltips.phone && formErrors.phone && (
                <div className="form-tooltip">{formErrors.phone}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("email")}
                onFocus={() => handleInputFocus("email")}
                autoComplete="off"
              />
              {showTooltips.email && formErrors.email && (
                <div className="form-tooltip">{formErrors.email}</div>
              )}
            </div>
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        ) : (
          <>
            <div className="form-field">
              <select
                className="form-input"
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("lookingFor")}
                onFocus={() => handleInputFocus("lookingFor")}
              >
                <option value="" disabled>
                  I'm looking for
                </option>
                <option value="Studio Apartment">Studio Apartment</option>
                <option value="Retail Spaces">Retail Spaces</option>
                <option value="Office Spaces">Office Spaces</option>
              </select>
              {showTooltips.lookingFor && formErrors.lookingFor && (
                <div className="form-tooltip">{formErrors.lookingFor}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("name")}
                onFocus={() => handleInputFocus("name")}
                autoComplete="off"
              />
              {showTooltips.name && formErrors.name && (
                <div className="form-tooltip">{formErrors.name}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("phone")}
                onFocus={() => handleInputFocus("phone")}
                autoComplete="off"
              />
              {showTooltips.phone && formErrors.phone && (
                <div className="form-tooltip">{formErrors.phone}</div>
              )}
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur("email")}
                onFocus={() => handleInputFocus("email")}
                autoComplete="off"
              />
              {showTooltips.email && formErrors.email && (
                <div className="form-tooltip">{formErrors.email}</div>
              )}
            </div>
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}
