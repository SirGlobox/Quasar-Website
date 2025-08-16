import { useEffect } from 'react';

const TabVisibilityHandler = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab became visible again - force CSS re-rendering
        // This helps ensure CSS variables are properly applied
        const root = document.documentElement;
        
        // Temporarily add a class to force re-computation
        root.classList.add('tab-refocus');
        
        // Remove the class after a brief moment
        setTimeout(() => {
          root.classList.remove('tab-refocus');
        }, 50);
        
        // Force a repaint by accessing a computed style
        window.getComputedStyle(root).getPropertyValue('--snow-white');
      }
    };

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also handle focus events as backup
    window.addEventListener('focus', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TabVisibilityHandler;
