import React, { useState, useRef, useEffect } from 'react';

const OptimizedVideo = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = true,
  muted = true,
  playsInline = true,
  lazy = true,
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Debug logging
  const log = (message, data = null) => {
    console.log(`[OptimizedVideo] ${message}`, data || '');
  };

  useEffect(() => {
    log('Component mounted', { src, lazy, autoPlay });
    
    if (!lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          log('Intersection observed', { isIntersecting: entry.isIntersecting });
          if (entry.isIntersecting) {
            setIsInView(true);
            setIsLoading(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px', // Increased margin for earlier loading
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRef.current = observer;
      log('Observer attached to container');
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lazy, src, autoPlay]);

  // Generate optimized Cloudinary URL with better error handling
  const getOptimizedVideoUrl = (originalUrl) => {
    try {
      if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
        log('Non-Cloudinary URL, using original', originalUrl);
        return originalUrl;
      }
      
      // More robust URL parsing
      const urlParts = originalUrl.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      
      if (uploadIndex === -1) {
        log('Invalid Cloudinary URL structure, using original', originalUrl);
        return originalUrl;
      }
      
      // Extract everything after 'upload/' and before file extension
      const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
      const publicIdWithVersion = pathAfterUpload.replace(/\.(mp4|mov|avi|webm)$/i, '');
      
      // Build optimized URL with better compression settings
      const optimizedUrl = `https://res.cloudinary.com/dvsiayukf/video/upload/q_auto:good,f_auto,w_1200,c_scale/${publicIdWithVersion}.mp4`;
      
      log('Generated optimized URL', { original: originalUrl, optimized: optimizedUrl });
      return optimizedUrl;
    } catch (error) {
      log('Error generating optimized URL, using original', { error: error.message, originalUrl });
      return originalUrl;
    }
  };

  const handleLoadStart = () => {
    log('Video load started');
    setIsLoading(true);
    setHasError(false);
    
    // Set timeout to prevent infinite loading
    timeoutRef.current = setTimeout(() => {
      log('Video loading timeout, falling back to original');
      setHasError(true);
      setIsLoading(false);
    }, 10000); // 10 second timeout
  };

  const handleLoadedData = () => {
    log('Video loaded successfully');
    setIsLoaded(true);
    setIsLoading(false);
    setHasError(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleError = (e) => {
    log('Video loading error', { error: e.target.error, src: e.target.src });
    setHasError(true);
    setIsLoading(false);
    setIsLoaded(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleCanPlay = () => {
    log('Video can play');
    if (autoPlay && muted) {
      // Try to play the video
      const video = videoRef.current;
      if (video) {
        video.play().catch(error => {
          log('Autoplay failed', error.message);
        });
      }
    }
  };

  const optimizedSrc = getOptimizedVideoUrl(src);
  const fallbackSrc = src; // Original URL as fallback

  return (
    <div ref={containerRef} className={`optimized-video-container ${className}`}>
      {isInView && !hasError && (
        <video
          ref={videoRef}
          src={optimizedSrc}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadStart={handleLoadStart}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onError={handleError}
          aria-label={ariaLabel}
          preload={lazy ? "metadata" : "auto"}
          style={{
            width: '100%',
            height: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
            borderRadius: '12px',
          }}
          {...props}
        />
      )}
      
      {/* Fallback video if optimized version fails */}
      {isInView && hasError && (
        <video
          src={fallbackSrc}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={() => {
            log('Fallback video loaded');
            setIsLoaded(true);
            setIsLoading(false);
          }}
          aria-label={ariaLabel}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
          }}
          {...props}
        />
      )}
      
      {/* Loading placeholder */}
      {isInView && isLoading && !isLoaded && !hasError && (
        <div 
          className="video-placeholder"
          style={{
            position: hasError ? 'absolute' : 'static',
            top: 0,
            left: 0,
            width: '100%',
            height: '300px',
            backgroundColor: 'rgba(32, 18, 58, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ 
            color: '#A259F7', 
            fontSize: '14px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div className="loading-spinner" style={{
              width: '20px',
              height: '20px',
              border: '2px solid rgba(162, 89, 247, 0.3)',
              borderTop: '2px solid #A259F7',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading video...
          </div>
        </div>
      )}
      
      {/* Add CSS animation for spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedVideo;
