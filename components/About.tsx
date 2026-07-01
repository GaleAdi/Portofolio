"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import HyperText from "@/components/HyperText";

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const stats = [
  { label: "Projects Built", value: 10 },
  { label: "Technologies", value: 8 },
  { label: "Cups of Coffee", value: 999 },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.15 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export default function About() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = document.querySelector("#about");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const counted = stats.map((s) => useCountUp(s.value, 1500, statsVisible));

  return (
    <section id="about" className="bg-[#f9fafb] py-24 px-6 border-t-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section title — illusiongap badge style */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl font-black bg-[#2baa92] px-4 py-1 rounded-md inline-block text-[#1a1a1a]">
            About
          </h2>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: photo + stats */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Photo — card style with offset shadow */}
            <div
              className="relative"
              style={{
                width: "100%",
                maxWidth: 300,
                aspectRatio: "3 / 4",
                borderRadius: "2rem",
                border: "1px solid #1a1a1a",
                boxShadow: "6px 6px 0 #1a1a1a",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/about-photo.jpg"
                alt={`${profile.name} — about photo`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 300px, 360px"
              />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-black text-[#2baa92]">{counted[i]}+</span>
                  <span className="text-sm font-medium text-[#6b7280] text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio + skills */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-black text-[#1a1a1a] leading-tight">Who I Am</h3>

            <div className="flex flex-col gap-4">
              {profile.bio.map((paragraph, i) => (
                <HyperText
                  key={i}
                  text={paragraph}
                  highlightWords={["Cybersecurity", "technology", "security", "passion", "curious"]}
                  className="text-[#374151] font-medium leading-relaxed"
                  framerProps={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.4 } },
                  }}
                />
              ))}
            </div>

            {/* Location & email */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <MapPin size={16} className="text-[#2baa92]" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <Mail size={16} className="text-[#2baa92]" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-[#2baa92] transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xl font-bold text-[#1a1a1a] mb-4">My Skills</h4>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {profile.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={skillVariants}
                    className="px-3 py-1.5 border border-[#1a1a1a] text-[#1a1a1a] rounded-lg text-sm font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Download resume */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon self-start mt-2"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
