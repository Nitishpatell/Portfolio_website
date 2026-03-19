import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

/**
 * Hero Component (Anime.js Rebuild)
 * Features a minimalist design with a clean typography layout on the left
 * and a premium, motion-driven circular SVG animation on the right.
 */
const Hero = () => {
  const [role, setRole] = useState('');
  const heroRef = useRef(null);
  const svgRef = useRef(null);
  const headingRef = useRef(null);

  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "IoT Engineer",
    "Problem Solver",
    "Software Engineer"
  ];

  // 1. Anime.js Typewriter Logic
  useEffect(() => {
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        setRole(currentRole.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setRole(currentRole.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        speed = 2000; // Pause at end of word
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        speed = 1000;
      }

      timeoutId = setTimeout(type, speed);
    };

    // Start typewriter after a short delay
    const startTimeout = setTimeout(type, 800);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // 2. Anime.js Entrance & SVG Loop
  useEffect(() => {
    // Entrance Animation for Content
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: '.hero-content > *',
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 1200
    });

    // Circular SVG Animation Loop
    anime({
      targets: svgRef.current.querySelectorAll('.circle-path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: anime.stagger(300),
      loop: true,
      direction: 'alternate'
    });

    anime({
      targets: svgRef.current,
      rotate: '360deg',
      duration: 20000,
      easing: 'linear',
      loop: true
    });

    anime({
      targets: svgRef.current.querySelectorAll('.dot'),
      scale: [0.8, 1.2],
      opacity: [0.3, 0.8],
      delay: anime.stagger(200),
      duration: 1000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });

  }, []);

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="hero-container">
        {/* Left Side: Content */}
        <div className="hero-content">
          <h1 ref={headingRef} className="hero-title">
            Hi, I'm <span className="accent-text">Nitish Patel</span>
          </h1>
          
          <div className="hero-role-wrapper">
            <span className="hero-role">
              {role}<span className="cursor-blink">|</span>
            </span>
          </div>

          <p className="hero-subheading">
            Final year engineering student from Maharashtra, India. 
            I build intelligent web apps, AI systems, and automation tools 
            driven by clean code and minimalist motion.
          </p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-filled">View My Work</a>
            <a href="/resume.pdf" download className="btn btn-outline">Download Resume</a>
          </div>
        </div>

        {/* Right Side: Circular SVG Animation */}
        <div className="hero-visual">
          <svg 
            ref={svgRef} 
            viewBox="0 0 400 400" 
            className="hero-svg"
          >
            <circle 
              className="circle-path" 
              cx="200" cy="200" r="120" 
              fill="none" stroke="var(--red)" 
              strokeWidth="2" strokeDasharray="30 10"
            />
            <circle 
              className="circle-path" 
              cx="200" cy="200" r="150" 
              fill="none" stroke="var(--red)" 
              strokeWidth="1" strokeDasharray="5 15"
              opacity="0.4"
            />
            <circle 
              className="circle-path" 
              cx="200" cy="200" r="180" 
              fill="none" stroke="var(--red)" 
              strokeWidth="0.5" strokeDasharray="100 20"
              opacity="0.2"
            />
            
            <circle className="dot" cx="200" cy="80" r="4" fill="var(--red)" />
            <circle className="dot" cx="320" cy="200" r="4" fill="var(--red)" />
            <circle className="dot" cx="200" cy="320" r="4" fill="var(--red)" />
            <circle className="dot" cx="80" cy="200" r="4" fill="var(--red)" />
          </svg>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          background: var(--bg-dark);
          color: var(--text-light);
          display: flex;
          align-items: center;
          padding: 100px 5% 60px;
          overflow: hidden;
        }

        .hero-container {
          max-width: var(--container);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(40px, 6vw, 84px);
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .accent-text {
          color: var(--red);
        }

        .hero-role-wrapper {
          min-height: 50px;
          margin-bottom: 30px;
        }

        .hero-role {
          font-family: 'DM Mono', monospace;
          font-size: clamp(20px, 3vw, 32px);
          color: var(--text-muted);
          font-weight: 400;
        }

        .cursor-blink {
          color: var(--red);
          animation: blink 1s infinite step-end;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-subheading {
          max-width: 540px;
          font-size: 18px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .hero-btns {
          display: flex;
          gap: 20px;
        }

        .btn {
          padding: 14px 28px;
          border-radius: 4px;
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition);
          font-size: 15px;
        }

        .btn-filled {
          background: var(--red);
          color: #fff;
          border: 1px solid var(--red);
        }
        .btn-filled:hover {
          background: transparent;
          color: var(--red);
        }

        .btn-outline {
          border: 1px solid var(--border-dark);
          color: var(--text-light);
        }
        .btn-outline:hover {
          border-color: var(--red);
          color: var(--red);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-svg {
          width: 100%;
          max-width: 450px;
          transform-origin: center;
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-btns {
            justify-content: center;
          }
          .hero-svg {
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
