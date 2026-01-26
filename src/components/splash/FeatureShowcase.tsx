import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { FeatureCard } from "./FeatureCard";
import { InfinityIcon } from "../SVGs/InfinityIcon";
import { LayersIcon } from "../SVGs/LayersIcon";
import { GrowthIcon } from "../SVGs/GrowthIcon";
import { MessageIcon } from "../SVGs/MessageIcon";

const features = [
  {
    icon: <InfinityIcon />,
    title: "AI-Generated Problems",
    description:
      "Every problem is unique and generated just for you. No memorizing solutions — pure problem-solving practice.",
    accentColor: "#00EB17",
  },
  {
    icon: <LayersIcon />,
    title: "Adaptive Difficulty",
    description:
      "Problems scale with your skill level. Start easy, grow naturally, and challenge yourself when you're ready.",
    accentColor: "#00EB17",
  },
  {
    icon: <GrowthIcon />,
    title: "Track Your Growth",
    description:
      "Visual progress tracking shows how far you've come. Celebrate milestones and identify areas to improve.",
    accentColor: "#00EB17",
  },
  {
    icon: <MessageIcon />,
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef}
          className="mb-20 md:flex md:items-end md:justify-between gap-12"
        >
          <div className="md:w-3/5">
            <h2 className="font-eb-garamond text-5xl md:text-7xl font-medium mb-6 leading-tight">
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
          </div>
          <div className="md:w-2/5 md:pb-4">
            <p className="feature-subtitle font-raleway text-xl text-white/60 opacity-0 border-l-2 border-leetgo-primary/30 pl-6">
              Built for learners who want genuine practice, not pattern matching.
              Experiences tailored to your growing skill level.
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            {...features[0]}
            index={0}
            className="md:col-span-2"
          />
          <FeatureCard
            {...features[1]}
            index={1}
            className="md:col-span-1"
          />
          <FeatureCard
            {...features[2]}
            index={2}
            className="md:col-span-1"
          />
          <FeatureCard
            {...features[3]}
            index={3}
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};
