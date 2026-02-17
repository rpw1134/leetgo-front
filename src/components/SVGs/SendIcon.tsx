/** Filled triangle send icon — points right like an email send button */
export const SendIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5 4l14 8-14 8V4z" />
  </svg>
);
