import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  accentColor,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            animate(cardRef.current, {
              translateY: [60, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              ease: "outExpo",
              duration: 1000,
              delay: index * 150,
            });

            const iconEl = cardRef.current.querySelector(".feature-icon");
            if (iconEl) {
              animate(iconEl, {
                scale: [0, 1],
                rotate: [180, 0],
                ease: "outElastic(1, 0.5)",
                duration: 1200,
                delay: index * 150 + 300,
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="feature-card group relative p-8 rounded-2xl opacity-0"
      style={{
        background: `linear-gradient(145deg, rgba(43, 65, 45, 0.6) 0%, rgba(43, 51, 43, 0.8) 100%)`,
        border: "1px solid rgba(32, 192, 48, 0.1)",
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="feature-icon relative w-16 h-16 rounded-xl flex items-center justify-center mb-6"
        style={{
          background: `linear-gradient(135deg, ${accentColor}30 0%, ${accentColor}10 100%)`,
          border: `1px solid ${accentColor}40`,
        }}
      >
        <div className="text-3xl" style={{ color: accentColor }}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-eb-garamond text-2xl font-semibold text-white mb-3 group-hover:text-leetgo-bright transition-colors duration-300">
        {title}
      </h3>
      <p className="font-raleway text-white/60 leading-relaxed">
        {description}
      </p>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-20 rounded-xl"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${accentColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
