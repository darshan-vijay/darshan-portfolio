import { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';
import '../styles/Hero.css';
import heroImage from '../assets/hero.PNG';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [currentText, setCurrentText] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        setHeroData(data.hero);
        setTexts(data.hero?.roles || []);
      });
  }, []);

  useEffect(() => {
    if (texts.length === 0) return;
    let timeout;
    if (typing) {
      if (displayed.length < texts[currentText].length) {
        timeout = setTimeout(() => {
          setDisplayed(texts[currentText].slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setTyping(true);
        setCurrentText((prev) => (prev + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, currentText, texts]);

  if (!heroData) return null;

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="name-highlight">{heroData.name}</span>
            </h1>
            
            <div className="hero-role">
              <span className="role-prefix">I'm a </span>
              <span className="role-text">{displayed}<span className="cursor">|</span></span>
            </div>
            
            <p className="hero-summary">
              {heroData.summary || heroData.description}
            </p>
            
            <div className="hero-social-links">
              <SocialLinks size="large" />
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src={heroImage} 
                alt="Darshan Vijayaraghavan" 
                className="hero-profile-image"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-text">{heroData.scrollIndicator.text}</div>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero; 