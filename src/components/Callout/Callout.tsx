import { ReactNode } from "react";
import "./Callout.css";

interface CalloutProps {
  accent?: string;
  children?: ReactNode;
}

const Callout = ({ accent = "black", children }: CalloutProps) => {
  return (
    <blockquote className="callout">
      <div className="callout-bar" style={{ backgroundColor: accent }} />
      <div className="callout-content">{children}</div>
    </blockquote>
  );
};

export default Callout;
