import { useEffect, useState } from 'react';
import '../styles/Timeline.css';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        // Combine education and experience data
        const educationData = (data.education || []).map(item => ({ ...item, category: 'education' }));
        const experienceData = (data.experience || []).map(item => ({ ...item, category: 'experience' }));
        const combined = [...educationData, ...experienceData];
        
        const sorted = combined.sort((a, b) => {
          const yearA = a.year.includes('Present') ? 9999 : parseInt(a.year.match(/\d{4}/g)?.[0] || '0');
          const yearB = b.year.includes('Present') ? 9999 : parseInt(b.year.match(/\d{4}/g)?.[0] || '0');
          return yearB - yearA;
        });
        
        setTimelineData(sorted);
        setFilteredData(sorted);
        setSectionTitle(data.sections.timeline.title);
      });
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredData(timelineData);
    } else {
      setFilteredData(timelineData.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, timelineData]);

  const getCompanyLogo = (company) => {
    // Map company names to logo files
    const logoMap = {
      // Education
      'University of Colorado Boulder': '/CU-logo.png',
      'College of Engineering Guindy, Anna University': '/CEG-logo.png',
      
      // Experience
      'Agilysys NV, LLC': '/Agilysys-logo.png',
      'Citicorp Services India Private Limited': '/Citi-logo.png',
      'MathWorks India Private Limited': '/Matlab-logo.png'
    };
    
    return logoMap[company] || null;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'experience':
        return 'var(--experience-color, #2196F3)';
      case 'education':
        return 'var(--education-color, #4CAF50)';
      default:
        return 'var(--modern-accent)';
    }
  };

  return (
    <section id="timeline" className="timeline-container">
      <div className="timeline-header">
        <h2>{sectionTitle}</h2>
        <p>My journey through time</p>
        <div className="timeline-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveFilter('experience')}
          >
            Experience
          </button>
          <button
            className={`filter-btn ${activeFilter === 'education' ? 'active' : ''}`}
            onClick={() => setActiveFilter('education')}
          >
            Education
          </button>
        </div>
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
            {filteredData.map((item, idx) => (
              <div key={idx} className="timeline-card">
                {/* Connection line from card to main line */}
                <div className="timeline-connector">
                  <div className="timeline-connector-glow"></div>
                </div>

                {/* Card content */}
                <div className="timeline-card-content">
                  {/* Company logo as faded background in top-right corner */}
                  {(getCompanyLogo(item.company) || item.icon) && (
                    <div 
                      className={`timeline-corner-triangle ${getCompanyLogo(item.company) ? 'has-logo' : ''}`}
                      style={getCompanyLogo(item.company) 
                        ? { backgroundImage: `url(${getCompanyLogo(item.company)})` } 
                        : { background: `linear-gradient(135deg, ${getCategoryColor(item.category)} 0%, var(--accent-secondary) 100%)` }
                      }
                    >
                      {!getCompanyLogo(item.company) && (
                        <span className="timeline-corner-icon">{item.icon}</span>
                      )}
                    </div>
                  )}
                  {/* Card details */}
                  <div className="timeline-card-details">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-institution">
                      <div className="company-name">
                        {item.company}
                      </div>
                      <div className="location">
                        {item.location}
                      </div>
                    </div>

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="timeline-technologies">
                        <div className="technologies-label">
                          {item.category === 'education' ? 'Focus:' : 'Technologies:'}
                        </div>
                        <div className="technologies-list">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="technology-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Details list - hover to view more info (commented out in CSS) */}
                    {item.details && item.details.length > 0 && (
                      <ul className="timeline-details">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
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

export default Timeline;
