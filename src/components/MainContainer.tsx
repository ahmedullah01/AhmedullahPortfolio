import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
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
import ScrollController from "./ScrollController";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.section-container, .full-width-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 60, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <div className="container-main">
        <ScrollController />
        <Cursor />
        <Navbar />
        <SocialIcons />
        {isDesktopView && children}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="container-main">
              <Landing>{!isDesktopView && children}</Landing>
              <About />
              <WhatIDo />
              <Career />
              <Work />
              {isDesktopView && (
                <Suspense fallback={<div>Loading....</div>}>
                  <TechStack />
                </Suspense>
              )}
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default MainContainer;
