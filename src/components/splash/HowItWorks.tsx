import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Choose Your Focus",
    description:
      "Select topics like arrays, trees, graphs, or dynamic programming.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 12h6M9 16h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Generates",
    description: "Get a unique problem calibrated to your current skill level.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Solve & Submit",
    description: "Write your solution and get instant feedback on correctness.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Share & Grow",
    description: "Pin favorites, share with friends, and track your progress.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [nodesActive, setNodesActive] = useState<number>(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      // 0 = section top is at viewport bottom
      // 1 = section bottom is at viewport top
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
        ),
      );

      // Map progress to steps (0 to 4)
      // Accelerate animation to complete when section is centered (approx 0.5 scrollProgress)
      // Using 2.5 multiplier ensures completion slightly before center for better feel
      const activeIndex =
        Math.floor(Math.min(1, scrollProgress * 2) * (steps.length + 0.5)) - 1;

      setNodesActive(activeIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 px-8 overflow-hidden min-h-[80vh]"
      style={{
        background:
          "linear-gradient(180deg, rgba(10, 31, 12, 0.4) 0%, rgba(43, 51, 43, 0.3) 50%, rgba(10, 31, 12, 0.5) 100%)",
      }}
    >
      {/* Animated glow overlay */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 235, 23, 0.35) 0%, rgba(0, 235, 23, 0.12) 35%, transparent 65%)",
          opacity: nodesActive >= 0 ? 0.4 : 0,
        }}
      />

      {/* Subtle base background glow - always visible */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-125 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0, 235, 23, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header - always visible */}
        <div className="text-center mb-24">
          <h2 className="font-eb-garamond text-4xl md:text-5xl font-medium text-white mb-4">
            How It <span className="text-leetgo-bright">Works</span>
          </h2>
          <p className="font-raleway text-lg text-white/50 max-w-xl mx-auto">
            From choosing a topic to sharing your solutions — it's that simple.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:block">
            {/* Grid with nodes and content */}
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  {/* Node - animates on scroll */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 transition-all duration-700 ease-out"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 235, 23, 0.2) 0%, rgba(32, 192, 48, 0.1) 100%)",
                      borderColor: "rgba(0, 235, 23, 0.5)",
                      transform:
                        index <= nodesActive ? "scale(1.15)" : "scale(0.9)",
                      opacity: index <= nodesActive ? 1 : 0.3,
                      boxShadow:
                        index <= nodesActive
                          ? "0 0 35px rgba(0, 235, 23, 0.6), inset 0 0 20px rgba(0, 235, 23, 0.15)"
                          : "0 0 0 rgba(0, 235, 23, 0), inset 0 0 20px rgba(0, 235, 23, 0.15)",
                    }}
                  >
                    <div className="text-leetgo-bright">{step.icon}</div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-700"
                      style={{
                        background: "#00EB17",
                        color: "#0a1f0c",
                        boxShadow:
                          index <= nodesActive
                            ? "0 0 15px rgba(0, 235, 23, 0.6)"
                            : "none",
                        opacity: index <= nodesActive ? 1 : 0.5,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content - always visible */}
                  <div className="text-center">
                    <h3 className="font-eb-garamond text-lg font-semibold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="font-raleway text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex items-start gap-6">
                  {/* Node - animates on scroll */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-700 ease-out"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 235, 23, 0.2) 0%, rgba(32, 192, 48, 0.1) 100%)",
                      borderColor: "rgba(0, 235, 23, 0.5)",
                      transform:
                        index <= nodesActive ? "scale(1.15)" : "scale(0.9)",
                      opacity: index <= nodesActive ? 1 : 0.3,
                      boxShadow:
                        index <= nodesActive
                          ? "0 0 35px rgba(0, 235, 23, 0.6), inset 0 0 20px rgba(0, 235, 23, 0.15)"
                          : "0 0 0 rgba(0, 235, 23, 0), inset 0 0 20px rgba(0, 235, 23, 0.15)",
                    }}
                  >
                    <div className="text-leetgo-bright">{step.icon}</div>

                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-700"
                      style={{
                        background: "#00EB17",
                        color: "#0a1f0c",
                        boxShadow:
                          index <= nodesActive
                            ? "0 0 15px rgba(0, 235, 23, 0.6)"
                            : "none",
                        opacity: index <= nodesActive ? 1 : 0.5,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="font-eb-garamond text-xl font-semibold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="font-raleway text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
