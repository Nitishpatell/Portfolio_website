import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

/**
 * Loader Component
 * Minimalist red-accented loader using Anime.js.
 * Features an SVG stroke-draw animation and a percentage counter.
 */
const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 1. Prevent scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Setup Anime.js Timeline
    const tl = anime.timeline({
      easing: 'easeInOutQuad',
      complete: () => {
        // Final fade out
        anime({
          targets: loaderRef.current,
          opacity: 0,
          duration: 800,
          delay: 500,
          easing: 'easeInOutSine',
          complete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
            document.body.style.overflow = originalOverflow || 'auto';
            if (onComplete) onComplete();
          }
        });
      }
    });

    // A. SVG Draw Animation
    tl.add({
      targets: '.loader-letter',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 800,
      delay: anime.stagger(100),
    });

    // B. Percentage Counter
    const counterObj = { value: 0 };
    anime({
      targets: counterObj,
      value: 100,
      round: 1,
      duration: 2500,
      easing: 'linear',
      update: () => {
        setPercent(counterObj.value);
      }
    });

    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, [onComplete]);

  const name = "NITISH PATEL";

  return (
    <div ref={loaderRef} className="loader-container">
      <div className="loader-content">
        <svg viewBox="0 0 1000 150" className="loader-svg">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="loader-text-group"
          >
            {name.split("").map((char, index) => (
              <tspan 
                key={index} 
                className="loader-letter"
                dx={index === 0 ? 0 : (char === " " ? "1em" : "0.05em")}
              >
                {char}
              </tspan>
            ))}
          </text>
        </svg>
      </div>

      <div className="loader-footer">
        <div className="loader-percentage">
          {percent}%
        </div>
        <div className="loader-status">
          Building Experience
        </div>
      </div>

      <style>{`
        .loader-container {
          position: fixed;
          inset: 0;
          background: var(--bg-dark);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .loader-content {
          width: 90%;
          max-width: 900px;
        }

        .loader-svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .loader-letter {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 72px;
          fill: none;
          stroke: var(--red);
          stroke-width: 1px;
        }

        .loader-footer {
          position: absolute;
          bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .loader-percentage {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 48px;
          color: var(--red);
          opacity: 0.1;
        }

        .loader-status {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .loader-letter { font-size: 36px; }
          .loader-percentage { font-size: 32px; }
          .loader-footer { bottom: 40px; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
