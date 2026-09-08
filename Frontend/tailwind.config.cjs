module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Plus Jakarta Sans", "sans-serif"] },
      colors: {
        primary: "#954900",
        "primary-container": "#F48220",
        "on-primary-container": "#5A2A00",
        background: "#F9F9FF",
        surface: "#F9F9FF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F0F3FF",
        "surface-container": "#E7EEFE",
        "surface-container-high": "#E2E8F8",
        "surface-container-highest": "#DCE2F3",
        "on-surface": "#151C27",
        "on-surface-variant": "#564336",
        outline: "#8A7264",
        "outline-variant": "#DDC1B0",
        secondary: "#595E70",
        "inverse-surface": "#2A313D",
      },
      spacing: { base: "8px", gutter: "16px", "container-padding": "24px", "stack-sm": "12px", "stack-md": "24px", "stack-lg": "48px" },
      boxShadow: { "ambient-hover": "0px 10px 20px rgba(244, 130, 32, 0.08)" },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" }), require("@tailwindcss/container-queries")],
};
