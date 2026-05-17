import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO" id="foundation">
      <div className="what-box">
        <h2 className="title foundation-title">
          F<span className="hat-h2">OUNDA</span>
          <div className="foundation-split">
            T<span className="do-h2">ION</span>
          </div>
        </h2>
        <p style={{ opacity: 0.6, marginTop: "10px", letterSpacing: "2px", fontSize: "0.85rem" }}>ACADEMIC & CREDENTIALS</p>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>EDUCATION</h3>
              <h4>Academic Excellence</h4>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "1rem", fontWeight: "600", margin: "0" }}>Degree (BCA)</p>
                <p style={{ fontSize: "0.85rem", opacity: 0.7, margin: "0" }}>JECRC University, Jaipur | 2026 | 7.34 CGPA</p>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "1rem", fontWeight: "600", margin: "0" }}>Class XII, CBSE</p>
                <p style={{ fontSize: "0.85rem", opacity: 0.7, margin: "0" }}>Maheshwari Public School | 2023 | 84%</p>
              </div>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: "600", margin: "0" }}>Class X, CBSE</p>
                <p style={{ fontSize: "0.85rem", opacity: 0.7, margin: "0" }}>Maheshwari Public School | 2021 | 84%</p>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>CREDENTIALS</h3>
              <h4>Certifications & Programs</h4>
              <div className="what-content-flex" style={{ marginTop: "15px" }}>
                <div className="what-tags">Google AI Professional</div>
                <div className="what-tags">IBM PM </div>
                <div className="what-tags">McKinsey Step Forward</div>
                <div className="what-tags">Arena Animation Web</div>
                <div className="what-tags">Apna College Alpha</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
