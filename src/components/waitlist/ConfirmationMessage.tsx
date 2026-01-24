import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface ConfirmationMessageProps {
  email: string;
}

export const ConfirmationMessage = ({ email }: ConfirmationMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && checkmarkRef.current) {
      // Animate container fade in
      animate(containerRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: "outQuad",
      });

      // Animate checkmark
      animate(checkmarkRef.current, {
        scale: [0, 1],
        rotate: [0, 360],
        duration: 800,
        delay: 200,
        ease: "outElastic(1, .6)",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto text-center space-y-6 opacity-0"
    >
      {/* Success checkmark */}
      <div className="flex justify-center">
        <div
          ref={checkmarkRef}
          className="
            w-20 h-20 rounded-full
            bg-gradient-to-br from-[var(--color-leetgo-bright)] to-[var(--color-leetgo-primary)]
            flex items-center justify-center
            shadow-lg shadow-[var(--color-leetgo-bright)]/30
          "
        >
          <svg
            className="w-10 h-10 text-[var(--color-leetgo-darkest)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Confirmation heading */}
      <h2 className="text-3xl md:text-4xl font-garamond font-bold text-white">
        You're on the list!
      </h2>

      {/* Message */}
      <div className="space-y-3">
        <p className="text-lg text-gray-300 font-raleway">
          We've sent a confirmation email to:
        </p>
        <p className="text-xl font-semibold text-[var(--color-leetgo-bright)] font-raleway">
          {email}
        </p>
        <p className="text-gray-400 font-raleway">
          Check your inbox to confirm your spot on the waitlist.
        </p>
      </div>

      {/* Additional info */}
      <div
        className="
        mt-8 p-6 rounded-xl
        bg-[var(--color-leetgo-darkest)]/50
        border border-[var(--color-leetgo-forest)]/30
        backdrop-blur-sm
      "
      >
        <p className="text-sm text-gray-400 font-raleway leading-relaxed">
          We'll notify you as soon as LeetGo launches. Get ready to level up
          your DSA skills!
        </p>
      </div>
    </div>
  );
};
