import { useEffect, useRef, useState } from "react";

export default function ScrollController() {
    const [isMobile, setIsMobile] = useState(false);
    
    // Controller state refs (we use refs strictly so the animation loop doesn't require re-renders)
    const keys = useRef({ w: false, s: false });
    const joyState = useRef({ active: false, startY: 0, currentY: 0 });
    
    // Visual toggle for desktop keys
    const [wPressed, setWPressed] = useState(false);
    const [sPressed, setSPressed] = useState(false);
    const [thumbY, setThumbY] = useState(0);

    const JOY_RADIUS = 50;  
    const SCROLL_SPEED = 15; 

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'w') { keys.current.w = true; setWPressed(true); }
            if (e.key.toLowerCase() === 's') { keys.current.s = true; setSPressed(true); }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'w') { keys.current.w = false; setWPressed(false); }
            if (e.key.toLowerCase() === 's') { keys.current.s = false; setSPressed(false); }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Animation Loop (High Performance)
        let animationId: number;
        const loop = () => {
            let delta = 0;

            // 1. Keyboard velocity
            if (keys.current.w) delta -= SCROLL_SPEED;
            if (keys.current.s) delta += SCROLL_SPEED;

            // 2. Joystick velocity
            if (joyState.current.active) {
                // Map the thumbstick pixel offset directly to scroll velocity (multiplier provides sensitivity)
                delta += joyState.current.currentY * 0.3;
            }

            // Apply natively
            if (Math.abs(delta) > 0.1) {
                // Lenis effortlessly intercepts native layout scroll modifications
                window.scrollBy({ top: delta, behavior: 'auto' }); 
            }

            animationId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Mobile Joystick Handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        joyState.current.active = true;
        joyState.current.startY = e.touches[0].clientY;
        joyState.current.currentY = 0;
        setThumbY(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!joyState.current.active) return;
        
        let deltaY = e.touches[0].clientY - joyState.current.startY;
        
        // Clamp visually strictly to Y-axis limit
        if (deltaY > JOY_RADIUS) deltaY = JOY_RADIUS;
        if (deltaY < -JOY_RADIUS) deltaY = -JOY_RADIUS;
        
        joyState.current.currentY = deltaY;
        setThumbY(deltaY);
    };

    const handleTouchEnd = () => {
        joyState.current.active = false;
        joyState.current.currentY = 0;
        setThumbY(0); // Snap back to center
    };

    if (!isMobile) {
        return (
            <div style={{
                position: 'fixed',
                bottom: '80px', // Placed directly above the resume button physically
                right: '3%', // Aligns with the global margin
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                zIndex: 9999,
                opacity: 0.8
            }}>
                <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: wPressed ? '#00f3ff' : 'rgba(255,255,255,0.2)',
                    background: wPressed ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: wPressed ? '#00f3ff' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '14px',
                    transition: '0.1s',
                    boxShadow: wPressed ? '0 0 10px rgba(0,243,255,0.5)' : 'none'
                }}>W</div>
                <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: sPressed ? '#00f3ff' : 'rgba(255,255,255,0.2)',
                    background: sPressed ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: sPressed ? '#00f3ff' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '14px',
                    transition: '0.1s',
                    boxShadow: sPressed ? '0 0 10px rgba(0,243,255,0.5)' : 'none'
                }}>S</div>
                <div style={{ fontSize: '10px', color: '#888', marginTop: '4px', letterSpacing: '1px' }}>SCROLL</div>
            </div>
        );
    }

    // MOBILE UI:
    return (
        <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '30px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(20, 30, 40, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 243, 255, 0.2)',
            boxShadow: '0 0 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(0, 243, 255, 0.05)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'none',
            opacity: thumbY !== 0 ? 0.9 : 0.5, // 50% transparent when idle, 90% when active
            transition: 'opacity 0.3s ease'
        }}>
            
            {/* The interactive touch area extending beyond visual joystick */}
            <div 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                style={{
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    borderRadius: '50%',
                    cursor: 'grab'
                }}
            />

            {/* The visual thumbstick */}
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: joyState.current.active ? 'rgba(0, 243, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: joyState.current.active ? '0 0 20px rgba(0, 243, 255, 0.6)' : 'none',
                transform: `translateY(${thumbY}px)`,
                transition: joyState.current.active ? 'none' : 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s',
                pointerEvents: 'none', // Touch logic is handled by parent invisible div
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Visual Arrow Hint */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                   <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '6px solid rgba(255,255,255,0.4)', opacity: thumbY < -5 ? 1 : 0.4 }} />
                   <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid rgba(255,255,255,0.4)', opacity: thumbY > 5 ? 1 : 0.4 }} />
                </div>
            </div>

        </div>
    );
}
