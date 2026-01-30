import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import { LeetGoCatLogo } from "../SVGs/LeetGoCatLogo";

export const SplashNav: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!navRef.current) return;

    animate(navRef.current, {
      translateY: [-30, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 1000,
      delay: 300,
    });

    animate(".nav-link", {
      translateY: [-20, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 800,
      delay: stagger(100, { start: 600 }),
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 opacity-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(43, 65, 45, 0.9) 0%, transparent 100%)",
      }}
    >
      <div className="flex items-center gap-2">
        <LeetGoCatLogo size="md" showEyes={true} />
        <span className="font-eb-garamond text-2xl font-semibold tracking-tight text-white">
          Leet<span className="text-leetgo-bright">Go</span>
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* <a
          href="#features"
          className="nav-link text-white/80 hover:text-leetgo-bright transition-colors duration-300 text-sm tracking-wide opacity-0"
        >
          Features
        </a>
        <a
          href="#about"
          className="nav-link text-white/80 hover:text-leetgo-bright transition-colors duration-300 text-sm tracking-wide opacity-0"
        >
          About
        </a>
        <a
          href="#community"
          className="nav-link text-white/80 hover:text-leetgo-bright transition-colors duration-300 text-sm tracking-wide opacity-0"
        >
          Community
        </a> */}
        {/* <button className="nav-link splash-btn-secondary opacity-0">
          Sign In
        </button> */}
        <button
          onClick={() => navigate("/waitlist")}
          className="nav-link splash-btn-primary opacity-0"
        >
          Join the Waitlist
        </button>
      </div>
    </nav>
  );
};
