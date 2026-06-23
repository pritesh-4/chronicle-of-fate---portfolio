import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sword from "../assets/sword1.png";

const Landing = () => {
  const navigate = useNavigate();
  const [showSystem, setShowSystem] = useState(false);
  const [stars] = useState(() => 
    Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${3 + Math.random() * 4}s`,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSystem(true);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="landing">

      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="20" y1="35" x2="45" y2="20" className="constellation-line line-1" />
        <line x1="45" y1="20" x2="75" y2="25" className="constellation-line line-2" />
        <line x1="75" y1="25" x2="80" y2="55" className="constellation-line line-3" />
        <line x1="80" y1="55" x2="50" y2="75" className="constellation-line line-4" />
        <line x1="50" y1="75" x2="15" y2="60" className="constellation-line line-5" />
        <line x1="15" y1="60" x2="20" y2="35" className="constellation-line line-6" />
      </svg>
      <div className="major-star star-cyan" style={{ top: "35%", left: "20%" }}></div>
      <div className="major-star" style={{ top: "20%", left: "45%" }}></div>
      <div className="major-star star-cyan" style={{ top: "25%", left: "75%" }}></div>
      <div className="major-star" style={{ top: "55%", left: "80%" }}></div>
      <div className="major-star star-cyan" style={{ top: "75%", left: "50%" }}></div>
      <div className="major-star" style={{ top: "60%", left: "15%" }}></div>

      <div className="sword-beam"></div>
      <div className="summoning-circle"></div>

      <div className="gear gear-one"></div>
      <div className="gear gear-two"></div>

      <div className="orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
        <div className="orb orb-6"></div>
      </div>

      <img
        src={sword}
        alt="Celestial Sword"
        className="sword"
      />

      {showSystem && (
        <div className="system-window">
          <div className="system-corner tl"></div>
          <div className="system-corner tr"></div>
          <div className="system-corner bl"></div>
          <div className="system-corner br"></div>

          <div className="system-scanlines"></div>

          <div className="system-header">
            <span className="system-alert-badge">MAIN SCENARIO</span>
            <h2 className="system-title">[ Scenario 0001 — The Archive ]</h2>
          </div>

          <div className="system-content">
            <div className="objective-box">
              <div className="objective-label">CLEAR CONDITIONS</div>
              <p className="objective-text">Understand the creator known as Pritesh.</p>
            </div>

            <div className="meta-grid">
              <div className="meta-item">
                <span className="meta-label">CATEGORY</span>
                <span className="meta-val val-cyan">MAIN</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">DIFFICULTY</span>
                <span className="meta-val val-gold">F (UNKNOWN)</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">TIME LIMIT</span>
                <span className="meta-val">NONE</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">COMPENSATION</span>
                <span className="meta-val val-reward">Access to future timelines</span>
              </div>
            </div>

            <div className="penalty-box">
              <span className="penalty-label">PENALTY FOR FAILURE:</span>
              <span className="penalty-val">Memory wipe and eternal confinement.</span>
            </div>

            <div className="feed-header">
              <span className="feed-header-line"></span>
              <span className="feed-header-text">STAR STREAM LOG</span>
              <span className="feed-header-line"></span>
            </div>

            <div className="constellations-feed">
              <div className="constellation-msg msg-1">
                [The constellation 'Demon-like Judge of Fire' is excited to see a new reader.]
              </div>
              <div className="constellation-msg msg-2">
                [The constellation 'Secretive Plotter' is observing your actions.]
              </div>
              <div className="constellation-msg msg-3">
                [The constellation 'Prisoner of the Golden Headband' is eating sweet potatoes while watching.]
              </div>
            </div>
          </div>

          <button className="scenario-btn" onClick={() => navigate('/hero')}>
            Accept Scenario
          </button>

        </div>
      )}

    </section>
  )
}

export default Landing;