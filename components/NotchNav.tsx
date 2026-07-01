"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { value: "about", label: "About" },
  { value: "projects", label: "Projects" },
  { value: "experience", label: "Experience" },
  { value: "contact", label: "Contact" },
];

interface NotchNavProps {
  items?: Array<{ value: string; label: string }>;
  defaultValue?: string;
  ariaLabel?: string;
}

export default function NotchNav({
  items = navItems,
  defaultValue = "about",
  ariaLabel = "Site navigation",
}: NotchNavProps) {
  const [active, setActive] = useState(defaultValue);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateIndicator = () => {
    const activeBtn = itemRefs.current.get(active);
    const nav = navRef.current;
    if (activeBtn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  const handleSelect = (value: string) => {
    setActive(value);
    const href = `#${value}`;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    const sections = items.map((item) => document.querySelector(`#${item.value}`));
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      if (!section) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const id = section.id;
            if (id !== active) {
              setActive(id);
            }
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(section);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [items, active]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={clsx(
            "bg-white transition-shadow duration-300",
            scrolled && "shadow-sm"
          )}
          style={{ borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Mobile hamburger — left side */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-[#1a1a1a] p-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Centered NotchNav */}
              <nav
                ref={navRef}
                aria-label={ariaLabel}
                className="relative flex items-center gap-1 rounded-full px-2 py-1 mx-auto"
                style={{
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                }}
              >
                <motion.div
                  className="absolute h-[calc(100%-8px)] top-1 rounded-full"
                  animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  style={{ background: "#1a1a1a" }}
                />

                {items.map((item) => (
                  <button
                    key={item.value}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.value, el);
                    }}
                    onClick={() => handleSelect(item.value)}
                    aria-current={active === item.value ? "page" : undefined}
                    className={clsx(
                      "relative z-10 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200",
                      active === item.value ? "text-white" : "text-[#374151] hover:text-[#1a1a1a]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Spacer to balance hamburger on mobile */}
              <div className="md:hidden w-6" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-white shadow-lg md:hidden"
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
              {items.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  className={clsx(
                    "block w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                    active === item.value
                      ? "bg-[#1a1a1a] text-white"
                      : "text-[#374151] hover:bg-[#f3f4f6] hover:text-[#1a1a1a]"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
