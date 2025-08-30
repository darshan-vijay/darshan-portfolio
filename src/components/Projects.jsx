import { useEffect, useRef, useState } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch('/src/data/portfolioData.json')
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
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
            <path d="M6,2V8H8V4H12V2H6M18,16V20H14V22H20V16H18M6,16V22H12V20H8V16H6M18,2V8H16V4H12V2H18Z"/>
          </svg>
        );
      case 'study':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M16,4C16.88,4 17.67,4.84 17.67,5.75C17.67,6.66 16.88,7.5 16,7.5C15.12,7.5 14.33,6.66 14.33,5.75C14.33,4.84 15.12,4 16,4M8,4C8.88,4 9.67,4.84 9.67,5.75C9.67,6.66 8.88,7.5 8,7.5C7.12,7.5 6.33,6.66 6.33,5.75C6.33,4.84 7.12,4 8,4M8,7.5C9.81,7.5 11.33,8.94 11.33,10.75V11.5H12.67V10.75C12.67,8.94 14.19,7.5 16,7.5S19.33,8.94 19.33,10.75V20H16.67V12.25H15.33V20H8.67V12.25H7.33V20H4.67V10.75C4.67,8.94 6.19,7.5 8,7.5Z"/>
          </svg>
        );
      case 'plant':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.7"/>
            <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.5"/>
            <circle cx="16" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
          </svg>
        );
      case 'ai':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9H3V19A2,2 0 0,0 5,21H11V19H5V11H11V13H5V15H11V17H5V19H11V21H19A2,2 0 0,0 21,19V9M13,7H18.5L13,1.5V7Z"/>
            <path d="M8,13A1,1 0 0,1 9,14A1,1 0 0,1 8,15A1,1 0 0,1 7,14A1,1 0 0,1 8,13M16,13A1,1 0 0,1 17,14A1,1 0 0,1 16,15A1,1 0 0,1 15,14A1,1 0 0,1 16,13M12,17A1,1 0 0,1 13,18A1,1 0 0,1 12,19A1,1 0 0,1 11,18A1,1 0 0,1 12,17Z"/>
          </svg>
        );
      case 'fire':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M12.71,2.41C12.43,2.18 12.04,2.14 11.72,2.33C11.39,2.52 11.24,2.89 11.35,3.23C11.78,4.36 11.78,5.61 11.35,6.74C11.24,7.08 11.39,7.45 11.72,7.64C12.04,7.83 12.43,7.79 12.71,7.56C13.27,7.08 13.65,6.45 13.82,5.76C13.99,5.06 13.94,4.33 13.69,3.65C13.57,3.31 13.27,3.08 12.92,3.08C12.85,3.08 12.78,3.1 12.71,3.11L12.71,2.41M9.5,4C9.11,4 8.8,4.31 8.8,4.7C8.8,5.09 9.11,5.4 9.5,5.4C9.89,5.4 10.2,5.09 10.2,4.7C10.2,4.31 9.89,4 9.5,4M17.21,6.27C17.65,5.96 18,5.54 18.24,5.06C18.47,4.57 18.59,4.04 18.59,3.5C18.59,3.22 18.37,3 18.09,3C17.81,3 17.59,3.22 17.59,3.5C17.59,3.78 17.53,4.05 17.42,4.3C17.31,4.55 17.15,4.77 16.95,4.95C16.74,5.13 16.5,5.26 16.24,5.33C15.98,5.4 15.71,5.4 15.45,5.33C15.19,5.26 14.95,5.13 14.74,4.95C14.54,4.77 14.38,4.55 14.27,4.3C14.16,4.05 14.1,3.78 14.1,3.5C14.1,3.22 13.88,3 13.6,3C13.32,3 13.1,3.22 13.1,3.5C13.1,4.04 13.22,4.57 13.45,5.06C13.69,5.54 14.04,5.96 14.48,6.27C14.92,6.58 15.43,6.77 15.97,6.82C16.5,6.87 17.04,6.77 17.53,6.54L17.21,6.27Z"/>
            <path d="M17.5,9C15.57,9 14,10.57 14,12.5C14,14.43 15.57,16 17.5,16C19.43,16 21,14.43 21,12.5C21,10.57 19.43,9 17.5,9M9,11C7.34,11 6,12.34 6,14C6,15.66 7.34,17 9,17C10.66,17 12,15.66 12,14C12,12.34 10.66,11 9,11M12,18C10.9,18 10,18.9 10,20C10,21.1 10.9,22 12,22C13.1,22 14,21.1 14,20C14,18.9 13.1,18 12,18Z"/>
          </svg>
        );
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
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyles}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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