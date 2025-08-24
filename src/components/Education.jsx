import { useEffect, useState } from 'react';
import '../styles/Timeline.css';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  useEffect(() => {
    fetch('/src/data/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...(data.education || [])].sort((a, b) => {
          const yearA = a.year.includes('Present') ? 9999 : parseInt(a.year.match(/\d{4}/g)?.[0] || '0');
          const yearB = b.year.includes('Present') ? 9999 : parseInt(b.year.match(/\d{4}/g)?.[0] || '0');
          return yearB - yearA;
        });
        setEducationData(sorted);
        setSectionTitle(data.sections.education.title);
      });
  }, []);

  return (
    <section id="education" className="timeline-container">
      <div className="timeline-header">
        <h2>{sectionTitle}</h2>
        <p>My academic journey</p>
      </div>

      <div className="timeline-wrapper">
        {/* Animated Timeline Line */}
        <div className="timeline-line">
          <div className="timeline-line-glow"></div>
          <div className="timeline-line-particles"></div>
        </div>

        {/* Scrollable container */}
        <div className="timeline-scroll-container">
          <div className="timeline-cards-wrapper">
            {educationData.map((item, idx) => (
              <div key={idx} className="timeline-card">
                {/* Connection line from card to main line */}
                <div className="timeline-connector">
                  <div className="timeline-connector-glow"></div>
                </div>

                {/* Floating Icon */}
                <div className="timeline-floating-icon">
                  <div className="timeline-icon-placeholder" style={{ background: `linear-gradient(135deg, var(--education-color, #4CAF50) 0%, var(--accent-secondary) 100%)` }}>
                    <span className="timeline-icon-text">{item.icon}</span>
                  </div>
                  <div className="timeline-icon-glow"></div>
                </div>

                {/* Card content */}
                <div className="timeline-card-content">
                  {/* Card details */}
                  <div className="timeline-card-details">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-institution">{item.institution}</div>

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="timeline-technologies">
                        <div className="technologies-label">Relevant Courses:</div>
                        <div className="technologies-list">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="technology-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Details list */}
                    {item.details && item.details.length > 0 && (
                      <ul className="timeline-details">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}

                    {/* Achievements */}
                    {item.achievements && item.achievements.length > 0 && (
                      <div className="timeline-achievements">
                        <div className="achievements-label">Highlights:</div>
                        <div className="achievements-list">
                          {item.achievements.map((achievement, i) => (
                            <span key={i} className="achievement-badge">
                              <span className="achievement-icon">🏆</span>
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
