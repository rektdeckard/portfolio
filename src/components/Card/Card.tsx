import React, { useMemo, forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { InertiaOptions } from "framer-motion/types/gestures/drag/types";
import { ArrowsOutSimple } from "phosphor-react";

import "./Card.css";
import { Project } from "../../data";

const dragTransition: InertiaOptions = { timeConstant: 50, power: 0.1 };

const Card = forwardRef<HTMLDivElement, Project>(
  (
    {
      id,
      title,
      subtitle,
      year,
      color = "#000000",
      accent = "#FFD171",
      Icon = ArrowsOutSimple,
    },
    ref
  ) => {
    const variants: Variants = useMemo(
      () => ({
        start: { bottom: "-50%", left: "50%" },
        end: {
          bottom: `${Math.floor(Math.random() * 40)}%`,
          left: `${Math.floor(Math.random() * 80)}%`,
          transform: `rotate(${(Math.random() - 0.5) * 30}deg)`,
          transition: { duration: 0.5, delay: Math.random() / 2 },
        },
        hover: {
          color,
          backgroundColor: accent,
          zIndex: 2,
          transition: { duration: 0 },
        },
        dragging: {
          cursor: "grabbing",
          color,
          backgroundColor: accent,
          zIndex: 2,
          transition: { duration: 0.05 },
        },
      }),
      [color, accent]
    );

    return (
      <motion.div
        className="card"
        variants={variants}
        initial="start"
        animate="end"
        whileHover="hover"
        whileTap="dragging"
        drag
        dragConstraints={ref as React.RefObject<HTMLDivElement>}
        dragTransition={dragTransition}
      >
        <Icon size={32} />
        <Link to={`${id}`}>
          <h2>{title}</h2>
        </Link>
        <p style={{ flex: 1 }}>{subtitle}</p>
        <p>{year}</p>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;