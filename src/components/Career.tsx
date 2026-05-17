import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          Where I've <span>Built</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Echor Trip */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product Lead</h4>
                <h5>Echor Trip</h5>
                <h5 style={{ color: "white" }}>Self Project Initiated</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <div className="career-details">
              <div className="career-point">
                <strong>Problem:</strong>
                <p>Curated travel-decision MVP to reduce planning fatigue and unclear value comparisons.</p>
              </div>
              <div className="career-point">
                <strong>Actions:</strong>
                <p>Conducted 25+ user interviews; converted insights into clear decision flows and transparent-pricing UI.</p>
              </div>
              <div className="career-point">
                <strong>Impact:</strong>
                <p>40% faster comparison time; generated 20+ qualified trip inquiries in the first month.</p>
              </div>
            </div>
          </div>

          {/* AIESEC */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Manager, Global Corporate Sector</h4>
                <h5>AIESEC IN JAIPUR</h5>
                <h5 style={{ color: "white" }}>Youth run non profit organization</h5>
              </div>
              <h3>2024–PRESENT</h3>
            </div>
            <div className="career-details">
              <div className="career-point">
                <strong>Actions:</strong>
                <p>Directed a team of 12-18 members; onboarded 25+ partner companies; matched candidate capabilities with partner requirements.</p>
              </div>
              <div className="career-point">
                <strong>Impact:</strong>
                <p>Improved departmental revenue by increasing successful fulfilments and accelerating workflows.</p>
              </div>
            </div>
          </div>

          {/* JECRC */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product & Operations Associate</h4>
                <h5>JECRC INCUBATION CENTER</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <div className="career-details">
              <div className="career-point">
                <strong>Actions:</strong>
                <p>Worked directly with Founder's Office; managed cross-functional student teams for startup sessions and events.</p>
              </div>
              <div className="career-point">
                <strong>Impact:</strong>
                <p>Improved execution reliability and reduced last-minute coordination issues across teams.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
