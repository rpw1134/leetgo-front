interface NodeGraphProps {
  className?: string;
}

export const NodeGraph: React.FC<NodeGraphProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Edges */}
      <line x1="150" y1="50" x2="80" y2="120" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="150" y1="50" x2="220" y2="120" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="80" y1="120" x2="50" y2="200" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="80" y1="120" x2="120" y2="200" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="220" y1="120" x2="180" y2="200" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="220" y1="120" x2="250" y2="200" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="120" y1="200" x2="150" y2="270" stroke="currentColor" strokeWidth="2" className="edge" />
      <line x1="180" y1="200" x2="150" y2="270" stroke="currentColor" strokeWidth="2" className="edge" />

      {/* Nodes */}
      <circle cx="150" cy="50" r="16" fill="currentColor" className="graph-node" />
      <circle cx="80" cy="120" r="14" fill="currentColor" className="graph-node" />
      <circle cx="220" cy="120" r="14" fill="currentColor" className="graph-node" />
      <circle cx="50" cy="200" r="12" fill="currentColor" className="graph-node" />
      <circle cx="120" cy="200" r="12" fill="currentColor" className="graph-node" />
      <circle cx="180" cy="200" r="12" fill="currentColor" className="graph-node" />
      <circle cx="250" cy="200" r="12" fill="currentColor" className="graph-node" />
      <circle cx="150" cy="270" r="14" fill="currentColor" className="graph-node" />
    </svg>
  );
};
