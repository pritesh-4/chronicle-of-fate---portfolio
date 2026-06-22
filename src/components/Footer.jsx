import { useState } from 'react';
import { motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCss3Alt } from 'react-icons/fa';
import { SiVite, SiReact, SiJavascript } from 'react-icons/si';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleProposeContract = (e) => {
    e.preventDefault();
    if (!email || !message) {
      setStatus('ERROR: Input parameters missing.');
      return;
    }
    // Simulate system message processing
    setStatus('PROCESSING CONTRACT PROPOSAL...');
    setTimeout(() => {
      setStatus('SUCCESS: Propose contract accepted by Star Stream.');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <motion.footer 
      id="contact"
      className="system-window footer-panel"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cybernetic Corner Decorations */}
      <div className="system-corner tl"></div>
      <div className="system-corner tr"></div>
      <div className="system-corner bl"></div>
      <div className="system-corner br"></div>

      {/* Scanline Effect */}
      <div className="system-scanlines"></div>

      <div className="footer-grid">
        {/* Column 1: Star Stream Channel Info & Social Coordinates */}
        <div className="footer-col col-info">
          <span className="system-alert-badge">COORDINATES</span>
          <h3 className="footer-title">[ Incarnation Pritesh ]</h3>
          <p className="footer-desc">
            A developer navigating the scenarios of the Star Stream, translating fables into responsive cosmic interfaces.
          </p>
          <div className="coordinates-links">
            <a href="https://github.com/pritesh-4" target="_blank" rel="noopener noreferrer" className="coordinate-item">
              <FaGithub className="coord-icon" />
              <span>Github Channel</span>
            </a>
            <a href="https://www.linkedin.com/in/pritesh-jena-8980a6373" target="_blank" rel="noopener noreferrer" className="coordinate-item">
              <FaLinkedin className="coord-icon" />
              <span>LinkedIn Frequency</span>
            </a>
            <a href="mailto:priteshjena16@gmail.com" className="coordinate-item">
              <FaEnvelope className="coord-icon" />
              <span>Star Email Link</span>
            </a>
          </div>
        </div>

        {/* Column 2: Attributes & Stigmas (Tech Stack) */}
        <div className="footer-col col-skills">
          <span className="system-alert-badge">STATUS WINDOW</span>
          <h3 className="footer-title">[ Attributes & Stigmas ]</h3>
          
          <div className="stigmas-list">
            <div className="stigma-item">
              <div className="stigma-head">
                <span className="stigma-name">React Development</span>
                <span className="stigma-lvl val-cyan">Lvl 19</span>
              </div>
              <div className="stigma-bar"><div className="stigma-progress progress-cyan" style={{ width: '92%' }}></div></div>
            </div>
            
            <div className="stigma-item">
              <div className="stigma-head">
                <span className="stigma-name">Vite Bundler</span>
                <span className="stigma-lvl val-cyan">Lvl 8</span>
              </div>
              <div className="stigma-bar"><div className="stigma-progress progress-cyan" style={{ width: '85%' }}></div></div>
            </div>

            <div className="stigma-item">
              <div className="stigma-head">
                <span className="stigma-name">Framer Motion</span>
                <span className="stigma-lvl val-gold">Lvl 12 (Rare)</span>
              </div>
              <div className="stigma-bar"><div className="stigma-progress progress-gold" style={{ width: '88%' }}></div></div>
            </div>

            <div className="stigma-item">
              <div className="stigma-head">
                <span className="stigma-name">Vanilla CSS & Styling</span>
                <span className="stigma-lvl val-gold">MAX (Fable)</span>
              </div>
              <div className="stigma-bar"><div className="stigma-progress progress-gold" style={{ width: '100%' }}></div></div>
            </div>
          </div>

          <div className="tech-logos">
            <SiReact className="tech-logo-icon" title="React" />
            <SiVite className="tech-logo-icon" title="Vite" />
            <FaCss3Alt className="tech-logo-icon" title="CSS3" />
            <SiJavascript className="tech-logo-icon" title="Javascript" />
          </div>
        </div>

        {/* Column 3: Propose Contract (Contact Form) */}
        <div className="footer-col col-contract">
          <span className="system-alert-badge">SPONSOR CONTRACT</span>
          <h3 className="footer-title">[ Offer Sponsorship ]</h3>
          <p className="footer-desc">Propose a new scenario, project collab, or direct inquiry.</p>
          
          <form className="sponsorship-form" onSubmit={handleProposeContract}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="[ Constellation Name / Email ]" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="[ Propose Scenario Details... ]" 
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="propose-btn">
              <span>Propose Contract</span>
              <FaPaperPlane className="propose-btn-icon" />
            </button>
          </form>
          {status && (
            <div className={`form-status ${status.startsWith('SUCCESS') ? 'status-ok' : status.startsWith('PROCESSING') ? 'status-wait' : 'status-err'}`}>
              [ {status} ]
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="bottom-line"></span>
        <span className="copyright-text">
          © {new Date().getFullYear()} Pritesh. All Rights Reserved. Star Stream Frequency 707.
        </span>
        <span className="bottom-line"></span>
      </div>
    </motion.footer>
  );
};

export default Footer;
