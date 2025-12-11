import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_9tUPvqD1.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { wrap, delay } from 'motion';
import { usePointerPosition } from 'motion-plus/react';
import { useTransform, useMotionValueEvent, AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const creditCardImages = [
  "/cursor-trail/cards/amex-platinum.png",
  "/cursor-trail/cards/amex-gold.png",
  "/cursor-trail/cards/chase-sapphire-preferred.png",
  "/cursor-trail/cards/capital-one-venture-x.png",
  "/cursor-trail/cards/citi-double-cash.png",
  "/cursor-trail/cards/blue-cash-preferred.png",
  "/cursor-trail/cards/discover-it-balance-transfer.png",
  "/cursor-trail/cards/delta-skymiles-reserve.png"
];
function CursorTrailCreditCards({
  fadeOutDuration = 1.5,
  imageSize = 140,
  spawnDistance = 100,
  velocityFactor = 0.08
}) {
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const distance = useRef(void 0);
  const [trailImages, setTrailImages] = useState([]);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const pointer = usePointerPosition();
  const pointerDistance = useTransform(() => {
    if (!isHovering) return 0;
    const x = pointer.x.get();
    const y = pointer.y.get();
    const deltaX = x - (pointer.x.getPrevious() ?? x);
    const deltaY = y - (pointer.y.getPrevious() ?? y);
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  });
  useMotionValueEvent(pointerDistance, "change", (latest) => {
    if (!isHovering) return;
    if (distance.current === void 0) {
      distance.current = 0;
      return;
    }
    distance.current += latest;
    if (distance.current >= spawnDistance) {
      spawnImage(pointer.x.get(), pointer.y.get());
      distance.current = 0;
    }
  });
  const spawnImage = (x, y) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    const newImage = {
      id: idCounter.current++,
      x: relativeX - imageSize / 2,
      y: relativeY - imageSize / 2,
      imageIndex: imageIndex.current,
      velocityX: pointer.x.getVelocity(),
      velocityY: pointer.y.getVelocity()
    };
    setTrailImages((prev) => [...prev, newImage]);
    imageIndex.current = wrap(0, creditCardImages.length, imageIndex.current + 1);
    delay(() => {
      setTrailImages(
        (prev) => prev.filter((img) => img.id !== newImage.id)
      );
    }, fadeOutDuration);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "cursor-trail-container",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => {
        setIsHovering(false);
        distance.current = void 0;
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "trail-title", children: "Credit Cards" }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: trailImages.map((image) => /* @__PURE__ */ jsx(
          motion.img,
          {
            className: "trail-card-image",
            src: creditCardImages[image.imageIndex],
            alt: "",
            style: {
              left: image.x,
              top: image.y,
              willChange: "opacity, transform"
            },
            initial: { opacity: 0, scale: 0.5, rotate: -15 },
            animate: {
              opacity: 1,
              scale: 1,
              rotate: Math.random() * 30 - 15,
              x: 0,
              y: 0
            },
            transition: {
              duration: 0.15,
              x: {
                type: "inertia",
                velocity: image.velocityX * velocityFactor
              },
              y: {
                type: "inertia",
                velocity: image.velocityY * velocityFactor
              }
            },
            exit: {
              opacity: 0,
              scale: 0.3,
              transition: { duration: 0.4 }
            }
          },
          image.id
        )) }),
        /* @__PURE__ */ jsx("p", { className: "trail-subtitle", children: "Find the perfect credit card for your spending habits. Our experts review and compare the best options for travel rewards, cash back, business, and more." }),
        /* @__PURE__ */ jsx("style", { children: `
                .cursor-trail-container {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #EEF2F6 0%, #E8ECF0 100%);
                }

                .trail-title {
                    position: relative;
                    font-family: 'Lexend', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 700;
                    color: #162433;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .trail-subtitle {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.125rem;
                    color: #68727C;
                    z-index: 50;
                    pointer-events: none;
                    text-align: center;
                    max-width: 700px;
                    padding: 0 1.5rem;
                    line-height: 1.7;
                }

                .trail-card-image {
                    position: absolute;
                    width: ${imageSize}px;
                    height: auto;
                    max-height: ${imageSize * 0.7}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container {
                        min-height: 220px;
                    }
                    .trail-card-image {
                        width: 100px;
                        max-height: 70px;
                    }
                }
            ` })
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const creditCardPosts = [
    {
      title: "Best Travel Credit Cards",
      description: "Maximize your travel rewards with these top-rated cards featuring bonus points, lounge access, and premium travel benefits.",
      href: "/credit-cards/best-travel-cards",
      category: "Travel Rewards",
      image: "/category-images/travel-rewards.jpeg"
    },
    {
      title: "Best Cash Back Credit Cards",
      description: "Earn cash back on everyday purchases with these excellent cash back cards offering competitive rates and flexible redemption.",
      href: "/credit-cards/best-cashback",
      category: "Cash Back",
      image: "/category-images/cash-back.jpeg"
    },
    {
      title: "Best Business Credit Cards",
      description: "Power your business with cards designed for entrepreneurs, featuring expense tracking, employee cards, and business rewards.",
      href: "/credit-cards/business",
      category: "Business",
      image: "/category-images/business.jpeg"
    },
    {
      title: "Best No Annual Fee Cards",
      description: "Great rewards without the yearly cost. These cards prove you don't need to pay an annual fee to earn valuable perks.",
      href: "/credit-cards/no-annual-fee",
      category: "No Annual Fee",
      image: "/category-images/no-annual-fee.jpeg"
    },
    {
      title: "Best Balance Transfer Cards",
      description: "Pay down debt faster with 0% intro APR offers. These cards help you save on interest and consolidate your balances.",
      href: "/credit-cards/balance-transfer",
      category: "Balance Transfer",
      image: "/category-images/balance-transfer.jpeg"
    }
  ];
  const relatedFinance = [
    {
      title: "Best Online Savings Accounts",
      description: "Earn up to 5.00% APY on your savings. Compare top high-yield accounts from Varo, Marcus, and more.",
      href: "/blog/best-online-savings-accounts",
      category: "Banking",
      image: "/category-images/cash-back.jpeg"
    },
    {
      title: "Best Student Loans",
      description: "Compare private student loan lenders for the lowest rates. SoFi, Earnest, Discover and more.",
      href: "/blog/best-student-loans",
      category: "Loans",
      image: "/category-images/balance-transfer.jpeg"
    }
  ];
  const categories = [
    { name: "All Cards", href: "/credit-cards", active: true },
    { name: "Travel", href: "/credit-cards/best-travel-cards" },
    { name: "Cash Back", href: "/credit-cards/best-cashback" },
    { name: "Business", href: "/credit-cards/business" },
    { name: "No Annual Fee", href: "/credit-cards/no-annual-fee" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Credit Cards", "description": "Find the best credit cards for travel rewards, cash back, business, and more.", "data-astro-cid-mmghxvph": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailCreditCards", CursorTrailCreditCards, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailCreditCards.tsx", "client:component-export": "default", "data-astro-cid-mmghxvph": true })}  ${maybeRenderHead()}<section class="filters-section" data-astro-cid-mmghxvph> <div class="filters-container" data-astro-cid-mmghxvph> <nav class="filters-nav" data-astro-cid-mmghxvph> ${categories.map((cat) => renderTemplate`<a${addAttribute(cat.href, "href")}${addAttribute(["btn-filter", { active: cat.active }], "class:list")} data-astro-cid-mmghxvph> ${cat.name} </a>`)} </nav> </div> </section>  <section class="posts-section" data-astro-cid-mmghxvph> <div class="posts-container" data-astro-cid-mmghxvph> <div class="posts-grid" data-astro-cid-mmghxvph> ${creditCardPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": post.title, "description": post.description, "href": post.href, "category": post.category, "image": post.image, "data-astro-cid-mmghxvph": true })}`)} </div> </div> </section>  <section class="related-section" data-astro-cid-mmghxvph> <div class="posts-container" data-astro-cid-mmghxvph> <h2 class="related-title" data-astro-cid-mmghxvph>Related Financial Guides</h2> <div class="related-grid" data-astro-cid-mmghxvph> ${relatedFinance.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": post.title, "description": post.description, "href": post.href, "category": post.category, "image": post.image, "data-astro-cid-mmghxvph": true })}`)} </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/credit-cards/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/credit-cards/index.astro";
const $$url = "/credit-cards";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
