import React from "react";
import { LinkSimple } from "phosphor-react";
import "./Heading.css";

interface HeadingProps {
  id: string;
}

const Heading: React.FC<HeadingProps> = ({ id, children }) => (
  <h2 id={id}>
    {children}
    <a href={`#${id}`} aria-label={`Direct link to ${id}`}>
      <LinkSimple className="anchor-link" />
    </a>
  </h2>
);

export default Heading;
