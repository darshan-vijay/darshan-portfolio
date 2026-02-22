import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BackToTop from './components/ScrollProgress';
import './App.css';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo || (location.hash && location.hash.slice(1));
    if (scrollToId && location.pathname === '/') {
      const scrollToEl = () => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(scrollToEl, 150);
        });
      });
    }
  }, [location.pathname, location.state, location.hash]);

  return (
    <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Timeline />
                  <Projects />
                  <Skills />
                  <Contact />
                </>
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <BackToTop />
      </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
