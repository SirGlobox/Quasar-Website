import { useRef, useEffect, useState } from "react";
import "./GooeyButton.css";

const GooeyButton = ({
  children,
  onClick,
  className = "",
  particleCount = 8,
  particleDistances = [40, 5],
  particleR = 60,
  animationTime = 400,
  timeVariance = 150,
  colors = [1, 2, 3, 4],
  disabled = false,
  ...props
}) => {
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile to disable particle effects
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate:
        rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    if (isMobile || disabled) return; // Skip particle effects on mobile or disabled buttons
    
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty(
          "--color",
          `var(--color-${p.color}, var(--secondary-solar))`
        );
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);

        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const handleClick = (e) => {
    if (disabled) return;
    
    if (!isMobile && filterRef.current) {
      // Clear existing particles
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => {
        try {
          filterRef.current.removeChild(p);
        } catch {
          // Do nothing
        }
      });
      
      makeParticles(filterRef.current);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={`gooey-button-container ${className} ${isMobile ? 'mobile' : ''} ${disabled ? 'disabled' : ''}`}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className="gooey-button"
        {...props}
      >
        {children}
      </button>
      {!isMobile && (
        <span className="gooey-button-filter" ref={filterRef} />
      )}
    </div>
  );
};

export default GooeyButton;
