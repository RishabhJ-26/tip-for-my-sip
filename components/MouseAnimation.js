"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MouseTrail = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { damping: 15, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 250 });

  useEffect(() => {
    const move = (e) => {
      // 🔧 Smaller offset so dot hugs the cursor
      mouseX.set(e.clientX - 16); // half of width
      mouseY.set(e.clientY - 16); // half of height
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed w-8 h-8 rounded-full bg-purple-400 mix-blend-difference z-[9999]"
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
};

export default MouseTrail;
