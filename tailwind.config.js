/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { fontFamily: { inter: "Inter" } },
    colors: {
      gray: {
        "100": "#f3f4f6",
        "200": "#e8e8e8",
        "300": "#e7e8ea",
        "400": "#d4d4d7",
        "500": "#6b7280",
        "600": "#6e6893",
        "700": "#111827",
      },
      black: "#000",
      white: "#fff",
      yellow: "#FFFF00",
      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
      stale: "#262E40"
    },
    fontSize: { sm: "12px", base: "14px", lg: "16px" },
  },
  corePlugins: { preflight: false },
};
