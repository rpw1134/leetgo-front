interface GridOverlayProps {
  /** Grid cell size in pixels */
  size?: number;
  /** Opacity of the grid (0-1) */
  opacity?: number;
  /** Whether to use fixed or absolute positioning */
  fixed?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Decorative grid pattern overlay used across pages
 * Creates a subtle technical/blueprint aesthetic
 */
export const GridOverlay = ({
  size = 60,
  opacity = 0.02,
  fixed = false,
  className = "",
}: GridOverlayProps) => {
  return (
    <div
      className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(rgba(0, 235, 23, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 235, 23, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
};
