import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FaBrain, FaCode, FaLaptopCode, FaTerminal, FaCompass, 
  FaServer, FaCogs, FaHandsHelping, FaGitAlt, FaGithub,
  FaHtml5, FaCss3 
} from "react-icons/fa";
import { 
  SiCplusplus, SiJavascript, SiPython, 
  SiReact, SiVite, SiReactrouter, SiFramer, SiVercel, SiNpm 
} from "react-icons/si";
import { TbApi, TbComponents } from "react-icons/tb";
import Achievements from '../components/Achievements';
import ProjectOverview from '../components/ProjectOverview';
import ForbiddenRecord from '../components/ForbiddenRecord';
import LastPage from '../components/LastPage';

const statusTabs = [
  {
    id: 'attributes',
    label: 'ATTRIBUTES & FOUNDATIONS',
    categories: [
      {
        title: 'Core Attributes',
        icon: <FaBrain />,
        items: [
          'Problem Solving',
          'Software Development',
          'Frontend Engineering',
          'Open Source Collaboration',
          'Algorithmic Thinking',
          'Continuous Learning',
          'Systematic Debugging',
          'Curiosity & Research'
        ]
      },
      {
        title: 'Computer Science Foundations',
        icon: <FaCogs />,
        items: [
          'Data Structures',
          'Algorithms',
          'Object-Oriented Programming',
          'Problem Solving',
          'Time & Space Complexity Analysis'
        ]
      },
      {
        title: 'Open Source Experience',
        icon: <FaHandsHelping />,
        items: [
          'GSSOC 2026 Contributor',
          'Pull Requests',
          'Issue Resolution',
          'Collaborative Development',
          'Git Workflow'
        ]
      }
    ]
  },
  {
    id: 'skills',
    label: 'ACTIVE SKILLS & TECH',
    categories: [
      {
        title: 'Languages',
        icon: <FaCode />,
        items: [
          { name: 'C++', icon: <SiCplusplus /> },
          { name: 'JavaScript', icon: <SiJavascript /> },
          { name: 'Python', icon: <SiPython /> },
          { name: 'HTML5', icon: <FaHtml5 /> },
          { name: 'CSS3', icon: <FaCss3 /> }
        ]
      },
      {
        title: 'Frontend Development',
        icon: <FaLaptopCode />,
        items: [
          { name: 'React', icon: <SiReact /> },
          { name: 'Vite', icon: <SiVite /> },
          { name: 'React Router', icon: <SiReactrouter /> },
          { name: 'Responsive Design', icon: <TbComponents /> },
          { name: 'CSS Animations', icon: <FaCss3 /> },
          { name: 'Framer Motion', icon: <SiFramer /> },
          { name: 'Component-Based Architecture', icon: <TbComponents /> }
        ]
      },
      {
        title: 'APIs & Data Handling',
        icon: <FaServer />,
        items: [
          { name: 'REST APIs', icon: <TbApi /> },
          { name: 'Axios', icon: <TbApi /> },
          { name: 'JSON Processing', icon: <FaCode /> },
          { name: 'API Integration', icon: <TbApi /> }
        ]
      }
    ]
  },
  {
    id: 'scenarios',
    label: 'CURRENT SCENARIOS & FOCUS',
    categories: [
      {
        title: 'Tools & Platforms',
        icon: <FaTerminal />,
        items: [
          { name: 'Git', icon: <FaGitAlt /> },
          { name: 'GitHub', icon: <FaGithub /> },
          { name: 'VS Code', icon: <FaTerminal /> },
          { name: 'Vercel', icon: <SiVercel /> },
          { name: 'npm', icon: <SiNpm /> }
        ]
      },
      {
        title: 'Currently Exploring',
        icon: <FaCompass />,
        items: [
          'Artificial Intelligence',
          'Machine Learning',
          'System Design',
          'Developer Tools',
          'Graph Databases',
          'AI-Powered Software Systems'
        ]
      },
      {
        title: 'Current Focus',
        icon: <FaBrain />,
        items: [
          'Frontend Engineering',
          'Artificial Intelligence',
          'Developer Productivity',
          'Problem Solving'
        ]
      }
    ]
  }
];

const logLines = [
  'searching timeline...',
  'entering main scenario...',
  'activating Fourth Wall...',
  'Fourth Wall is attempting to understand the entity "Pritesh"',
  'analysis complete',
  'reader authorization granted'
];

const Hero = () => {
  const [currentPhase, setCurrentPhase] = useState('initial'); // initial, analysis, hold, story
  const [completedLines, setCompletedLines] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  

  
  // Background particles starfield data
  const [particles] = useState(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }))
  );

  // Transition from Phase 1 (initial background display) to Phase 2 (system window) after 2 seconds
  useEffect(() => {
    if (currentPhase === 'initial') {
      const timer = setTimeout(() => {
        setCurrentPhase('analysis');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  // Terminal Typing Sequence (Phase 3)
  useEffect(() => {
    if (currentPhase !== 'analysis') return;

    const currentLine = logLines[activeLineIndex];
    if (!currentLine) return;

    let charIndex = typedText.length;
    if (charIndex < currentLine.length) {
      // Type next character
      const timer = setTimeout(() => {
        setTypedText(currentLine.slice(0, charIndex + 1));
      }, 10 + Math.random() * 10); // Fast typing speed
      return () => clearTimeout(timer);
    } else {
      // Line is fully typed. Pause, then move to next line or next phase
      const pauseTimer = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        if (activeLineIndex < logLines.length - 1) {
          setTypedText('');
          setActiveLineIndex((prev) => prev + 1);
        } else {
          // All lines completed. Move to Phase 4 (Hold)
          setCurrentPhase('hold');
        }
      }, 200); // Snappy, rapid pause between lines
      return () => clearTimeout(pauseTimer);
    }
  }, [currentPhase, activeLineIndex, typedText]);

  // Phase 4 (Hold) transition to Phase 5 (Story) after 300 milliseconds
  useEffect(() => {
    if (currentPhase === 'hold') {
      const timer = setTimeout(() => {
        setCurrentPhase('story');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  return (
    <div className="hero-story-container">
      
      {/* Cinematic Starfield Background with Slow Ambient Movement */}
      <div className="celestial-bg">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="celestial-star"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              y: [0, -15, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Subtle Constellation clockwork rings */}
        <div className="cosmic-ring ring-1"></div>
        <div className="cosmic-ring ring-2"></div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* =========================================================
            PHASE 2, 3, & 4: HOLOGRAPHIC SYSTEM ANALYSIS WINDOW
            ========================================================= */}
        {(currentPhase === 'analysis' || currentPhase === 'hold') && (
          <div className="system-alert-center-wrapper">
            <motion.div
              key="analysis-window"
              className="system-alert-dialog"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                y: 20, 
                filter: "blur(8px)",
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Ancient cybernetic borders */}
              <div className="alert-corner tl"></div>
              <div className="alert-corner tr"></div>
              <div className="alert-corner bl"></div>
              <div className="alert-corner br"></div>
              <div className="alert-scanlines"></div>

              <div className="system-window-header">
                <span className="window-cyan-badge">SYSTEM DIALOG</span>
                <span className="window-id-tag">[ LOG_INIT_707 ]</span>
              </div>

              <div className="system-window-body">
                {completedLines.map((line, idx) => (
                  <p key={idx} className="system-log-line">
                    <span className="prompt-cyan">&gt;</span> {line}
                  </p>
                ))}
                
                {/* Active typing line */}
                {currentPhase === 'analysis' && (
                  <p className="system-log-line active-line">
                    <span className="prompt-cyan">&gt;</span> {typedText}
                    <span className="typing-cursor">█</span>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* =========================================================
            PHASE 5: THE STORY BEGINS OVER ARTWORK
            ========================================================= */}
        {currentPhase === 'story' && (
          <motion.div
            key="cosmic-scroll-wrapper"
            className="cosmic-scroll-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* VIEWPORT 1: ABOUT ME STORY SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky-viewport-section about-section-viewport"
            >
              <div className="about-story-excerpt">
                <motion.h1 
                  className="story-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  "This story is just for that one reader."
                </motion.h1>

                <motion.h2 
                  className="story-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  [ The Fourth Wall Decoded: Pritesh ]
                </motion.h2>

                <motion.div 
                  className="story-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                >
                  <p>Not every story begins with greatness.</p>
                  <p>Some begin with curiosity.</p>
                  <p>Mine began with a simple question:</p>
                  <p className="story-gold-highlight">"What happens if I keep going?"</p>
                  
                  <p>
                    That question led me through <span className="story-silver-highlight">programming</span>,<br />
                    <span className="story-silver-highlight">open source</span>,<br />
                    <span className="story-silver-highlight">software engineering</span>,<br />
                    and countless hours of learning.
                  </p>

                  <p>
                    From my first lines of code<br />
                    to building projects and contributing to communities,<br />
                    every step became another page in this chronicle.
                  </p>

                  <p className="reflective-paragraph">
                    There are still <span className="story-gold-highlight">scenarios</span> left to clear,<br />
                    <span className="story-gold-highlight">timelines</span> left to explore,<br />
                    and stories left to write.
                  </p>

                  <p>
                    For now,<br /><br />
                    this archive contains everything I have learned along the way.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* VIEWPORT 2: THE TECHSTACK VAULT CONSTELLATION SECTION */}
            <motion.div
              id="vault"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky-viewport-section vault-section-viewport"
            >
              {/* Constellation Overlay Background Lines */}
              <svg className="vault-constellation-overlay" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <line x1="200" y1="150" x2="500" y2="80" className="constellation-link" />
                <line x1="500" y1="80" x2="800" y2="150" className="constellation-link" />
                <line x1="200" y1="150" x2="200" y2="450" className="constellation-link" />
                <line x1="800" y1="150" x2="800" y2="450" className="constellation-link" />
                <line x1="200" y1="450" x2="500" y2="520" className="constellation-link" />
                <line x1="800" y1="450" x2="500" y2="520" className="constellation-link" />
                <line x1="500" y1="80" x2="500" y2="520" className="constellation-link" />
              </svg>

              <div className="vault-container">
                {/* Vault Title */}
                <div className="vault-header">
                  <span className="vault-system-tag">SYSTEM INVENTORY</span>
                  <h2 className="vault-main-title">[ VAULT ]</h2>
                  <p className="vault-subtitle">The attributes, tools, and skills compiled across timelines.</p>
                </div>

                {/* Stargrid columns */}
                <div className="vault-stargrid">
                  
                  {/* Category 1: Attributes & Foundations */}
                  <div className="vault-star-column">
                    <h3 className="vault-column-header">
                      <span className="header-star">★</span> ATTRIBUTES & FOUNDATIONS
                    </h3>
                    
                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Core Attributes</h4>
                      <ul className="vault-skill-list">
                        {statusTabs[0].categories[0].items.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="vault-skill-item"
                            whileHover={{ scale: 1.05, x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <span className="skill-node-dot"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">CS Foundations</h4>
                      <ul className="vault-skill-list">
                        {statusTabs[0].categories[1].items.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="vault-skill-item"
                            whileHover={{ scale: 1.05, x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <span className="skill-node-dot"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Open Source</h4>
                      <ul className="vault-skill-list">
                        {statusTabs[0].categories[2].items.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="vault-skill-item"
                            whileHover={{ scale: 1.05, x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <span className="skill-node-dot"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Category 2: Active Tech Skills */}
                  <div className="vault-star-column active-tech-col">
                    <h3 className="vault-column-header header-cyan">
                      <span className="header-star">★</span> ACTIVE SKILLS & TECH
                    </h3>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Languages</h4>
                      <div className="vault-skill-grid">
                        {statusTabs[1].categories[0].items.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="vault-skill-badge"
                            whileHover={{ scale: 1.06, y: -2 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                          >
                            <span className="badge-icon">{item.icon}</span>
                            <span className="badge-name">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Frontend Mastery</h4>
                      <div className="vault-skill-grid">
                        {statusTabs[1].categories[1].items.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="vault-skill-badge"
                            whileHover={{ scale: 1.06, y: -2 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                          >
                            <span className="badge-icon">{item.icon}</span>
                            <span className="badge-name">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">APIs & Data Handling</h4>
                      <div className="vault-skill-grid">
                        {statusTabs[1].categories[2].items.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="vault-skill-badge"
                            whileHover={{ scale: 1.06, y: -2 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                          >
                            <span className="badge-icon">{item.icon}</span>
                            <span className="badge-name">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Arsenal & Focus */}
                  <div className="vault-star-column">
                    <h3 className="vault-column-header">
                      <span className="header-star">★</span> ARSENAL & EXPLORATION
                    </h3>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Tools & Platforms</h4>
                      <div className="vault-skill-grid">
                        {statusTabs[2].categories[0].items.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="vault-skill-badge"
                            whileHover={{ scale: 1.06, y: -2 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                          >
                            <span className="badge-icon">{item.icon}</span>
                            <span className="badge-name">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Currently Exploring</h4>
                      <ul className="vault-skill-list">
                        {statusTabs[2].categories[1].items.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="vault-skill-item focus-item"
                            whileHover={{ scale: 1.05, x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <span className="skill-node-dot gold-dot"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="vault-subcategory">
                      <h4 className="subcategory-title">Current Focus</h4>
                      <ul className="vault-skill-list">
                        {statusTabs[2].categories[2].items.map((item, idx) => (
                          <motion.li 
                            key={idx} 
                            className="vault-skill-item focus-item"
                            whileHover={{ scale: 1.05, x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <span className="skill-node-dot gold-dot"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Footer status text */}
                <div className="vault-footer-text">
                  [ Every technology listed represents another tool acquired on an ongoing journey. ]
                </div>

              </div>
            </motion.div>

            {/* VIEWPORT 3: ACHIEVEMENTS SECTION */}
            <Achievements />

            {/* VIEWPORT 4: PROJECT OVERVIEW SECTION */}
            <ProjectOverview />

            {/* VIEWPORT 5: HIDDEN SCENARIO SECTION */}
            <ForbiddenRecord />

            {/* VIEWPORT 6: FINAL CHAPTER SECTION */}
            <LastPage />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default Hero;