import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const SlightFlip = ({
  word,
  duration = 1,
  delayMultiple = 0.2,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}) => {
  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={clsx("origin-center drop-shadow-sm", className)}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SlightFlip;
