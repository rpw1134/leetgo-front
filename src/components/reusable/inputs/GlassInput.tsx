import React from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

export const GlassInput = ({
  isValid = true,
  className = "",
  ...props
}: GlassInputProps) => {
  return (
    <input
      className={`
        w-full px-6 py-4
        bg-leetgo-darkest/50
        border-2 rounded-xl
        text-white font-raleway text-lg
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-leetgo-bright
        transition-all duration-300
        backdrop-blur-sm
        ${
          isValid
            ? "border-leetgo-forest/50 hover:border-leetgo-primary"
            : "border-red-500 shake-animation"
        }
        ${className}
      `}
      {...props}
    />
  );
};
