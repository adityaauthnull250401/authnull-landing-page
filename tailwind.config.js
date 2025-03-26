/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./*.html",
    "./*.md",
    "./_posts/*.md",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        textMain: "#0f172a",
        accentBlue: "#3b82f6",
        offWhite: "rgba(255,255,255,0.8)",
        borderLight: "rgba(255,255,255,0.2)",
        grayDark: "#475569",
        "transparent-white": "rgba(255,255,255,0.1)",
        "primary-text": "#6366f1",
      },
      spacing: {
        "nav-h": "4.8rem",
      },
      backdropBlur: {
        md: "12px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.6)",
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowLineX: {
          "0%": { opacity: 0, transform: "translateX(0)" },
          "5%": { opacity: 1 },
          "90%": { transform: "translateX(300px)" },
          "100%": { opacity: 0, transform: "translateX(350px)" },
        },
        glowLineY: {
          "0%": { opacity: 0, transform: "translateY(0)" },
          "5%": { opacity: 1 },
          "90%": { transform: "translateY(300px)" },
          "100%": { opacity: 0, transform: "translateY(350px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(-1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        smooth3DFlip: {
          "0%": {
            transform: "rotateX(25deg) translateY(50px) scale(0.95)",
            opacity: "0.9",
          },
          "40%": {
            transform: "rotateX(20deg) translateY(0) scale(0.95)",
            opacity: "1",
          },
          "100%": {
            transform: "rotateX(0) scale(1)",
            opacity: "1",
          },
        },

        imageGlow: {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },

        sketchLines: {
          "0%": { "stroke-dashoffset": "1", visibility: "visible" },
          "50%": { "stroke-dashoffset": "0" },
          "99%": { "stroke-dashoffset": "0" },
          "100%": { visibility: "hidden" },
        },
      },

      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "glow-line-x": "glowLineX var(--line-duration) ease-out forwards",
        "glow-line-y": "glowLineY var(--line-duration) ease-out forwards",
        "fade-in": "fadeInUp var(--animation-duration, 0.8s) ease forwards",
        "3d-flip": "smooth3DFlip 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "image-glow": "imageGlow 4.1s cubic-bezier(0.11, 0, 0.5, 0) forwards 0.6s",
        "sketch-lines": "sketchLines 1.2s ease forwards",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at center, rgba(59,130,246,0.1), transparent 70%)",

        "panel-gradient":
          "linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
        "hero-gradient":
          "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 100%)",
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.6), transparent 70%)",
      },
    },
  },
  plugins: [],
};
