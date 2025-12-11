"use client";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

interface AnimatedCreditCardProps {
  name: string;
  colorIndex: number;
}

export default function AnimatedCreditCard({ name, colorIndex }: AnimatedCreditCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const gradients = [
    "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
    "linear-gradient(135deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%)",
    "linear-gradient(135deg, #0077C0 0%, #00A3E0 50%, #0077C0 100%)",
  ];

  return (
    <motion.div
      className="w-64 h-40 rounded-xl shadow-xl relative overflow-hidden cursor-pointer"
      style={{
        background: gradients[colorIndex % 3],
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card chip */}
      <motion.div 
        className="absolute top-6 left-6 w-10 h-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500"
        animate={isHovered ? { 
          boxShadow: "0 0 15px rgba(250, 204, 21, 0.5)" 
        } : {}}
      />
      
      {/* AMEX logo */}
      <div className="absolute top-4 right-4">
        <div className="text-white font-bold text-lg tracking-tight opacity-90">AMEX</div>
      </div>
      
      {/* Card name */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-white text-xs font-medium opacity-80 leading-tight">{name}</div>
      </div>
      
      {/* Holographic strip effect */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
        animate={isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={isHovered ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}










