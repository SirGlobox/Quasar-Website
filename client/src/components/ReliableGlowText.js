import { useState, useEffect } from "react";
import { shouldDisableAnimations } from '../utils/crawlerDetection';
import "./ReliableGlowText.css";

export default function ReliableGlowText({
  children,
  className = "",
  variant = "primary", // primary, secondary, accent
  size = "medium", // small, medium, large, xlarge
  glow = true,
  animated = false,
  style = {}
}) {
  const [animationsDisabled, setAnimationsDisabled] = useState(false);

  // Check if animations should be disabled for crawlers
  useEffect(() => {
    setAnimationsDisabled(shouldDisableAnimations());
  }, []);

  const componentClasses = [
    "reliable-glow-text",
    `variant-${variant}`,
    `size-${size}`,
    glow ? "with-glow" : "no-glow",
    animated && !animationsDisabled ? "animated" : "",
    animationsDisabled ? "no-animation" : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={componentClasses} style={style}>
      <span className="text-content">{children}</span>
      {/* Screen reader accessible version */}
      <span className="sr-only">
        {children}
      </span>
    </div>
  );
}
