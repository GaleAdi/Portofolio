"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = (index: number) => ({
  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: index * 0.15,
    },
  },
});

const dotVariants = (index: number) => ({
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.15 + 0.2,
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
});

export default function Experience() {
  return (
    <section id="experience" className="bg-[#f9fafb] py-24 px-6 border-t-2 border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl font-black bg-[#2baa92] px-4 py-1 rounded-md inline-block text-[#1a1a1a]">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#e5e7eb]" />

          {/* Mobile line */}
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-[2px] bg-[#e5e7eb]" />

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative mb-12 last:mb-0 flex items-start ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Desktop dot */}
              <div
                className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2"
                style={{ top: 24 }}
              >
                <motion.div
                  variants={dotVariants(index)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-4 h-4 rounded-full bg-[#2baa92] border-2 border-white shadow-[0_0_0_2px_#2baa92]"
                />
              </div>

              {/* Mobile dot */}
              <div
                className="md:hidden absolute left-[15px] -translate-x-1/2"
                style={{ top: 24 }}
              >
                <motion.div
                  variants={dotVariants(index)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-4 h-4 rounded-full bg-[#2baa92] border-2 border-white shadow-[0_0_0_2px_#2baa92]"
                />
              </div>

              {/* Card — illusiongap card style */}
              <motion.div
                variants={cardVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div
                  className="card-hover"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  {/* Company + period */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-black text-[#2baa92] text-base">{exp.company}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#1a1a1a] text-white">
                      {exp.period}
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">{exp.role}</h3>

                  {/* Description bullets */}
                  <ul className="flex flex-col gap-2">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[#374151] text-sm font-medium leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2baa92] flex-shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
