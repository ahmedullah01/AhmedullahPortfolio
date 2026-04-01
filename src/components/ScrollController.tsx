import { useEffect, useRef, useState } from "react";

export default function ScrollController() {
    const [isMobile, setIsMobile] = useState(false);
    
    // Controller state refs
    const keys = useRef({ w: false, s: false });
    
    // Visual toggle for desktop keys
    const [wPressed, setWPressed] = useState(false);
    const [sPressed, setSPressed] = useState(false);

    const SCROLL_SPEED = 30; 

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 1024 || 'ontouchstart' in window;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'w') { keys.current.w = true; setWPressed(true); }
            if (key === 's') { keys.current.s = true; setSPressed(true); }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'w') { keys.current.w = false; setWPressed(false); }
            if (key === 's') { keys.current.s = false; setSPressed(false); }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Animation Loop for Desktop Keys
        let animationId: number;
        const loop = () => {
            let delta = 0;
            if (keys.current.w) delta -= SCROLL_SPEED;
            if (keys.current.s) delta += SCROLL_SPEED;

            if (Math.abs(delta) > 0) {
                window.scrollBy({ top: delta, behavior: 'auto' }); 
            }
            animationId = requestAnimationFrame(loop);
        };
        
        if (!isMobile) {
            loop();
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 9999,
            opacity: 0.8,
            transition: 'opacity 0.3s'
        }}>
            <div style={{
                width: '40px', height: '40px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: wPressed ? 'var(--accentColor, #5eead4)' : 'rgba(255,255,255,0.2)',
                background: wPressed ? 'rgba(94, 234, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                color: wPressed ? 'var(--accentColor, #5eead4)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '14px',
                transition: '0.1s',
                boxShadow: wPressed ? '0 0 10px rgba(94, 234, 212, 0.5)' : 'none'
            }}>W</div>
            <div style={{
                width: '40px', height: '40px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: sPressed ? 'var(--accentColor, #5eead4)' : 'rgba(255,255,255,0.2)',
                background: sPressed ? 'rgba(94, 234, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                color: sPressed ? 'var(--accentColor, #5eead4)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '14px',
                transition: '0.1s',
                boxShadow: sPressed ? '0 0 10px rgba(94, 234, 212, 0.5)' : 'none'
            }}>S</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '4px', letterSpacing: '1px' }}>SCROLL</div>
        </div>
    );
}
