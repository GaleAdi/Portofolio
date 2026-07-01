"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { profile } from "@/data/profile";

const InstagramSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const leftVariants: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const rightVariants: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.15 },
  },
};

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const currentTagline = profile.taglines[taglineIndex];

    intervalRef.current = setInterval(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTagline.length) {
          setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
        } else {
          clearInterval(intervalRef.current!);
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % profile.taglines.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [displayedText, isDeleting, taglineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left column — text */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-5 text-center lg:text-left animate-fade-up"
        >
          <h1
            className="text-[#1a1a1a] font-black leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <span className="block">{profile.nameLines[0]}</span>
            <span className="block text-[#2baa92]">{profile.nameLines[1]}</span>
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-1 text-xl font-semibold text-[#374151] min-h-[2rem]">
            <span>{displayedText}</span>
            <span
              className="w-0.5 h-6 bg-[#2baa92]"
              style={{ opacity: showCursor ? 1 : 0 }}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start animate-fade-up delay-100">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline"
            >
              Get In Touch
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-up delay-200">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#374151] hover:text-[#1a1a1a] transition-colors p-1"
              aria-label="GitHub"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#374151] hover:text-[#1a1a1a] transition-colors p-1"
              aria-label="Instagram"
            >
              <InstagramSvg />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#374151] hover:text-[#1a1a1a] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <LinkedInLogoIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right column — profile photo */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center lg:justify-end relative animate-fade-in delay-300"
        >
          {/* Teal glow blob */}
          <div
            className="absolute pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(43,170,146,0.12) 0%, transparent 70%)",
              width: 480,
              height: 480,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Photo with offset shadow — illusiongap style */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative"
            style={{
              width: "100%",
              maxWidth: 360,
              borderRadius: "2rem",
              border: "1px solid #1a1a1a",
              boxShadow: "8px 8px 0 #1a1a1a",
            }}
          >
            <Image
              src="/images/profile.jpg"
              alt={`${profile.name} profile photo`}
              width={360}
              height={450}
              className="w-full h-auto object-contain rounded-[2rem]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6b7280] z-10"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
