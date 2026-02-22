import { useEffect, useState } from 'react';
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

  return (
    <div className={`social-links ${className} social-links-${size}`}>
      {socialData.links.map((link, index) => (
        <a
          key={link.name}
          href={link.url}
          target={link.download ? "_self" : "_blank"}
          rel={link.download ? "" : "noopener noreferrer"}
          className="social-link"
          title={link.name}
          data-tooltip={link.name}
          aria-label={link.name}
          download={link.download ? "Darshan_Vijayaraghavan_Resume.pdf" : undefined}
          style={{
            '--delay': `${index * 0.1}s`
          }}
        >
          <div className="social-icon">
            {(() => {
              const Icon = ICON_MAP[link.icon];
              return Icon ? <Icon /> : null;
            })()}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks; 