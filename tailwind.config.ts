import type { Config } from "tailwindcss";
import components from "./lib/tailwindPlugins/dashboardPlugin";

const config: Config = {
  plugins: [components],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "--gap" : "20px",
      },
      colors: {
        "primary-blue": "#3EABF8",
        "primary-red": "#F8384C",
        "primary-yellow": "#FBDC48",
        "primary-gray": "#FAFAFA",
        "secondary-gray": "#CACACA",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      mediaquery: {
        desktop: "(min-width: 1025px)",
        mobile: "(max-width: 600px)",
      }
    },
  },
};
export default config;

// 320px — 480px: Mobile devices.
// 481px — 768px: iPads, Tablets.
// 769px — 1024px: Small screens, laptops.
// 1025px — 1200px: Desktops, large screens.
// 1201px and more — Extra large screens, TV.

// color pallets
// 1.blue = 3EABF8
// 2.red = F8384C
// 3.yellow = FBDC48
// 5.gray = FAFAFA
// 6.white
// 7.black

// spacing
// desktop default = 20px
// mobile default = 15px

// Typography
// font family = Rubik

// Animations
// desktop default = left side pop-up
// mobile default = bottom pop-up

// Shadows
// blur = 50
// color = 8b8b8b 10%
