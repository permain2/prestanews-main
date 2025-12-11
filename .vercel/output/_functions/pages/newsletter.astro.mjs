import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKBvgln8.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_DvAyv4g9.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMotionValue, useSpring, useTransform, animate, motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

function NewsletterHero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [checkProgress, setCheckProgress] = useState(0);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const floatX1 = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 100, damping: 30 });
  const floatY1 = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), { stiffness: 100, damping: 30 });
  const floatX2 = useSpring(useTransform(mouseX, [-1, 1], [20, -20]), { stiffness: 80, damping: 25 });
  const floatY2 = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 80, damping: 25 });
  const floatX3 = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 120, damping: 35 });
  const floatY3 = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 120, damping: 35 });
  const [displayCount, setDisplayCount] = useState(0);
  const targetCount = 12847;
  useEffect(() => {
    const controls = animate(0, targetCount, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplayCount(Math.round(value))
    });
    return () => controls.stop();
  }, []);
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setCheckProgress(1), 200);
      return () => clearTimeout(timer);
    }
  }, [status]);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter-hero" })
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3e3);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3e3);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "newsletter-hero-container",
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-elements", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "float-element float-1",
              style: { x: floatX1, y: floatY1 },
              children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 60 60", fill: "none", children: [
                /* @__PURE__ */ jsx("rect", { x: "5", y: "15", width: "50", height: "35", rx: "4", fill: "rgba(20, 106, 255, 0.15)" }),
                /* @__PURE__ */ jsx("path", { d: "M5 20L30 38L55 20", stroke: "rgba(20, 106, 255, 0.3)", strokeWidth: "2" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "float-element float-2",
              style: { x: floatX2, y: floatY2 },
              children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 40 40", fill: "none", children: [
                /* @__PURE__ */ jsx("circle", { cx: "20", cy: "20", r: "18", fill: "rgba(201, 162, 39, 0.12)" }),
                /* @__PURE__ */ jsx("path", { d: "M14 20L18 24L26 16", stroke: "rgba(201, 162, 39, 0.4)", strokeWidth: "2.5", strokeLinecap: "round" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "float-element float-3",
              style: { x: floatX3, y: floatY3 },
              children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 50 50", fill: "none", children: [
                /* @__PURE__ */ jsx("rect", { x: "8", y: "8", width: "34", height: "24", rx: "3", fill: "rgba(16, 185, 129, 0.12)" }),
                /* @__PURE__ */ jsx("rect", { x: "12", y: "14", width: "8", height: "6", rx: "1", fill: "rgba(16, 185, 129, 0.3)" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "hero-content",
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  className: "kicker",
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 },
                  children: "FREE NEWSLETTER"
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.h1,
                {
                  className: "hero-title",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 },
                  children: [
                    "Stay in the ",
                    /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Loop" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "hero-subtitle",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4 },
                  children: "Get the best credit card deals, travel tips, and financial insights delivered to your inbox every week."
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "form-area",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.5 },
                  children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: status === "success" ? (
                    /* Inline Success State */
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        className: "inline-success-hero",
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.95 },
                        transition: { type: "spring", stiffness: 300, damping: 25 },
                        children: /* @__PURE__ */ jsxs("div", { className: "success-inner", children: [
                          /* @__PURE__ */ jsxs(
                            motion.div,
                            {
                              className: "success-check-circle",
                              initial: { scale: 0 },
                              animate: { scale: 1 },
                              transition: { type: "spring", stiffness: 400, damping: 15, delay: 0.1 },
                              children: [
                                /* @__PURE__ */ jsx("svg", { viewBox: "0 0 52 52", className: "check-svg", children: /* @__PURE__ */ jsx(
                                  motion.path,
                                  {
                                    d: "M14 27L22 35L38 19",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "4",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    initial: { pathLength: 0 },
                                    animate: { pathLength: checkProgress },
                                    transition: { duration: 0.4, delay: 0.3 }
                                  }
                                ) }),
                                /* @__PURE__ */ jsx(
                                  motion.div,
                                  {
                                    className: "ripple",
                                    initial: { scale: 1, opacity: 0.5 },
                                    animate: { scale: 2.5, opacity: 0 },
                                    transition: { duration: 1, delay: 0.3 }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "success-text", children: [
                            /* @__PURE__ */ jsx(
                              motion.h3,
                              {
                                initial: { opacity: 0, y: 10 },
                                animate: { opacity: 1, y: 0 },
                                transition: { delay: 0.4 },
                                children: "You're In!"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              motion.p,
                              {
                                initial: { opacity: 0, y: 10 },
                                animate: { opacity: 1, y: 0 },
                                transition: { delay: 0.5 },
                                children: "Check your inbox for confirmation"
                              }
                            )
                          ] })
                        ] })
                      },
                      "success"
                    )
                  ) : (
                    /* Form State */
                    /* @__PURE__ */ jsxs(
                      motion.form,
                      {
                        className: "hero-form",
                        onSubmit: handleSubmit,
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0, scale: 0.95 },
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "form-container", children: [
                            /* @__PURE__ */ jsxs("div", { className: "input-container", children: [
                              /* @__PURE__ */ jsx("svg", { className: "email-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" }) }),
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  type: "email",
                                  placeholder: "Enter your email address",
                                  value: email,
                                  onChange: (e) => setEmail(e.target.value),
                                  disabled: status === "loading",
                                  required: true
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx(
                              motion.button,
                              {
                                type: "submit",
                                className: `submit-button ${status === "error" ? "error" : ""}`,
                                disabled: status === "loading",
                                whileHover: { scale: 1.02 },
                                whileTap: { scale: 0.98 },
                                children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: status === "loading" ? /* @__PURE__ */ jsx(
                                  motion.span,
                                  {
                                    className: "loading-spinner",
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1, rotate: 360 },
                                    exit: { opacity: 0 },
                                    transition: { rotate: { duration: 1, repeat: Infinity, ease: "linear" } },
                                    children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                                      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", opacity: "0.25" }),
                                      /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10", strokeLinecap: "round" })
                                    ] })
                                  },
                                  "loading"
                                ) : status === "error" ? /* @__PURE__ */ jsx(
                                  motion.span,
                                  {
                                    initial: { scale: 0 },
                                    animate: { scale: 1 },
                                    exit: { scale: 0 },
                                    children: "TRY AGAIN"
                                  },
                                  "error"
                                ) : /* @__PURE__ */ jsx(
                                  motion.span,
                                  {
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1 },
                                    exit: { opacity: 0 },
                                    children: "SUBSCRIBE FREE"
                                  },
                                  "default"
                                ) })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx(AnimatePresence, { children: status === "error" ? /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              className: "error-message",
                              initial: { opacity: 0, y: -10 },
                              animate: { opacity: 1, y: 0 },
                              exit: { opacity: 0, y: -10 },
                              children: "Something went wrong. Please try again."
                            }
                          ) : /* @__PURE__ */ jsx(
                            motion.p,
                            {
                              className: "disclaimer",
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              exit: { opacity: 0 },
                              children: "No spam, ever. Unsubscribe at any time."
                            }
                          ) })
                        ]
                      },
                      "form"
                    )
                  ) })
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "social-proof",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.7 },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "avatars", children: [
                      /* @__PURE__ */ jsx("div", { className: "avatar", children: "JK" }),
                      /* @__PURE__ */ jsx("div", { className: "avatar", children: "SM" }),
                      /* @__PURE__ */ jsx("div", { className: "avatar", children: "AL" }),
                      /* @__PURE__ */ jsx("div", { className: "avatar more", children: "+" })
                    ] }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      "Join ",
                      /* @__PURE__ */ jsx("strong", { children: displayCount.toLocaleString() }),
                      " readers already getting smarter about money"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "feature-pills",
                  initial: "hidden",
                  animate: "visible",
                  variants: {
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                    }
                  },
                  children: [
                    { icon: "💳", text: "Credit Card Alerts" },
                    { icon: "✈️", text: "Deal Alerts" },
                    { icon: "📊", text: "Weekly Digest" }
                  ].map((pill, i) => /* @__PURE__ */ jsxs(
                    motion.span,
                    {
                      className: "pill",
                      variants: {
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      },
                      whileHover: { scale: 1.05, y: -2 },
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "pill-icon", children: pill.icon }),
                        pill.text
                      ]
                    },
                    i
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `
        .newsletter-hero-container {
          position: relative;
          background: linear-gradient(165deg, #0D2C4B 0%, #091E32 100%);
          padding: 5rem 2rem;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-element {
          position: absolute;
          opacity: 0.6;
        }

        .float-1 {
          top: 15%;
          left: 10%;
          width: 80px;
          height: 80px;
        }

        .float-2 {
          top: 25%;
          right: 15%;
          width: 60px;
          height: 60px;
        }

        .float-3 {
          bottom: 20%;
          left: 18%;
          width: 70px;
          height: 70px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 36rem;
        }

        .kicker {
          display: inline-block;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #146aff;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #146aff 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
        }

        .form-area {
          margin-bottom: 2rem;
          min-height: 120px;
        }

        .hero-form {
          /* inherits from form-area */
        }

        .form-container {
          display: flex;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 0.5rem;
        }

        .input-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .email-icon {
          position: absolute;
          left: 1rem;
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #ffffff;
          background: transparent;
          border: none;
          outline: none;
        }

        .input-container input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-container input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
        }

        .submit-button {
          padding: 1rem 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0D2C4B;
          background: linear-gradient(135deg, #fbbf24 0%, #C9A227 100%);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-button:hover:not(:disabled) {
          filter: brightness(1.1);
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.9;
          cursor: default;
        }

        .submit-button.error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .loading-spinner svg {
          width: 20px;
          height: 20px;
        }

        .disclaimer {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.75rem;
        }

        .error-message {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #f87171;
          margin-top: 0.75rem;
        }

        /* Inline Success State */
        .inline-success-hero {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1rem;
          padding: 1.5rem 2rem;
        }

        .success-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }

        .success-check-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .check-svg {
          width: 28px;
          height: 28px;
        }

        .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #10b981;
          pointer-events: none;
        }

        .success-text {
          text-align: left;
        }

        .success-text h3 {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .success-text p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .avatars {
          display: flex;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #146aff 0%, #0D2C4B 100%);
          border: 2px solid #0D2C4B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          color: white;
          margin-right: -8px;
        }

        .avatar.more {
          background: rgba(255, 255, 255, 0.1);
          font-size: 0.875rem;
        }

        .social-proof p {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof strong {
          color: #fbbf24;
          font-weight: 700;
        }

        .feature-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
          cursor: default;
          transition: all 0.2s ease;
        }

        .pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pill-icon {
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .newsletter-hero-container {
            padding: 3rem 1.25rem;
          }

          .form-container {
            flex-direction: column;
            padding: 0.75rem;
          }

          .input-container input {
            padding: 0.875rem 0.875rem 0.875rem 2.75rem;
          }

          .submit-button {
            width: 100%;
          }

          .inline-success-hero {
            padding: 1.25rem;
          }

          .success-inner {
            flex-direction: column;
            text-align: center;
          }

          .success-text {
            text-align: center;
          }

          .social-proof {
            flex-direction: column;
            gap: 0.5rem;
          }

          .feature-pills {
            gap: 0.5rem;
          }

          .pill {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      ` })
      ]
    }
  );
}

const $$Newsletter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Newsletter", "description": "Subscribe to the PrestaNews newsletter for the latest deals and tips.", "data-astro-cid-og54zrcn": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "NewsletterHero", NewsletterHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/permain2/affiliatewebsite/src/components/NewsletterHero.tsx", "client:component-export": "default", "data-astro-cid-og54zrcn": true })}  ${maybeRenderHead()}<section class="section-white py-16 md:py-24" data-astro-cid-og54zrcn> <div class="container-main" data-astro-cid-og54zrcn> <h2 class="text-3xl font-sora font-bold text-[#162433] mb-12 text-center" data-astro-cid-og54zrcn>What You'll Get</h2> <div class="grid md:grid-cols-3 gap-8" data-astro-cid-og54zrcn> <div class="feature-card" data-astro-cid-og54zrcn> <div class="feature-icon" data-astro-cid-og54zrcn> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-og54zrcn> <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" data-astro-cid-og54zrcn></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-og54zrcn>Credit Card Alerts</h3> <p class="text-[#68727C]" data-astro-cid-og54zrcn>Be first to know about limited-time bonus offers and new card launches.</p> </div> <div class="feature-card" data-astro-cid-og54zrcn> <div class="feature-icon" data-astro-cid-og54zrcn> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-og54zrcn> <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" data-astro-cid-og54zrcn></path> <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" data-astro-cid-og54zrcn></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-og54zrcn>Deal Alerts</h3> <p class="text-[#68727C]" data-astro-cid-og54zrcn>Flight deals, hotel sales, and award availability alerts.</p> </div> <div class="feature-card" data-astro-cid-og54zrcn> <div class="feature-icon" data-astro-cid-og54zrcn> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-og54zrcn> <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" data-astro-cid-og54zrcn></path> </svg> </div> <h3 class="font-bold text-[#162433] mb-2" data-astro-cid-og54zrcn>Weekly Digest</h3> <p class="text-[#68727C]" data-astro-cid-og54zrcn>A curated summary of the best content from the week.</p> </div> </div> </div> </section>  <section class="section-light py-16 md:py-24" data-astro-cid-og54zrcn> <div class="container-main" data-astro-cid-og54zrcn> <h2 class="text-3xl font-sora font-bold text-[#162433] mb-12 text-center" data-astro-cid-og54zrcn>What Readers Say</h2> <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-astro-cid-og54zrcn> <div class="testimonial-card" data-astro-cid-og54zrcn> <div class="quote-icon" data-astro-cid-og54zrcn> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-og54zrcn> <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" data-astro-cid-og54zrcn></path> </svg> </div> <p class="text-[#68727C] mb-4 text-lg italic" data-astro-cid-og54zrcn>"The deal alerts alone have saved me thousands on flights. Can't recommend enough!"</p> <p class="font-bold text-[#162433]" data-astro-cid-og54zrcn>— Sarah K.</p> </div> <div class="testimonial-card" data-astro-cid-og54zrcn> <div class="quote-icon" data-astro-cid-og54zrcn> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-og54zrcn> <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" data-astro-cid-og54zrcn></path> </svg> </div> <p class="text-[#68727C] mb-4 text-lg italic" data-astro-cid-og54zrcn>"Finally got the Amex Platinum at the right time thanks to PrestaNews' bonus alert."</p> <p class="font-bold text-[#162433]" data-astro-cid-og54zrcn>— Mike T.</p> </div> </div> </div> </section> ` })} `;
}, "/Users/permain2/affiliatewebsite/src/pages/newsletter.astro", void 0);

const $$file = "/Users/permain2/affiliatewebsite/src/pages/newsletter.astro";
const $$url = "/newsletter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Newsletter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
