import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaBars, FaTimes } from "react-icons/fa";
import orvlogo from "../assets/navbar.png"
import { motion, AnimatePresence } from 'motion/react';

// Tracks the user's intent to play or pause the audio stream globally
let isAudioEnabled = true;

// Persistent global audio player across Navbar remounts
const musicUrl = new URL('../assets/music.mpeg', import.meta.url).href;
const globalAudio = typeof Audio !== 'undefined' ? new Audio(musicUrl) : null;
if (globalAudio) {
  globalAudio.loop = true;
  globalAudio.play().catch(() => {
    // Autoplay blocked initially, resolved by interaction handlers
  });
}

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(isAudioEnabled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!globalAudio) return;

    // Synchronize play state on mount/render cycle
    if (isPlaying && globalAudio.paused) {
      globalAudio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Play blocked on mount
        });
    }

    // Interaction handler to start playing if browser autoplay was blocked
    const handleFirstInteraction = () => {
      if (isPlaying && globalAudio.paused) {
        globalAudio.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!globalAudio) return;
    if (globalAudio.paused) {
      globalAudio.play()
        .then(() => {
          setIsPlaying(true);
          isAudioEnabled = true;
        })
        .catch(() => {});
    } else {
      globalAudio.pause();
      setIsPlaying(false);
      isAudioEnabled = false;
    }
  };
  
  // Stagger container for links
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25
      }
    }
  };

  // Individual link variants
  const linkItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 14 
      }
    }
  };

  const mobileDrawerVariants = {
    hidden: { opacity: 0, y: -20, x: '-50%' },
    visible: { 
      opacity: 1, 
      y: 0,
      x: '-50%',
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      x: '-50%',
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <>
      <motion.div 
        className='navbar'
        initial={{ y: -60, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cybernetic Corner Decorations */}
        <div className="system-corner tl"></div>
        <div className="system-corner tr"></div>
        <div className="system-corner bl"></div>
        <div className="system-corner br"></div>

        {/* Scanline Effect */}
        <div className="system-scanlines"></div>

        {/* Logo */}
        <motion.div 
          className='logo'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Link to="/hero" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={orvlogo} alt="ORV logo" />
          </Link>
        </motion.div>

        {/* Links */}
        <div className='links'>
          <motion.ul
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={linkItemVariants}><Link to="/hero#achievements">Achievements</Link></motion.li>
            <motion.li variants={linkItemVariants}><Link to="/project">Projects</Link></motion.li>
            <motion.li variants={linkItemVariants}><Link to="/hero#vault">Vault</Link></motion.li>
            <motion.li variants={linkItemVariants}><Link to="/hero#contact">Contact</Link></motion.li>
          </motion.ul>
        </div>

        {/* Right actions */}
        <div className="navbar-actions">
          {/* Music button */}
          <motion.div 
            className='music'
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 160, 
              damping: 14,
              delay: 0.3
            }}
          >
            <button 
              className={`music-btn ${isPlaying ? 'playing' : 'paused'}`} 
              onClick={togglePlay}
              title={isPlaying ? "Mute Stream" : "Play Stream"}
            >
              <FaMusic />
            </button>
          </motion.div>

          {/* Mobile Hamburger toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-drawer"
            variants={mobileDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cybernetic Corner Decorations */}
            <div className="system-corner tl"></div>
            <div className="system-corner tr"></div>
            <div className="system-corner bl"></div>
            <div className="system-corner br"></div>

            {/* Scanline Effect */}
            <div className="system-scanlines"></div>

            <motion.ul 
              className="mobile-menu-links"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={linkItemVariants}>
                <Link to="/hero#achievements" onClick={() => setIsMobileMenuOpen(false)}>
                  Achievements
                </Link>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <Link to="/project" onClick={() => setIsMobileMenuOpen(false)}>
                  Projects
                </Link>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <Link to="/hero#vault" onClick={() => setIsMobileMenuOpen(false)}>
                  Vault
                </Link>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <Link to="/hero#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar;