import React from "react";
import { motion } from "framer-motion";

import "./Header.css";
import {
  EnvelopeSimple,
  GitBranch,
  IconContext,
  LinkedinLogo,
} from "phosphor-react";
import { IconContextProps } from "phosphor-react/dist/lib";

const variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const iconStyle: IconContextProps = {
  size: 24,
  weight: "fill",
  color: "currentColor",
  mirrored: false,
  style: { marginRight: 8 },
};

const Header: React.FC<{}> = () => {
  return (
    <motion.header variants={variants} initial="start" animate="end">
      <h1 className="intro">
        <span className="highlight inverse">Tobias Fried</span> is a full-stack
        engineer and maker of digital tools and toys. He's currently at{" "}
        <span className="highlight inverse">
          <a href="https://qatalog.com" rel="noopener noreferrer">
            Qatalog
          </a>
        </span>
        .
      </h1>
      <IconContext.Provider value={iconStyle}>
        <div className="links">
          <a href="https://github.com/rektdeckard">
            <GitBranch /> GitHub
          </a>
          <a href="https://linkedin.com/in/tobiasfried">
            <LinkedinLogo /> LinkedIn
          </a>
          <a href="mailto:friedtm@gmail.com">
            <EnvelopeSimple /> Email
          </a>
        </div>
      </IconContext.Provider>
    </motion.header>
  );
};

export default Header;
