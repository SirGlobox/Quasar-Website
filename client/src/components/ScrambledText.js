import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { shouldDisableAnimations } from '../utils/crawlerDetection';

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);

  // Check if animations should be disabled for crawlers
  useEffect(() => {
    setAnimationsDisabled(shouldDisableAnimations());
  }, []);

  useEffect(() => {
    if (!rootRef.current || animationsDisabled) return;

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "char",
    });
    charsRef.current = split.chars;

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML },
        maxWidth: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      });
    });

    const handleMove = (e) => {
      const containerRect = rootRef.current.getBoundingClientRect();
      
      charsRef.current.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        // Check if character is within container bounds
        const charRight = left + width;
        const containerRight = containerRect.left + containerRect.width;
        const isWithinBounds = charRight <= containerRight;

        if (dist < radius && isWithinBounds) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
            onUpdate: function() {
              // Ensure character stays within bounds during animation
              const currentRect = c.getBoundingClientRect();
              if (currentRect.right > containerRight) {
                gsap.set(c, { maxWidth: containerRight - currentRect.left + 'px' });
              }
            }
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars, animationsDisabled]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
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
};

export default ScrambledText;
