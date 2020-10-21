import React from "react";
import { motion } from "framer-motion";

import "./Header.css";

const variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const Header: React.FC<{}> = () => {
  return (
    <motion.header variants={variants} initial="start" animate="end">
      <h1>
        <span className="highlight">Tobias Fried</span> is a full-stack engineer
        looking for a new opportunity <span className="highlight"> </span>
      </h1>
      <div className="links">
        <a href="https://github.com/rektdeckard">GitHub</a>
        <a href="https://linkedin.com/in/tobiasfried">LinkedIn</a>
        <a href="mailto:friedtm@gmail.com">Email</a>
      </div>
    </motion.header>
  );
};

export default Header;
