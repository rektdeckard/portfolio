import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, Variants, AnimatePresence, Transition } from "framer-motion";
import { ArrowBendUpLeft, ArrowUpRight } from "phosphor-react";

import { projects } from "../../data";
import "./Detail.css";
import Copyright from "../Copyright/Copyright";

const variants: Variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.15 } },
};

const transition: Transition = { duration: 0.2, delay: 0.15 };

interface DetailProps {}

const Detail: React.FC<DetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    title = "Sorry, that doesn't exist!",
    subtitle,
    url,
    year,
    color = "#000000",
    accent = "#FFD171",
    content,
  } = projects.find((p) => p.id === id.toLowerCase()) || {};

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          key={id}
          variants={variants}
          initial="start"
          animate="end"
          exit="start"
          transition={transition}
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            variants={variants}
            initial="start"
            animate="end"
            exit="start"
            transition={transition}
            style={{ pointerEvents: "auto" }}
            className="overlay"
          />
          <div className="detail">
            <div
              className="card-content-container open"
              style={{ color, backgroundColor: accent, flex: 1 }}
            >
              <motion.div
                className="card-content"
                layoutId={`card-container-${id}`}
              >
                <Link to="/" style={{ color: "inherit" }}>
                  <ArrowBendUpLeft size={64} />
                </Link>
                <motion.div
                  className="title-container"
                  layoutId={`title-container-${id}`}
                >
                  <h1>{title}</h1>
                </motion.div>
                <motion.div className="content-container" animate>
                  <a href={url} className="large-text link">
                    {subtitle} <ArrowUpRight size={32} />
                  </a>
                </motion.div>
                <motion.div animate>
                  <span className="large-text">{year}</span>
                </motion.div>
              </motion.div>
            </div>
            <div className="card-content-container">
              <h1>{subtitle}</h1>
              {content}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Detail;
