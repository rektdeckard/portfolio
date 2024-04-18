import { motion } from "framer-motion";

import "./Header.css";
import {
  EnvelopeSimple,
  GitBranch,
  IconContext,
  LinkedinLogo,
  MastodonLogo,
  MediumLogo,
  ReadCvLogo,
  TwitterLogo,
  IconProps,
} from "@phosphor-icons/react";

const variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const iconStyle: IconProps = {
  size: 24,
  weight: "fill",
  color: "currentColor",
  mirrored: false,
  style: { marginRight: 8 },
};

const Header = () => {
  return (
    <motion.header variants={variants} initial="start" animate="end">
      <h1 className="intro">
        <span className="highlight inverse">Tobias Fried</span> is a full-stack
        engineer and maker of digital tools and toys.
        ½ of{" "}
        <span className="highlight inverse">
          <a href="https://phosphoricons.com" rel="noopener">
            Phosphor Icons
          </a>
        </span>
        . Formerly at{" "}
        <span className="highlight inverse">
          <a href="https://qatalog.com" rel="noopener">
            Qatalog
          </a>
        </span>
        . Open to work.
      </h1>
      <IconContext.Provider value={iconStyle}>
        <div className="links">
          <a href="https://github.com/rektdeckard">
            <GitBranch /> GitHub
          </a>
          <a href="https://twitter.com/friedtm">
            <TwitterLogo /> Twitter
          </a>
          <a href="https://hachyderm.io/@rektdeckard">
            <MastodonLogo />Mastodon
          </a>
          <a href="https://linkedin.com/in/tobiasfried">
            <LinkedinLogo /> LinkedIn
          </a>
          <a href="https://read.cv/tobiasfried">
            <ReadCvLogo /> Read.cv
          </a>
          <a href="https://medium.com/@friedtm">
            <MediumLogo /> Medium
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
