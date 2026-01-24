import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { FeatureCard } from "./FeatureCard";
import { InfinityIcon } from "../SVGs/InfinityIcon";
import { LayersIcon } from "../SVGs/LayersIcon";
import { GrowthIcon } from "../SVGs/GrowthIcon";
import { MessageIcon } from "../SVGs/MessageIcon";

const features = [
  {
    icon: <InfinityIcon className="w-8 h-8" />,
    title: "AI-Generated Problems",
    description:
      "Every problem is unique and generated just for you. No memorizing solutions — pure problem-solving practice.",
    accentColor: "#00EB17",
  },
  {
    icon: <LayersIcon className="w-8 h-8" />,
    title: "Adaptive Difficulty",
    description:
      "Problems scale with your skill level. Start easy, grow naturally, and challenge yourself when you're ready.",
    accentColor: "#00EB17",
  },
  {
    icon: <GrowthIcon className="w-8 h-8" />,
    title: "Track Your Growth",
    description:
      "Visual progress tracking shows how far you've come. Celebrate milestones and identify areas to improve.",
    accentColor: "#00EB17",
  },
  {
    icon: <MessageIcon className="w-8 h-8" />,
    title: "Share & Collaborate",
    description:
      "Pin your favorite problems, share with friends, and learn from the community. Coding is better together.",
    accentColor: "#00EB17",
  },
];

export const FeatureShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".feature-title-word", {
              translateY: [40, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 1000,
              delay: stagger(100),
            });

            animate(".feature-subtitle", {
              translateY: [20, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 800,
              delay: 400,
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 px-8 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 235, 23, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(50, 150, 60, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="font-eb-garamond text-5xl md:text-6xl font-medium mb-6">
            <span className="feature-title-word inline-block opacity-0 text-white">
              Why
            </span>{" "}
            <span className="feature-title-word inline-block opacity-0 text-leetgo-bright">
              LeetGo
            </span>{" "}
            <span className="feature-title-word inline-block opacity-0 text-white">
              ?
            </span>
          </h2>
          <p className="feature-subtitle font-raleway text-xl text-white/60 max-w-2xl mx-auto opacity-0">
            Built for learners who want genuine practice, not pattern matching.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
