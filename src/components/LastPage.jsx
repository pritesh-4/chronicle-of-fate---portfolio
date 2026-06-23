import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import swordImage from '../assets/sword1.png';

const CelestialSocialIcon = ({ href, icon }) => {
  const [particles, setParticles] = useState([]);

  const handleMouseEnter = () => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      angle: (i * 360) / 8 + (Math.random() * 15 - 7.5),
      distance: 35 + Math.random() * 20,
      size: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setParticles([]);
    }, 700);
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="celestial-social-link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="celestial-social-circle">
        {icon}
      </div>
      
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="celestial-social-particle"
            initial={{ x: -2, y: -2, opacity: 1, scale: 1 }}
            animate={{ 
              x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
              y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
              opacity: 0,
              scale: 0.4
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </AnimatePresence>
    </a>
  );
};

const LastPage = () => {
  const sectionRef = useRef(null);
  const sysRef = useRef(null);
  const bottomSentinelRef = useRef(null);

  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isSysInView = useInView(sysRef, { once: true, amount: 0.5 });
  const isBottomInView = useInView(bottomSentinelRef, { once: false, amount: 0.1 });

  const [sysStep, setSysStep] = useState(0);
  const [showFourthWall, setShowFourthWall] = useState(false);
  const [hasTriggeredFourthWall, setHasTriggeredFourthWall] = useState(false);

  const [stars] = useState(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.8}px`,
      duration: `${4 + Math.random() * 5}s`,
      delay: `${Math.random() * -5}s`,
    }))
  );

  useEffect(() => {
    if (isSysInView) {
      const timer0 = setTimeout(() => setSysStep(1), 50);
      const timer1 = setTimeout(() => setSysStep(2), 1200);
      const timer2 = setTimeout(() => setSysStep(3), 2400);
      return () => {
        clearTimeout(timer0);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isSysInView]);

  useEffect(() => {
    if (isBottomInView && !hasTriggeredFourthWall) {
      const timer0 = setTimeout(() => {
        setShowFourthWall(true);
        setHasTriggeredFourthWall(true);
      }, 50);
      const hideTimer = setTimeout(() => {
        setShowFourthWall(false);
      }, 4050);
      return () => {
        clearTimeout(timer0);
        clearTimeout(hideTimer);
      };
    }
  }, [isBottomInView, hasTriggeredFourthWall]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      id="last-page"
      ref={sectionRef}
      className="last-page-section"
    >
      <div className="last-page-starfield">
        {stars.map((s) => (
          <motion.div 
            key={s.id}
            className="last-page-twinkle-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.15, 0.75, 0.15] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {isSectionInView && (
        <motion.div 
          className="last-page-fate-circle-wrap"
          initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{ duration: 2.0, ease: "easeOut" }}
        >
          <svg className="fate-circle-bg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <circle cx="250" cy="250" r="230" stroke="rgba(217, 185, 106, 0.3)" strokeWidth="0.75" fill="none" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="200" stroke="rgba(217, 185, 106, 0.2)" strokeWidth="1.5" fill="none" />
            <circle cx="250" cy="250" r="160" stroke="rgba(217, 185, 106, 0.15)" strokeWidth="0.75" fill="none" strokeDasharray="8 4" />
            
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 250 + 200 * Math.sin(angle);
              const y1 = 250 - 200 * Math.cos(angle);
              const x2 = 250 + 214 * Math.sin(angle);
              const y2 = 250 - 214 * Math.cos(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(217, 185, 106, 0.35)" strokeWidth="1" />
              );
            })}

            <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(217, 185, 106, 0.08)" strokeWidth="0.75" />
            <line x1="50" y1="250" x2="450" y2="250" stroke="rgba(217, 185, 106, 0.08)" strokeWidth="0.75" />
            <line x1="108" y1="108" x2="392" y2="392" stroke="rgba(217, 185, 106, 0.08)" strokeWidth="0.75" strokeDasharray="5 5" />
            <line x1="392" y1="108" x2="108" y2="392" stroke="rgba(217, 185, 106, 0.08)" strokeWidth="0.75" strokeDasharray="5 5" />
          </svg>
        </motion.div>
      )}

      {isSectionInView && (
        <motion.div 
          className="ancient-sword-artifact"
          initial={{ opacity: 0, y: "-42%", x: "-50%", scale: 0.95 }}
          animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
        >
          <img 
            src={swordImage} 
            alt="Ancient Weathered Sword" 
            className="ancient-sword-img"
          />
        </motion.div>
      )}

      <div className="last-page-content">
        {isSectionInView && (
          <motion.div 
            className="last-page-text-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="main-narrative-stanza" variants={textItemVariants}>
              <p className="main-stanza-line font-cinzel">Every timeline eventually ends.</p>
              <p className="main-stanza-line font-cormorant">If our paths cross again,</p>
              <p className="main-stanza-line font-cinzel">perhaps another story will begin.</p>
            </motion.div>

            <motion.div className="secondary-personal-stanza" variants={textItemVariants}>
              <p>The story remains unfinished.</p>
              <p>There are still scenarios left to clear.</p>
              <p>Still futures left to explore.</p>
              <p>Still pages left unwritten.</p>
            </motion.div>

            <motion.p 
              className="reader-recognition-label font-cormorant"
              variants={textItemVariants}
            >
              For that one reader who stayed until the end.
            </motion.p>

            <div ref={sysRef} className="last-page-sys-feed">
              <AnimatePresence>
                {sysStep >= 1 && (
                  <motion.div 
                    className="system-shut-line"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  >
                    [ Archive Closing ]
                  </motion.div>
                )}
                {sysStep >= 2 && (
                  <motion.div 
                    className="system-shut-line"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  >
                    [ Reader Data Saved ]
                  </motion.div>
                )}
                {sysStep >= 3 && (
                  <motion.div 
                    className="system-shut-line highlight-gold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                  >
                    [ Story Continues Beyond This Point ]
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              className="open-communication-channel"
              variants={textItemVariants}
            >
              <h4 className="communication-header">[ Open Communication Channel ]</h4>
              <div className="communication-links-row">
                <CelestialSocialIcon 
                  href="https://github.com/pritesh-4" 
                  icon={<FaGithub />} 
                />
                <CelestialSocialIcon 
                  href="https://linkedin.com/in/pritesh-jena-8980a6373" 
                  icon={<FaLinkedin />} 
                />
                <CelestialSocialIcon 
                  href="mailto:priteshjena16@gmail.com" 
                  icon={<FaEnvelope />} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div ref={bottomSentinelRef} className="bottom-observer-sentinel" />

      <AnimatePresence>
        {showFourthWall && (
          <motion.div 
            className="fourth-wall-toast"
            initial={{ opacity: 0, y: 35, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 15, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="fourth-wall-toast-bracket tl"></div>
            <div className="fourth-wall-toast-bracket tr"></div>
            <div className="fourth-wall-toast-bracket bl"></div>
            <div className="fourth-wall-toast-bracket br"></div>
            <span className="toast-text-orv">[ The Fourth Wall has ended observation. ]</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LastPage;
