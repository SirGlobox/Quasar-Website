import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import TabVisibilityHandler from './components/TabVisibilityHandler';
import { shouldDisableAnimations } from './utils/crawlerDetection';
import './styles/App.css';

// Lazy load Galaxy component for better performance
const Galaxy = React.lazy(() => import('./components/Galaxy'));

// Lazy load all page components for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const BusinessAssessment = React.lazy(() => import('./pages/BusinessAssessment'));
const MarketEntry = React.lazy(() => import('./pages/MarketEntry'));
const BrandDevelopment = React.lazy(() => import('./pages/BrandDevelopment'));
const LeadGeneration = React.lazy(() => import('./pages/LeadGeneration'));
const OperationsOptimization = React.lazy(() => import('./pages/OperationsOptimization'));
const CustomerExperience = React.lazy(() => import('./pages/CustomerExperience'));

function App() {
  const [showGalaxy, setShowGalaxy] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  useEffect(() => {
    // Check if animations should be disabled for crawlers
    const shouldDisable = shouldDisableAnimations();
    setDisableAnimations(shouldDisable);
    
    // Only load Galaxy for non-crawlers to prevent SEO audit issues
    if (!shouldDisable) {
      const timer = setTimeout(() => {
        setShowGalaxy(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    // For crawlers, Galaxy remains false (disabled)
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <TabVisibilityHandler />
        <div className="App">
          {/* Galaxy Background - Lazy loaded for better performance */}
          {showGalaxy && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}>
              <Suspense fallback={null}>
                <Galaxy 
                  mouseRepulsion={true}
                  mouseInteraction={true}
                  density={1}
                  glowIntensity={0.3}
                  saturation={0.0}
                  hueShift={0}
                  focal={[0.5, 0.5]}
                  rotation={[1.0, 0.0]}
                  starSpeed={0.2}
                  speed={1.0}
                  repulsionStrength={2}
                  twinkleIntensity={0.3}
                  rotationSpeed={0.05}
                  autoCenterRepulsion={0}
                  transparent={true}
                />
              </Suspense>
            </div>
          )}
          
          <Navbar />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home disableAnimations={disableAnimations} />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/business-assessment" element={<BusinessAssessment />} />
                <Route path="/services/market-entry" element={<MarketEntry />} />
                <Route path="/services/brand-development" element={<BrandDevelopment />} />
                <Route path="/services/lead-generation" element={<LeadGeneration />} />
                <Route path="/services/operations-optimization" element={<OperationsOptimization />} />
                <Route path="/services/customer-experience" element={<CustomerExperience />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
