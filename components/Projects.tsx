"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { CodeIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { projects } from "@/data/projects";

const GitHubSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const FILTERS = ["All", "Web", "Other"] as const;
type Filter = (typeof FILTERS)[number];

const CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  Web: [
    "PHP", "Laragon", "Tailwind CSS",
    "React", "Node.js", "TypeScript", "Typescript", "Python", "FastAPI", "Railway",
    "Next.js",
  ],
  Other: [
    "Cyber Security", "Cybersecurity", "Prisma",
    "Kali Linux", "BurpSuite",
    "CTF", "Forensics", "Network Analysis",
  ],
};

function getAccentHex(tags: string[]): string {
  const hasSecurity = tags.some(
    (t) =>
      ["Cyber Security", "Cybersecurity", "CTF", "Forensics", "Network Analysis", "Kali Linux", "BurpSuite"].includes(t) ||
      t.toLowerCase().includes("security")
  );
  return hasSecurity ? "#2baa92" : "#3b82f6";
}

function getCategoryIcon(tags: string[]) {
  const hasSecurity = tags.some(
    (t) =>
      ["Cyber Security", "Cybersecurity", "CTF", "Forensics", "Network Analysis", "Kali Linux", "BurpSuite"].includes(t) ||
      t.toLowerCase().includes("security")
  );
  return hasSecurity ? <LockClosedIcon className="w-5 h-5" /> : <CodeIcon className="w-5 h-5" />;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [imageError, setImageError] = useState(false);
  const accentHex = getAccentHex(project.tags);
  const hasImage = project.hasImage !== false;

  if (hasImage) {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="card-hover"
      >
        {/* Accent bar */}
        <div
          className="h-1 w-full rounded-full mb-6"
          style={{ background: `linear-gradient(to right, ${accentHex}, ${accentHex}60)` }}
        />

        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4"
          style={{ borderRadius: "1rem", border: "1px solid #e5e7eb" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            style={imageError ? { display: "none" } : {}}
          />
          {imageError && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)" }}
            >
              <span
                className="text-[#1a1a1a] font-black text-lg px-3 text-center leading-snug"
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{project.title}</h3>
        <p className="text-[#6b7280] font-medium text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-0.5 border border-[#e5e7eb] text-[#374151] rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <ProjectButtons project={project} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-hover"
    >
      {/* Accent bar */}
      <div
        className="h-1 w-full rounded-full mb-6"
        style={{ background: `linear-gradient(to right, ${accentHex}, ${accentHex}60)` }}
      />

      {/* Gradient placeholder */}
      <div
        className="relative w-full aspect-video overflow-hidden flex items-center justify-center mb-4"
        style={{
          background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
          borderRadius: "1rem",
          border: "1px solid #e5e7eb",
        }}
      >
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-[#1a1a1a]"
          style={{ background: "#2baa92" }}>
          {getCategoryIcon(project.tags)}
        </div>
        <span className="text-[#1a1a1a] font-black text-lg px-3 text-center leading-snug">
          {project.title}
        </span>
      </div>

      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{project.title}</h3>
      <p className="text-[#6b7280] font-medium text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-2.5 py-0.5 border border-[#e5e7eb] text-[#374151] rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <ProjectButtons project={project} />
    </motion.div>
  );
}

function ProjectButtons({ project }: { project: (typeof projects)[number] }) {
  const buttons: { href: string; label: string; icon: React.ReactNode; primary: boolean }[] = [];
  if (project.liveUrl)
    buttons.push({ href: project.liveUrl, label: "Live Demo", icon: <ExternalLink size={14} />, primary: true });
  if (project.githubUrl)
    buttons.push({ href: project.githubUrl, label: "GitHub", icon: <GitHubSvg />, primary: false });
  if (project.writeupUrl)
    buttons.push({ href: project.writeupUrl, label: "Read Write-up", icon: <FileText size={14} />, primary: false });
  if (buttons.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${buttons.length === 1 ? "justify-center" : ""}`}>
      {buttons.map((btn) =>
        btn.primary ? (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all"
          >
            {btn.icon}
            {btn.label}
          </a>
        ) : (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-[#374151] border border-[#e5e7eb] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all"
          >
            {btn.icon}
            {btn.label}
          </a>
        )
      )}
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          p.tags.some((tag) => CATEGORY_MAP[activeFilter]?.includes(tag))
        );

  return (
    <section id="projects" className="bg-white py-24 px-6 border-t-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-4xl font-black bg-[#2baa92] px-4 py-1 rounded-md inline-block text-[#1a1a1a]">
            Projects
          </h2>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeFilter === filter
                  ? "bg-[#1a1a1a] text-white"
                  : "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.length === 0 ? (
              <p className="col-span-full text-center text-[#6b7280] font-medium py-12">
                No projects in this category yet.
              </p>
            ) : (
              filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
