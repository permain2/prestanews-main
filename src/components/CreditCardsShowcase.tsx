"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import CreditCardReview from "./CreditCardReview";
import AnimatedFilterButton from "./AnimatedFilterButton";

const creditCards = [
  {
    name: "American Express Platinum Card®",
    bestFor: "Premium Travel",
    annualFee: "$895",
    bonus: "80,000 Membership Rewards points",
    rating: 4.9,
    pros: ["5X points on flights & prepaid hotels", "Premium lounge access", "$200 airline fee credit", "$200 hotel credit"],
    cons: ["High annual fee", "Amex acceptance limitations"],
    description: "The premier travel rewards card with extensive lounge access, elite status, and premium travel benefits.",
    category: "travel"
  },
  {
    name: "The Business Platinum Card® from American Express",
    bestFor: "Business Travel",
    annualFee: "$895",
    bonus: "200,000 Membership Rewards points",
    rating: 4.8,
    pros: ["Massive welcome bonus", "5X on flights & hotels", "35% points rebate on Pay with Points", "Dell and Indeed credits"],
    cons: ["High annual fee", "Complex benefits structure"],
    description: "A premium business card packed with travel benefits and elevated earning rates for business spending.",
    category: "business"
  },
  {
    name: "American Express® Gold Card",
    bestFor: "Dining & Groceries",
    annualFee: "$325",
    bonus: "60,000 Membership Rewards points",
    rating: 4.9,
    pros: ["4X at restaurants worldwide", "4X at U.S. supermarkets", "$120 dining credit", "$120 Uber Cash"],
    cons: ["Annual fee increased", "Supermarket cap of $25K/year"],
    description: "The best card for foodies with unmatched earning on dining and groceries plus monthly credits.",
    category: "travel"
  },
  {
    name: "Blue Cash Preferred® Card from American Express",
    bestFor: "Cash Back on Groceries",
    annualFee: "$0 intro, then $95",
    bonus: "$350 statement credit",
    rating: 4.7,
    pros: ["6% at U.S. supermarkets (up to $6K)", "6% on streaming", "3% at U.S. gas stations", "3% on transit"],
    cons: ["$6K supermarket cap", "Annual fee after first year"],
    description: "Industry-leading 6% cash back at U.S. supermarkets makes this ideal for families.",
    category: "cashback"
  },
  {
    name: "The Blue Business® Plus Credit Card from American Express",
    bestFor: "No Annual Fee Business",
    annualFee: "$0",
    bonus: "15,000 Membership Rewards points",
    rating: 4.8,
    pros: ["2X points on all purchases (up to $50K)", "No annual fee", "Intro 0% APR", "Expense management tools"],
    cons: ["$50K cap on 2X earning", "Lower welcome bonus"],
    description: "The best no-annual-fee business card for earning flexible Membership Rewards points.",
    category: "business"
  },
];

const categories = [
  { id: "all", label: "All Cards" },
  { id: "travel", label: "Travel Cards" },
  { id: "cashback", label: "Cash Back" },
  { id: "business", label: "Business" },
];

export default function CreditCardsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredCards = activeCategory === "all" 
    ? creditCards 
    : creditCards.filter(card => card.category === activeCategory);

  return (
    <div>
      {/* Category Pills */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-16 z-40">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <motion.div 
            className="flex gap-4 overflow-x-auto pb-2"
            layout
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
                  activeCategory === cat.id 
                    ? "bg-[#0D2C4B] text-white" 
                    : "bg-gray-100 text-[#162433]"
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: activeCategory === cat.id 
                    ? "0 8px 20px rgba(13, 44, 75, 0.3)" 
                    : "0 8px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cards List */}
      <section className="py-12 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CreditCardReview card={card} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}



