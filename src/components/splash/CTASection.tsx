import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";
import { useNavigate } from "react-router-dom";
import { NodeGraph } from "../SVGs/NodeGraph";

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animation
            animate(".cta-title", {
              translateY: [50, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 1000,
            });

            // Subtitle
            animate(".cta-subtitle", {
              translateY: [30, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 800,
              delay: 200,
            });

            // Button
            animate(".cta-button", {
              scale: [0.8, 1],
              opacity: [0, 1],
              ease: "out(3)",
              duration: 800,
              delay: 400,
            });

            // Decorative elements
            animate(".cta-decoration", {
              scale: [0.5, 1],
              opacity: [0, 0.3],
              rotate: () => utils.random(-20, 20),
              ease: "outElastic(1, 0.5)",
              duration: 1500,
              delay: stagger(150, { start: 300 }),
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-8 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 100%, rgba(0, 235, 23, 0.15) 0%, transparent 60%),
                     linear-gradient(180deg, rgba(43, 65, 45, 0.4) 0%, rgba(10, 31, 12, 0.9) 100%)`,
      }}
    >
      {/* Decorative graphs */}
      <NodeGraph className="cta-decoration absolute left-[10%] top-[20%] w-32 h-32 text-leetgo-muted opacity-0" />
      <NodeGraph className="cta-decoration absolute right-[15%] bottom-[20%] w-24 h-24 text-leetgo-forest opacity-0 rotate-45" />
      <NodeGraph className="cta-decoration absolute left-[5%] bottom-[30%] w-20 h-20 text-leetgo-primary opacity-0 -rotate-30" />

      {/* Animated glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 235, 23, 0.2) 0%, transparent 70%)",
            left: "20%",
            top: "30%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(32, 192, 48, 0.15) 0%, transparent 70%)",
            right: "25%",
            bottom: "20%",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="cta-title font-eb-garamond text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-8 opacity-0">
          Ready to <span className="text-leetgo-bright">Level Up</span>?
        </h2>

        <p className="cta-subtitle font-raleway text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto opacity-0">
          Join a growing community of developers mastering algorithms with
          AI-driven practice. Your journey to coding excellence starts here.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="cta-button splash-btn-primary text-xl px-14 py-5 opacity-0"
        >
          Join the Wait List
        </button>

        <p className="mt-8 text-white/40 text-sm">
          Free forever. No credit card required. Upgrade anytime.
        </p>
      </div>
    </section>
  );
};
