import { useLayoutEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion, Variants, Transition } from "framer-motion";
import {
  ArrowBendUpLeft,
  ArrowUpRight,
  SmileyXEyes,
} from "@phosphor-icons/react";
import { formatYear } from "../../utils";

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

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const anchor = document.querySelector(hash);
    if (!anchor) return;

    anchor.scrollIntoView({ block: "start" });
  }, [hash]);

  const project = projects?.find((p) => p.id === id!.toLowerCase());

  if (!project) return <Navigate to="/" />;

  const {
    title,
    description = "Sorry, that doesn't exist!",
    url,
    year,
    color = "#000000",
    accent = "#FFD171",
    content,
    theme,
  } = project;

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
        >
          <motion.div
            variants={variants}
            initial="start"
            animate="end"
            exit="start"
            transition={transition}
            className="overlay"
          />
          <div className="detail">
            <div
              className="panel left"
              style={{ color, backgroundColor: accent }}
            >
              <Link to="/" className="back-arrow" title="Go back">
                <ArrowBendUpLeft />
              </Link>
              <motion.div
                className="title-content"
                layoutId={`title-content-${id}`}
              >
                <div className="title">
                  <motion.div layoutId={`title-${id}`}>
                    <h1 className={theme}>{description}</h1>
                  </motion.div>
                  {title && (
                    <div style={{ flex: 1 }}>
                      <a href={url} className={`large-text link ${theme}`}>
                        {title} <ArrowUpRight size={24} />
                      </a>
                    </div>
                  )}
                  <motion.div animate>
                    <span className={`large-text ${theme}`}>{formatYear(year)}</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            <div className="panel">
              <div className="panel-content">{content ?? fallback}</div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Detail;
