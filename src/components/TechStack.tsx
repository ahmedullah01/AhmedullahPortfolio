import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

// --- Data ---
const skills = [
  { id: 'java', name: 'Java', color: '#E67E22', description: 'Enterprise architecture', level: 90, projects: 'Backend, APIs' },
  { id: 'sql', name: 'SQL', color: '#3498DB', description: 'Database querying', level: 85, projects: 'Data Architecture' },
  { id: 'n8n', name: 'n8n', color: '#E83E8C', description: 'Workflow automation', level: 75, projects: 'Integrations' },
  { id: 'mongodb', name: 'MongoDB', color: '#2ECC71', description: 'NoSQL DB', level: 80, projects: 'MERN Applications' },
  { id: 'c', name: 'C', color: '#9B59B6', description: 'Systems programming', level: 65, projects: 'Embedded Systems' },
  { id: 'cpp', name: 'C++', color: '#9B59B6', description: 'High-performance', level: 70, projects: 'Game Engines' },
  { id: 'springboot', name: 'Spring Boot', color: '#1ABC9C', description: 'Microservices', level: 88, projects: 'REST APIs' },
  { id: 'github', name: 'GitHub', color: '#e0e0e0', description: 'Version control', level: 95, projects: 'CI/CD, Source' },
];

function SkillCard({ data }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open('https://github.com/ahmedullah01', '_blank')}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(25, 25, 35, 0.8)' : 'rgba(15, 15, 20, 0.5)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${hovered ? data.color : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 15px 30px rgba(0,0,0,0.4), inset 0 0 15px ${data.color}22` : `0 5px 15px rgba(0,0,0,0.3)`,
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        overflow: 'visible'
      }}
    >
        <h3 style={{ 
            fontSize: '1.4rem', 
            margin: '0 0 10px 0', 
            color: hovered ? '#fff' : data.color, 
            textShadow: hovered ? `0 0 10px ${data.color}` : 'none',
            transition: '0.3s'
        }}>
            {data.name}
        </h3>
        
        <p style={{ 
            textAlign: 'center', 
            fontSize: '0.9rem', 
            color: '#b0aeb5', 
            margin: 0,
            lineHeight: '1.4'
        }}>
            {data.description}
        </p>

        {/* Floating Tooltip Reveal */}
        <div style={{
            position: 'absolute',
            top: '-90px',
            left: '50%',
            transform: `translateX(-50%) translateY(${hovered ? '0' : '10px'})`,
            background: 'rgba(5, 5, 10, 0.95)',
            border: `1px solid ${data.color}66`,
            borderRadius: '12px',
            padding: '12px 16px',
            width: 'max-content',
            minWidth: '200px',
            opacity: hovered ? 1 : 0,
            pointerEvents: 'none',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: `0 10px 25px rgba(0,0,0,0.8), 0 0 20px ${data.color}33`,
            zIndex: 10
        }}>
            {/* Tooltip Arrow */}
            <div style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                background: 'rgba(5, 5, 10, 0.95)',
                borderRight: `1px solid ${data.color}66`,
                borderBottom: `1px solid ${data.color}66`,
            }} />

            <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '6px' }}>Proficiency</div>
            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ 
                    width: hovered ? `${data.level}%` : '0%', 
                    height: '100%', 
                    backgroundColor: data.color, 
                    transition: 'width 0.8s ease' 
                }}></div>
            </div>
            
            <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Projects</div>
            <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{data.projects}</div>
        </div>
    </div>
  );
}

const TechStack = () => {
  return (
    <div className="techstack full-width-section" style={{ 
        position: 'relative', 
        width: '100vw', 
        minHeight: '100vh', 
        marginLeft: 'calc(50% - 50vw)', 
        overflow: 'hidden', 
        background: 'var(--backgroundColor)', // clean uniform global theme background
        padding: '100px 0' // Match outer box padding exactly to Work.tsx
    }}>
      
      {/* Subtle Space Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Sparkles count={150} scale={25} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
          <Sparkles count={50} scale={20} size={4} speed={0.2} opacity={0.2} color="#00f3ff" />
        </Canvas>
      </div>

      <style>
        {`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateY(-40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Content Container ensures correct vertical document flow */}
      <div style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: 0 // Inner padding removed to rely strictly on parent padding, matching Work section
      }}>
          {/* Header */}
          <h2 style={{ 
              color: 'white', 
              fontSize: window.innerWidth < 768 ? '2.5rem' : '3.5rem', 
              fontWeight: 800, 
              letterSpacing: '3px',
              textAlign: 'center',
              margin: `0 0 ${window.innerWidth < 768 ? '40px' : '80px'} 0`,
              textShadow: '0 10px 30px rgba(0,0,0,0.8)',
              animation: 'slideFadeIn 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              zIndex: 10,
              position: 'relative'
          }}>
            Tech Arsenal
          </h2>

          {/* Grid of Cards */}
          <div style={{
              width: '90%',
              maxWidth: '1100px',
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${window.innerWidth < 480 ? '140px' : '220px'}, 1fr))`,
              gap: window.innerWidth < 768 ? '16px' : '24px',
              zIndex: 5,
              position: 'relative'
          }}>
             {skills.map((skill) => (
                <SkillCard key={skill.id} data={skill} />
             ))}
          </div>
      </div>

    </div>
  );
};

export default TechStack;
