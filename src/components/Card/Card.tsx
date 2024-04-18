import { useMemo, forwardRef, RefObject } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { InertiaOptions } from "framer-motion/types/gestures/drag/types";
import { ArrowsOutSimple } from "@phosphor-icons/react";
import { formatYear } from "../../utils";

import "./Card.css";
import { Project } from "../../data";

const dragTransition: InertiaOptions = { timeConstant: 50, power: 0.1 };

const Card = forwardRef<HTMLDivElement, Project>(
  (
    {
      id,
      title,
      description,
      year,
      color = "#000000",
      accent = "#FFD171",
      Icon = ArrowsOutSimple,
      content,
      ...rest
    },
    ref
  ) => {
    const variants: Variants = useMemo(() => {
      return {
        start: { bottom: "-50%", left: "50%", zIndex: 1 },
        end: {
          bottom: `${Math.floor(Math.random() * 40)}%`,
          left: `${Math.floor(Math.random() * 80)}%`,
          rotate: (Math.random() - 0.5) * 30,
          transition: { duration: 0.4, delay: Math.random() / 3 },
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
      };
    }, [color, accent]);

    return (
      <motion.div
        className="card"
        layout
        variants={variants}
        initial="start"
        animate="end"
        whileHover="hover"
        whileTap="dragging"
        drag
        dragConstraints={ref as RefObject<HTMLDivElement>}
        dragTransition={dragTransition}
        {...rest}
      >
        <Icon size={32} />
        <Link to={`${id}`}>
          <h2>{description}</h2>
        </Link>
        <p style={{ flex: 1 }}>{title}</p>
        <p>{formatYear(year)}</p>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
