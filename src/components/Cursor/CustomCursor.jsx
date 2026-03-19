import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * CustomCursor Component
 * Clean, red-accented minimalist cursor system.
 * Uses Anime.js for transitions and a simple lerp for frame-by-frame lag.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  useEffect(() => {
    // 1. Mouse Move Listener: Immediate follow for dot
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };
      
      if (dotRef.current) {
        // Using transform for optimal performance
        dotRef.current.style.transform = `translate(-50%, -50%) translate(${clientX}px, ${clientY}px)`;
      }
    };

    // 2. Animation Loop: Smooth lag for ring using Lerp
    const updateRing = () => {
      if (!ringRef.current) return;
      
      // Calculate next position with 0.15 interpolation factor (lag)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      ringRef.current.style.transform = `translate(-50%, -50%) translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      requestRef.current = requestAnimationFrame(updateRing);
    };

    // 3. Click Interactions
    const onMouseDown = () => {
      anime({
        targets: [dotRef.current, ringRef.current],
        scale: 0.8,
        duration: 150,
        easing: 'easeOutQuad'
      });
    };

    const onMouseUp = () => {
      anime({
        targets: [dotRef.current, ringRef.current],
        scale: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
    };

    // 4. Hover Interactions
    const handleMouseEnter = () => {
      anime({
        targets: dotRef.current,
        scale: 2.2,
        backgroundColor: 'rgba(232, 53, 42, 0.2)', // Red with transparency
        duration: 300,
        easing: 'easeOutQuart'
      });
      anime({
        targets: ringRef.current,
        scale: 1.4,
        borderColor: '#E8352A',
        duration: 300,
        easing: 'easeOutQuart'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: dotRef.current,
        scale: 1,
        backgroundColor: '#E8352A',
        duration: 300,
        easing: 'easeOutQuart'
      });
      anime({
        targets: ringRef.current,
        scale: 1,
        borderColor: 'rgba(232, 53, 42, 0.5)',
        duration: 300,
        easing: 'easeOutQuart'
      });
    };

    // Add global event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    requestRef.current = requestAnimationFrame(updateRing);

    // Initial attachment to interactive elements
    const selectors = 'a, button, .card, .project-card, .nav-link, .contact-item, .skill-tag, .cert-card';
    const elements = document.querySelectorAll(selectors);
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #E8352A;
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          will-change: transform;
        }
        .cursor-ring {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(232, 53, 42, 0.5);
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          will-change: transform;
          transition: border-color 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
