import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, Variants, Transition } from "framer-motion";
import { ArrowBendUpLeft, ArrowUpRight, SmileyXEyes } from "phosphor-react";

import { projects } from "../../data";
import "./Detail.css";

const variants: Variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.2 } },
};

const transition: Transition = { duration: 0.2, delay: 0.15 };

const fallback = (
  <div className="error-container simple">
    <SmileyXEyes size={128} weight="duotone" />
    <p>
      Oops, how'd you end up here?
      <br />
      The Princess is in another castle.
    </p>
  </div>
);

interface DetailProps {}

const Detail: React.FC<DetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    title,
    description = "Sorry, that doesn't exist!",
    url,
    year,
    color = "#000000",
    accent = "#FFD171",
    content,
    theme,
  } = projects.find((p) => p.id === id.toLowerCase()) || {};

  return (
    <>
      {id && (
        <motion.div
          key={id}
          variants={variants}
          initial="start"
          animate="end"
          exit="start"
          transition={transition}
          // style={{ pointerEvents: "auto" }}
        >
          <motion.div
            variants={variants}
            initial="start"
            animate="end"
            exit="start"
            transition={transition}
            // style={{ pointerEvents: "auto" }}
            className="overlay"
          />
          <div className="detail">
            <div
              className="panel left"
              style={{ color, backgroundColor: accent }}
            >
              <motion.div
                className="panel-content"
                layoutId={`panel-content-${id}`}
              >
                <Link to="/" style={{ color: "inherit" }} title="Go back">
                  <ArrowBendUpLeft size={64} />
                </Link>
                <motion.div className="title" layoutId={`title-${id}`}>
                  <h1 className={theme}>{description}</h1>
                </motion.div>
                {title && (
                  <motion.div className="content-container" animate>
                    <a href={url} className={`large-text link ${theme}`}>
                      {title} <ArrowUpRight size={32} />
                    </a>
                  </motion.div>
                )}
                <motion.div animate>
                  <span className={`large-text ${theme}`}>{year}</span>
                </motion.div>
              </motion.div>
            </div>
            <div className="panel">{content ?? fallback}</div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Detail;
