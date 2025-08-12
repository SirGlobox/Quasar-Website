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
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  // Generate optimized Cloudinary URL
  const getOptimizedVideoUrl = (originalUrl) => {
    if (!originalUrl.includes('cloudinary.com')) return originalUrl;
    
    // Extract the public ID from Cloudinary URL
    const parts = originalUrl.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    const publicId = parts.slice(uploadIndex + 2).join('/').replace('.mp4', '');
    
    // Return optimized URL with compression and format optimization
    return `https://res.cloudinary.com/dvsiayukf/video/upload/q_auto:low,f_auto,w_800,c_scale/${publicId}.mp4`;
  };

  const optimizedSrc = getOptimizedVideoUrl(src);

  return (
    <div ref={videoRef} className={`optimized-video-container ${className}`}>
      {isInView && (
        <video
          src={optimizedSrc}
          poster={poster}
          autoPlay={autoPlay && isLoaded}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={handleLoadedData}
          aria-label={ariaLabel}
          loading="lazy"
          preload={lazy ? "none" : "metadata"}
          style={{
            width: '100%',
            height: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          {...props}
        />
      )}
      {!isLoaded && isInView && (
        <div 
          className="video-placeholder"
          style={{
            width: '100%',
            height: '300px',
            backgroundColor: 'rgba(32, 18, 58, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
          }}
        >
          <div style={{ color: '#A259F7', fontSize: '14px' }}>Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;
