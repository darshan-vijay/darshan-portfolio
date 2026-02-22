import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiGithub, SiLinkedin, SiLeetcode, SiYoutube } from 'react-icons/si';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import { LuNewspaper } from 'react-icons/lu';
import '../styles/SocialLinks.css';

const ICON_MAP = {
  github: SiGithub,
  linkedin: SiLinkedin,
  leetcode: SiLeetcode,
  youtube: SiYoutube,
  blog: LuNewspaper,
  resume: HiOutlineDocumentText,
};

const SocialLinks = ({ className = '', size = 'medium' }) => {
  const [socialData, setSocialData] = useState(null);

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        setSocialData(data.social);
      });
  }, []);

  useEffect(() => {
    if (window.bootstrap && socialData) {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(el => new window.bootstrap.Tooltip(el));
    }
  }, [socialData]);

  if (!socialData) return null;

  const isInternal = (link) => link.internal === true || (typeof link.url === 'string' && link.url.startsWith('/') && !link.url.startsWith('//'));

  return (
    <div className={`social-links ${className} social-links-${size}`}>
      {socialData.links.map((link, index) => {
        const Icon = ICON_MAP[link.icon];
        const iconEl = Icon ? <Icon /> : null;
        const commonProps = {
          key: link.name,
          className: 'social-link',
          title: link.name,
          'data-tooltip': link.name,
          'aria-label': link.name,
          style: { '--delay': `${index * 0.1}s` }
        };
        if (isInternal(link)) {
          return (
            <Link to={link.url} {...commonProps}>
              <div className="social-icon">{iconEl}</div>
            </Link>
          );
        }
        return (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            {...commonProps}
          >
            <div className="social-icon">{iconEl}</div>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks; 