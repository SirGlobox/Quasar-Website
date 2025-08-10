import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Galaxy from './components/Galaxy';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import './styles/App.css';

function App() {
  const galaxyRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const lastUpdate = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle to ~60fps (16ms)
      if (now - lastUpdate.current < 16) return;
      
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight); // Flip Y coordinate
      mousePos.current = { x, y };
      
      // Directly update galaxy if ref exists
      if (galaxyRef.current && galaxyRef.current.updateMousePos) {
        galaxyRef.current.updateMousePos(x, y);
      }
      
      lastUpdate.current = now;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* Galaxy Background */}
          <Galaxy 
            ref={galaxyRef}
            className="galaxy-background"
            focal={[0.5, 0.5]}
            rotation={[0.5, 0.0]}
            starSpeed={0.2}
            density={0.8}
            hueShift={160}
            disableAnimation={false}
            speed={0.3}
            mouseInteraction={true}
            glowIntensity={0.2}
            saturation={0.1}
            mouseRepulsion={true}
            repulsionStrength={0.5}
            twinkleIntensity={0.1}
            rotationSpeed={0.05}
            autoCenterRepulsion={0}
            transparent={true}
          />
          
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
