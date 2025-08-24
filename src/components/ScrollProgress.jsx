import { useState, useEffect } from 'react';
import '../styles/ScrollProgress.css';

const SIZE = 56;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUM = 2 * Math.PI * RADIUS;

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const offset = CIRCUM - (scrollProgress / 100) * CIRCUM;

  return (
    <button
      className="scroll-progress-fab popout"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        className="scroll-progress-svg"
        width={SIZE}
        height={SIZE}
      >
        <circle
          className="scroll-progress-bg"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          className="scroll-progress-ring"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUM}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="scroll-progress-percent">{Math.round(scrollProgress)}%</span>
    </button>
  );
};

export default ScrollProgress; 