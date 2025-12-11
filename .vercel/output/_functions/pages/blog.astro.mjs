import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_Tnc-eghr.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_BztIZ2OU.mjs';
import { $ as $$FormattedDate } from '../chunks/FormattedDate_Bx-VE8tZ.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CNcbqDS2.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { wrap, delay } from 'motion';
import { usePointerPosition } from 'motion-plus/react';
import { useTransform, useMotionValueEvent, AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
export { renderers } from '../renderers.mjs';

const creditCards = [
  "/cursor-trail/cards/amex-platinum.png",
  "/cursor-trail/cards/amex-gold.png",
  "/cursor-trail/cards/chase-sapphire-preferred.png",
  "/cursor-trail/cards/capital-one-venture-x.png",
  "/cursor-trail/cards/citi-double-cash.png",
  "/cursor-trail/cards/blue-cash-preferred.png",
  "/cursor-trail/cards/discover-it-balance-transfer.png",
  "/cursor-trail/cards/delta-skymiles-reserve.png"
];
const insuranceLogos = [
  "/cursor-trail/insurance/geico.png",
  "/cursor-trail/insurance/progressive.png",
  "/cursor-trail/insurance/statefarm.png",
  "/cursor-trail/insurance/allstate.png",
  "/cursor-trail/insurance/lemonade.png",
  "/cursor-trail/insurance/nationwide.png",
  "/cursor-trail/insurance/prudential.png"
];
const allImages = [
  ...creditCards.map((src) => ({ src, type: "card" })),
  ...insuranceLogos.map((src) => ({ src, type: "insurance" }))
];
function CursorTrailBlog({
  fadeOutDuration = 1.5,
  cardSize = 120,
  logoSize = 80,
  spawnDistance = 90,
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
    const currentImage = allImages[imageIndex.current];
    const size = currentImage.type === "card" ? cardSize : logoSize;
    const newImage = {
      id: idCounter.current++,
      x: relativeX - size / 2,
      y: relativeY - size / 2,
      imageIndex: imageIndex.current,
      velocityX: pointer.x.getVelocity(),
      velocityY: pointer.y.getVelocity(),
      type: currentImage.type
    };
    setTrailImages((prev) => [...prev, newImage]);
    imageIndex.current = wrap(0, allImages.length, imageIndex.current + 1);
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
      className: "cursor-trail-container-blog",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => {
        setIsHovering(false);
        distance.current = void 0;
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "trail-title-blog", children: "Blog" }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: trailImages.map((image) => /* @__PURE__ */ jsx(
          motion.img,
          {
            className: image.type === "card" ? "trail-blog-card" : "trail-blog-insurance",
            src: allImages[image.imageIndex].src,
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
        /* @__PURE__ */ jsx("p", { className: "trail-subtitle-blog", children: "Expert insights on credit cards, insurance, travel rewards, and personal finance. Stay informed with the latest news and guides." }),
        /* @__PURE__ */ jsx("style", { children: `
                .cursor-trail-container-blog {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: crosshair;
                    background: linear-gradient(135deg, #F0F4FF 0%, #E8EEF8 100%);
                }

                .trail-title-blog {
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

                .trail-subtitle-blog {
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

                .trail-blog-card {
                    position: absolute;
                    width: ${cardSize}px;
                    height: auto;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                }

                .trail-blog-insurance {
                    position: absolute;
                    width: ${logoSize}px;
                    height: ${logoSize}px;
                    object-fit: contain;
                    pointer-events: none;
                    z-index: 10;
                    border-radius: 10px;
                    background: white;
                    padding: 8px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .cursor-trail-container-blog {
                        min-height: 220px;
                    }
                    .trail-blog-card {
                        width: 80px;
                    }
                    .trail-blog-insurance {
                        width: 60px;
                        height: 60px;
                        padding: 5px;
                    }
                }
            ` })
      ]
    }
  );
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Blog - Screened", "description": "Latest news, guides, and insights on credit cards, insurance, and personal finance." }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "CursorTrailBlog", CursorTrailBlog, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/CursorTrailBlog.tsx", "client:component-export": "default" })} ${maybeRenderHead()}<section class="container mx-auto px-4 py-12 max-w-6xl"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.id}/`, "href")} class="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow no-underline"> <div class="aspect-video relative overflow-hidden"> ${post.data.heroImage ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "width": 720, "height": 360, "src": post.data.heroImage, "alt": "", "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" })}` : renderTemplate`<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>`} </div> <div class="p-6"> <h2 class="font-sora font-bold text-xl text-[#162433] mb-2 group-hover:text-accent transition-colors">${post.data.title}</h2> <p class="text-sm text-gray-500 mb-4 font-poppins line-clamp-2"> ${post.data.description} </p> <p class="text-xs text-gray-400 font-poppins"> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate })} </p> </div> </a>`)} </div> </section> ` })}`;
}, "/Users/permain2/affiliatewebsite/src/pages/blog/index.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
