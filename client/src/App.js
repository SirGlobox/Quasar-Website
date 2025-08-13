import React, { useRef, useEffect, useState, useCallback } from 'react';
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
import { shouldDisableAnimations, isCrawler } from './utils/crawlerDetection';
import './styles/App.css';

function App() {
  const galaxyRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const lastUpdate = useRef(0);
  const retryTimeoutRef = useRef(null);
  
  // Enhanced state management
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [galaxyError, setGalaxyError] = useState(false);
  const [galaxyLoading, setGalaxyLoading] = useState(true);
  const [galaxyRetryCount, setGalaxyRetryCount] = useState(0);
  const [forceAnimations, setForceAnimations] = useState(false);

  const MAX_RETRY_ATTEMPTS = 2;
  const RETRY_DELAY = 2000; // 2 seconds

  // Enhanced crawler detection with debugging
  useEffect(() => {
    const shouldDisable = shouldDisableAnimations();
    const isCrawlerDetected = isCrawler();
    
    // Debug logging
    console.log('🔍 Crawler Detection:', {
      userAgent: navigator.userAgent,
      isCrawler: isCrawlerDetected,
      shouldDisableAnimations: shouldDisable,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
    
    setDisableAnimations(shouldDisable);
    
    // Allow manual override for testing (developers can use browser console)
    window.quasarDebug = {
      forceAnimations: () => {
        console.log('🚀 Force enabling animations');
        setForceAnimations(true);
        setDisableAnimations(false);
        setGalaxyError(false);
      },
      resetGalaxy: () => {
        console.log('🌌 Resetting Galaxy component');
        setGalaxyError(false);
        setGalaxyLoading(true);
        setGalaxyRetryCount(0);
      }
    };
  }, []);

  // Enhanced Galaxy error handling with retry mechanism
  const handleGalaxyError = useCallback(() => {
    console.warn(`Galaxy component failed (attempt ${galaxyRetryCount + 1}/${MAX_RETRY_ATTEMPTS + 1})`);
    
    if (galaxyRetryCount < MAX_RETRY_ATTEMPTS) {
      console.log(`Retrying Galaxy initialization in ${RETRY_DELAY}ms...`);
      
      retryTimeoutRef.current = setTimeout(() => {
        setGalaxyRetryCount(prev => prev + 1);
        setGalaxyError(false);
        setGalaxyLoading(true);
      }, RETRY_DELAY);
    } else {
      console.warn('Galaxy component failed after all retry attempts, falling back to LightweightBackground');
      setGalaxyError(true);
      setGalaxyLoading(false);
    }
  }, [galaxyRetryCount]);

  // Galaxy success handler
  const handleGalaxySuccess = useCallback(() => {
    console.log('✅ Galaxy component loaded successfully');
    setGalaxyLoading(false);
    setGalaxyError(false);
  }, []);

  // Enhanced mouse interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Skip mouse interactions for crawlers or if Galaxy failed
      if ((disableAnimations && !forceAnimations) || galaxyError) return;
      
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

    if ((!disableAnimations || forceAnimations) && !galaxyError) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disableAnimations, galaxyError, forceAnimations]);

  // Cleanup retry timeout
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Determine which background component to show
  const shouldShowGalaxy = (!disableAnimations || forceAnimations) && !galaxyError;
  const shouldShowLoading = shouldShowGalaxy && galaxyLoading;

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* Enhanced Background Switching with Loading States */}
          {shouldShowGalaxy ? (
            <>
              {shouldShowLoading && (
                <div className="galaxy-loading" style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  zIndex: -1,
                  opacity: galaxyLoading ? 1 : 0,
                  transition: 'opacity 1s ease-in-out'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff',
                    fontSize: '14px',
                    opacity: 0.7
                  }}>
                    Initializing Galaxy...
                  </div>
                </div>
              )}
              <Galaxy 
                key={`galaxy-${galaxyRetryCount}`} // Force remount on retry
                ref={galaxyRef}
                className="galaxy-background"
                focal={[0.5, 0.5]}
                rotation={[0.5, 0.0]}
                starSpeed={0.2}
                density={0.8}
                hueShift={160}
                disableAnimation={disableAnimations && !forceAnimations}
                speed={0.3}
                mouseInteraction={!disableAnimations || forceAnimations}
                glowIntensity={0.2}
                saturation={0.1}
                mouseRepulsion={!disableAnimations || forceAnimations}
                repulsionStrength={0.5}
                twinkleIntensity={0.1}
                rotationSpeed={0.05}
                autoCenterRepulsion={0}
                transparent={true}
                onError={handleGalaxyError}
                onLoad={handleGalaxySuccess}
                style={{
                  opacity: galaxyLoading ? 0 : 1,
                  transition: 'opacity 1s ease-in-out'
                }}
              />
            </>
          ) : (
            <LightweightBackground className="background-layer" />
          )}
          
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home disableAnimations={disableAnimations && !forceAnimations} />} />
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
