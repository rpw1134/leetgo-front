interface GraphSVGProps {
  className?: string;
}

/**
 * Decorative graph SVG with animated nodes and edges
 * Irregular connected graph structure
 */
export const GraphSVG = ({ className = "" }: GraphSVGProps) => {
  return (
    <svg
      viewBox="0 0 350 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter */}
        <filter id="graphNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for edges */}
        <linearGradient id="graphEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00eb17" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00eb17" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Graph edges - irregular connections */}
      <g className="graph-edges" stroke="url(#graphEdgeGradient)" strokeWidth="2">
        {/* Central hub connections */}
        <line x1="175" y1="200" x2="80" y2="100" className="graph-edge graph-edge-1" />
        <line x1="175" y1="200" x2="270" y2="80" className="graph-edge graph-edge-2" />
        <line x1="175" y1="200" x2="60" y2="280" className="graph-edge graph-edge-3" />
        <line x1="175" y1="200" x2="290" y2="250" className="graph-edge graph-edge-4" />
        <line x1="175" y1="200" x2="175" y2="350" className="graph-edge graph-edge-5" />

        {/* Cross connections - creates the graph feel */}
        <line x1="80" y1="100" x2="270" y2="80" className="graph-edge graph-edge-6" />
        <line x1="270" y1="80" x2="290" y2="250" className="graph-edge graph-edge-7" />
        <line x1="60" y1="280" x2="175" y2="350" className="graph-edge graph-edge-8" />
        <line x1="175" y1="350" x2="290" y2="250" className="graph-edge graph-edge-9" />

        {/* Outer node connections */}
        <line x1="80" y1="100" x2="30" y2="180" className="graph-edge graph-edge-10" />
        <line x1="30" y1="180" x2="60" y2="280" className="graph-edge graph-edge-11" />
        <line x1="270" y1="80" x2="320" y2="150" className="graph-edge graph-edge-12" />
        <line x1="320" y1="150" x2="290" y2="250" className="graph-edge graph-edge-13" />
      </g>

      {/* Graph nodes */}
      {/* Central node - largest */}
      <g filter="url(#graphNodeGlow)">
        <circle
          cx="175"
          cy="200"
          r="22"
          fill="#00eb17"
          className="graph-node graph-node-center"
        />
        <text
          x="175"
          y="206"
          textAnchor="middle"
          fill="#0a1f0c"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="bold"
        >
          A
        </text>
      </g>

      {/* Primary ring nodes */}
      <circle
        cx="80"
        cy="100"
        r="16"
        fill="#20c030"
        className="graph-node graph-node-primary"
      />
      <text
        x="80"
        y="105"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        B
      </text>

      <circle
        cx="270"
        cy="80"
        r="16"
        fill="#20c030"
        className="graph-node graph-node-primary"
      />
      <text
        x="270"
        y="85"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        C
      </text>

      <circle
        cx="60"
        cy="280"
        r="16"
        fill="#20c030"
        className="graph-node graph-node-primary"
      />
      <text
        x="60"
        y="285"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        D
      </text>

      <circle
        cx="290"
        cy="250"
        r="16"
        fill="#20c030"
        className="graph-node graph-node-primary"
      />
      <text
        x="290"
        y="255"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        E
      </text>

      <circle
        cx="175"
        cy="350"
        r="16"
        fill="#20c030"
        className="graph-node graph-node-primary"
      />
      <text
        x="175"
        y="355"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        F
      </text>

      {/* Secondary ring nodes - smaller */}
      <circle
        cx="30"
        cy="180"
        r="12"
        fill="#32963c"
        className="graph-node graph-node-secondary"
      />
      <text
        x="30"
        y="184"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        G
      </text>

      <circle
        cx="320"
        cy="150"
        r="12"
        fill="#32963c"
        className="graph-node graph-node-secondary"
      />
      <text
        x="320"
        y="154"
        textAnchor="middle"
        fill="#0a1f0c"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        H
      </text>
    </svg>
  );
};
