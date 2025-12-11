"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface MotionNavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function MotionNavLink({ href, children, className = "" }: MotionNavLinkProps) {
  return (
    <motion.a
      href={href}
      className={`relative text-sm font-bold uppercase tracking-wide text-[#0D2C4B] hover:text-[#3B82F6] transition-colors no-underline ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}










