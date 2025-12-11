"use client";
import { motion } from "motion/react";

interface AnimatedFilterButtonProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function AnimatedFilterButton({ 
  href, 
  children, 
  isActive = false 
}: AnimatedFilterButtonProps) {
  return (
    <motion.a
      href={href}
      className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
        isActive 
          ? "bg-[#0D2C4B] text-white" 
          : "bg-gray-100 text-[#162433] hover:bg-gray-200"
      }`}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        boxShadow: isActive 
          ? "0 8px 20px rgba(13, 44, 75, 0.3)" 
          : "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      layout
    >
      {children}
    </motion.a>
  );
}







