import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Desktop nav click handler (Lenis smooth scroll)
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.currentTarget as HTMLAnchorElement;
        let id = target.getAttribute("data-href");
        if (id && (window as any).lenis) {
          (window as any).lenis.scrollTo(id);
        }
      });
    });
  }, []);

  const handleMobileLink = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(id);
      } else {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          NG
        </a>
        <a
          href="https://www.linkedin.com/in/naveen-guptaa-62967328b/"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/naveengupta
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#achievements" href="#achievements">
              <HoverLinks text="TRACK RECORD" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>

        {/* Hamburger button (visible only on mobile via CSS) */}
        <button
          className="hamburger-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span style={mobileOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}} />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span style={mobileOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "mobile-nav-open" : ""}`}>
        <ul>
          <li><a href="#about" onClick={() => handleMobileLink("#about")}>ABOUT</a></li>
          <li><a href="#experience" onClick={() => handleMobileLink("#experience")}>EXPERIENCE</a></li>
          <li><a href="#work" onClick={() => handleMobileLink("#work")}>WORK</a></li>
          <li><a href="#achievements" onClick={() => handleMobileLink("#achievements")}>TRACK RECORD</a></li>
          <li><a href="#contact" onClick={() => handleMobileLink("#contact")}>CONTACT</a></li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
