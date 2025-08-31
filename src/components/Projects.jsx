import { useEffect, useRef, useState } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setSectionTitle(data.sections.projects.title);
      });
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    cardsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [projects]);

  const getProjectIcon = (imageType) => {
    const iconStyles = {
      width: '48px',
      height: '48px',
      filter: 'brightness(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.1))'
    };

    switch (imageType) {
      case 'quiz':
        return (
          <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M15.33252,9.5A3.5001,3.5001,0,0,0,8.80127,7.75a1.00016,1.00016,0,0,0,1.73242,1A1.50266,1.50266,0,0,1,11.83252,8a1.5,1.5,0,1,1,0,3h-.00244a.94984.94984,0,0,0-.18927.0387,1.03181,1.03181,0,0,0-.19861.04065.98275.98275,0,0,0-.15552.10485,1.00813,1.00813,0,0,0-.162.10975,1.00464,1.00464,0,0,0-.11706.1737.97789.97789,0,0,0-.09668.14417,1.02252,1.02252,0,0,0-.04285.21191A.94847.94847,0,0,0,10.83252,12v1l.00232.01135.0011.49109a1.00016,1.00016,0,0,0,1,.99756h.00244a1.00006,1.00006,0,0,0,.99756-1.00244l-.00153-.66138A3.49363,3.49363,0,0,0,15.33252,9.5Zm-4.20264,6.79A1,1,0,0,0,11.82959,18a1.036,1.036,0,0,0,.71045-.29,1.01517,1.01517,0,0,0,0-1.41992A1.03425,1.03425,0,0,0,11.12988,16.29Z"/></svg>
        );
      case 'study':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
          </svg>
        );
      case 'plant':
        return (
          <svg width="800px" fill="currentColor" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z"/>
  <rect width="24" height="24" fill="none"/>
</svg>
        );
      case 'ai':
        return (
          <svg fill="currentColor" height="800px" width="600px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<path d="M0,226v32c128,192,384,192,512,0v-32C384,34,128,34,0,226z M256,370c-70.7,0-128-57.3-128-128s57.3-128,128-128
	s128,57.3,128,128S326.7,370,256,370z M256,170c0-8.3,1.7-16.1,4.3-23.6c-1.5-0.1-2.8-0.4-4.3-0.4c-53,0-96,43-96,96s43,96,96,96
	c53,0,96-43,96-96c0-1.5-0.4-2.8-0.4-4.3c-7.4,2.6-15.3,4.3-23.6,4.3C288.2,242,256,209.8,256,170z"/>
</svg>
        );
      case 'fire':
        return (<svg width="800px" height="800px" viewBox="0 0 24 24" id="Flat_Color" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="secondary" d="M17,21a1,1,0,0,1-1-1V14a1,1,0,0,1,2,0v6A1,1,0,0,1,17,21ZM9,20V14a1,1,0,0,0-2,0v6a1,1,0,0,0,2,0Z" fill="currentColor"></path><path id="primary" d="M21,21H3a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2ZM17,6a3,3,0,0,0-3,3v3a3,3,0,0,0,6,0V9A3,3,0,0,0,17,6ZM12,7v4a4,4,0,0,1-8,0V7a4,4,0,0,1,8,0Z" fill="currentColor"></path></svg>);
      case 'education':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
        );
      case 'dashboard':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        );
      case 'network':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M8 16H6v-2h2v2zm0-4H6V8h2v4zm6 4h-2v-2h2v2zm0-4h-2V8h2v4zm4-8H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/>
          </svg>
        );
    }
  };

  return (
    <section id="projects" className="projects projects-modern">
      <div className="container">
        <h2 className="section-title">{sectionTitle}</h2>
        <div className="projects-modern-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card-modern"
              ref={el => (cardsRef.current[index] = el)}
              style={{ '--animation-delay': `${index * 0.1}s` }}
            >
              <div className="project-header-modern">
                <div className="project-icon-modern">
                  {getProjectIcon(project.image)}
                </div>
                <div className="project-category-modern">{project.category}</div>
              </div>
              
              <div className="project-content-modern">
                <h3 className="project-title-modern">{project.title}</h3>
                <p className="project-description-modern">{project.description}</p>
                
                <div className="project-technologies-modern">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag-modern">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-links-modern">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-modern github-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Code</span>
                </a>
                {project.live && project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-modern live-link">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 