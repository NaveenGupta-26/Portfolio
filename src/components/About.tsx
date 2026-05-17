import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section section-container" id="about">
      <div className="about-me">
        <h3 className="title">Who I Am</h3>
        <p className="para">
          <span style={{ color: "var(--accentColor)", fontWeight: "600" }}>AI Product Builder</span><br />
          I build products by starting from messy, real-world problems and turning them into structured, usable systems. My journey has evolved from writing code to understanding users, designing workflows, and driving execution across product, AI, and operations.

          I’m particularly interested in how AI can simplify complex processes not as a feature, but as a system that improves how work actually gets done.
        </p>

        <div className="mindset-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "40px" }}>
          <div className="mindset-card">
            <span className="icon">⚡</span>
            <h4>Execution First</h4>
            <p>I move from idea → prototype → feedback quickly. I learn by building.</p>
          </div>
          <div className="mindset-card">
            <span className="icon">🔗</span>
            <h4>Systems Thinking</h4>
            <p>I break down messy workflows and design structured, scalable solutions.</p>
          </div>
          <div className="mindset-card">
            <span className="icon">🚀</span>
            <h4>0→1 Builder</h4>
            <p>I’m comfortable starting from ambiguity and turning it into something usable.</p>
          </div>
          <div className="mindset-card">
            <span className="icon">🎯</span>
            <h4>User-Centered</h4>
            <p>I focus on clarity, simplicity, and solving real user friction—not just building features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
