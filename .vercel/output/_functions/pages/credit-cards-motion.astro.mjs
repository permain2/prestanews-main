import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMotionValue, useTransform, motion, useInView, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { g as getCardImage } from '../chunks/cardImageMap__yuvtrme.mjs';
export { renderers } from '../renderers.mjs';

function AnimatedCreditCard({ name, colorIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const handleMouseMove = (e) => {
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
    "linear-gradient(135deg, #0077C0 0%, #00A3E0 50%, #0077C0 100%)"
  ];
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "w-64 h-40 rounded-xl shadow-xl relative overflow-hidden cursor-pointer",
      style: {
        background: gradients[colorIndex % 3],
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      },
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      whileHover: { scale: 1.05 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-6 left-6 w-10 h-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500",
            animate: isHovered ? {
              boxShadow: "0 0 15px rgba(250, 204, 21, 0.5)"
            } : {}
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-lg tracking-tight opacity-90", children: "AMEX" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsx("div", { className: "text-white text-xs font-medium opacity-80 leading-tight", children: name }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute bottom-12 left-0 right-0 h-1",
            style: {
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            },
            animate: isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" },
            transition: { duration: 1, repeat: isHovered ? Infinity : 0 }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
            initial: { x: "-100%", opacity: 0 },
            animate: isHovered ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 },
            transition: { duration: 0.8 }
          }
        )
      ]
    }
  );
}

function ApplyNowButton({ href = "#", className = "" }) {
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      href,
      className: `group w-full relative overflow-hidden rounded-xl font-semibold text-sm uppercase tracking-wide flex items-center justify-center gap-2 bg-[#E68A00] py-4 ${className}`,
      style: { color: "#FFFFFF" },
      whileHover: {
        backgroundColor: "#995C00"
      },
      whileTap: {
        scale: 0.98
      },
      transition: {
        duration: 0.2,
        ease: "easeOut"
      },
      children: [
        /* @__PURE__ */ jsx("span", { style: { color: "#FFFFFF" }, children: "Apply Now" }),
        /* @__PURE__ */ jsx(
          motion.svg,
          {
            className: "w-4 h-4",
            fill: "none",
            stroke: "#FFFFFF",
            strokeWidth: 2,
            viewBox: "0 0 24 24",
            initial: { x: 0 },
            whileHover: { x: 3 },
            transition: { duration: 0.2, ease: "easeOut" },
            children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 5l7 7m0 0l-7 7m7-7H3" })
          }
        )
      ]
    }
  );
}

function CreditCardReview({ card, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardImagePath = getCardImage(card.name);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: "bg-white rounded-xl border border-gray-200 overflow-hidden mb-8",
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
      whileHover: {
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
        y: -5
      },
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[300px_1fr]", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#F7F8FA] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200", children: [
            cardImagePath && !imageError ? (
              /* Real Card Image */
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "card-image-container",
                  whileHover: {
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -3
                  },
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  },
                  style: { perspective: 1e3 },
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.img,
                      {
                        src: cardImagePath,
                        alt: card.name,
                        className: "w-full max-w-[260px] h-auto rounded-xl shadow-xl",
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.4 },
                        onError: () => setImageError(true),
                        style: {
                          filter: isHovered ? "drop-shadow(0 20px 40px rgba(0,0,0,0.25))" : "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                          transition: "filter 0.3s ease"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        className: "absolute inset-0 rounded-xl overflow-hidden pointer-events-none",
                        style: {
                          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, transparent 50%)",
                          opacity: isHovered ? 1 : 0
                        },
                        animate: isHovered ? { x: ["-100%", "200%"] } : {},
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }
                    )
                  ]
                }
              )
            ) : (
              /* Fallback to Animated Card */
              /* @__PURE__ */ jsx(AnimatedCreditCard, { name: card.name, colorIndex: index })
            ),
            /* @__PURE__ */ jsx("div", { className: "w-full mt-6", children: /* @__PURE__ */ jsx(ApplyNowButton, { href: "#" }) }),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                className: "text-xs text-[#68727C] text-center mt-3",
                animate: isHovered ? { opacity: 1 } : { opacity: 0.7 },
                children: "On American Express's Website"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "inline-block bg-[#EBF5FF] text-[#0066B2] text-xs font-bold uppercase px-3 py-1 rounded-full mb-2",
                    initial: { scale: 0.8, opacity: 0 },
                    animate: isInView ? { scale: 1, opacity: 1 } : {},
                    transition: { delay: 0.3 + index * 0.1 },
                    children: card.bestFor
                  }
                ),
                /* @__PURE__ */ jsx("h2", { className: "font-sora text-xl md:text-2xl font-bold text-[#162433]", children: card.name })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "flex items-center gap-1 bg-[#F7F8FA] px-3 py-2 rounded-lg",
                  whileHover: { scale: 1.1 },
                  children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-yellow-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-[#162433]", children: card.rating })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#68727C] mb-6", children: card.description }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-[#F7F8FA] p-4 rounded-lg",
                  whileHover: {
                    backgroundColor: "#EBF5FF",
                    scale: 1.02
                  },
                  transition: { duration: 0.2 },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-[#68727C] uppercase font-bold mb-1", children: "Annual Fee" }),
                    /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-[#162433]", children: card.annualFee })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-[#F7F8FA] p-4 rounded-lg",
                  whileHover: {
                    backgroundColor: "#DCFCE7",
                    scale: 1.02
                  },
                  transition: { duration: 0.2 },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-[#68727C] uppercase font-bold mb-1", children: "Welcome Bonus" }),
                    /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-[#162433]", children: card.bonus })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-bold text-[#162433] mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    motion.svg,
                    {
                      className: "w-4 h-4 text-green-500",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      animate: isHovered ? { scale: [1, 1.2, 1] } : {},
                      transition: { duration: 0.5 },
                      children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" })
                    }
                  ),
                  "Pros"
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "text-sm text-[#68727C] space-y-1", children: card.pros.map((pro, i) => /* @__PURE__ */ jsxs(
                  motion.li,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: isInView ? { opacity: 1, x: 0 } : {},
                    transition: { delay: 0.5 + i * 0.1 },
                    children: [
                      "• ",
                      pro
                    ]
                  },
                  i
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-bold text-[#162433] mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    motion.svg,
                    {
                      className: "w-4 h-4 text-red-500",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      animate: isHovered ? { rotate: [0, 10, -10, 0] } : {},
                      transition: { duration: 0.5 },
                      children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" })
                    }
                  ),
                  "Cons"
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "text-sm text-[#68727C] space-y-1", children: card.cons.map((con, i) => /* @__PURE__ */ jsxs(
                  motion.li,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: isInView ? { opacity: 1, x: 0 } : {},
                    transition: { delay: 0.6 + i * 0.1 },
                    children: [
                      "• ",
                      con
                    ]
                  },
                  i
                )) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
        .card-image-container {
          position: relative;
          transform-style: preserve-3d;
        }
      ` })
      ]
    }
  );
}

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
  }
];
const categories = [
  { id: "all", label: "All Cards" },
  { id: "travel", label: "Travel Cards" },
  { id: "cashback", label: "Cash Back" },
  { id: "business", label: "Business" }
];
function CreditCardsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredCards = activeCategory === "all" ? creditCards : creditCards.filter((card) => card.category === activeCategory);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-white border-b border-gray-200 py-4 sticky top-16 z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-[90rem] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "flex gap-4 overflow-x-auto pb-2",
        layout: true,
        children: categories.map((cat) => /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: () => setActiveCategory(cat.id),
            className: `whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${activeCategory === cat.id ? "bg-[#0D2C4B] text-white" : "bg-gray-100 text-[#162433]"}`,
            whileHover: {
              scale: 1.05,
              y: -2,
              boxShadow: activeCategory === cat.id ? "0 8px 20px rgba(13, 44, 75, 0.3)" : "0 8px 20px rgba(0, 0, 0, 0.1)"
            },
            whileTap: { scale: 0.95 },
            layout: true,
            children: cat.label
          },
          cat.id
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-[#F7F8FA]", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredCards.map((card, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsx(CreditCardReview, { card, index })
      },
      card.name
    )) }) }) })
  ] });
}

const $$CreditCardsMotion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Best Credit Cards - Motion Enhanced", "description": "Expert reviews of the best American Express credit cards with beautiful animations." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-[#0D2C4B] py-12 md:py-16"> <div class="max-w-[90rem] mx-auto px-4 md:px-8 text-center"> <span class="inline-block text-[#3B82F6] font-bold uppercase text-sm tracking-wide mb-4">CREDIT CARDS</span> <h1 class="font-sora text-4xl md:text-5xl font-bold text-white mb-4" style="color: white !important;">Best American Express Credit Cards</h1> <p class="text-xl max-w-3xl mx-auto mb-6" style="color: #CBD5E1;">
Our experts have compiled an in-depth list of the best American Express credit cards, with beautiful Motion animations.
</p> <div class="flex items-center justify-center gap-4 text-sm" style="color: #94A3B8;"> <span>Powered by Motion.dev</span> <span>•</span> <span>Updated Dec. 10, 2025</span> </div> </div> </section>  <section class="bg-[#F7F8FA] py-4"> <div class="max-w-5xl mx-auto px-4 md:px-8"> <p class="text-xs text-[#68727C] leading-relaxed">
Most of the cards we feature here are from partners who compensate us when you approve through our site. Please view our <a href="/advertising" class="text-[#3B82F6] hover:underline">advertising policy</a> for more information.
</p> </div> </section>  ${renderComponent($$result2, "CreditCardsShowcase", CreditCardsShowcase, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CreditCardsShowcase", "client:component-export": "default" })} ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/credit-cards-motion.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/credit-cards-motion.astro";
const $$url = "/credit-cards-motion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreditCardsMotion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
