import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Timeline />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <ScrollProgress />
      </div>
    </ThemeProvider>
  );
}

export default App;
