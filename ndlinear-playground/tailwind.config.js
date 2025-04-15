/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // indigo-500
        secondary: "#10b981", // emerald-500
        accent: "#f59e0b", // amber-500
        danger: "#ef4444", // red-500
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "3.5rem",
      },
    },
  },
  plugins: [],
};
