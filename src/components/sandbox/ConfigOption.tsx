import { type ReactNode } from "react";

interface ConfigOptionProps<T extends string> {
  label: string;
  icon: ReactNode;
  options: Record<T, string>;
  selected: T;
  onSelect: (value: T) => void;
  variant?: "default" | "easy" | "medium" | "hard";
}

export const ConfigOption = <T extends string>({
  label,
  icon,
  options,
  selected,
  onSelect,
  variant = "default",
}: ConfigOptionProps<T>) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Label */}
      <div className="flex items-center gap-2.5 text-slate-500 shrink-0">
        <span className="flex items-center justify-center w-5 h-5 opacity-50">{icon}</span>
        <span className="text-sm xl:text-base font-raleway font-medium tracking-wide">
          {label}
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-wrap justify-end gap-1.5 xl:gap-2">
        {(Object.entries(options) as [T, string][]).map(([value, display]) => {
          const isActive = value === selected;
          const activeColor = getActiveColor(variant, isActive);

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className={`
                border-none bg-transparent font-medium tracking-[0.01em]
                px-3 py-1.5 xl:px-4 xl:py-2 rounded-md
                text-sm xl:text-base font-raleway
                transition-all duration-150 cursor-pointer
                ${isActive ? activeColor : "text-slate-600 hover:text-slate-400 hover:bg-white/[0.03]"}
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

function getActiveColor(variant: string, isActive: boolean): string {
  if (!isActive) return "";

  switch (variant) {
    case "easy":
      return "text-leetgo-bright bg-leetgo-bright/[0.08]";
    case "medium":
      return "text-amber-400 bg-amber-400/[0.08]";
    case "hard":
      return "text-red-400 bg-red-400/[0.08]";
    default:
      return "text-white/80 bg-white/[0.06]";
  }
}
