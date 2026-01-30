import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface LeetGoCatLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showEyes?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "w-8 h-8",
    earFontSize: "text-xs",
    slashFontSize: "text-sm",
    eyeSize: 2,
    earGap: 16,
    earOffset: -2,
  },
  md: {
    container: "w-10 h-10",
    earFontSize: "text-sm",
    slashFontSize: "text-base",
    eyeSize: 2.5,
    earGap: 20,
    earOffset: -3,
  },
  lg: {
    container: "w-16 h-16",
    earFontSize: "text-xl",
    slashFontSize: "text-2xl",
    eyeSize: 4,
    earGap: 30,
    earOffset: -4,
  },
};

export const LeetGoCatLogo: React.FC<LeetGoCatLogoProps> = ({
  size = "md",
  animated = false,
  showEyes = true,
  className = "",
}) => {
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const leftBracketRef = useRef<HTMLSpanElement>(null);
  const rightBracketRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = sizeConfig[size];

  useEffect(() => {
    if (!animated) return;

    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const leftBracket = leftBracketRef.current;
    const rightBracket = rightBracketRef.current;

    if (!leftEye || !rightEye || !leftBracket || !rightBracket) return;

    // Phase 1: Initial state - hide eyes
    animate([leftEye, rightEye], {
      opacity: [0, 0],
      scale: [0, 0],
      duration: 0,
    });

    // Phase 2: Brackets tilt outward like ears (10 and 2 o'clock)
    animate(leftBracket, {
      rotate: [0, 45],
      duration: 600,
      delay: 800,
      ease: "outBack",
    });

    animate(rightBracket, {
      rotate: [0, -45],
      duration: 600,
      delay: 800,
      ease: "outBack",
    });

    // Phase 3: Eyes appear with a pop
    animate([leftEye, rightEye], {
      opacity: [0, 1],
      scale: [0, 1.2, 1],
      duration: 400,
      delay: 1200,
      ease: "outElastic(1, 0.5)",
    });

    // Add subtle idle blink animation after initial animation
    const blinkInterval = setInterval(
      () => {
        if (leftEyeRef.current && rightEyeRef.current) {
          animate([leftEyeRef.current, rightEyeRef.current], {
            scaleY: [1, 0.1, 1],
            duration: 150,
            ease: "inOutQuad",
          });
        }
      },
      4000 + Math.random() * 2000,
    );

    return () => clearInterval(blinkInterval);
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={`${config.container} rounded-lg bg-gradient-to-br from-leetgo-bright to-leetgo-primary flex items-center justify-center relative ${className}`}
    >
      {/* Cat face layout */}
      <div className="flex flex-col items-center justify-center">
        {/* Ears row - at the top */}
        <div
          className="flex justify-center items-end"
          style={{ marginBottom: `${config.earOffset}px` }}
        >
          {/* Left ear - rotated so tip points toward 10 o'clock */}
          <span
            ref={leftBracketRef}
            className={`font-eb-garamond ${config.earFontSize} font-bold text-leetgo-darkest inline-block leading-none`}
            style={{
              transform: "rotate(45deg)",
              transformOrigin: "bottom right",
            }}
          >
            &lt;
          </span>

          {/* Spacer between ears */}
          <div style={{ width: `${config.earGap}px` }} />

          {/* Right ear - rotated so tip points toward 2 o'clock */}
          <span
            ref={rightBracketRef}
            className={`font-eb-garamond ${config.earFontSize} font-bold text-leetgo-darkest inline-block leading-none`}
            style={{
              transform: "rotate(-45deg)",
              transformOrigin: "bottom left",
            }}
          >
            &gt;
          </span>
        </div>

        {/* Face row - eyes and nose */}
        <div className="flex items-center justify-center">
          {/* Left eye */}
          {showEyes && (
            <span
              ref={leftEyeRef}
              className="bg-leetgo-darkest rounded-full"
              style={{
                width: `${config.eyeSize}px`,
                height: `${config.eyeSize}px`,
                opacity: animated ? 0 : 1,
              }}
            />
          )}

          {/* Slash (nose) */}
          <span
            className={`font-eb-garamond ${config.slashFontSize} font-bold text-leetgo-darkest leading-none mx-0.5`}
          >
            /
          </span>

          {/* Right eye */}
          {showEyes && (
            <span
              ref={rightEyeRef}
              className="bg-leetgo-darkest rounded-full"
              style={{
                width: `${config.eyeSize}px`,
                height: `${config.eyeSize}px`,
                opacity: animated ? 0 : 1,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
