import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";

  if ((window as any).lenis) {
    (window as any).lenis.start();
  }

  const mainElement = document.getElementsByTagName("main")[0];
  if (mainElement) {
    mainElement.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Only animate elements that exist in the DOM
  const landingInfoH3 = document.querySelector(".landing-info h3");
  const landingIntroH2 = document.querySelector(".landing-intro h2");
  const landingIntroH1 = document.querySelector(".landing-intro h1");

  if (landingInfoH3 || landingIntroH2 || landingIntroH1) {
    const targets = [
      landingInfoH3 && ".landing-info h3",
      landingIntroH2 && ".landing-intro h2",
      landingIntroH1 && ".landing-intro h1",
    ].filter(Boolean) as string[];

    if (targets.length > 0) {
      var landingText = new SplitText(targets, {
        type: "chars,lines",
        linesClass: "split-line",
      });
      gsap.fromTo(
        landingText.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }
  }

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  // Only animate landing-h2-info if it exists
  const landingH2Info = document.querySelector(".landing-h2-info");
  let landingText2: SplitText | null = null;
  if (landingH2Info) {
    landingText2 = new SplitText(".landing-h2-info", TextProps);
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  const landingInfoH2 = document.querySelector(".landing-info-h2");
  if (landingInfoH2) {
    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );
  }

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Animate landing CTAs, stats on mobile and desktop
  const landingCtas = document.querySelector(".landing-ctas");
  if (landingCtas) {
    gsap.fromTo(
      ".landing-ctas",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power2.out" }
    );
  }
  const landingStats = document.querySelector(".landing-stats");
  if (landingStats) {
    gsap.fromTo(
      ".landing-stats",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power2.out" }
    );
  }

  // Only do looping text if elements exist
  const h2Info1 = document.querySelector(".landing-h2-info-1");
  const h2_1 = document.querySelector(".landing-h2-1");
  const h2_2 = document.querySelector(".landing-h2-2");

  if (landingText2 && h2Info1) {
    var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
    LoopText(landingText2, landingText3);
  }
  if (h2_1 && h2_2) {
    var landingText4 = new SplitText(".landing-h2-1", TextProps);
    var landingText5 = new SplitText(".landing-h2-2", TextProps);
    LoopText(landingText4, landingText5);
  }
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
