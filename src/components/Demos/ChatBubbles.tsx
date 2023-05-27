import { useMemo, useState, useEffect, ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import useIsInViewport from "use-is-in-viewport";

import "./ChatBubbles.css";

interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  from?: "me" | "you" | "us";
  index?: number;
}

const Bubble = ({
  from = "us",
  index = 0,
  children,
  className,
  style,
}: BubbleProps) => {
  const [isInViewport, targetRef] = useIsInViewport({ threshold: 50 });
  const [hasBecomeVisible, setHasBecomeVisible] = useState<boolean>(false);

  useEffect(() => {
    if (hasBecomeVisible || !isInViewport) return;
    if (isInViewport) setHasBecomeVisible(true);
  }, [hasBecomeVisible, isInViewport]);

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.1, delay: 0.25 },
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.1,
          delay: 0.25 * (index + 1),
          type: "spring",
          damping: 4,
          mass: 0.15,
          // stiffness: 200,
        },
      },
    }),
    [index]
  );

  return (
    <motion.div
      ref={targetRef}
      variants={variants}
      initial="hidden"
      exit="hidden"
      animate={hasBecomeVisible ? "visible" : "hidden"}
      className={`bubble ${from} ${className ?? ""}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface ChatBubbleProps {
  messages?: ReadonlyArray<BubbleProps & { content?: ReactNode }>;
}

const ChatBubbles = ({ messages = [] }: ChatBubbleProps) => {
  return (
    <div className="bubbles">
      {messages.map((message, i) => (
        <Bubble {...message} index={i} key={i}>
          {message.content}
        </Bubble>
      ))}
    </div>
  );
};

export default ChatBubbles;
