import { Link } from "react-router-dom";
import { LeetGoCatLogo } from "../SVGs/LeetGoCatLogo";

export const SignupHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo / Brand */}
      <Link to="/" className="inline-block mb-6 group">
        <div className="flex items-center justify-center">
          <LeetGoCatLogo size="lg" showEyes={true} className="mx-auto" />
        </div>
        <h1 className="font-eb-garamond text-2xl md:text-3xl font-medium text-white mt-4">
          Leet<span className="text-leetgo-bright">Go</span>
        </h1>
      </Link>

      {/* Tagline */}
      <div className="space-y-2">
        <h2 className="font-raleway text-xl md:text-2xl text-white font-medium">
          Start your journey
        </h2>
        <p className="font-raleway text-white/50 text-sm md:text-base max-w-sm mx-auto">
          Create an account to unlock unlimited AI-generated practice problems
        </p>
      </div>
    </div>
  );
};
