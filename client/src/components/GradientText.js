import { useState, useEffect } from "react";
import { shouldDisableAnimations } from '../utils/crawlerDetection';
import "./GradientText.css";

export default function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
  showBorder = false
}) {
  const [animationsDisabled, setAnimationsDisabled] = useState(false);

  // Check if animations should be disabled for crawlers
  useEffect(() => {
    setAnimationsDisabled(shouldDisableAnimations());
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: animationsDisabled ? '0s' : `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text ${className} ${animationsDisabled ? 'no-animation' : ''}`}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className="text-content" style={gradientStyle}>{children}</div>
      {/* Screen reader accessible version */}
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
      }}>
        {children}
      </span>
    </div>
  );
}
