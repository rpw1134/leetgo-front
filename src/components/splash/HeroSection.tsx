import { AnimatedHeroLogo } from "./AnimatedHeroLogo";
import { ProblemCard } from "./ProblemCard";
import { useNavigate } from "react-router-dom";
import { GridOverlay } from "../reusable/backgrounds/GridOverlay";

const sampleProblems = [
  {
    title: "Merge K Sorted Binary Trees",
    difficulty: "hard" as const,
    tags: ["Trees", "Divide & Conquer"],
  },
  {
    title: "Two Sum with Constraints",
    difficulty: "easy" as const,
    tags: ["Arrays", "Hash Map"],
  },
  {
    title: "Find the Longest Palindromic Substring",
    difficulty: "medium" as const,
    tags: ["Dynamic Programming", "Strings"],
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 hero-bg-gradient" />

      <GridOverlay size={60} opacity={0.02} />

      {/* Floating problem cards - lg screens only */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-[17%] left-[5%] w-64 float-animation -rotate-6">
          <ProblemCard {...sampleProblems[0]} />
        </div>
        <div className="absolute bottom-[22%] left-[8%] w-56 float-animation-delayed rotate-3">
          <ProblemCard {...sampleProblems[1]} />
        </div>
        <div className="absolute top-[25%] right-[5%] w-64 float-animation rotate-3">
          <ProblemCard {...sampleProblems[2]} isNew />
        </div>
      </div>

      {/* Main content - different layout for mobile vs desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex-1 flex flex-col">

        {/* Desktop/Tablet: Original centered layout */}
        <div className="hidden md:flex flex-col justify-center flex-1">
          {/* Top tagline - lg only */}
          <div className="mb-12 hidden lg:block">
            <div className="flex flex-wrap gap-x-4 text-white/40 text-base tracking-widest uppercase ml-2">
              <span>AI-Powered</span>
              <span>Algorithms</span>
              <span>Practice</span>
            </div>
          </div>

          {/* Center logo and brand */}
          <div className="flex flex-col items-center mb-12">
            <AnimatedHeroLogo />
            <h1 className="font-eb-garamond text-6xl lg:text-7xl font-medium text-white mt-6">
              Leet<span className="text-leetgo-bright">Go</span>
            </h1>
          </div>

          {/* Bottom tagline - right aligned */}
          <div className="flex justify-end mb-16">
            <div className="text-right">
              <div className="flex flex-wrap justify-end gap-x-3 text-2xl lg:text-3xl font-eb-garamond">
                <span className="text-white">Fresh problems.</span>
                <span className="text-leetgo-bright">Every time.</span>
              </div>
              <p className="text-white/50 text-base mt-3 max-w-md ml-auto">
                Stop memorizing solutions. Practice with unique, AI-generated
                challenges and explore community-made problems.
              </p>
            </div>
          </div>

          {/* CTA and stats row */}
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/waitlist")}
                className="splash-btn-primary px-8 py-4"
              >
                Join the Waitlist
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="font-raleway font-medium text-[0.95rem] tracking-[0.02em] text-white/90 bg-transparent border border-leetgo-bright/30 rounded-xl cursor-pointer transition-all duration-300 hover:bg-leetgo-bright/10 hover:border-leetgo-bright/50 hover:text-leetgo-bright px-8 py-4"
              >
                How It Works
              </button>
            </div>

            <div className="flex gap-12">
              <div className="text-right">
                <div className="font-eb-garamond text-3xl font-semibold text-leetgo-bright">
                  &#8734;
                </div>
                <div className="text-white/40 text-sm mt-1">Unique Problems</div>
              </div>
              <div className="text-right">
                <div className="font-eb-garamond text-3xl font-semibold text-white">
                  3
                </div>
                <div className="text-white/40 text-sm mt-1">
                  Available Languages
                </div>
              </div>
              <div className="text-right">
                <div className="font-eb-garamond text-3xl font-semibold text-white">
                  10<span className="text-leetgo-bright">+</span>
                </div>
                <div className="text-white/40 text-sm mt-1">Problem Types</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Streamlined vertical layout - centered */}
        <div className="flex md:hidden flex-col items-center justify-center flex-1">
          {/* Logo and brand - hero focus */}
          <div className="flex flex-col items-center mb-6">
            <AnimatedHeroLogo />
            <h1 className="font-eb-garamond text-5xl font-medium text-white mt-4">
              Leet<span className="text-leetgo-bright">Go</span>
            </h1>
          </div>

          {/* Tagline - centered on mobile */}
          <div className="text-center mb-8">
            <div className="flex flex-wrap justify-center gap-x-2 text-xl font-eb-garamond mb-2">
              <span className="text-white">Fresh problems.</span>
              <span className="text-leetgo-bright">Every time.</span>
            </div>
            <p className="text-white/50 text-sm px-4 max-w-xs mx-auto">
              Practice with unique, AI-generated challenges.
            </p>
          </div>

          {/* CTAs - stacked on mobile */}
          <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
            <button
              onClick={() => navigate("/waitlist")}
              className="splash-btn-primary px-6 py-3.5 w-full"
            >
              Join the Waitlist
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="font-raleway font-medium text-[0.95rem] tracking-[0.02em] text-white/90 bg-transparent border border-leetgo-bright/30 rounded-xl cursor-pointer transition-all duration-300 hover:bg-leetgo-bright/10 hover:border-leetgo-bright/50 hover:text-leetgo-bright px-6 py-3.5 w-full"
            >
              How It Works
            </button>
          </div>

          {/* Stats - horizontal row, compact */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="font-eb-garamond text-2xl font-semibold text-leetgo-bright">
                &#8734;
              </div>
              <div className="text-white/40 text-xs mt-1">Problems</div>
            </div>
            <div className="text-center">
              <div className="font-eb-garamond text-2xl font-semibold text-white">
                3
              </div>
              <div className="text-white/40 text-xs mt-1">Languages</div>
            </div>
            <div className="text-center">
              <div className="font-eb-garamond text-2xl font-semibold text-white">
                10<span className="text-leetgo-bright">+</span>
              </div>
              <div className="text-white/40 text-xs mt-1">Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <div
        onClick={scrollToFeatures}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer transition-opacity hover:opacity-80 hidden sm:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-leetgo-bright animate-bounce" />
        </div>
      </div>

      {/* Corner accents - hidden on mobile, subtle on tablet */}
      <div className="absolute top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 border-l-2 border-t-2 border-leetgo-bright/20 m-3 lg:m-4 pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32 border-r-2 border-b-2 border-leetgo-bright/20 m-3 lg:m-4 pointer-events-none hidden md:block" />
    </section>
  );
};
