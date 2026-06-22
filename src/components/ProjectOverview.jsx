import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { FaHourglassHalf, FaGlobe, FaStar } from 'react-icons/fa';

const projectsData = [
  {
    id: "004",
    title: "DEVLORE",
    category: "Scenario Category: Interactive Quiz Platform",
    description: "An advanced quiz compilation architecture engineered using React Hooks, local state mapping, and REST API connectors. Displays absolute state synchronization across multiple threads.",
    result: "Fable recorded. 100% state mapping verified.",
    status: "Archived",
    icon: <FaGlobe />
  },
  {
    id: "005",
    title: "AI IMPACT PREDICTOR",
    category: "Scenario Category: Machine Learning Integration",
    description: "An intelligent heuristic compilation layer created to analyze potential software alterations, predicting post-deployment risks prior to compile cycles.",
    result: "Active exploration branch. Heuristic engine initialized.",
    status: "In Development",
    icon: <FaHourglassHalf />
  },
  {
    id: "006",
    title: "CHRONICLES OF FATE",
    category: "Scenario Category: Central Portfolio Registry",
    description: "The primary registry archive cataloging the characteristics, active skills, resolved scenarios, and timeline chronicles of Incarnation Pritesh.",
    result: "Scenarios compiled. 98.4% archive sync completed.",
    status: "Archived",
    icon: <FaStar />
  }
];

const TERMINAL_LOGS = [
  "initializing stigma...",
  "synchronizing archive...",
  "access granted"
];

// JetBrains Mono Typewriter sequence for system diagnostics window
const TerminalLog = ({ onFinish }) => {
  const [completedLines, setCompletedLines] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const currentLine = TERMINAL_LOGS[activeLineIndex];
    if (!currentLine) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1000); // Wait 1 second before dissolving window
      return () => clearTimeout(timer);
    }

    let index = 0;
    const interval = setInterval(() => {
      setCurrentText(currentLine.slice(0, index + 1));
      index++;
      if (index >= currentLine.length) {
        clearInterval(interval);
        const pause = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setCurrentText("");
          setActiveLineIndex((prev) => prev + 1);
        }, 400); // 400ms pause between log segments
        return () => clearTimeout(pause);
      }
    }, 20); // Fast typewriter speed

    return () => clearInterval(interval);
  }, [activeLineIndex, onFinish]);

  return (
    <div className="terminal-log-console">
      {completedLines.map((line, idx) => (
        <p key={idx} className="terminal-console-line">
          <span className="console-prompt">&gt;</span> {line}
        </p>
      ))}
      {activeLineIndex < TERMINAL_LOGS.length && (
        <p className="terminal-console-line active-console-line">
          <span className="console-prompt">&gt;</span> {currentText}
          <span className="console-cursor">█</span>
        </p>
      )}
    </div>
  );
};

const ProjectOverview = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.15 });
  const [phase, setPhase] = useState('dormant'); // 'dormant' | 'system-alert' | 'archived-records'
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView && phase === 'dormant') {
      const timer = setTimeout(() => {
        setPhase('system-alert');
      }, 800); // 800ms intro delay before opening ORV window
      return () => clearTimeout(timer);
    }
  }, [inView, phase]);

  const handleTerminalFinish = () => {
    setPhase('archived-records');
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 35; // Parallax divider
    const y = (e.clientY - rect.top - rect.height / 2) / 35;
    setMouseOffset({ x, y });
  };

  const handleAccessTimeline = (project) => {
    // Navigate with page state parameters
    navigate('/project', { state: { project } });
  };

  // Parallax stars
  const [bgStars] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 1,
      speed: Math.random() * 0.4 + 0.1
    }))
  );

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="projects-overview-section"
      onMouseMove={handleMouseMove}
    >
      {/* Background Parallax Stars */}
      <div className="projects-starfield">
        {bgStars.map((star) => (
          <div 
            key={star.id} 
            className="parallax-timeline-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: `translate(${mouseOffset.x * star.speed}px, ${mouseOffset.y * star.speed}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Layered Concentric Digital Clockwork Gears */}
      <div className="gear-system-wrap">
        <div 
          className="clockwork-gear gear-outer"
          style={{
            transform: `translate(-50%, -50%) rotate(${mouseOffset.x * 0.1}deg) rotate(0deg)`
          }}
        />
        <div 
          className="clockwork-gear gear-inner"
          style={{
            transform: `translate(-50%, -50%) rotate(${mouseOffset.x * -0.15}deg) rotate(0deg)`
          }}
        />
        <div 
          className="clockwork-gear gear-constellation"
          style={{
            transform: `translate(-50%, -50%) rotate(${mouseOffset.y * 0.08}deg) rotate(0deg)`
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 2: SYSTEM ALERT CONSOLE WINDOW */}
        {phase === 'system-alert' && (
          <div className="system-alert-window-container">
            <motion.div 
              className="orv-stigma-system-window"
              initial={{ opacity: 0, scale: 0.94, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                y: -15, 
                filter: "blur(10px)",
                transition: { duration: 0.7, ease: "easeInOut" } 
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Corner Cyber Brackets */}
              <div className="window-cyber-bracket tl"></div>
              <div className="window-cyber-bracket tr"></div>
              <div className="window-cyber-bracket bl"></div>
              <div className="window-cyber-bracket br"></div>
              <div className="window-cyber-scanlines"></div>

              <div className="system-window-top">
                <span className="badge-system-log">STIGMA STATUS</span>
                <span className="window-system-id">[ STG_RECON_808 ]</span>
              </div>
              <TerminalLog onFinish={handleTerminalFinish} />
            </motion.div>
          </div>
        )}

        {/* PHASE 3: TIMELINE RECORDS ARCHIVE REVEAL */}
        {phase === 'archived-records' && (
          <motion.div 
            className="timeline-archive-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header Description */}
            <div className="archive-header">
              <span className="archive-badge">SYSTEM VAULT</span>
              <h2 className="archive-title">[ RECORDED TIMELINES ]</h2>
              <p className="archive-subtitle"> Classified scenario chronicles decrypted from the Star Stream.</p>
            </div>

            {/* Timelines list */}
            <div className="archive-records-list">
              {projectsData.map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="project-timeline-record"
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.22, 
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    y: -6, 
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                >
                  {/* Glowing bracket accents */}
                  <div className="record-accent tl"></div>
                  <div className="record-accent tr"></div>
                  <div className="record-accent bl"></div>
                  <div className="record-accent br"></div>

                  {/* Left Column: Timeline index identifier */}
                  <div className="record-index-col">
                    <span className="index-label">TIMELINE</span>
                    <span className="index-val">#{project.id}</span>
                  </div>

                  {/* Divider */}
                  <div className="record-divider-line"></div>

                  {/* Right Column: Scenario description metadata */}
                  <div className="record-content-col">
                    <div className="record-content-head">
                      <div className="record-title-wrap">
                        <span className="record-icon-badge">{project.icon}</span>
                        <h3 className="record-title">{project.title}</h3>
                        <span className="timeline-available-tag">[ Timeline Available ]</span>
                      </div>
                      
                      <div className="record-status-badge">
                        <span className={`status-dot ${project.status.replace(/\s+/g, '-').toLowerCase()}`}></span>
                        <span className="status-label">{project.status}</span>
                      </div>
                    </div>

                    <span className="record-category">{project.category}</span>
                    <p className="record-desc">{project.description}</p>

                    <div className="record-result-row">
                      <span className="record-result-label">CLEAR CONDITION:</span>
                      <span className="record-result-val">{project.result}</span>
                    </div>

                    <div className="record-action-box">
                      <button 
                        className="btn-access-timeline"
                        onClick={() => handleAccessTimeline(project)}
                      >
                        <span className="btn-bracket-decor">[</span>
                        Access Timeline
                        <span className="btn-bracket-decor">]</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Explore Project Realm Button */}
            <motion.div 
              className="explore-realm-action-container"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                className="btn-explore-realm"
                onClick={() => navigate('/project')}
              >
                <span className="btn-explore-bracket">[</span>
                Explore the Project Realm
                <span className="btn-explore-bracket">]</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectOverview;
