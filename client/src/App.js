import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Galaxy from './components/Galaxy';
import LightweightBackground from './components/LightweightBackground';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BusinessAssessment from './pages/BusinessAssessment';
import MarketEntry from './pages/MarketEntry';
import BrandDevelopment from './pages/BrandDevelopment';
import LeadGeneration from './pages/LeadGeneration';
import OperationsOptimization from './pages/OperationsOptimization';
import CustomerExperience from './pages/CustomerExperience';
import { shouldDisableAnimations } from './utils/crawlerDetection';
import './styles/App.css';

function App() {
  const galaxyRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const lastUpdate = useRef(0);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [galaxyError, setGalaxyError] = useState(false);

  // Check if we should disable animations for crawlers
  useEffect(() => {
    setDisableAnimations(shouldDisableAnimations());
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Skip mouse interactions for crawlers or if Galaxy failed
      if (disableAnimations || galaxyError) return;
      
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

    if (!disableAnimations && !galaxyError) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disableAnimations, galaxyError]);
  // Error boundary for Galaxy component
  const handleGalaxyError = () => {
    console.warn('Galaxy component failed to load, falling back to LightweightBackground');
    setGalaxyError(true);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* Smart Background Switching */}
          {!disableAnimations && !galaxyError ? (
            <Galaxy 
              ref={galaxyRef}
              className="galaxy-background"
              focal={[0.5, 0.5]}
              rotation={[0.5, 0.0]}
              starSpeed={0.2}
              density={0.8}
              hueShift={160}
              disableAnimation={disableAnimations}
              speed={0.3}
              mouseInteraction={!disableAnimations}
              glowIntensity={0.2}
              saturation={0.1}
              mouseRepulsion={!disableAnimations}
              repulsionStrength={0.5}
              twinkleIntensity={0.1}
              rotationSpeed={0.05}
              autoCenterRepulsion={0}
              transparent={true}
              onError={handleGalaxyError}
            />
          ) : (
            <LightweightBackground className="background-layer" />
          )}
          
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/business-assessment" element={<BusinessAssessment />} />
              <Route path="/services/market-entry" element={<MarketEntry />} />
              <Route path="/services/brand-development" element={<BrandDevelopment />} />
              <Route path="/services/lead-generation" element={<LeadGeneration />} />
              <Route path="/services/operations-optimization" element={<OperationsOptimization />} />
              <Route path="/services/customer-experience" element={<CustomerExperience />} />
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
