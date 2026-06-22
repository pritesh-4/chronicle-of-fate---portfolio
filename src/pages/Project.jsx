import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import devloreimg from '../assets/devlore.png';
import chroniclesofFateimg from '../assets/Chronicle.png';
import valentinewebpageimg from '../assets/valentine.png';

const projectsList = [
  {
    id: "001",
    title: "DEVLORE",
    category: "Frontend Development",
    description: "An advanced quiz compilation architecture engineered using React Hooks, local state mapping, and REST API connectors. Displays absolute state synchronization across multiple threads.",
    year: "2026",
    status: "Archived",
    tech: ["React", "Vite", "Axios", "JavaScript", "CSS"],
    repo: "https://github.com/pritesh-4/DevLore",
    demo: "https://devlore-ebon.vercel.app/",
    image: devloreimg
  },
  {
    id: "002",
    title: "AI IMPACT PREDICTOR",
    category: "Machine Learning / Flask",
    description: "An intelligent heuristic compilation layer created to analyze potential software alterations, predicting post-deployment risks prior to compile cycles.",
    year: "2026-ongoing",
    status: "Archived",
    tech: ["Python", "React", "Flask", "scikit-learn", "Chart.js"],
    repo: "https://github.com/pritesh-4/AI-Impact-Predictor",
    demo: "https://ai-impact-predictor.vercel.app",
    image: null
  },
  {
    id: "003",
    title: "CHRONICLES OF FATE",
    category: "Frontend Development",
    description: "The primary registry archive cataloging the characteristics, active skills, resolved scenarios, and timeline chronicles of Incarnation Pritesh.",
    year: "2026",
    status: "Archived",
    tech: ["React", "Vite", "Framer Motion", "Vanilla CSS"],
    repo: "https://github.com/pritesh-4/Chronicles-of-Fate",
    demo: "https://pritesh-portfolio.vercel.app",
    image: chroniclesofFateimg
  },
  {
    id: "004",
    title: "Valentine webpage",
    category: "Full Stack Development",
    description: "A classified hub designed to catalog developer workspace coordinates, sync workspace telemetry streams, and run compile checks in virtualized containers.",
    year: "2026",
    status: "Archived",
    tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    repo: "https://github.com/pritesh-4/AI-Code-Impact-Predictor",
    demo: "https://ai-code-impact-predictor.vercel.app/",
    image: valentinewebpageimg
  }
];

const Project = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Subtle background stars
  const [stars] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.8}px`,
      duration: `${4 + Math.random() * 5}s`,
      delay: `${Math.random() * -5}s`
    }))
  );

  // Framer Motion reveal variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" } 
    }
  };

  return (
    <div className="project-archive-viewport">
      {/* Quiet Constellation overlay & background stars */}
      <div className="archive-starfield-bg">
        {stars.map((s) => (
          <motion.div 
            key={s.id}
            className="archive-subtle-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="archive-inner-container">
        {/* Large ORV System Header */}
        <motion.div 
          className="archive-system-header"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="header-cyan-glare"></div>
          <span className="header-status-stigma">&lt; PROJECT ARCHIVE &gt;</span>
          <h2 className="header-title-text">Recorded Timelines Available: 4</h2>
          <p className="header-subtitle-text">Select a scenario record for review.</p>
        </motion.div>

        {/* 2x2 Grid of Scenario records */}
        <motion.div 
          className="archive-scenario-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {projectsList.map((project) => (
            <motion.div
              key={project.id}
              className="orv-scenario-card"
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 0 25px rgba(122, 184, 255, 0.38), inset 0 0 15px rgba(122, 184, 255, 0.12)",
                transition: { duration: 0.25 }
              }}
            >
              {/* ORV Window Corner cyber brackets */}
              <div className="orv-bracket tl"></div>
              <div className="orv-bracket tr"></div>
              <div className="orv-bracket bl"></div>
              <div className="orv-bracket br"></div>
              <div className="orv-window-scanlines"></div>

              {/* 16:9 Scenario Screenshot Area */}
              <div className="orv-screenshot-frame">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={`${project.title} Screenshot`} 
                    className="orv-project-screenshot"
                  />
                ) : (
                  <div className="screenshot-inner-grid">
                    <div className="screenshot-concentric-radar"></div>
                    <div className="screenshot-scanline-bar"></div>
                    <div className="screenshot-matrix-text">
                      <span>SYS_ARCHIVE_ID_{project.id}</span>
                      <span>TIMELINE_ACTIVE_TRUE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Metadata info */}
              <div className="orv-card-content">
                <span className="orv-timeline-tag font-mono">&lt;TIMELINE #{project.id}&gt;</span>
                <h3 className="orv-project-title font-cinzel">{project.title}</h3>
                
                <p className="orv-project-description font-inter">{project.description}</p>
                
                {/* Tech Pills */}
                <div className="orv-tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="orv-tech-pill font-mono">{t}</span>
                  ))}
                </div>

                {/* System Specs table details */}
                <div className="orv-specs-table">
                  <div className="specs-row">
                    <span className="specs-label font-mono">STATUS:</span>
                    <span className="specs-val font-mono val-cyan">{project.status}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label font-mono">CATEGORY:</span>
                    <span className="specs-val font-mono">{project.category}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label font-mono">YEAR:</span>
                    <span className="specs-val font-mono val-gold">{project.year}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="orv-action-buttons">
                  <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="orv-btn-action"
                  >
                    <FaGithub className="action-icon" />
                    <span>[ Repository ]</span>
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="orv-btn-action"
                  >
                    <FaExternalLinkAlt className="action-icon" />
                    <span>[ Deployment ]</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Project;