interface EmailIconProps {
  className?: string;
}

export const EmailIcon = ({ className = "" }: EmailIconProps) => {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Envelope body */}
      <rect
        x="10"
        y="20"
        width="100"
        height="70"
        rx="8"
        fill="url(#envelopeGradient)"
        stroke="url(#strokeGradient)"
        strokeWidth="2"
      />

      {/* Envelope flap */}
      <path
        d="M10 28L60 58L110 28"
        stroke="url(#strokeGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="email-flap"
      />

      {/* Inner envelope opening */}
      <path
        d="M14 24L60 54L106 24"
        stroke="rgba(0, 235, 23, 0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Checkmark circle */}
      <circle
        cx="90"
        cy="25"
        r="18"
        fill="#0a1f0c"
        stroke="url(#checkGradient)"
        strokeWidth="2"
        className="check-circle"
      />

      {/* Checkmark */}
      <path
        d="M82 25L87 30L98 19"
        stroke="url(#checkGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="checkmark"
      />

      {/* Decorative dots */}
      <circle cx="25" cy="55" r="2" fill="rgba(0, 235, 23, 0.4)" />
      <circle cx="35" cy="65" r="1.5" fill="rgba(0, 235, 23, 0.3)" />
      <circle cx="95" cy="70" r="2" fill="rgba(0, 235, 23, 0.4)" />
      <circle cx="85" cy="80" r="1.5" fill="rgba(0, 235, 23, 0.3)" />

      {/* Gradients */}
      <defs>
        <linearGradient id="envelopeGradient" x1="10" y1="20" x2="110" y2="90">
          <stop offset="0%" stopColor="rgba(43, 65, 45, 0.6)" />
          <stop offset="100%" stopColor="rgba(10, 31, 12, 0.8)" />
        </linearGradient>

        <linearGradient id="strokeGradient" x1="10" y1="20" x2="110" y2="90">
          <stop offset="0%" stopColor="rgba(0, 235, 23, 0.5)" />
          <stop offset="100%" stopColor="rgba(32, 192, 48, 0.3)" />
        </linearGradient>

        <linearGradient id="checkGradient" x1="72" y1="7" x2="108" y2="43">
          <stop offset="0%" stopColor="#00eb17" />
          <stop offset="100%" stopColor="#20c030" />
        </linearGradient>
      </defs>
    </svg>
  );
};
