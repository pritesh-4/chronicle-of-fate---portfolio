import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { FaBookmark, FaGlobe, FaReact, FaGithub, FaAward, FaBrain } from 'react-icons/fa';

const achievementsData = [
  {
    id: 1,
    title: "First Line of Code",
    timeline: "2025",
    description: "The initial event that branched the timeline. Embarked on the path of syntax execution and algorithmic logic.",
    result: "Execution of first script successfully compiled.",
    status: "Chronicle Recorded",
    icon: <FaBookmark />
  },
  {
    id: 2,
    title: "Built First React Project",
    timeline: "2026",
    description: "Discovered the power of modern frontend manipulation. Mastered component architecture and dynamic state syncing.",
    result: "Constructed responsive SPA with fluid rendering.",
    status: "Chronicle Recorded",
    icon: <FaReact />
  },
  {
    id: 3,
    title: "GSSOC 2026 Contributor",
    timeline: "2026",
    description: "Selected among thousands of applicants. Collaborated with developers worldwide on production codebase refactoring.",
    result: "10+ merged pull requests into core repositories.",
    status: "Chronicle Recorded",
    icon: <FaGithub />
  },
  {
    id: 4,
    title: "Top Ranked Contributor",
    timeline: "2026",
    description: "Scaled the rankings in competitive open-source contribution through consistent issue resolution and coding speed.",
    result: "Ranked top tier among thousands of participants.",
    status: "Chronicle Recorded",
    icon: <FaAward />
  },
  {
    id: 5,
    title: "DevLore Quiz Platform",
    timeline: "2026",
    description: "Designed and engineered a comprehensive, stateful quiz platform utilizing React, custom hooks, and external API pipelines.",
    result: "Highly responsive score and timer synchronization.",
    status: "Chronicle Recorded",
    icon: <FaGlobe />
  },
  {
    id: 6,
    title: "AI Impact Predictor",
    timeline: "2026",
    description: "Initiated developmental cycles on an intelligent model predicting potential deployment side-effects before compilation.",
    result: "First predictive heuristic pipeline deployed.",
    status: "Chronicle Recorded",
    icon: <FaBrain />
  }
];

const Typewriter = ({ text, delay = 25 }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{currentText}</span>;
};

const AchievementRow = ({ index, achievement, isLeft, onUnlock, forceUnlock }) => {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, amount: 0.35 });
  const [status, setStatus] = useState(forceUnlock ? 'unlocked' : 'dormant'); // 'dormant', 'revealing', 'unlocked'

  useEffect(() => {
    if (forceUnlock) {
      const timer = setTimeout(() => {
        setStatus('unlocked');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [forceUnlock]);

  useEffect(() => {
    if (inView && status === 'dormant' && !forceUnlock) {
      const revealTimer = setTimeout(() => {
        setStatus('revealing');
      }, 50);
      const timer = setTimeout(() => {
        setStatus('unlocked');
        onUnlock(index);
      }, 2350);
      return () => {
        clearTimeout(revealTimer);
        clearTimeout(timer);
      };
    }
  }, [inView, status, index, onUnlock, forceUnlock]);

  const isActive = status === 'unlocked' || status === 'revealing' || forceUnlock;

  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    delay: `${i * 0.15}s`
  }));

  return (
    <div 
      ref={rowRef} 
      className={`achievements-row ${isLeft ? 'row-left' : 'row-right'} ${status}`}
    >
          <div className="orb-node-container">
        <motion.div 
          className={`orb-node ${isActive ? 'active' : ''}`}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="orb-orbit-wrap">
            {particles.map((p) => (
              <div 
                key={p.id} 
                className="orbit-particle"
                style={{
                  '--delay': p.delay,
                  '--angle': `${p.angle}deg`,
                }}
              />
            ))}
          </div>

          <div className="orb-core">
            <span className="orb-star">✦</span>
          </div>
          
          <div className="orb-glow-ring"></div>
        </motion.div>
        <span className="orb-index">0{index + 1}</span>
      </div>

      <div className="card-container">
        <AnimatePresence mode="wait">
          {status === 'revealing' && (
            <motion.div 
              key="system-event"
              className="orv-system-event-window"
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
            >
              <div className="cyber-bracket tl"></div>
              <div className="cyber-bracket tr"></div>
              <div className="cyber-bracket bl"></div>
              <div className="cyber-bracket br"></div>
              <div className="window-scanlines"></div>

              <div className="event-head">
                <span className="badge-system">[ Memory Fragment Unlocked ]</span>
              </div>
              <div className="event-body">
                <div className="event-item">
                  <span className="event-label">ACHIEVEMENT:</span>
                  <span className="event-value cyan-val">
                    <Typewriter text={achievement.title} />
                  </span>
                </div>
                <div className="event-item">
                  <span className="event-label">DESCRIPTION:</span>
                  <span className="event-value">
                    <Typewriter text={achievement.description} delay={15} />
                  </span>
                </div>
                <div className="event-item">
                  <span className="event-label">STATUS:</span>
                  <span className="event-value reward-val">
                    <Typewriter text="ARCHIVED" delay={50} />
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'unlocked' && (
            <motion.div 
              key="memory-card"
              className="achievement-memory-card"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="celestial-corner tl">✦</div>
              <div className="celestial-corner tr">✦</div>
              <div className="celestial-corner bl">✦</div>
              <div className="celestial-corner br">✦</div>

              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-icon">{achievement.icon}</span>
                  <h3 className="card-title">{achievement.title}</h3>
                </div>
                <span className="card-timeline">{achievement.timeline}</span>
              </div>

              <div className="card-body">
                <p className="card-description">{achievement.description}</p>
                <div className="card-divider"></div>
                <div className="card-result-box">
                  <span className="result-label">RESULT:</span>
                  <span className="result-value">{achievement.result}</span>
                </div>
              </div>

              <div className="card-footer">
                <span className="card-status-dot"></span>
                <span className="card-status-text">{achievement.status}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Achievements = () => {
  const containerRef = useRef(null);
  const [unlockedOrbs, setUnlockedOrbs] = useState(new Array(6).fill(false));
  const [activeOrbs, setActiveOrbs] = useState(new Array(6).fill(false));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleActive = (index) => {
    setActiveOrbs((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const handleUnlock = (index) => {
    setUnlockedOrbs((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const finalUnlocked = unlockedOrbs[5];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const [bgStars] = useState(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${4 + Math.random() * 6}s`,
      delay: `${Math.random() * -5}s`,
    }))
  );

  return (
    <section 
      id="achievements"
      ref={containerRef}
      className="achievements-section"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      <div className="achievements-starfield">
        {bgStars.map(star => (
          <div
            key={star.id}
            className="twinkle-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      <div className="achievements-header">
        <span className="achievements-system-tag">CHRONICLES OF A GROWING TIMELINE</span>
        <h2 className="achievements-title">[ SCENARIO LOG ]</h2>
        <p className="achievements-subtitle">Unlocking recorded segments across the continuum.</p>
      </div>

      <div className="timeline-container">
        <svg 
          className="timeline-svg" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 25 8 L 75 25" 
            className={`constellation-path ${activeOrbs[1] || finalUnlocked ? 'active' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 75 25 L 25 42" 
            className={`constellation-path ${activeOrbs[2] || finalUnlocked ? 'active' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 25 42 L 75 58" 
            className={`constellation-path ${activeOrbs[3] || finalUnlocked ? 'active' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 75 58 L 25 75" 
            className={`constellation-path ${activeOrbs[4] || finalUnlocked ? 'active' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 25 75 L 75 92" 
            className={`constellation-path ${activeOrbs[5] || finalUnlocked ? 'active' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {achievementsData.map((item, idx) => {
          const isLeftOrb = idx % 2 === 0;
          
          return (
            <AchievementRow
              key={item.id}
              index={idx}
              achievement={item}
              isLeft={isLeftOrb}
              onActive={handleActive}
              onUnlock={handleUnlock}
              forceUnlock={finalUnlocked} 
            />
          );
        })}
      </div>

      <AnimatePresence>
        {finalUnlocked && (
          <motion.div 
            className="main-scenario-update-banner"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
          >
            <div className="banner-bracket tl"></div>
            <div className="banner-bracket tr"></div>
            <div className="banner-bracket bl"></div>
            <div className="banner-bracket br"></div>
            
            <div className="banner-glow-effect"></div>
            <h3 className="banner-alert">[ Main Scenario Updated ]</h3>
            <p className="banner-text">The story continues beyond this point.</p>
            <p className="banner-subtext">This timeline remains unfinished.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
