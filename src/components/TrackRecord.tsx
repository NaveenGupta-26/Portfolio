import "./styles/TrackRecord.css";

const trackRecordData = [
  {
    icon: "🏆",
    title: "Working Prototype",
    subtitle: "Smart India Hackathon",
    desc: "Built a working prototype solving a real government problem statement. Selected among top teams nationally.",
    tag: "🏆"
  },
  {
    icon: "⚡",
    title: "35+ Deals in 48hrs",
    subtitle: "AIESEC Hackathon",
    desc: "Closed 35+ partnership deals in just 48 hours. Demonstrated extreme execution velocity.",
    tag: "⚡"
  },
  {
    icon: "🥇",
    title: "Highest Approvals",
    subtitle: "National Rank 1 – AIESEC",
    desc: "Achieved highest approval rate nationally, outperforming 50+ chapters across India.",
    tag: "🥇"
  },
  {
    icon: "⭐",
    title: "Leadership Excellence",
    subtitle: "Best Senior Manager Award",
    desc: "Recognized for outstanding leadership, team performance, and revenue contribution at AIESEC Jaipur.",
    tag: "⭐"
  }
];

const TrackRecord = () => {
  return (
    <div className="track-record-section section-container" id="achievements">
      <div className="track-record-container">
        <h2 className="section-title">Track <span>Record</span></h2>
        <h3 className="section-subtitle">High-Impact Moments</h3>
        
        <div className="track-grid">
          {trackRecordData.map((item, index) => (
            <div className="track-card" key={index}>
              <div className="track-icon-wrap">
                <span className="track-icon">{item.icon}</span>
                <span className="track-tag">{item.tag}</span>
              </div>
              <div className="track-content">
                <h4>{item.title}</h4>
                <h5>{item.subtitle}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackRecord;
