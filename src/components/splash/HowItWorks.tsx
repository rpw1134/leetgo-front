import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const steps = [
  {
    number: "01",
    title: "Choose Your Focus",
    description:
      "Select the topics you want to practice — arrays, trees, graphs, dynamic programming, and more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 12h6M9 16h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Generates Fresh Problems",
    description:
      "Our AI creates a unique problem you've never seen before, calibrated to your current skill level.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Solve & Submit",
    description:
      "Write your solution in our editor. Get instant feedback on correctness and efficiency.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Share & Grow",
    description:
      "Pin your favorites, share with friends, and track your progress as you level up.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".hiw-title", {
              translateY: [30, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 800,
            });

            animate(".hiw-step", {
              translateY: [40, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 1000,
              delay: stagger(150, { start: 300 }),
            });

            animate(".hiw-connector", {
              scaleX: [0, 1],
              ease: "outExpo",
              duration: 800,
              delay: stagger(150, { start: 500 }),
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(43, 51, 43, 0.3) 0%, rgba(10, 31, 12, 0.6) 100%)",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="hiw-title text-center mb-20 opacity-0">
          <h2 className="font-eb-garamond text-4xl md:text-5xl font-medium text-white mb-4">
            How It <span className="text-leetgo-bright">Works</span>
          </h2>
          <p className="font-raleway text-lg text-white/50 max-w-xl mx-auto">
            From choosing a topic to sharing your solutions — it's that simple.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
            <div className="flex justify-between">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="hiw-connector h-px bg-gradient-to-r from-leetgo-bright/50 to-leetgo-forest/50 origin-left"
                  style={{ width: "calc(100% / 3 - 20px)" }}
                />
              ))}
            </div>
          </div>

          {steps.map((step) => (
            <div key={step.number} className="hiw-step opacity-0">
              {/* Step number circle */}
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 235, 23, 0.2) 0%, rgba(43, 65, 45, 0.4) 100%)`,
                    border: "1px solid rgba(0, 235, 23, 0.3)",
                  }}
                >
                  <div className="text-leetgo-bright">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -right-2 lg:right-auto lg:-left-2 w-7 h-7 rounded-full bg-leetgo-darkest border border-leetgo-bright/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-leetgo-bright">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <h3 className="font-eb-garamond text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-raleway text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
