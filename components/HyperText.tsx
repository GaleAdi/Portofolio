"use client";

import { useState, useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";

interface HyperTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  duration?: number;
  framerProps?: {
    hidden: Variants["hidden"];
    visible: Variants["visible"];
  };
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function DecryptChar({ char, isHighlighted, duration = 400 }: {
  char: string;
  isHighlighted: boolean;
  duration?: number;
}) {
  const [displayed, setDisplayed] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);
  const frameRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  const animate = useCallback(() => {
    if (!hoverRef.current) return;
    let step = 0;
    const totalSteps = Math.floor(duration / 20);

    const next = () => {
      if (!hoverRef.current) return;
      if (step < totalSteps) {
        const scrambled = char.split("").map((c, i) => {
          if (c === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });
        setDisplayed(scrambled.join(""));
        step++;
        frameRef.current = requestAnimationFrame(next);
      } else {
        setDisplayed(char);
        setIsGlitching(false);
      }
    };
    next();
  }, [char, duration]);

  const handleMouseEnter = () => {
    hoverRef.current = true;
    setIsGlitching(true);
    frameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplayed(char);
    setIsGlitching(false);
  };

  if (!isHighlighted) {
    return <span>{char}</span>;
  }

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
      style={{ display: "inline-block" }}
      animate={
        isGlitching
          ? {
              color: "#2baa92",
              textShadow: [
                "0 0 8px rgba(43,170,146,0.4)",
                "0 0 16px rgba(43,170,146,0.6)",
                "0 0 8px rgba(43,170,146,0.4)",
              ],
            }
          : {
              color: "#2baa92",
              textShadow: "0 0 10px rgba(43,170,146,0.3)",
            }
      }
      transition={{ duration: 0.15 }}
    >
      {displayed}
    </motion.span>
  );
}

export default function HyperText({
  text,
  highlightWords = [],
  className = "",
  duration = 400,
  framerProps = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
}: HyperTextProps) {
  const words = text.split(" ");

  const highlightSet = new Set(
    highlightWords.map((w) => w.toLowerCase())
  );

  return (
    <motion.p
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: framerProps.hidden,
        visible: {
          ...framerProps.visible,
          transition: { staggerChildren: 0.02 },
        },
      }}
    >
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[.,!?;:'"]/g, "");
        const isHighlighted = highlightSet.has(clean);
        const trailingPunct = word.match(/[.,!?;:'"]+$/)?.[0] ?? "";

        return (
          <motion.span
            key={i}
            variants={{
              hidden: framerProps.hidden,
              visible: framerProps.visible,
            }}
            className="mr-[0.3em] inline-block"
          >
            {word.split("").map((char, j) => (
              <DecryptChar
                key={j}
                char={char}
                isHighlighted={isHighlighted}
                duration={duration}
              />
            ))}
            {trailingPunct && <span>{trailingPunct}</span>}
          </motion.span>
        );
      })}
    </motion.p>
  );
}
