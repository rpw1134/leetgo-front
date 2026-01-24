import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import { WaitlistForm } from "../../components/waitlist/WaitlistForm";
import { ConfirmationMessage } from "../../components/waitlist/ConfirmationMessage";

export const Waitlist = () => {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate content on mount
    if (contentRef.current && !submittedEmail) {
      animate(contentRef.current.children, {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(150, { start: 300 }),
        duration: 800,
        ease: "outQuad",
      });
    }
  }, [submittedEmail]);

  const handleSubmit = (email: string) => {
    setSubmittedEmail(email);
    // In a real app, you would send this to your backend here
    console.log("Submitted email:", email);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-leetgo-darkest">
      {/* Background gradient */}
      <div className="hero-bg-gradient absolute inset-0" />

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 opacity-[0.03]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-leetgo-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-leetgo-primary) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="w-full px-6 py-6 md:px-12">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-leetgo-bright font-raleway flex items-center gap-2 focus:outline-none"
          >
            <svg
              className="w-5 h-5 transition-all duration-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <p className="transition-all duration-100">Back to home</p>
          </button>
        </nav>

        {/* Content container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <div ref={contentRef} className="space-y-12">
              {/* Logo and heading */}
              <div className="text-center space-y-6">
                <div className="space-y-4 opacity-0">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-garamond font-bold text-white">
                    Join the{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-leetgo-bright to-leetgo-primary">
                      Wait List
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 font-raleway max-w-xl mx-auto">
                    Be among the first to experience AI-powered DSA practice.
                    Get early access when we launch.
                  </p>
                </div>
              </div>

              {/* Form or confirmation message */}
              <div className="opacity-0">
                {submittedEmail ? (
                  <ConfirmationMessage email={submittedEmail} />
                ) : (
                  <WaitlistForm onSubmit={handleSubmit} />
                )}
              </div>

              {/* Feature highlights */}
              {!submittedEmail && (
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-0">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-leetgo-bright font-raleway">
                      Unlimited
                    </div>
                    <div className="text-sm text-gray-400 font-raleway mt-1">
                      Practice problems
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-leetgo-bright font-raleway">
                      AI-Powered
                    </div>
                    <div className="text-sm text-gray-400 font-raleway mt-1">
                      Problem generation
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-leetgo-bright font-raleway">
                      Early Access
                    </div>
                    <div className="text-sm text-gray-400 font-raleway mt-1">
                      Be the first
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-6 py-6 text-center">
          <p className="text-sm text-gray-500 font-raleway">
            © 2024 LeetGo. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
