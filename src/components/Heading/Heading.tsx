import { ReactNode } from "react";
import { LinkSimple } from "@phosphor-icons/react";
import "./Heading.css";

interface HeadingProps {
  id: string;
  children?: ReactNode;
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
