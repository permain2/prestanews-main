"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function AnimatedButton({
  href,
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
}: AnimatedButtonProps) {
  const baseStyles = "relative overflow-hidden font-bold uppercase tracking-wide flex items-center justify-center gap-2 rounded-lg transition-shadow";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#0066B2] to-[#004C8C] text-white shadow-lg",
    secondary: "bg-[#0D2C4B] text-white shadow-lg",
    outline: "border-2 border-[#0D2C4B] text-[#0D2C4B] hover:bg-[#0D2C4B] hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </>
  );

  const motionProps = {
    whileHover: { 
      scale: 1.02,
      y: -2,
      boxShadow: "0 10px 30px rgba(0, 102, 178, 0.3)",
    },
    whileTap: { 
      scale: 0.98,
      y: 0,
    },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}

