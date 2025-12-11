import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
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

const insuranceLogos = [
  "/cursor-trail/insurance/geico.png",
  "/cursor-trail/insurance/progressive.png",
  "/cursor-trail/insurance/statefarm.png",
  "/cursor-trail/insurance/allstate.png",
  "/cursor-trail/insurance/lemonade.png",
  "/cursor-trail/insurance/nationwide.png",
  "/cursor-trail/insurance/prudential.png"
];
function CursorTrailInsurance({
  fadeOutDuration = 1.5,
  imageSize = 100,
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
    imageIndex.current = wrap(0, insuranceLogos.length, imageIndex.current + 1);
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
      className: "cursor-trail-container-insurance",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => {
        setIsHovering(false);
        distance.current = void 0;
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "trail-title-insurance", children: "Insurance" }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: trailImages.map((image) => /* @__PURE__ */ jsx(
          motion.img,
          {
            className: "trail-logo-image",
            src: insuranceLogos[image.imageIndex],
            alt: "",
            style: {
              left: image.x,
              top: image.y,
              willChange: "opacity, transform"
            },
            initial: { opacity: 0, scale: 0.5, rotate: -10 },
            animate: {
              opacity: 1,
              scale: 1,
              rotate: Math.random() * 20 - 10,
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
        /* @__PURE__ */ jsx("p", { className: "trail-subtitle-insurance", children: "Find the right insurance coverage for your needs. Our experts review and compare the best providers for auto, home, renters, and life insurance." }),
        /* @__PURE__ */ jsx("style", { children: `
                .cursor-trail-container-insurance {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #E8F4F8 0%, #E0EEF4 100%);
                }

                .trail-title-insurance {
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

                .trail-subtitle-insurance {
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

                .trail-logo-image {
                    position: absolute;
                    width: ${imageSize}px;
                    height: ${imageSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 12px;
                    background: white;
                    padding: 10px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-insurance {
                        min-height: 220px;
                    }
                    .trail-logo-image {
                        width: 70px;
                        height: 70px;
                        padding: 6px;
                    }
                }
            ` })
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const insurancePosts = [
    {
      title: "Best Car Insurance",
      description: "Compare top auto insurance providers to find the best coverage and rates for your vehicle. Expert reviews of GEICO, Progressive, State Farm, and more.",
      href: "/insurance/car",
      category: "Auto Insurance",
      image: "/insurance-images/car-insurance.jpeg"
    },
    {
      title: "Best Home Insurance",
      description: "Protect your most valuable asset with comprehensive homeowners insurance. Compare coverage options, rates, and discounts from top providers.",
      href: "/insurance/home",
      category: "Homeowners Insurance",
      image: "/insurance-images/home-insurance.jpeg"
    },
    {
      title: "Best Renters Insurance",
      description: "Affordable protection for your belongings. Find the best renters insurance with easy sign-up, great coverage, and competitive monthly rates.",
      href: "/insurance/renters",
      category: "Renters Insurance",
      image: "/insurance-images/renters-insurance.jpeg"
    },
    {
      title: "Best Life Insurance",
      description: "Secure your family's financial future with the right life insurance policy. Compare term, whole, and universal life options from trusted providers.",
      href: "/insurance/life",
      category: "Life Insurance",
      image: "/insurance-images/life-insurance.jpeg"
    },
    {
      title: "Best Disability Insurance",
      description: "Protect your income with top disability insurance providers. Compare Northwestern Mutual, Guardian Life, and MassMutual for the best coverage.",
      href: "/blog/best-disability-insurance",
      category: "Disability Insurance",
      image: "/insurance-images/life-insurance.jpeg"
    },
    {
      title: "Best RV Insurance",
      description: "Find the best RV insurance for motorhomes, travel trailers, and campers. Compare Progressive, Good Sam, and more for full-timers and recreational use.",
      href: "/blog/best-rv-insurance",
      category: "RV Insurance",
      image: "/insurance-images/car-insurance.jpeg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Insurance", "description": "Find the best insurance providers for car, home, renters, and life insurance.", "data-astro-cid-bjlzdnvb": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailInsurance", CursorTrailInsurance, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailInsurance.tsx", "client:component-export": "default", "data-astro-cid-bjlzdnvb": true })}  ${maybeRenderHead()}<section class="posts-section" data-astro-cid-bjlzdnvb> <div class="posts-container" data-astro-cid-bjlzdnvb> <div class="posts-grid" data-astro-cid-bjlzdnvb> ${insurancePosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": post.title, "description": post.description, "href": post.href, "category": post.category, "image": post.image, "data-astro-cid-bjlzdnvb": true })}`)} </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/insurance/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/insurance/index.astro";
const $$url = "/insurance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
