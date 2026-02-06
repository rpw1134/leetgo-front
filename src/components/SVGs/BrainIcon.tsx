/** Small brain/AI icon for model selection */
export const BrainIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a4 4 0 0 1 4 4c0 .6-.1 1.2-.4 1.7A4 4 0 0 1 18 11.5c0 1-.4 2-1 2.8.5.8.8 1.7.8 2.7a4 4 0 0 1-5.8 3.6" />
    <path d="M12 2a4 4 0 0 0-4 4c0 .6.1 1.2.4 1.7A4 4 0 0 0 6 11.5c0 1 .4 2 1 2.8-.5.8-.8 1.7-.8 2.7a4 4 0 0 0 5.8 3.6" />
    <path d="M12 2v20" />
  </svg>
);
