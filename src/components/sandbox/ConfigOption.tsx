import { type ReactNode } from "react";

interface ConfigOptionProps<T extends string> {
  /** Label displayed above the option group */
  label: string;
  /** Small icon rendered beside the label */
  icon: ReactNode;
  /** Map of value -> display label for each option */
  options: Record<T, string>;
  /** Currently selected value */
  selected: T;
  /** Callback when a new value is selected */
  onSelect: (value: T) => void;
  /** Optional color variant for active pill styling */
  variant?: "default" | "easy" | "medium" | "hard";
}

/**
 * A single config row with label + icon + horizontally-scrollable pill buttons.
 * Generically typed so callers get type-safe value handling.
 */
export const ConfigOption = <T extends string>({
  label,
  icon,
  options,
  selected,
  onSelect,
  variant = "default",
}: ConfigOptionProps<T>) => {
  /** Resolve the active pill's accent color based on variant */
  const activeClasses = getActiveClasses(variant);

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-raleway font-medium uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>

      {/* Pill group */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.entries(options) as [T, string][]).map(([value, display]) => {
          const isActive = value === selected;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className={`
                px-3 py-1 rounded-md text-xs font-raleway font-medium
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? activeClasses
                    : "bg-slate-800/60 text-slate-500 border border-slate-700/40 hover:bg-slate-700/60 hover:text-slate-300 hover:border-slate-600/60"
                }
              `}
            >
              {display}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/** Returns tailwind classes for the active pill based on variant */
function getActiveClasses(variant: string): string {
  switch (variant) {
    case "easy":
      return "bg-leetgo-primary/20 text-leetgo-bright border border-leetgo-primary/40 shadow-[0_0_8px_rgba(0,235,23,0.1)]";
    case "medium":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/35 shadow-[0_0_8px_rgba(245,158,11,0.1)]";
    case "hard":
      return "bg-red-500/15 text-red-400 border border-red-500/35 shadow-[0_0_8px_rgba(239,68,68,0.1)]";
    default:
      return "bg-leetgo-primary/20 text-leetgo-bright border border-leetgo-primary/40 shadow-[0_0_8px_rgba(0,235,23,0.1)]";
  }
}
