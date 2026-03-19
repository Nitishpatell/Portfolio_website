import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Navbar Component
 * Features a glassmorphism design, GSAP entrance animation, 
 * scroll-based styling, active link detection, and a mobile menu.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const navRef = useRef(null);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    // 1. Entrance Animation (Anime.js)
    anime({
      targets: navRef.current,
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 3500, // Matching loader duration
      easing: 'easeOutExpo'
    });

    // 2. Scroll Event Handling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Active Link Detection (IntersectionObserver)
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach(link => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth Scroll Logic
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) toggleMenu();
  };

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    
    if (nextState) {
      document.body.style.overflow = 'hidden';
      // Animate mobile links intake (Anime.js)
      anime({
        targets: '.mobile-link',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 300 }),
        duration: 800,
        easing: 'easeOutExpo'
      });
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        {/* Left Side: Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('hero')}>
          N.dev
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <div 
              key={link.id} 
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </div>
          ))}
        </div>

        {/* Right Side: Interaction */}
        <div className="nav-right">
          <a 
            href="#contact" 
            className="hire-btn" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Hire Me
          </a>
          
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links-container">
          {navLinks.map((link) => (
            <div 
              key={link.id} 
              className="mobile-link"
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 24px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(5, 8, 16, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(56, 120, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .navbar.scrolled {
          padding: 16px 60px;
          background: rgba(5, 8, 16, 0.9);
          border-bottom: 1px solid rgba(56, 120, 255, 0.3);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          cursor: pointer;
          background: linear-gradient(135deg, var(--red), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: transform 0.3s ease;
        }
        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: var(--text2, #8a9bbf);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--red);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          width: 0; height: 2px;
          background: var(--red);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .hire-btn {
          padding: 10px 24px;
          border: 1px solid var(--red);
          border-radius: 4px; /* Squarer for modern look */
          color: var(--red);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          z-index: 1;
          transition: var(--transition);
        }
        .hire-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: var(--red);
          z-index: -1;
          transition: left 0.3s ease;
        }
        .hire-btn:hover {
          color: white;
        }
        .hire-btn:hover::before {
          left: 0;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          z-index: 101;
        }
        .hamburger span {
          width: 26px;
          height: 2px;
          background: var(--text, #e8edf5);
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(5, 8, 16, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-100%);
          transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .mobile-menu-overlay.open {
          transform: translateY(0);
        }
        .mobile-links-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .mobile-link {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 36px;
          color: var(--text, #e8edf5);
          text-transform: uppercase;
          cursor: pointer;
          opacity: 0;
        }
        .mobile-link:hover {
          color: var(--red);
        }

        @media (max-width: 1024px) {
          .navbar {
            padding: 20px 40px;
          }
          .navbar.scrolled {
            padding: 14px 40px;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hamburger {
            display: flex;
            margin-left: 20px;
          }
          .hire-btn {
            display: none;
          }
          .navbar {
            padding: 20px 24px;
          }
          .navbar.scrolled {
            padding: 12px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
