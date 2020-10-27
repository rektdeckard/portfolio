import React from "react";
import "./Callout.css";

interface CalloutProps {
  accent?: string;
}

const Callout: React.FC<CalloutProps> = ({ accent = "black", children }) => {
  return (
    <blockquote className="callout">
      <div className="callout-bar" style={{ backgroundColor: accent }} />
      <div className="callout-content">{children}</div>
    </blockquote>
  );
};

export default Callout;
