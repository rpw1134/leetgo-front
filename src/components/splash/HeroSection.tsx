import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ProblemCard } from "./ProblemCard";

const sampleProblems = [
  {
    title: "Find the Longest Palindromic Substring in a Rotated Array",
    difficulty: "medium" as const,
    tags: ["Dynamic Programming", "Strings"],
  },
  {
    title: "Merge K Sorted Binary Trees",
    difficulty: "hard" as const,
    tags: ["Trees", "Divide & Conquer"],
  },
  {
    title: "Two Sum with Constraints",
    difficulty: "easy" as const,
    tags: ["Arrays", "Hash Map"],
  },
];

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Animate the left content
    animate(".hero-eyebrow", {
      translateX: [-30, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 800,
      delay: 300,
    });

    animate(".hero-headline", {
      translateY: [40, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 1000,
      delay: 500,
    });

    animate(".hero-description", {
      translateY: [30, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 800,
      delay: 800,
    });

    animate(".hero-cta", {
      translateY: [20, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 800,
      delay: stagger(100, { start: 1000 }),
    });

    animate(".hero-stat", {
      translateY: [20, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 600,
      delay: stagger(100, { start: 1200 }),
    });

    // Animate problem cards cascading in
    animate(".hero-problem-card", {
      translateX: [100, 0],
      translateY: [50, 0],
      opacity: [0, 1],
      rotate: [8, 0],
      ease: "outExpo",
      duration: 1200,
      delay: stagger(200, { start: 600 }),
    });

    // Floating particles
    animate(".hero-particle", {
      translateY: [0, -20],
      opacity: [0.2, 0.6],
      ease: "inOutSine",
      duration: 3000,
      alternate: true,
      loop: true,
      delay: stagger(200),
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 hero-bg-gradient" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute w-1 h-1 rounded-full bg-leetgo-bright/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(135deg, transparent 40%, rgba(0, 235, 23, 0.3) 50%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1">
            <div className="hero-eyebrow flex items-center gap-3 mb-6 opacity-0">
              <div className="w-8 h-px bg-leetgo-bright" />
              <span className="text-leetgo-bright text-sm font-medium tracking-widest uppercase">
                AI-Powered Practice
              </span>
            </div>

            <h1 className="hero-headline font-eb-garamond text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6 opacity-0">
              Fresh problems.
              <br />
              <span className="text-leetgo-bright">Every single time.</span>
            </h1>

            <p className="hero-description font-raleway text-lg text-white/60 max-w-lg mb-10 leading-relaxed opacity-0">
              Stop memorizing solutions. LeetGo generates unique algorithm
              challenges tailored to your skill level, so you're always
              solving something new.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="hero-cta splash-btn-primary px-8 py-4 opacity-0">
                Start Practicing Free
              </button>
              <button className="hero-cta splash-btn-secondary px-8 py-4 opacity-0">
                How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              <div className="hero-stat opacity-0">
                <div className="font-eb-garamond text-3xl font-semibold text-white">
                  <span className="text-leetgo-bright">∞</span>
                </div>
                <div className="text-white/40 text-sm mt-1">Unique Problems</div>
              </div>
              <div className="hero-stat opacity-0">
                <div className="font-eb-garamond text-3xl font-semibold text-white">
                  12k<span className="text-leetgo-bright">+</span>
                </div>
                <div className="text-white/40 text-sm mt-1">Active Users</div>
              </div>
              <div className="hero-stat opacity-0">
                <div className="font-eb-garamond text-3xl font-semibold text-white">
                  4.9<span className="text-leetgo-bright">/5</span>
                </div>
                <div className="text-white/40 text-sm mt-1">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right side - Floating problem cards */}
          <div className="order-1 lg:order-2 relative h-[400px] lg:h-[500px]">
            {/* Glow effect behind cards */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(0, 235, 23, 0.4) 0%, transparent 70%)",
              }}
            />

            {/* Stacked problem cards */}
            <div className="relative w-full h-full">
              <div className="hero-problem-card absolute top-[5%] right-[5%] w-72 float-animation opacity-0">
                <ProblemCard {...sampleProblems[1]} />
              </div>

              <div className="hero-problem-card absolute top-[25%] left-[5%] lg:left-[10%] w-72 float-animation-delayed opacity-0">
                <ProblemCard {...sampleProblems[2]} />
              </div>

              <div className="hero-problem-card absolute bottom-[10%] right-[10%] lg:right-[5%] w-80 opacity-0">
                <ProblemCard {...sampleProblems[0]} isNew />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="scroll-indicator w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-leetgo-bright animate-bounce" />
        </div>
      </div>
    </section>
  );
};
