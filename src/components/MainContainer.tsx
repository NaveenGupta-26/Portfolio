import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));
import TrackRecord from "./TrackRecord";
import LenisScroller from "../context/LenisScroller";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 150);
    };
    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <LenisScroller>
      <div className="container-main">
        <Cursor />
        <Navbar />
        <SocialIcons />
        <div className="main-content-flow">
          <Landing>{children}</Landing>
          <About />
          <WhatIDo />
          <Career />
          <Work />
          <TrackRecord />
          {isDesktopView && (
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
          )}
          <Contact />
        </div>
      </div>
    </LenisScroller>
  );
};

export default MainContainer;
