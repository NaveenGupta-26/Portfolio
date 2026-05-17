import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const StackedCard = ({ children, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Depth scaling (core SOHub effect)
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.85 - index * 0.05]
  );

  // Slide in effect
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  // Slight fade
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        y,
        opacity,
        zIndex: 100 - index,
      }}
      className="sticky top-24 h-screen flex items-center justify-center"
    >
      <div className="w-[75%] rounded-[40px] bg-neutral-900 p-10 border border-neutral-800 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

export default StackedCard;