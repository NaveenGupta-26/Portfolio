import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:naveengupta26042005@gmail.com"
                data-cursor="disable"
              >
                Email — naveengupta26042005@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/naveen-guptaa-62967328b"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — naveengupta
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/naveengupta26"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/naveen-guptaa-62967328b/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Impact-Driven <br /> Product <span>Operator</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 Naveen Gupta
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
