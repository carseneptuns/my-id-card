/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        script: ["'Pinyon Script'", "cursive"],
        serif: ["'Cormorant Garamond'", "serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        forest: "#244C40",
        pink: "#E88BB6",
        softpink: "#F3A6C9",
        cream: "#FFFBE6",
        mint: "#A9E2D7",
        plum: "#9E3C87",
        inkblack: "#1C1C1C",
      },
      boxShadow: {
        card: "6px 8px 0px rgba(0,0,0,0.15)",
        cardHover: "10px 14px 0px rgba(0,0,0,0.18)",
      },
      rotate: {
        1: "1deg",
        2: "2deg",
        "-1": "-1deg",
        "-2": "-2deg",
      },
    },
  },
  plugins: [],
};
