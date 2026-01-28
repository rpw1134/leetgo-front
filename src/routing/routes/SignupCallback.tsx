import { Link } from "react-router-dom";
import { GridOverlay } from "../../components/reusable/backgrounds/GridOverlay";

export default function SignupCallback() {
  return (
    <div className="min-h-screen w-full bg-leetgo-darkest overflow-hidden grain-overlay">
      {/* Background gradient */}
      <div className="fixed inset-0 signup-bg-gradient" />

      <GridOverlay size={80} opacity={0.015} fixed />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        <div className="signup-card p-8 md:p-12 rounded-2xl max-w-md w-full text-center animate-fade-in">
          {/* Success checkmark */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-leetgo-bright/10 border border-leetgo-bright/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-leetgo-bright"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="font-eb-garamond text-2xl md:text-3xl text-white font-medium mb-3">
            You're all set
          </h1>

          <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-leetgo-bright to-transparent mx-auto mb-6" />

          {/* Message */}
          <p className="font-raleway text-white/60 text-sm md:text-base mb-8">
            Your email has been verified. Welcome to LeetGo.
          </p>

          {/* CTA Button */}
          <Link to="/sandbox" className="splash-btn-primary w-full block text-center">
            <span>Start Practicing</span>
          </Link>
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-l-2 border-t-2 border-leetgo-bright/10 m-4 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-r-2 border-b-2 border-leetgo-bright/10 m-4 pointer-events-none" />
    </div>
  );
}
