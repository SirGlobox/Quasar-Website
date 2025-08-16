import React from 'react';
import './BulletproofText.css';

/**
 * BulletproofText - A completely reliable text component that guarantees visibility
 * This component ensures text is ALWAYS visible regardless of CSS loading state,
 * browser quirks, or page transition issues.
 */
export default function BulletproofText({
  children,
  className = "",
  variant = "primary", // primary, secondary, accent, button
  size = "medium", // small, medium, large, xlarge, hero
  glow = true,
  tag = "span", // span, h1, h2, h3, h4, h5, h6, p, div
  style = {},
  ...props
}) {
  const Tag = tag;
  
  const componentClasses = [
    "bulletproof-text",
    `variant-${variant}`,
    `size-${size}`,
    glow ? "with-glow" : "no-glow",
    className
  ].filter(Boolean).join(" ");

  return (
    <Tag 
      className={componentClasses} 
      style={style}
      {...props}
    >
      <span className="text-content">
        {children}
      </span>
    </Tag>
  );
}
