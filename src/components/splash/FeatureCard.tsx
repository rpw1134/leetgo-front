import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  index: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  accentColor,
  index,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    {
      /* Animation logic remains similar but simplified since we don't have the icon element anymore */
    }
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
      className={`group relative p-6 rounded-2xl opacity-0 overflow-hidden min-h-70 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,235,23,0.2)] ${className}`}
      style={{
        background: `linear-gradient(145deg, rgba(43, 65, 45, 0.6) 0%, rgba(43, 51, 43, 0.8) 100%)`,
        border: "1px solid rgba(32, 192, 48, 0.1)",
      }}
    >
      {/* Background Graphic (Engraving) */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-[0.05] group-hover:opacity-[0.12] transition-all duration-700 ease-out pointer-events-none group-hover:scale-105"
        style={{ color: accentColor }}
      >
        <div className="w-[120%] h-[120%]">
          {React.isValidElement<{ className?: string }>(icon)
            ? React.cloneElement(icon, {
                className: "w-full h-full stroke-[0.5]",
              })
            : icon}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div>
          <h3 className="font-eb-garamond text-2xl font-semibold text-white mb-3 group-hover:text-leetgo-bright transition-colors duration-300">
            {title}
          </h3>
          <p className="font-raleway text-white/70 leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* Subtle accent line instead of icon */}
        <div
          className="mt-4 w-12 h-1 rounded-full transition-all duration-300 group-hover:w-full"
          style={{ background: accentColor, opacity: 0.5 }}
        />
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
