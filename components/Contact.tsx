"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { profile } from "@/data/profile";

const LinkedInSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EnvelopeSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PlaneSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);

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

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const token = await executeRecaptcha("contact_form");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken: token }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-[#1a1a1a] py-24 px-6 border-t-2 border-[#2baa92]">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center mb-6"
        >
          <h2 className="text-4xl font-black text-white mb-4">Get In Touch</h2>
          <div className="w-12 h-[3px] bg-[#2baa92] rounded-full" />
          <p className="text-[#9ca3af] text-center mt-5 max-w-md font-medium leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left: contact info */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-[#2baa92]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#2baa92" }}
              >
                <EnvelopeSvg />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-semibold text-white hover:text-[#2baa92] transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-[#2baa92]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#2baa92" }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">Location</p>
                <p className="text-sm font-semibold text-white">{profile.location}</p>
              </div>
            </div>

            {/* LinkedIn */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-[#2baa92]/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#2baa92" }}
              >
                <LinkedInSvg />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">LinkedIn</p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-[#2baa92] transition-colors"
                >
                  Connect with me
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="card"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fieldVariants} className="flex flex-col gap-1 mb-4">
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col gap-1 mb-4">
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col gap-1 mb-4">
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col gap-1 mb-4">
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="textarea"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              {status === "success" && (
                <p className="text-[#2baa92] text-sm font-semibold mb-4">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm font-semibold mb-4">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.div variants={fieldVariants}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-neon w-full justify-center"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PlaneSvg />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
