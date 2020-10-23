import React from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { darcula as style } from "react-syntax-highlighter/dist/esm/styles/prism";

const prismProps: SyntaxHighlighterProps = {
  style,
  customStyle: { fontSize: 12, borderRadius: 6, border: "none" },
  wrapLongLines: true,
  showLineNumbers: false,
};

interface SnippetProps {
  caption?: string;
  language?: string;
}

const Snippet: React.FC<SnippetProps> = ({
  caption,
  language = "typescript",
  children,
}) => {
  return (
    // <div style={{ display: "flex", alignContent: "stretch" }}>
    //   <div
    //     style={{
    //       width: 4,
    //       backgroundColor: accent,
    //       marginTop: 7,
    //       marginRight: 8,
    //     }}
    //   />
    <figure style={{ flex: 1 }}>
      <Prism {...prismProps} language={language}>
        {children}
      </Prism>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
    // </div>
  );
};

export default Snippet;
