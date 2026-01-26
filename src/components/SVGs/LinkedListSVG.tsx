interface LinkedListSVGProps {
  className?: string;
}

/**
 * Decorative linked list SVG with animated nodes
 * Horizontal chain of connected nodes
 */
export const LinkedListSVG = ({ className = "" }: LinkedListSVGProps) => {
  return (
    <svg
      viewBox="0 0 500 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter */}
        <filter id="listNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Arrow marker */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#00eb17" fillOpacity="0.6" />
        </marker>
      </defs>

      {/* Connection arrows */}
      <g className="list-connections">
        <line
          x1="70"
          y1="60"
          x2="115"
          y2="60"
          stroke="#00eb17"
          strokeOpacity="0.5"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="list-arrow list-arrow-1"
        />
        <line
          x1="170"
          y1="60"
          x2="215"
          y2="60"
          stroke="#00eb17"
          strokeOpacity="0.5"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="list-arrow list-arrow-2"
        />
        <line
          x1="270"
          y1="60"
          x2="315"
          y2="60"
          stroke="#00eb17"
          strokeOpacity="0.5"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="list-arrow list-arrow-3"
        />
        <line
          x1="370"
          y1="60"
          x2="415"
          y2="60"
          stroke="#00eb17"
          strokeOpacity="0.5"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="list-arrow list-arrow-4"
        />
      </g>

      {/* Node boxes */}
      <g filter="url(#listNodeGlow)">
        {/* Head node */}
        <rect
          x="20"
          y="35"
          width="50"
          height="50"
          rx="8"
          fill="#00eb17"
          className="list-node list-node-head"
        />
        <text
          x="45"
          y="65"
          textAnchor="middle"
          fill="#0a1f0c"
          fontSize="16"
          fontFamily="monospace"
          fontWeight="bold"
        >
          1
        </text>
      </g>

      {/* Node 2 */}
      <rect
        x="120"
        y="35"
        width="50"
        height="50"
        rx="8"
        fill="#20c030"
        className="list-node list-node-2"
      />
      <text
        x="145"
        y="65"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="16"
        fontFamily="monospace"
        fontWeight="bold"
      >
        2
      </text>

      {/* Node 3 */}
      <rect
        x="220"
        y="35"
        width="50"
        height="50"
        rx="8"
        fill="#32963c"
        className="list-node list-node-3"
      />
      <text
        x="245"
        y="65"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="16"
        fontFamily="monospace"
        fontWeight="bold"
      >
        3
      </text>

      {/* Node 4 */}
      <rect
        x="320"
        y="35"
        width="50"
        height="50"
        rx="8"
        fill="#366b3b"
        className="list-node list-node-4"
      />
      <text
        x="345"
        y="65"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontFamily="monospace"
        fontWeight="bold"
      >
        4
      </text>

      {/* Null terminator */}
      <rect
        x="420"
        y="45"
        width="40"
        height="30"
        rx="4"
        fill="none"
        stroke="#366b3b"
        strokeWidth="2"
        strokeDasharray="4 2"
        className="list-null"
      />
      <text
        x="440"
        y="65"
        textAnchor="middle"
        fill="#366b3b"
        fontSize="11"
        fontFamily="monospace"
      >
        null
      </text>

      {/* "head" label */}
      <text
        x="45"
        y="20"
        textAnchor="middle"
        fill="#00eb17"
        fillOpacity="0.7"
        fontSize="10"
        fontFamily="monospace"
      >
        head
      </text>
    </svg>
  );
};
