"use client";
import { motion } from "motion/react";

interface ApplyNowButtonProps {
  href?: string;
  className?: string;
}

export default function ApplyNowButton({ href = "#", className = "" }: ApplyNowButtonProps) {
  return (
    <motion.a
      href={href}
      className={`group w-full relative overflow-hidden rounded-xl font-semibold text-sm uppercase tracking-wide flex items-center justify-center gap-2 bg-[#E68A00] py-4 ${className}`}
      style={{ color: "#FFFFFF" }}
      whileHover={{ 
        backgroundColor: "#995C00",
      }}
      whileTap={{ 
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <span style={{ color: "#FFFFFF" }}>Apply Now</span>
      
      {/* Arrow - subtle slide on hover */}
      <motion.svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="#FFFFFF"
        strokeWidth={2} 
        viewBox="0 0 24 24"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </motion.svg>
    </motion.a>
  );
}
