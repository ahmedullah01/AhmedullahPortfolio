import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const boxes = containerRef.current.querySelectorAll('.career-info-box');
    
    boxes.forEach((box) => {
      const leftCol = box.querySelector('.career-info-in');
      const rightCol = box.querySelector('p');
      const yearMarker = box.querySelector('h3');

      if (leftCol) {
        gsap.fromTo(leftCol, 
          { x: -100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: box, start: 'top 85%' }
          }
        );
      }

      if (rightCol) {
        gsap.fromTo(rightCol, 
          { x: 100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: box, start: 'top 85%' }
          }
        );
      }

      if (yearMarker) {
        gsap.fromTo(yearMarker,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: box, start: 'top 85%' }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend Dev</h4>
                <h5>Self-Driven / Karachi</h5>
              </div>
              <h3>Ongoing <div className="career-pulse-dot"></div></h3>
            </div>
            <p>
              Designed and implemented automation workflows using n8n, and developed backend systems in Java with SQL and MongoDB. Applied data structures and algorithm skills to real-world projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Dev</h4>
                <h5>Personal / Karachi</h5>
              </div>
              <h3>Ongoing <div className="career-pulse-dot"></div></h3>
            </div>
            <p>
              Built multiple projects including a Flight Management System, Banking System, B2B platform, Result Analysis & Currency Prediction tool, and an MS Paint clone.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Sc. Comp Sci</h4>
                <h5>UBIT (Karachi)</h5>
              </div>
              <h3>Ongoing <div className="career-pulse-dot"></div></h3>
            </div>
            <p>
              Pursuing core computer science studies including SQL, Java, OOPs, DSA, and Web Development. GPA: 3.7+
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate</h4>
                <h5>PECHS, Karachi</h5>
              </div>
              <h3>Past</h3>
            </div>
            <p>
              Completed Intermediate studies with strong foundational focus in math and science. (1st Year – 76%, 2nd Year – 77%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
