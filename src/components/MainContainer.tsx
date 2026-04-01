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
    let timeoutId: number;
    const resizeHandler = () => {
      // Debounce resize to prevent layout thrashing
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 150);
    };
    
    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.section-container, .full-width-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 30, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="app-wrapper">
        <ScrollController />
        {!isDesktopView ? null : <Cursor />}
        <Navbar />
        <SocialIcons />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Landing>
              {children}
            </Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div className="section-loader">Loading tech...</div>}>
               <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default MainContainer;
