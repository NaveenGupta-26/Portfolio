import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              NAVEEN
              <br />
              <span>GUPTA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3 style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "500px", margin: "10px 0" }}>
              I build products that move from idea → execution → impact
            </h3>
            <div className="landing-ctas" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <a href="#work" className="primary-btn">Enter Product Lab →</a>
              <a href="#contact" className="secondary-btn">Let's Talk</a>
            </div>
            <div className="landing-stats" style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
              <div className="stat-item">
                <h4 style={{ fontSize: "2.5rem", margin: "0" }}>25+</h4>
                <p style={{ opacity: 0.7 }}>User Interviews</p>
              </div>
              <div className="stat-item">
                <h4 style={{ fontSize: "2.5rem", margin: "0" }}>4+</h4>
                <p style={{ opacity: 0.7 }}>MVPs Built</p>
              </div>
              <div className="stat-item">
                <h4 style={{ fontSize: "2.5rem", margin: "0" }}>30+</h4>
                <p style={{ opacity: 0.7 }}>People Led</p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
