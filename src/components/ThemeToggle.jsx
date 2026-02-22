import { useTheme } from '../context/ThemeContext';
import { LuSun, LuMoon } from 'react-icons/lu';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <LuSun className="theme-toggle-icon" size={26} /> : <LuMoon className="theme-toggle-icon" size={26} />}
    </button>
  );
};

export default ThemeToggle; 