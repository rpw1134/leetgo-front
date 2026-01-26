interface BinaryTreeSVGProps {
  className?: string;
}

/**
 * Decorative binary tree SVG with animated nodes
 * Used as a visual element on the signup page
 */
export const BinaryTreeSVG = ({ className = "" }: BinaryTreeSVGProps) => {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter for nodes */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for edges */}
        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00eb17" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00eb17" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Tree edges with pulse animation */}
      <g className="tree-edges" stroke="url(#edgeGradient)" strokeWidth="2">
        {/* Level 1 to Level 2 */}
        <line x1="200" y1="60" x2="100" y2="140" className="tree-edge tree-edge-1" />
        <line x1="200" y1="60" x2="300" y2="140" className="tree-edge tree-edge-2" />

        {/* Level 2 to Level 3 */}
        <line x1="100" y1="140" x2="50" y2="240" className="tree-edge tree-edge-3" />
        <line x1="100" y1="140" x2="150" y2="240" className="tree-edge tree-edge-4" />
        <line x1="300" y1="140" x2="250" y2="240" className="tree-edge tree-edge-5" />
        <line x1="300" y1="140" x2="350" y2="240" className="tree-edge tree-edge-6" />

        {/* Level 3 to Level 4 */}
        <line x1="50" y1="240" x2="30" y2="340" className="tree-edge tree-edge-7" />
        <line x1="50" y1="240" x2="70" y2="340" className="tree-edge tree-edge-8" />
        <line x1="150" y1="240" x2="130" y2="340" className="tree-edge tree-edge-9" />
        <line x1="150" y1="240" x2="170" y2="340" className="tree-edge tree-edge-10" />
        <line x1="250" y1="240" x2="230" y2="340" className="tree-edge tree-edge-11" />
        <line x1="250" y1="240" x2="270" y2="340" className="tree-edge tree-edge-12" />
        <line x1="350" y1="240" x2="330" y2="340" className="tree-edge tree-edge-13" />
        <line x1="350" y1="240" x2="370" y2="340" className="tree-edge tree-edge-14" />
      </g>

      {/* Tree nodes - Root */}
      <g filter="url(#nodeGlow)">
        <circle
          cx="200"
          cy="60"
          r="18"
          fill="#00eb17"
          className="tree-node tree-node-root"
        />
      </g>

      {/* Level 2 nodes */}
      <circle
        cx="100"
        cy="140"
        r="14"
        fill="#20c030"
        className="tree-node tree-node-l2"
      />
      <circle
        cx="300"
        cy="140"
        r="14"
        fill="#20c030"
        className="tree-node tree-node-l2"
      />

      {/* Level 3 nodes */}
      <circle
        cx="50"
        cy="240"
        r="11"
        fill="#32963c"
        className="tree-node tree-node-l3"
      />
      <circle
        cx="150"
        cy="240"
        r="11"
        fill="#32963c"
        className="tree-node tree-node-l3"
      />
      <circle
        cx="250"
        cy="240"
        r="11"
        fill="#32963c"
        className="tree-node tree-node-l3"
      />
      <circle
        cx="350"
        cy="240"
        r="11"
        fill="#32963c"
        className="tree-node tree-node-l3"
      />

      {/* Level 4 nodes (leaves) */}
      <circle
        cx="30"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="70"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="130"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="170"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="230"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="270"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="330"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />
      <circle
        cx="370"
        cy="340"
        r="8"
        fill="#366b3b"
        className="tree-node tree-node-leaf"
      />

      {/* Node labels - values inside nodes */}
      <text
        x="200"
        y="65"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        1
      </text>
      <text
        x="100"
        y="144"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        2
      </text>
      <text
        x="300"
        y="144"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        3
      </text>
    </svg>
  );
};
