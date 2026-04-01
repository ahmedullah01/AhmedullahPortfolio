import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { useLenis } from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "B2B Platform",
    category: "Operations & Data Pipeline",
    tools: "Backend system for business-to-business operations, handling data efficiently and ensuring smooth workflows.",
    image: "/images/b2b-platform.png",
    link: "#",
  },
  {
    title: "Currency Prediction",
    category: "Data Analysis & AI",
    tools: "Analyzes results data and predicts currency trends using algorithms and statistical methods.",
    image: "/images/aed-dashboard.png",
    link: "https://github.com/ahmedullah01/aed-exchange-dashboard",
  },
  {
    title: "Flight Management",
    category: "Booking System",
    tools: "Full-fledged system to manage flights, bookings, and schedules with user-friendly interfaces.",
    image: "/images/flight-management.png",
    link: "https://github.com/ahmedullah01/Airport_And_Ticket_MS",
  },
  {
    title: "Banking System",
    category: "Financial Application",
    tools: "Simulated banking application with account management, transactions, and secure operations.",
    image: "/images/banking-system.png",
    link: "https://github.com/ahmedullah01/Bank_Version_1",
  },
  {
    title: "MS Paint",
    category: "Desktop Application",
    tools: "A basic drawing application replicating MS Paint functionality, focusing on graphics handling and user interactions.",
    image: "/images/ms-paint.png",
    link: "https://github.com/ahmedullah01/MS-PAINT-LINE-TOOL-",
  },
  {
    title: "Inventory Management System",
    category: "Enterprise Application",
    tools: "A comprehensive inventory management system built in Java for tracking products, managing stock levels, and handling orders.",
    image: "/images/inventory-management.png",
    link: "https://github.com/ahmedullah01/NEWinventoryjava",
  },
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    // Select all cards
    const cards = document.querySelectorAll(".floating-project-card");
    
    // Heading animation
    const heading = document.querySelector(".work-section h2");
    if(heading) {
      gsap.fromTo(heading, 
        { opacity: 0, scale: 0.8, textShadow: "0px 0px 0px rgba(94, 234, 212, 0)", y: 50 },
        { 
          opacity: 1, scale: 1, textShadow: "0px 0px 30px rgba(94, 234, 212, 0.8)", y: 0,
          duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 80%" }
        }
      );
    }

    // Floating cards parallax and entrance
    cards.forEach((card, index) => {
      const isMobile = window.innerWidth <= 768;
      const isEven = index % 2 === 0;
      
      // Reduce xOffset on mobile to prevent clutter and overflow
      const xOffset = isMobile ? (isEven ? -30 : 30) : (isEven ? -150 : 150);
      const speed = 1 + (index % 3) * 0.2; // Parallax speed variance
      
      // The entrance slide-in and fade-in
      gsap.fromTo(card, 
        { x: xOffset, opacity: 0, scale: 0.95 },
        { 
          x: 0, opacity: 1, scale: 1, 
          duration: 1.4, ease: "back.out(1.2)", 
          scrollTrigger: { trigger: card, start: "top 90%" }
        }
      );

      // The parallax translation mapping to scroll (subtler on mobile)
      gsap.to(card, {
        y: isMobile ? -30 * speed : -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  // Prevent background scrolling when a project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "auto"; /* Re-enable scroll */
      if (lenis) lenis.start();
    }
    
    return () => {
      document.body.style.overflow = "auto";
      if (lenis) lenis.start();
    };
  }, [selectedProject, lenis]);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        
        <div className="floating-projects-wrapper">
          {projects.map((project, index) => (
            <div className={`floating-project-card ${index % 2 === 0 ? "left-aligned" : "right-aligned"}`} key={index}>
              {/* CSS Orbiting Particles */}
              <div className="orbit-element orbit-1"></div>
              <div className="orbit-element orbit-2"></div>
              <div className="orbit-element orbit-3"></div>

              <div className="floating-project-content" onClick={() => {
                  if (project.link && project.link !== "#") {
                      window.open(project.link, "_blank");
                  } else {
                      setSelectedProject(project);
                  }
              }}>
                <div className="floating-project-info">
                   <div className="floating-project-number">0{index + 1}</div>
                   <div className="floating-project-text">
                     <h4>{project.title}</h4>
                     <p className="floating-category">{project.category}</p>
                   </div>
                </div>
                <div className="holographic-frame">
                   <WorkImage
                     image={project.image}
                     alt={project.title}
                     onClick={() => {
                         if (project.link && project.link !== "#") {
                             window.open(project.link, "_blank");
                         } else {
                             setSelectedProject(project);
                         }
                     }}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && createPortal(
          <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
                <MdClose />
              </button>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                {selectedProject.title}
                {selectedProject.title === "B2B Platform" && (
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--accentColor)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(94, 234, 212, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    border: '1px solid rgba(94, 234, 212, 0.2)',
                    marginTop: '2px'
                  }}>
                    Ongoing 
                    <div className="career-pulse-dot" style={{ position: 'relative', right: 'auto', top: 'auto' }}></div>
                  </span>
                )}
              </h3>
              <p>{selectedProject.tools}</p>
              <a href={selectedProject.link && selectedProject.link !== "#" ? selectedProject.link : "https://github.com/ahmedullah01"} className="project-github-link" target="_blank" rel="noreferrer">
                View on GitHub <MdArrowOutward />
              </a>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};

export default Work;
