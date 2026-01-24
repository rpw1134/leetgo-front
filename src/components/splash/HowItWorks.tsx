import { useEffect, useRef, useState, useCallback } from "react";

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
  const [progress, setProgress] = useState(0);

  // Calculate which step is active based on progress
  const getStepProgress = useCallback(
    (stepIndex: number, currentProgress: number) => {
      // Each step occupies 1/4 of the progress
      const stepStart = stepIndex / steps.length;
      const stepEnd = (stepIndex + 1) / steps.length;

      if (currentProgress <= stepStart) return 0;
      if (currentProgress >= stepEnd) return 1;
      return (currentProgress - stepStart) / (stepEnd - stepStart);
    },
    [],
  );

  // Calculate line segment progress (lines are BETWEEN nodes)
  const getLineProgress = useCallback(
    (lineIndex: number, currentProgress: number) => {
      // 3 lines between 4 nodes
      // Line 0: from progress 0.125 to 0.375 (between node 0 and 1)
      // Line 1: from progress 0.375 to 0.625 (between node 1 and 2)
      // Line 2: from progress 0.625 to 0.875 (between node 2 and 3)
      const lineStart = (lineIndex + 0.5) / steps.length;
      const lineEnd = (lineIndex + 1.5) / steps.length;

      if (currentProgress <= lineStart) return 0;
      if (currentProgress >= lineEnd) return 1;
      return (currentProgress - lineStart) / (lineEnd - lineStart);
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when section is 20% into viewport, 1 when section top reaches 30% from top
      // This makes the animation start after the section is visible and complete while still prominent
      const startPoint = windowHeight * 0.7; // Section top at 70% down viewport (30% visible)
      const endPoint = windowHeight * 0.3; // Section top at 30% from top of viewport

      const currentPosition = rect.top;

      if (currentPosition >= startPoint) {
        setProgress(0);
      } else if (currentPosition <= endPoint) {
        setProgress(1);
      } else {
        const rawProgress =
          (startPoint - currentPosition) / (startPoint - endPoint);
        setProgress(Math.max(0, Math.min(1, rawProgress)));
      }
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0, 235, 23, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-24 transition-all duration-500"
          style={{
            opacity: Math.min(progress * 4, 1),
            transform: `translateY(${Math.max(20 - progress * 80, 0)}px)`,
          }}
        >
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
            {/* Node row with connecting lines */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const stepProgress = getStepProgress(index, progress);
                const isActive = stepProgress > 0;
                const isComplete = stepProgress >= 1;

                return (
                  <div key={step.number} className="flex items-center">
                    {/* Node */}
                    <div
                      className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, rgba(0, 235, 23, ${0.15 + stepProgress * 0.15}) 0%, rgba(32, 192, 48, ${0.1 + stepProgress * 0.1}) 100%)`
                          : "linear-gradient(135deg, rgba(43, 51, 43, 0.6) 0%, rgba(43, 65, 45, 0.4) 100%)",
                        border: isActive
                          ? `2px solid rgba(0, 235, 23, ${0.3 + stepProgress * 0.4})`
                          : "2px solid rgba(43, 51, 43, 0.5)",
                        boxShadow: isActive
                          ? `0 0 ${20 + stepProgress * 20}px rgba(0, 235, 23, ${stepProgress * 0.4}), inset 0 0 15px rgba(0, 235, 23, ${stepProgress * 0.15})`
                          : "none",
                        transform: `scale(${1 + stepProgress * 0.08})`,
                      }}
                    >
                      <div
                        className="transition-colors duration-300"
                        style={{
                          color: isActive
                            ? `rgba(0, 235, 23, ${0.5 + stepProgress * 0.5})`
                            : "rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        {step.icon}
                      </div>

                      {/* Step number badge */}
                      <div
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{
                          background: isComplete
                            ? "#00EB17"
                            : isActive
                              ? `rgba(0, 235, 23, ${stepProgress * 0.8})`
                              : "rgba(43, 51, 43, 0.6)",
                          color: isComplete
                            ? "#0a1f0c"
                            : isActive
                              ? `rgba(255, 255, 255, ${0.5 + stepProgress * 0.5})`
                              : "rgba(255, 255, 255, 0.3)",
                          border: isActive
                            ? "none"
                            : "1px solid rgba(43, 51, 43, 0.8)",
                          boxShadow: isComplete
                            ? "0 0 10px rgba(0, 235, 23, 0.5)"
                            : "none",
                        }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Connecting line (after each node except the last) */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-4 h-[3px] relative">
                        {/* Background track */}
                        <div className="absolute inset-0 bg-leetgo-muted/40 rounded-full" />
                        {/* Animated fill */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
                          style={{
                            width: `${getLineProgress(index, progress) * 100}%`,
                            background:
                              "linear-gradient(90deg, #00EB17, #20C030, #00EB17)",
                            boxShadow:
                              getLineProgress(index, progress) > 0
                                ? "0 0 12px rgba(0, 235, 23, 0.6), 0 0 24px rgba(0, 235, 23, 0.3)"
                                : "none",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Content row */}
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const stepProgress = getStepProgress(index, progress);
                const isActive = stepProgress > 0;

                return (
                  <div
                    key={`content-${step.number}`}
                    className="text-center transition-all duration-300"
                    style={{
                      opacity: isActive ? 0.4 + stepProgress * 0.6 : 0.3,
                      transform: `translateY(${isActive ? 0 : 10}px)`,
                    }}
                  >
                    <h3
                      className="font-eb-garamond text-lg font-semibold mb-2 transition-colors duration-300"
                      style={{
                        color: isActive
                          ? `rgba(255, 255, 255, ${0.7 + stepProgress * 0.3})`
                          : "rgba(255, 255, 255, 0.4)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-raleway text-sm leading-relaxed transition-colors duration-300"
                      style={{
                        color: isActive
                          ? `rgba(255, 255, 255, ${0.4 + stepProgress * 0.2})`
                          : "rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const stepProgress = getStepProgress(index, progress);
              const isActive = stepProgress > 0;

              return (
                <div key={step.number} className="relative">
                  {/* Vertical connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-10 top-20 w-[3px] h-[calc(100%+2rem)] -translate-x-1/2">
                      <div className="absolute inset-0 bg-leetgo-muted/40 rounded-full" />
                      <div
                        className="absolute inset-x-0 top-0 rounded-full transition-all duration-100"
                        style={{
                          height: `${getLineProgress(index, progress) * 100}%`,
                          background:
                            "linear-gradient(180deg, #00EB17, #20C030)",
                          boxShadow:
                            getLineProgress(index, progress) > 0
                              ? "0 0 10px rgba(0, 235, 23, 0.5)"
                              : "none",
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-6">
                    {/* Node */}
                    <div
                      className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, rgba(0, 235, 23, ${0.15 + stepProgress * 0.15}) 0%, rgba(32, 192, 48, ${0.1 + stepProgress * 0.1}) 100%)`
                          : "linear-gradient(135deg, rgba(43, 51, 43, 0.6) 0%, rgba(43, 65, 45, 0.4) 100%)",
                        border: isActive
                          ? `2px solid rgba(0, 235, 23, ${0.3 + stepProgress * 0.4})`
                          : "2px solid rgba(43, 51, 43, 0.5)",
                        boxShadow: isActive
                          ? `0 0 ${20 + stepProgress * 20}px rgba(0, 235, 23, ${stepProgress * 0.4})`
                          : "none",
                      }}
                    >
                      <div
                        style={{
                          color: isActive
                            ? `rgba(0, 235, 23, ${0.5 + stepProgress * 0.5})`
                            : "rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        {step.icon}
                      </div>

                      <div
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background:
                            stepProgress >= 1
                              ? "#00EB17"
                              : "rgba(43, 51, 43, 0.6)",
                          color:
                            stepProgress >= 1
                              ? "#0a1f0c"
                              : "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="pt-2 transition-all duration-300"
                      style={{
                        opacity: isActive ? 0.5 + stepProgress * 0.5 : 0.3,
                      }}
                    >
                      <h3
                        className="font-eb-garamond text-xl font-semibold mb-2"
                        style={{
                          color: isActive
                            ? `rgba(255, 255, 255, ${0.7 + stepProgress * 0.3})`
                            : "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="font-raleway text-sm leading-relaxed"
                        style={{
                          color: isActive
                            ? `rgba(255, 255, 255, ${0.4 + stepProgress * 0.2})`
                            : "rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
