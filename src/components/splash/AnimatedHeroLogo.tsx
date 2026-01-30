import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export const AnimatedHeroLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBracketRef = useRef<HTMLSpanElement>(null);
  const rightBracketRef = useRef<HTMLSpanElement>(null);
  const slashRef = useRef<HTMLSpanElement>(null);
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const runAnimation = async () => {
      // Phase 1: Initial fade in of the tag
      animate(containerRef.current!, {
        opacity: [0, 1],
        duration: 600,
        ease: "outQuad",
      });

      // Glow pulse
      animate(glowRef.current!, {
        opacity: [0, 0.4],
        scale: [1.5, 2],
        duration: 800,
        ease: "outQuad",
      });

      // Wait for initial fade
      await new Promise((r) => setTimeout(r, 1000));

      // Phase 2: Brackets tilt to become ears pointing outward (10 and 2 o'clock)
      // Left ear: rotate counter-clockwise so < tip points upper-left (10 o'clock)
      const getTranslation = () => {
        if (windowWidth > 1024) return 80;
        if (windowWidth > 768) return 60;
        return 40;
      };
      const translation = getTranslation();
      animate(leftBracketRef.current!, {
        rotate: [0, 45],
        translateX: [0, -translation],
        translateY: [0, -translation],
        duration: 700,
        ease: "outBack",
      });

      // Right ear: rotate clockwise so > tip points upper-right (2 o'clock)
      animate(rightBracketRef.current!, {
        rotate: [0, -45],
        translateX: [0, translation],
        translateY: [0, -translation],
        duration: 700,
        ease: "outBack",
      });

      // Slash gets a subtle bounce
      animate(slashRef.current!, {
        scale: [1, 1.05, 1],
        duration: 400,
        delay: 200,
        ease: "outQuad",
      });

      // Wait for ear animation
      await new Promise((r) => setTimeout(r, 500));

      // Phase 3: Eyes pop in with elastic effect
      animate([leftEyeRef.current!, rightEyeRef.current!], {
        opacity: [0, 1],
        scale: [0, 1.3, 1],
        duration: 500,
        ease: "outElastic(1, 0.6)",
      });

      // Enhanced glow when cat appears
      animate(glowRef.current!, {
        opacity: [0.4, 0.6, 0.4],
        scale: [2, 2.2, 2],
        duration: 600,
        ease: "outQuad",
      });

      // Wait for eyes
      await new Promise((r) => setTimeout(r, 600));

      setAnimationComplete(true);

      // Start idle animations
      startIdleAnimations();
    };

    const startIdleAnimations = () => {
      // Subtle ear twitch
      const earTwitch = () => {
        const delay = 3000 + Math.random() * 4000;
        setTimeout(() => {
          if (!leftBracketRef.current || !rightBracketRef.current) return;

          // Random ear to twitch
          const ear =
            Math.random() > 0.5
              ? leftBracketRef.current
              : rightBracketRef.current;
          const isLeft = ear === leftBracketRef.current;
          const baseRotate = isLeft ? 45 : -45;

          animate(ear, {
            rotate: [baseRotate, baseRotate + (isLeft ? -8 : 8), baseRotate],
            duration: 200,
            ease: "outQuad",
          });

          earTwitch();
        }, delay);
      };

      // Blink animation
      const blink = () => {
        const delay = 2500 + Math.random() * 3000;
        setTimeout(() => {
          if (!leftEyeRef.current || !rightEyeRef.current) return;

          animate([leftEyeRef.current, rightEyeRef.current], {
            scaleY: [1, 0.1, 1],
            duration: 120,
            ease: "inOutQuad",
          });

          blink();
        }, delay);
      };

      earTwitch();
      blink();
    };

    runAnimation();
  }, []);

  return (
    <div ref={containerRef} className="relative opacity-0">
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 blur-3xl opacity-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 235, 23, 0.5) 0%, rgba(0, 235, 23, 0.2) 40%, transparent 70%)",
          transform: "scale(1.5)",
        }}
      />

      {/* Logo container - cat face layout */}
      <div className="relative flex flex-col items-center">
        {/* Ears row - at the top */}
        <div className="flex justify-center items-end -mb-15 md:-mb-20 lg:-mb-36">
          {/* Left ear */}
          <span
            ref={leftBracketRef}
            className="font-eb-garamond text-6xl md:text-7xl lg:text-[10rem] font-light text-leetgo-bright inline-block"
            style={{
              transformOrigin: "bottom right",
            }}
          >
            &lt;
          </span>

          {/* Spacer for ears */}
          <div className="w-30 md:w-50 lg:w-70" />

          {/* Right ear */}
          <span
            ref={rightBracketRef}
            className="font-eb-garamond text-6xl md:text-7xl lg:text-[10rem] font-light text-leetgo-bright inline-block"
            style={{
              transformOrigin: "bottom left",
            }}
          >
            &gt;
          </span>
        </div>

        {/* Face row - eyes and nose */}
        <div className="relative flex items-center justify-center">
          {/* Left eye */}
          <span ref={leftEyeRef} className="opacity-0">
            <span
              className="inline-block rounded-full bg-white"
              style={{
                width: "clamp(12px, 2.5vw, 28px)",
                height: "clamp(12px, 2.5vw, 28px)",
                boxShadow:
                  "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(0, 235, 23, 0.3)",
              }}
            />
          </span>

          {/* Slash (nose) - centered between eyes */}
          <span
            ref={slashRef}
            className="font-eb-garamond text-7xl md:text-8xl lg:text-[10rem] font-light text-white inline-block mx-4 md:mx-6 lg:mx-10"
          >
            /
          </span>

          {/* Right eye */}
          <span ref={rightEyeRef} className="opacity-0">
            <span
              className="inline-block rounded-full bg-white"
              style={{
                width: "clamp(12px, 2.5vw, 28px)",
                height: "clamp(12px, 2.5vw, 28px)",
                boxShadow:
                  "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(0, 235, 23, 0.3)",
              }}
            />
          </span>
        </div>
      </div>

      {/* Whisker hints - subtle decorative lines that appear after animation (lg only) */}
      {animationComplete && (
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block">
          {/* Left whiskers */}
          <div
            className="absolute"
            style={{
              left: "5%",
              top: "65%",
              width: "50px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
              transform: "rotate(-10deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "5%",
              top: "70%",
              width: "45px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
              transform: "rotate(10deg)",
            }}
          />
          {/* Right whiskers */}
          <div
            className="absolute"
            style={{
              right: "5%",
              top: "65%",
              width: "50px",
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(255,255,255,0.3), transparent)",
              transform: "rotate(10deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              right: "5%",
              top: "70%",
              width: "45px",
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(255,255,255,0.2), transparent)",
              transform: "rotate(-10deg)",
            }}
          />
        </div>
      )}
    </div>
  );
};
