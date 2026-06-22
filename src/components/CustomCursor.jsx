import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CustomCursor = () => {
  // Motion values for actual cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for delayed outer tracking ring
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 220 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 220 });

  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Detect if mouse pointer is fine and hover is supported (ignore touch-only devices)
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) return;

    // Handle mouse movement and particle spawn
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);

      // Spawn constellation trail particles
      if (Math.random() < 0.35) {
        setParticles((prev) => {
          const newParticle = {
            id: Math.random() + Date.now(),
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 3.5 + 2,
            color: Math.random() > 0.45 ? '#7AB8FF' : '#D9B96A', // ORV Cyan or Gold
            angle: Math.random() * (Math.PI * 2),
            speed: Math.random() * 1.5 + 0.8,
          };
          return [...prev.slice(-25), newParticle]; // Keep trail array size small for performance
        });
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Hover state over interactive DOM tags/attributes
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('.orb-node') ||
        target.closest('.vault-skill-badge') ||
        target.closest('.coordinate-item') ||
        target.closest('.scenario-btn') ||
        target.closest('.propose-btn') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Constantly clear out stale particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length === 0) return prev; // Prevent state updates and re-renders if trail is empty
        return prev.slice(1);
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Particle Trail Layer */}
      <div className="cursor-trail-layer">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="cursor-trail-star"
            initial={{ 
              x: p.x, 
              y: p.y, 
              scale: 1, 
              opacity: 0.8,
              filter: "blur(0px)" 
            }}
            animate={{ 
              x: p.x + Math.cos(p.angle) * 18 * p.speed,
              y: p.y + Math.sin(p.angle) * 18 * p.speed,
              scale: 0.1, 
              opacity: 0,
              filter: "blur(1.5px)" 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Inner Precision Target (Cyan) */}
      <motion.div
        className={`custom-cursor-dot ${clicked ? 'clicked' : ''} ${hovered ? 'hovered' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer Delayed Tracking Ring (Gold) */}
      <motion.div
        className={`custom-cursor-ring ${clicked ? 'clicked' : ''} ${hovered ? 'hovered' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Cyber brackets */}
        <div className="cursor-bracket tl"></div>
        <div className="cursor-bracket tr"></div>
        <div className="cursor-bracket bl"></div>
        <div className="cursor-bracket br"></div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
