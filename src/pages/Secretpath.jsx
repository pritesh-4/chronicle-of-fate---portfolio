import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaBrain, FaRocket, FaBuilding, 
  FaExclamationTriangle, FaSkullCrossbones 
} from 'react-icons/fa';

const futureTimelines = [
  {
    branch: "BRANCH #707",
    title: "Autonomous Agentic Frameworks",
    category: "Classification: AI Engineering & Telemetry",
    details: "Researching and developing sandbox compile-layer architectures that connect autonomous model runtimes with local workspaces. Aiming to build zero-latency developer productivity loops and programmatic reasoning environments.",
    objective: "Clear condition: Standardize sandbox workspace interaction logs.",
    icon: <FaBrain />,
    stability: "34.7% [UNSTABLE]",
    integrity: "CORRUPTING",
    barWidth: "34%"
  },
  {
    branch: "BRANCH #808",
    title: "Vanguard Software Organizations",
    category: "Classification: Career Coordinate Target",
    details: "Aiming to contribute to world-class software engineering and research groups. Focused on organizations exploring AI interfaces, developer tools, compiler logic, and interactive stateful systems.",
    objective: "Target nodes: Google DeepMind, OpenAI, JaneStreet, Palantnir, Lockheed Martin, Stripe.",
    icon: <FaBuilding />,
    stability: "19.2% [COLLAPSE DETECTED]",
    integrity: "CRITICAL",
    barWidth: "19%"
  },
  {
    branch: "BRANCH #909",
    title: "Unwritten Chronicles & Startup Heuristics",
    category: "Classification: Entrepreneurship & Research",
    details: "Constructing developer-centric telemetry services, continuous code diagnostics, and real-time impact predictors. Decoupling complex software architecture schemas into human-readable fables.",
    objective: "Status: Research active. Launch sequence pending.",
    icon: <FaRocket />,
    stability: "55.5% [FLUCTUATING]",
    integrity: "DECAYING",
    barWidth: "55%"
  }
];

const Secretpath = () => {
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Background crimson stars
  const [stars] = useState(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${2.5 + Math.random() * 3.5}s`,
      delay: `${Math.random() * -4}s`,
      color: Math.random() > 0.4 ? '#FF4B4B' : '#881111'
    }))
  );

  return (
    <div className="secret-path-viewport">
      {/* Visual Glitch & Crimson Atmosphere Overlays */}
      <div className="secret-crimson-glow-overlay" />
      <div className="secret-grid-overlay" />
      <div className="secret-scanline-overlay" />

      {/* Floating Crimson Energy Orbs */}
      <div className="secret-ambient-orb orb-red-1" />
      <div className="secret-ambient-orb orb-red-2" />
      <div className="secret-ambient-orb orb-red-3" />

      {/* Looping Marquee warning ticker at the very top */}
      <div className="secret-warning-ticker">
        <div className="ticker-inner">
          <span>
            [ WARNING: TIMELINE DIVERGENCE DETECTED ] ── [ FOURTH WALL STATUS: CRITICAL FRACTURE ] ── [ PROBABILITY TIDES INFLATED: 99.7% ] ── [ RESTRICTED ACCESS SCENARIO ] ── [ FUTURE CHRONICLES UNRESOLVED ] ── [ ERROR_CODE: _STIGMA_DECAY ] ──&nbsp;
          </span>
          <span>
            [ WARNING: TIMELINE DIVERGENCE DETECTED ] ── [ FOURTH WALL STATUS: CRITICAL FRACTURE ] ── [ PROBABILITY TIDES INFLATED: 99.7% ] ── [ RESTRICTED ACCESS SCENARIO ] ── [ FUTURE CHRONICLES UNRESOLVED ] ── [ ERROR_CODE: _STIGMA_DECAY ] ──&nbsp;
          </span>
        </div>
      </div>

      {/* Twinkling Red Starfield */}
      <div className="secret-starfield">
        {stars.map((s) => (
          <div 
            key={s.id}
            className="secret-twinkle-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: `0 0 6px ${s.color}`,
              animationDuration: s.duration,
              animationDelay: s.delay
            }}
          />
        ))}
      </div>

      <div className="secret-content-container">
        {/* Navigation back to main page */}
        <motion.div 
          className="secret-back-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className="btn-return-timeline danger-theme"
            onClick={() => navigate('/hero')}
          >
            <FaArrowLeft className="back-arrow-icon" />
            <span className="btn-return-decor">[</span>
            Abort Scenario & Reconnect Timeline
            <span className="btn-return-decor">]</span>
          </button>
        </motion.div>

        {/* Header warnings and glitched title */}
        <div className="secret-header">
          <span className="secret-badge-log blink-danger">
            <FaExclamationTriangle className="ticker-danger-icon" /> SYSTEM CRITICAL LEVEL
          </span>
          <h1 className="secret-title glitch-text-crimson" data-text="[ THE UNWRITTEN FUTURES ]">
            [ THE UNWRITTEN FUTURES ]
          </h1>
          <p className="secret-subtitle warning-flicker">
            Warning: Accessing probability branches beyond the primary scenario limits. System corruption imminent.
          </p>
        </div>

        {/* Future branch cards */}
        <div className="secret-branches-grid">
          {futureTimelines.map((item, idx) => (
            <motion.div
              key={item.branch}
              className="secret-branch-card card-unstable"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + idx * 0.18, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              {/* Crimson cyber corners */}
              <div className="card-cyber-bracket tl red-accent"></div>
              <div className="card-cyber-bracket tr red-accent"></div>
              <div className="card-cyber-bracket bl red-accent"></div>
              <div className="card-cyber-bracket br red-accent"></div>
              <div className="card-glitch-flicker-grid"></div>

              <div className="card-head-row">
                <span className="branch-id-badge red-theme">{item.branch}</span>
                <span className="branch-icon red-glow">{item.icon}</span>
              </div>

              <h3 className="branch-title text-flicker-hover">{item.title}</h3>
              <span className="branch-classification red-tag">{item.category}</span>

              {/* Dynamic Stability Bar */}
              <div className="branch-stability-block">
                <div className="stability-meta-row">
                  <span className="stability-label">STABILITY RATIO:</span>
                  <span className="stability-value value-warning">{item.stability}</span>
                </div>
                <div className="stability-progress-bar">
                  <div 
                    className="stability-progress-fill" 
                    style={{ width: item.barWidth }}
                  />
                </div>
                <div className="stability-meta-row sub-row">
                  <span>INTEGRITY_READ:</span>
                  <span className="integrity-status">{item.integrity}</span>
                </div>
              </div>

              <p className="branch-details">{item.details}</p>

              <div className="branch-divider crimson-line"></div>
              
              <div className="branch-objective text-red-glow">
                <span className="objective-prefix warning-subheading">Scenario requirement:</span>
                <span className="objective-value text-white">{item.objective}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lock seal indicator */}
        <motion.div 
          className="bottom-scenario-seal status-locked"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <FaSkullCrossbones className="seal-lock-icon pulse-crimson" />
          <span className="seal-text">
            [ TIMELINE INSTABILITY CRITICAL - PATH SEALS LOCKED BY THE STAR STREAM ]
          </span>
          <span className="seal-subtext">
            Probability cost required to unlock these coordinates is currently unavailable.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Secretpath;
