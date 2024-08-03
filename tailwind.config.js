/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        add: {
          "25%, 50%": { transform: "scale(1.2)" },
          "75%, 100%": { transform: "scale(1)" },
        },
        new: {
          "0%, 30%": { transform: "scale(0.5)" },
          "30%, 60%": { transform: "scale(1.2)" },
          "60%, 100%": { transform: "scale(1)" },
        },
        popup: {
          "0%, 30%": { transform: "scale(0.75)" },
          "30%, 60%": { transform: "scale(1.05)" },
          "60%, 100%": { transform: "scale(1)" },
        },
      },
      animation: {
        add: "add 0.75s cubic-bezier(0, 0, 0.2, 1)",
        new: "new 0.75s cubic-bezier(0, 0, 0.2, 1)",
        popup: "popup 0.75s cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
