import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InvestmentSection from "./components/InvestmentSection";
import ProjectOverview from "./components/ProjectOverview";
import Amenities from "./components/Amenities";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyForm from "./components/StickyForm";
import { Link } from "react-scroll";
import {
  FaCalendarAlt,
  FaBuilding,
  FaStore,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { MdApartment, MdBusinessCenter } from "react-icons/md";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import gsap from "gsap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin();

// Custom Arrow Components
function NextArrow(props) {
  const { className, onClick, style } = props;
  if (!onClick) return null;
  return (
    <button
      className={className + " custom-slick-arrow next-arrow"}
      onClick={onClick}
      aria-label="Next slide"
      style={style}
    >
      {/* Removed FaArrowRight icon */}
    </button>
  );
}
function PrevArrow(props) {
  const { className, onClick, style } = props;
  if (!onClick) return null;
  return (
    <button
      className={className + " custom-slick-arrow prev-arrow"}
      onClick={onClick}
      aria-label="Previous slide"
      style={style}
    >
      {/* Removed FaArrowLeft icon */}
    </button>
  );
}

export default function PinkWestAestheticLanding() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0); // Ensure page starts at top
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryType, setGalleryType] = useState("exterior"); // 'exterior' or 'interior'

  // Sticky FAB form state (original)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    lookingFor: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    lookingFor: "",
  });
  const [showTooltips, setShowTooltips] = useState({
    name: false,
    phone: false,
    email: false,
    lookingFor: false,
  });

  // InView hooks for scroll-triggered animations
  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [unitsRef, unitsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Form validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "phone":
        return value.trim() === ""
          ? "Phone number is required"
          : !/^\d{10}$/.test(value.replace(/\s/g, ""))
          ? "Please enter a valid 10-digit phone number"
          : "";
      case "email":
        return value.trim() === ""
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "lookingFor":
        return value === "" ? "Please select what you're looking for" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputBlur = (name) => {
    const error = validateField(name, formData[name]);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    setShowTooltips((prev) => ({ ...prev, [name]: !!error }));
  };

  const handleInputFocus = (name) => {
    setShowTooltips((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });

    setFormErrors(newErrors);

    // Show tooltips for all fields with errors
    const newShowTooltips = {};
    Object.keys(newErrors).forEach((field) => {
      newShowTooltips[field] = !!newErrors[field];
    });
    setShowTooltips(newShowTooltips);

    // If no errors, proceed with form submission
    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({ name: "", phone: "", email: "", lookingFor: "" });
      setFormErrors({ name: "", phone: "", email: "", lookingFor: "" });
      setShowTooltips({
        name: false,
        phone: false,
        email: false,
        lookingFor: false,
      });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  // Gallery image arrays
  const exteriorImages = [
    "/images/exterior/exterior/pinkwest-exterior-1.jpg",
    "/images/exterior/exterior/pinkwest-exterior-2.JPG",
    "/images/exterior/exterior/pinkwest-exterior-3.JPG",
    "/images/exterior/exterior/pinkwest-exterior-4.JPG",
    "/images/exterior/exterior/pinkwest-exterior-5.JPG",
    "/images/exterior/exterior/pinkwest-exterior-6.JPG",
  ];
  const interiorImages = [
    "/images/interior/interior/pinkwest-interior-1.jpg",
    "/images/interior/interior/pinkwest-interior-2.jpg",
    "/images/interior/interior/pinkwest-interior-3.jpg",
    "/images/interior/interior/pinkwest-interior-4.jpg",
    "/images/interior/interior/pinkwest-interior-5.jpg",
    "/images/interior/interior/pinkwest-interior-6.jpg",
  ];

  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true, // Enable swipe on mobile
    touchMove: true, // Enable touch movement
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
    ],
  };

  const galleryImages =
    galleryType === "exterior" ? exteriorImages : interiorImages;
  const galleryTitle =
    galleryType === "exterior" ? "Exterior Images" : "Interior Images";

  // Amenities state and data
  const [amenityType, setAmenityType] = useState("facilities"); // 'facilities' or 'services'

  const facilitiesAmenities = [
    {
      image: "/images/showroom.png",
      title: "Showroom Spaces",
    },
    {
      image: "/images/kiosk.png",
      title: "Kiosk Market",
    },
    {
      image: "/images/parking.png",
      title: "Multi-Level Parking",
    },
    {
      image: "/images/atrium.png",
      title: "Front Atrium",
    },
    {
      image: "/images/club house.png",
      title: "Club House",
    },
    {
      image: "/images/co-working.png",
      title: "Co-working Spaces",
    },
    {
      image: "/images/lobby.png",
      title: "Entrance Lobby",
    },
    {
      image: "/images/rooftop.png",
      title: "Rooftop Lounge",
    },
    {
      image: "/images/b&r.png",
      title: "Bar & Restaurant",
    },
    {
      image: "/images/banquet.png",
      title: "Double Heighted Banquet Hall",
    },
    {
      image: "/images/pool.png",
      title: "Swimming Pool",
    },
    {
      image: "/images/fitness.png",
      title: "Fitness Zone",
    },
    {
      image: "/images/gaming.png",
      title: "Gaming Zone",
    },
    {
      image: "/images/theatre.png",
      title: "Mini Theatre",
    },
  ];

  const servicesAmenities = [
    {
      image: "/images/interior/interior/pinkwest-interior-1.jpg",
      title: "Premium Retail Experience",
      description: "Curated retail spaces for shopping and dining",
    },
    {
      image: "/images/interior/interior/pinkwest-interior-2.jpg",
      title: "Fire Safety Compliance",
      description: "State-of-the-art fire safety systems and protocols",
    },
    {
      image: "/images/interior/interior/pinkwest-interior-3.jpg",
      title: "Professional Maintenance",
      description: "Regular maintenance and cleaning services",
    },
    {
      image: "/images/interior/interior/pinkwest-interior-4.jpg",
      title: "Concierge Services",
      description: "Dedicated concierge for all your needs",
    },
  ];

  const amenitiesSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
          touchMove: true,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
          touchMove: true,
          autoplay: true,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
          touchMove: true,
          autoplay: true,
          autoplaySpeed: 3500,
        },
      },
    ],
  };

  const currentAmenities =
    amenityType === "facilities" ? facilitiesAmenities : servicesAmenities;
  const amenitiesTitle =
    amenityType === "facilities" ? "Facilities" : "Services";

  const [formOpen, setFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const stickyFormRef = useRef(null);
  const fabRef = useRef(null); // FAB ref for GSAP
  const heroRef = useRef(null); // Ref for hero section
  const [formCollapsed, setFormCollapsed] = useState(false); // New state for collapse
  const formFieldsRef = useRef(null); // Ref for form fields

  // Animate form fields collapse/expand (only on mobile)
  useEffect(() => {
    if (!isMobile) return;
    if (formFieldsRef.current) {
      if (formCollapsed) {
        gsap.to(formFieldsRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
          pointerEvents: "none",
          overflow: "hidden",
        });
      } else {
        gsap.to(formFieldsRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
          pointerEvents: "auto",
          overflow: "visible",
        });
      }
    }
  }, [formCollapsed, isMobile]);

  // Show form when scrolling past hero section (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Animate sticky form with GSAP
  useEffect(() => {
    if (stickyFormRef.current) {
      if (showForm) {
        gsap.to(stickyFormRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      } else {
        gsap.to(stickyFormRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          pointerEvents: "none",
        });
      }
    }
  }, [showForm]);

  // FAB animation (optional, for fade in/out)
  useEffect(() => {
    if (fabRef.current) {
      gsap.to(fabRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isMobile]);

  return (
    <>
      <Navbar
        isMobile={isMobile}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        data-aos="fade-down"
      />

      <main className="main-content">
        <section data-aos="fade-up">
          <Hero
            heroRef={heroRef}
            showForm={showForm}
            setShowForm={setShowForm}
            setFormCollapsed={setFormCollapsed}
            delay={4000}
            anime={"fade-up"}
          />
        </section>
        <section data-aos="fade-up">
          <InvestmentSection />
        </section>
        <section data-aos="fade-up">
          <ProjectOverview
            unitsRef={unitsRef}
            statsRef={statsRef}
            statsInView={statsInView}
            unitsInView={unitsInView}
          />
        </section>
        <section data-aos="fade-up">
          <Amenities
            currentAmenities={currentAmenities}
            amenitiesSettings={amenitiesSettings}
          />
        </section>
        <section data-aos="fade-up">
          <Gallery
            galleryType={galleryType}
            setGalleryType={setGalleryType}
            gallerySettings={gallerySettings}
            galleryImages={galleryImages}
            galleryTitle={galleryTitle}
          />
        </section>

        <section
          className="investment-section"
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* Inline GSAP SVG Animation Setup */}
          {(() => {
            const marqueeRef = useRef(null);
            useEffect(() => {
              if (!marqueeRef.current) return;
              const distance = marqueeRef.current.offsetWidth / 2;
              gsap.to(marqueeRef.current, {
                x: -distance,
                duration: 20,
                ease: "none",
                repeat: -1,
                modifiers: {
                  x: gsap.utils.unitize((x) => parseFloat(x) % -distance),
                },
              });
            }, []);
            return (
              <div
                ref={marqueeRef}
                style={{
                  display: "flex",
                  width: "200%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              >
                {/* Two SVGs for seamless loop */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 250"
                  style={{ width: "50%", height: "100%", display: "block" }}
                >
                  <path
                    className="cls-1"
                    d="M153.71,166.65c-9.15,3.66-17.85,6.86-24.87,9.15,3.97,1.68,12.51,5.03,19.22,7.93l13.88,6.1,28.37,12.66v.92c-20.9,9.31-45.92,20.9-61.48,26.54,9.76,3.97,45.46,17.85,62.24,24.26v26.24l-111.51-49.27v-1.07l49.12-21.51c4.27-1.98,8.85-3.97,13.12-5.64-4.27-1.68-8.85-3.66-13.12-5.49l-49.12-21.66v-1.07l111.51-49.12v26.09l-37.38,14.95ZM132.03,71.74c-9.36-3.57-29.28-11.32-34.72-13.53,8.68-3.15,22.64-9.62,34.3-14.81v-.51l-15.83-7.06-7.74-3.4c-3.74-1.62-8.51-3.49-10.72-4.43,3.91-1.28,8.77-3.06,13.87-5.11l20.85-8.34V0l-62.21,27.4v.6l27.4,12.08c2.38,1.02,4.94,2.13,7.32,3.06-2.38.94-4.94,2.04-7.32,3.15l-27.4,12v.6l62.21,27.49v-14.64ZM0,109.37l14.2,6.26c1.23.53,2.56,1.1,3.79,1.59-1.23.48-2.56,1.06-3.79,1.63l-14.2,6.22v.31l32.23,14.24v-7.58c-4.85-1.85-15.17-5.86-17.99-7.01,4.5-1.63,11.73-4.98,17.77-7.67v-.26l-8.2-3.66-4.01-1.76c-1.94-.84-4.41-1.81-5.56-2.29,2.03-.66,4.54-1.59,7.19-2.65l10.8-4.32v-7.54L0,109.06v.31Z"
                    fill="#fff"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 250"
                  style={{ width: "50%", height: "100%", display: "block" }}
                >
                  <path
                    className="cls-1"
                    d="M153.71,166.65c-9.15,3.66-17.85,6.86-24.87,9.15,3.97,1.68,12.51,5.03,19.22,7.93l13.88,6.1,28.37,12.66v.92c-20.9,9.31-45.92,20.9-61.48,26.54,9.76,3.97,45.46,17.85,62.24,24.26v26.24l-111.51-49.27v-1.07l49.12-21.51c4.27-1.98,8.85-3.97,13.12-5.64-4.27-1.68-8.85-3.66-13.12-5.49l-49.12-21.66v-1.07l111.51-49.12v26.09l-37.38,14.95ZM132.03,71.74c-9.36-3.57-29.28-11.32-34.72-13.53,8.68-3.15,22.64-9.62,34.3-14.81v-.51l-15.83-7.06-7.74-3.4c-3.74-1.62-8.51-3.49-10.72-4.43,3.91-1.28,8.77-3.06,13.87-5.11l20.85-8.34V0l-62.21,27.4v.6l27.4,12.08c2.38,1.02,4.94,2.13,7.32,3.06-2.38.94-4.94,2.04-7.32,3.15l-27.4,12v.6l62.21,27.49v-14.64ZM0,109.37l14.2,6.26c1.23.53,2.56,1.1,3.79,1.59-1.23.48-2.56,1.06-3.79,1.63l-14.2,6.22v.31l32.23,14.24v-7.58c-4.85-1.85-15.17-5.86-17.99-7.01,4.5-1.63,11.73-4.98,17.77-7.67v-.26l-8.2-3.66-4.01-1.76c-1.94-.84-4.41-1.81-5.56-2.29,2.03-.66,4.54-1.59,7.19-2.65l10.8-4.32v-7.54L0,109.06v.31Z"
                    fill="#fff"
                  />
                </svg>
              </div>
            );
          })()}
          <h2
            className="investment-title"
            style={{ position: "relative", zIndex: 2 }}
          >
            Premium Investment Zone
          </h2>
          <p
            className="investment-text"
            style={{ position: "relative", zIndex: 2 }}
          >
            With a pricing benchmark of ₹13,760/sq ft — significantly above the
            Jagatpura average of ₹4,160 — Manglam Pink West offers exceptional
            growth potential and rental returns.
          </p>
        </section>
        <section data-aos="fade-up">
          <Location />
        </section>
        <section data-aos="fade-up">
          <Contact setShowForm={setShowForm} />
        </section>
        <section data-aos="fade-up">
          <Footer />
        </section>
        <StickyForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          showTooltips={showTooltips}
          setShowTooltips={setShowTooltips}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          handleInputFocus={handleInputFocus}
          handleSubmit={handleSubmit}
          isMobile={isMobile}
          showForm={showForm}
          stickyFormRef={stickyFormRef}
          fabRef={fabRef}
          formCollapsed={formCollapsed}
          setFormCollapsed={setFormCollapsed}
          formFieldsRef={formFieldsRef}
        />
      </main>
    </>
  );
}
