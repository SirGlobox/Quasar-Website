import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

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
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy]);

  // Generate optimized Cloudinary URL
  const getOptimizedImageUrl = (originalUrl, targetWidth = 800) => {
    try {
      if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
        return originalUrl;
      }
      
      const urlParts = originalUrl.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      
      if (uploadIndex === -1) {
        return originalUrl;
      }
      
      // Extract public ID
      const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
      const publicIdWithVersion = pathAfterUpload.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      
      // Build optimized URL with WebP format and compression
      const optimizedUrl = `https://res.cloudinary.com/dvsiayukf/image/upload/f_auto,q_auto:good,w_${targetWidth},c_scale/${publicIdWithVersion}.webp`;
      
      return optimizedUrl;
    } catch (error) {
      console.warn('Error generating optimized image URL:', error);
      return originalUrl;
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (originalUrl) => {
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(w => `${getOptimizedImageUrl(originalUrl, w)} ${w}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const optimizedSrc = getOptimizedImageUrl(src, width || 800);
  const srcSet = generateSrcSet(src);

  return (
    <div 
      ref={containerRef} 
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(32, 18, 58, 0.1)',
        minHeight: height ? `${height}px` : '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isInView && (
        <>
          {!hasError ? (
            <img
              ref={imgRef}
              src={optimizedSrc}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              loading={lazy ? "lazy" : "eager"}
              style={{
                width: '100%',
                height: 'auto',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                borderRadius: 'inherit',
              }}
              {...props}
            />
          ) : (
            // Fallback to original image if optimized fails
            <img
              src={src}
              alt={alt}
              onLoad={handleLoad}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 'inherit',
              }}
              {...props}
            />
          )}
          
          {!isLoaded && !hasError && (
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#A259F7',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(162, 89, 247, 0.3)',
                borderTop: '2px solid #A259F7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Loading...
            </div>
          )}
        </>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
