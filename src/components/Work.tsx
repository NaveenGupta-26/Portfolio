import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@gsap/react";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  // {
  //   title1: "AI Product",
  //   title2: "Strategy",
  //   description: "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals. Built to automate 80% of guest inquiries.",
  //   outcome: "Validated MVP with 50+ early signups; reduced coordination time by an estimated 15 hours per event.",
  //   link: "#",
  //   tags: ["Strategy", "LLM", "Operations", "Discovery", "MVP"],
  //   bgColor: "#0d0e11"
  // },
  // {
  //   title1: "Multi-Agent",
  //   title2: "Productivity",
  //   description: "Bridging the gap between messy meeting transcripts and execution-ready project management outputs with zero-hallucination guardrails.",
  //   outcome: "Achieved 95% audit pass rate on task extractions; automated Jira/Notion data sync.",
  //   link: "#",
  //   tags: ["Product", "AI Agents", "Workflow", "Integration"],
  //   bgColor: "#16181d"
  // },
  {
    title1: "Wedding Butler",
    title2: "AI Coordination System",
    description: "Identified a common friction in weddings where hosts are repeatedly interrupted for basic queries. Built a WhatsApp-based AI assistant trained on event-specific details to handle guest queries, coordination, and communication.",
    outcome: "Reduced direct interruptions for hosts and streamlined guest communication through a single automated system, improving overall event coordination experience.",
    link: "https://wedding-butler.onrender.com",
    tags: ["AI Product", "Conversational AI", "User Experience", "Automation"],
    bgColor: "#0d0e11"
  },
  {
    title1: "PM Copilot",
    title2: "Execution Engine",
    description: "Observed that post-meeting execution is fragmented and time-consuming for product teams. Designed a multi-agent system that converts meeting transcripts into structured outputs including decisions, tasks, priorities, and execution-ready artifacts.",
    outcome: "Improved transition from discussion to execution by eliminating manual follow-up work and ensuring structured, accurate, and prioritized outputs for teams.",
    link: "https://pmcopilotapp.netlify.app/",
    tags: ["AI Agents", "Product Thinking", "Workflow Automation", "Execution"],
    bgColor: "#16181d"
  },
  {
    title1: "AI Consultant",
    title2: "Strategic Decision System",
    description: "Built a multi-phase AI consulting platform (Strategos AI) that simulates real-world consulting workflows through structured stages: Strategic Intake, Discovery Engine, and Strategic Roadmap generation. Developed a React-based dashboard with API-driven architecture to guide users from problem definition to actionable business strategies using structured reasoning frameworks.",
    outcome: "Transformed ambiguous business inputs into consulting-grade outputs including executive summaries, structured problem breakdowns, and execution roadmaps. Demonstrated ability to design end-to-end decision systems combining product thinking, AI integration, and consulting methodologies.",
    link: "#",
    tags: ["AI Systems", "Consulting", "Product Thinking", "React", "Decision Intelligence"],
    bgColor: "#0a0c0e"
  }
  // {
  //   title1: "Retail Trading",
  //   title2: "UX Design",
  //   description: "A conceptual interface that prioritizes psychological stability and data hierarchy for retail investors in high-volatility scenarios.",
  //   outcome: "User testing showed 30% faster trade execution; improved sentiment analysis integration.",
  //   link: "#",
  //   tags: ["UX Research", "IA", "Visual Design", "FinTech"],
  //   bgColor: "#0a0c0e"
  // },
];

const ProjectCard = ({ project, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Skip scroll animations on mobile — cards are non-sticky and should be always visible
    const isMobile = window.innerWidth <= 767;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Entry Animation: Slide up and fade in
      gsap.from(cardRef.current, {
        opacity: 0,
        y: "10%",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 95%",
          end: "top 70%",
          scrub: 0.5,
        }
      });

      // Depth/Exit Animation: Scale down + fade as it scrolls out
      gsap.to(cardRef.current, {
        scale: 1 - index * 0.04 - 0.06,
        opacity: 0.4,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 10%",
          end: "bottom -20%",
          scrub: 0.5,
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={wrapperRef}
      className="work-card-wrapper"
      style={{ zIndex: 10 + index }}
    >
      <div
        ref={cardRef}
        className="work-card"
        style={{ backgroundColor: project.bgColor }}
      >
        <div className="card-titles">
          <h2>
            <span className="title-primary">{project.title1}</span>
            <span className="title-secondary">{project.title2}</span>
          </h2>
        </div>

        <div className="pill-tags">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="pill-tag">{tag}</span>
          ))}
        </div>

        <div className="card-body">
          <div className="description-wrap">
            <span className="desc-icon">✦</span>
            <p>{project.description}</p>
          </div>

          <div className="card-impact-metrics">
            <div className="impact-box">
              <strong>Impact & Outcome</strong>
              <p>{project.outcome}</p>
            </div>
            <a href={project.link} className="sohub-btn" data-cursor="disable">
              Live Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            What I've <span>Built</span>
          </h2>
          <p>Execution-driven projects from 0 → 1.</p>
        </div>

        <div ref={stackRef} className="projects-stack">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
