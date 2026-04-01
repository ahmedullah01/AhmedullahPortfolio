import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { MdArrowOutward, MdCopyright } from "react-icons/md";

const cards = [
  { id: 'linkedin', title: 'LinkedIn', icon: <FaLinkedinIn size={28} color="#fff" />, link: "https://www.linkedin.com/in/ahmedullah-705854358/?skipRedirect=true", color: '#0a66c2' },
  { id: 'github', title: 'GitHub', icon: <FaGithub size={28} color="#fff" />, link: "https://github.com/ahmedullah01?tab=repositories", color: '#ffffff' },
  { id: 'instagram', title: 'Instagram', icon: <FaInstagram size={28} color="#fff" />, link: "https://www.instagram.com/auk__01?igsh=MW1neWp0NnkyOWN5aw==", color: '#E1306C' }
];

function SocialIcon({ data }: any) {
    const [hovered, setHovered] = useState(false);

    return (
        <a 
            href={data.link}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: hovered ? data.color : 'rgba(255,255,255,0.05)',
                boxShadow: hovered ? `0 0 25px ${data.color}88` : 'none',
                transform: hovered ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                border: `1px solid ${hovered ? data.color : 'rgba(255,255,255,0.1)'}`
            }}
            title={data.title}
        >
            {data.icon}
        </a>
    )
}

const Contact = () => {
    return (
        <div className="contact-section full-width-section" id="contact" style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            width: '100vw', 
            marginLeft: 'calc(50% - 50vw)', 
            overflow: 'hidden', 
            background: '#050012',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            
            {/* Subtle WebGL Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <Sparkles count={150} scale={20} size={2.5} speed={0.2} opacity={0.3} color="#00f3ff" />
                    <Sparkles count={80} scale={25} size={3.5} speed={0.3} opacity={0.2} color="#bc13fe" />
                </Canvas>
            </div>
            
            {/* Minimal Background Gradient */}
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0, 243, 255, 0.05), transparent)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Minimal Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40px'
            }}>
                <h2 style={{ 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  margin: '0 0 10px 0', 
                  color: '#fff',
                  letterSpacing: '2px'
                }}>
                  Let's Connect
                </h2>
                
                <p style={{ color: '#b0aeb5', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '450px', lineHeight: '1.6' }}>
                  Reach out to build something extraordinary, or connect with me via my social networks.
                </p>

                {/* Simple Row of icons */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                    {cards.map(card => <SocialIcon key={card.id} data={card} />)}
                </div>

                {/* Primary Contact Button */}
                <a 
                    href="mailto:ahmedullah2095@gmail.com"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 32px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '30px',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Send an Email <MdArrowOutward size={20} />
                </a>

                {/* Footer Copyright */}
                <div style={{ 
                  marginTop: '80px', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
               }}>
                <div>Designed and Developed by <strong style={{color: '#888'}}>Ahmed Ullah</strong></div>
                <div style={{ margin: '5px 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <MdCopyright size={14}/> 2026
                </div>
              </div>
            </div>

        </div>
    )
}

export default Contact;
