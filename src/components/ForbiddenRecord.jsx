import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import swordImage from '../assets/sword1.png';

// Typewriter warning list for terminal alert window
const WARNING_LOGS = [
  "Future records detected.",
  "Timeline instability increasing.",
  "Probability storm approaching.",
  "Access is not recommended.",
  "Authorization cannot be revoked."
];

const WarningTerminalLog = ({ onFinish, triggerOverride }) => {

  const [completedLines, setCompletedLines] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (triggerOverride) return; // Stop typewriter if click override starts

    const currentLine = WARNING_LOGS[activeLineIndex];
    if (!currentLine) {
      if (onFinish) onFinish();
      return;
    }

    let index = 0;
    let pauseTimeout = null;
    const interval = setInterval(() => {
      setCurrentText(currentLine.slice(0, index + 1));
      index++;
      if (index >= currentLine.length) {
        clearInterval(interval);
        pauseTimeout = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setCurrentText("");
          setActiveLineIndex((prev) => prev + 1);
        }, 550); // Pause between warnings
      }
    }, 28);

    return () => {
      clearInterval(interval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [activeLineIndex, triggerOverride, onFinish]);

  return (
    <div className="warning-log-console">
      {/* If normal logging */}
      {!triggerOverride && (
        <>
          {completedLines.map((line, idx) => (
            <p key={idx} className="warning-console-line">
              <span className="danger-prompt">&gt;</span> {line}
            </p>
          ))}
          {activeLineIndex < WARNING_LOGS.length && (
            <p className="warning-console-line active-danger-line">
              <span className="danger-prompt">&gt;</span> {currentText}
              <span className="danger-cursor">█</span>
            </p>
          )}
        </>
      )}

      {/* If clicked / overridden */}
      {triggerOverride && (
        <div className="malfunction-override-logs">
          <p className="override-line flash-red">&gt; ACCESS VIOLATION DETECTED</p>
          <p className="override-line flash-red">&gt; LOCKS REMOVED</p>
          <p className="override-line flash-red">&gt; AUTHORIZATION OVERRIDDEN</p>
          <p className="override-line flash-gold blink-slow">&gt; OPENING HIDDEN SCENARIO...</p>
        </div>
      )}
    </div>
  );
};

const ForbiddenRecord = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const swordRef = useRef(null);
  
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const [phase, setPhase] = useState('dormant'); // 'dormant' | 'active'
  const [isHovered, setIsHovered] = useState(false);
  const [overrideActive, setOverrideActive] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [swordRotation, setSwordRotation] = useState({ rx: 0, ry: 0, rz: 0 });

  useEffect(() => {
    if (inView && phase === 'dormant') {
      const timer = setTimeout(() => {
        setPhase('active');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [inView, phase]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || overrideActive) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate angle/tilt relative to the sword center
    if (swordRef.current) {
      const swordRect = swordRef.current.getBoundingClientRect();
      const sCenterX = swordRect.left + swordRect.width / 2;
      const sCenterY = swordRect.top + swordRect.height / 2;

      const dx = e.clientX - sCenterX;
      const dy = e.clientY - sCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Max tilt of 15 degrees, sensitivity decays with distance
      const maxDistance = 450;
      const strength = Math.max(0, 1 - distance / maxDistance);
      
      const rx = (dy / maxDistance) * 16 * strength;
      const ry = -(dx / maxDistance) * 16 * strength;
      const rz = (dx / maxDistance) * 5 * strength;

      setSwordRotation({ rx, ry, rz });
    }
  };

  const handleSwordClick = () => {
    if (overrideActive) return;
    setOverrideActive(true);

    // Timeline malfunction transition triggers:
    // 1. Shaking UI + red flashes
    // 2. Zoom camera into sword
    // 3. Navigate to Secret path page
    setTimeout(() => {
      setIsZooming(true);
    }, 1500); // Wait for override logs to type

    setTimeout(() => {
      navigate('/secretpath');
    }, 2500); // 2.5s total transition
  };

  // Particles that orbit the sword core initialized once to prevent impurity/flicker
  const [particles] = useState(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    delay: `${i * -0.2}s`,
    size: Math.random() * 3 + 2,
    color: Math.random() > 0.45 ? '#D9B96A' : '#7AB8FF'
  })));

  return (
    <section 
      id="forbidden-record"
      ref={containerRef}
      className="forbidden-record-section"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {/* Glitch alert red screen overlay */}
      <AnimatePresence>
        {overrideActive && !isZooming && (
          <motion.div 
            className="screen-alert-glitch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.45, 0.1, 0.5, 0.2, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      <div className="forbidden-content-wrapper">
        <AnimatePresence>
          {phase === 'active' && (
            <>
              {/* 1. Left warning box */}
              <motion.div 
                className={`warning-window-crimson ${overrideActive ? 'shake-malfunction border-override' : ''}`}
                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Neon Red cyber corners */}
                <div className="warning-bracket tl"></div>
                <div className="warning-bracket tr"></div>
                <div className="warning-bracket bl"></div>
                <div className="warning-bracket br"></div>
                <div className="warning-scanlines"></div>

                <div className="warning-window-head">
                  <span className="warning-badge-icon">
                    <FaExclamationTriangle className="alert-red-icon" />
                  </span>
                  <span className="badge-crimson-system">SYSTEM WARNING</span>
                  <span className="warning-seal-tag">[ SEAL_CRITICAL ]</span>
                </div>

                <div className="warning-message-box">
                  <h3 className="warning-title">[ WARNING ]</h3>
                  <p className="warning-alert-description">
                    The Fourth Wall strongly advises against accessing this record.
                  </p>
                  <p className="warning-meta-readout">
                    Probability of encountering unfinished futures: <span className="red-highlight">99.7%</span>
                  </p>
                  <p className="warning-meta-readout">
                    The contents of this archive have not yet been written.
                  </p>
                  <p className="warning-reflected-footer">Reader discretion is advised.</p>
                </div>

                {/* Sub logs typewriter diagnostic */}
                <div className="warning-sub-feed">
                  <div className="warning-feed-line"></div>
                  <WarningTerminalLog triggerOverride={overrideActive} />
                </div>
              </motion.div>

              {/* 2. Right floating sword artifact */}
              <motion.div
                ref={swordRef}
                className={`sword-artifact-container ${isZooming ? 'zoom-transition' : ''}`}
                initial={{ opacity: 0, scale: 0.85, x: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSwordClick}
                style={{
                  transform: isZooming 
                    ? 'translate(-50%, -50%) scale(8.5) rotate(0deg)' 
                    : `rotateX(${swordRotation.rx}deg) rotateY(${swordRotation.ry}deg) rotateZ(${swordRotation.rz}deg)`,
                  transition: isZooming ? 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)' : 'transform 0.15s ease-out'
                }}
              >
                {/* Orbiting fragments */}
                <div className={`sword-orbit-layer ${isHovered ? 'speed-orbit' : ''} ${overrideActive ? 'pulled-in' : ''}`}>
                  {particles.map((p) => (
                    <div 
                      key={p.id}
                      className="orbit-star-particle"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        '--angle': `${p.angle}deg`,
                        '--delay': p.delay,
                        boxShadow: `0 0 8px ${p.color}`
                      }}
                    />
                  ))}
                </div>

                {/* Celestial core glowing circle behind the sword */}
                <div className={`sword-celestial-core-glow ${isHovered ? 'intensify-glow' : ''} ${overrideActive ? 'malfunction-glow' : ''}`} />

                {/* Hover floating trigger label */}
                <span className={`sword-interactive-label ${isHovered && !overrideActive ? 'show-label' : ''}`}>
                  [ Breach Timeline Seal ]
                </span>

                {/* The blade image */}
                <img 
                  src={swordImage} 
                  alt="Forbidden Celestial Sword" 
                  className={`sword-blade-img ${isHovered ? 'blade-glow-hover' : ''} ${overrideActive ? 'blade-glitch-active' : ''}`}
                  style={{
                    animation: overrideActive ? 'none' : 'swordBreathe 5s ease-in-out infinite'
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ForbiddenRecord;
