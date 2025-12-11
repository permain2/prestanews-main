"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import AnimatedCreditCard from "./AnimatedCreditCard";
import ApplyNowButton from "./ApplyNowButton";

interface CreditCardReviewProps {
  card: {
    name: string;
    bestFor: string;
    annualFee: string;
    bonus: string;
    rating: number;
    pros: string[];
    cons: string[];
    description: string;
  };
  index: number;
}

export default function CreditCardReview({ card, index }: CreditCardReviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
        y: -5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Left Panel - Card Image & CTA */}
        <div className="bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
          <AnimatedCreditCard name={card.name} colorIndex={index} />
          
          <div className="w-full mt-6">
            <ApplyNowButton href="#" />
          </div>
          
          <motion.p 
            className="text-xs text-[#68727C] text-center mt-3"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          >
            On American Express's Website
          </motion.p>
        </div>

        {/* Right Panel - Card Details */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.span 
                className="inline-block bg-[#EBF5FF] text-[#0066B2] text-xs font-bold uppercase px-3 py-1 rounded-full mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {card.bestFor}
              </motion.span>
              <h2 className="font-sora text-xl md:text-2xl font-bold text-[#162433]">{card.name}</h2>
            </div>
            <motion.div 
              className="flex items-center gap-1 bg-[#F7F8FA] px-3 py-2 rounded-lg"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="font-bold text-[#162433]">{card.rating}</span>
            </motion.div>
          </div>
          
          <p className="text-[#68727C] mb-6">{card.description}</p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-[#F7F8FA] p-4 rounded-lg"
              whileHover={{ 
                backgroundColor: "#EBF5FF",
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-[#68727C] uppercase font-bold mb-1">Annual Fee</div>
              <div className="text-lg font-bold text-[#162433]">{card.annualFee}</div>
            </motion.div>
            <motion.div 
              className="bg-[#F7F8FA] p-4 rounded-lg"
              whileHover={{ 
                backgroundColor: "#DCFCE7",
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-[#68727C] uppercase font-bold mb-1">Welcome Bonus</div>
              <div className="text-lg font-bold text-[#162433]">{card.bonus}</div>
            </motion.div>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-[#162433] mb-2 flex items-center gap-2">
                <motion.svg 
                  className="w-4 h-4 text-green-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </motion.svg>
                Pros
              </h4>
              <ul className="text-sm text-[#68727C] space-y-1">
                {card.pros.map((pro, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    • {pro}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#162433] mb-2 flex items-center gap-2">
                <motion.svg 
                  className="w-4 h-4 text-red-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </motion.svg>
                Cons
              </h4>
              <ul className="text-sm text-[#68727C] space-y-1">
                {card.cons.map((con, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    • {con}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



