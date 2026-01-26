import type { PasswordStrength } from "../../utils/validation/auth";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  show: boolean;
}

const strengthConfig = {
  weak: {
    width: "w-1/3",
    color: "bg-red-500",
    label: "Weak",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  },
  medium: {
    width: "w-2/3",
    color: "bg-yellow-500",
    label: "Medium",
    glow: "shadow-[0_0_10px_rgba(234,179,8,0.5)]",
  },
  strong: {
    width: "w-full",
    color: "bg-leetgo-bright",
    label: "Strong",
    glow: "shadow-[0_0_10px_rgba(0,235,23,0.5)]",
  },
};

export const PasswordStrengthIndicator = ({
  strength,
  show,
}: PasswordStrengthIndicatorProps) => {
  if (!show) return null;

  const config = strengthConfig[strength];

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1 w-full bg-leetgo-dark/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.width} ${config.color} ${config.glow} rounded-full transition-all duration-500 ease-out`}
        />
      </div>
      <p
        className={`text-xs font-raleway ${
          strength === "weak"
            ? "text-red-400"
            : strength === "medium"
            ? "text-yellow-400"
            : "text-leetgo-bright"
        }`}
      >
        {config.label}
      </p>
    </div>
  );
};
