export const HeroLogo: React.FC = () => {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 235, 23, 0.4) 0%, transparent 70%)",
          transform: "scale(2)",
        }}
      />

      {/* Logo container */}
      <div className="relative flex items-center justify-center">
        <span className="font-eb-garamond text-8xl md:text-9xl lg:text-[12rem] font-light text-leetgo-bright">
          &lt;
        </span>
        <span className="font-eb-garamond text-8xl md:text-9xl lg:text-[12rem] font-light text-white mx-2">
          /
        </span>
        <span className="font-eb-garamond text-8xl md:text-9xl lg:text-[12rem] font-light text-leetgo-bright">
          &gt;
        </span>
      </div>
    </div>
  );
};
