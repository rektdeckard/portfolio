import { ReactNode } from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { tomorrow as style } from "react-syntax-highlighter/dist/esm/styles/prism";

const prismProps: SyntaxHighlighterProps = {
  style,
  customStyle: { fontSize: 14, borderRadius: 6, border: "none" },
  wrapLongLines: true,
  showLineNumbers: false,
};

interface SnippetProps {
  caption?: string;
  language?: string;
  children?: ReactNode;
}

const Snippet: React.FC<SnippetProps> = ({
  caption,
  language = "typescript",
  children,
}) => {
  return (
    <figure>
      {/* @ts-ignore */}
      <Prism {...prismProps} language={language}>
        {children}
      </Prism>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default Snippet;
