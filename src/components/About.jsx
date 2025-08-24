import { useEffect, useState } from 'react';
import '../styles/About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/src/data/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data.about);
      });
  }, []);

  if (!aboutData) return null;

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{aboutData.title}</h2>
        <div className="about-content">
          <div className="about-text">
            {aboutData.content.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="about-stats">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 