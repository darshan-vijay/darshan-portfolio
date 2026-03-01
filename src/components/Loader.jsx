import { useState, useEffect } from 'react';
import '../styles/Loader.css';

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState('hold'); // hold (waves visible) -> full-blue -> reveal

  useEffect(() => {
    const holdDuration = 2200;
    const fullBlueDuration = 950;

    const timer = setTimeout(() => {
      setPhase('full-blue');
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, fullBlueDuration);
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loader-overlay ${phase !== 'hold' ? `loader-${phase}` : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">DV</div>
        <p className="loader-tagline">Portfolio</p>
      </div>

      <div className="loader-waves">
        <svg
          className="loader-wave-svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            className="loader-wave-path loader-wave-1"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            className="loader-wave-path loader-wave-2"
            d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,234.7C840,235,960,181,1080,160C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <path
            className="loader-wave-path loader-wave-3"
            d="M0,224L48,213.3C96,203,192,181,288,197.3C384,213,480,277,576,277.3C672,277,768,213,864,181.3C960,149,1056,149,1152,165.3C1248,181,1344,213,1392,229.3L1440,245L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
