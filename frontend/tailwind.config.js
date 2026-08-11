/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Anton", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        "unleash-brown": "#3A1B0B",
        "unleash-dark-brown": "#241108",
        "unleash-orange": "#E85D04",
        "unleash-gold": "#F5A623",
        "unleash-cream": "#FFF4DE",
        "unleash-light-cream": "#FFF9EF",
        "unleash-green": "#075B2A",

        "orange-burnt": "#E85D04",
        "orange-gold": "#F5A623",
        "brown-dark": "#241108",
        "brown-deep": "#3A1B0B",
        "cream-light": "#FFF9EF",
        "cream-warm": "#FFF4DE",
      },
    },
  },
  print:true,
  plugins: [],
};