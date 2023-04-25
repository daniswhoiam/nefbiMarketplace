import type { Config } from "tailwindcss"

const { fontFamily } = require("tailwindcss/defaultTheme")
import colors from "tailwindcss/colors"

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      white: "#ffffff",
      "grey-black": "#282828",
      transparent: "transparent",
      current: "currentColor",
      "jet-dark-grey": "#363636",
      "light-sea-green": {
        light: "#39B5AC",
        DEFAULT: "#298F88",
        dark: "#227973",
      },
      "atomic-tangerine": {
        light: "#FFA065",
        DEFAULT: "#E28D59",
        dark: "#D17A43",
      },
      jasmine: {
        light: "#FDDA88",
        DEFAULT: "#F5CD6D",
        dark: "#F1C151",
      },
      ccoolGray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2A37",
        900: "#111928",
      },
    },
    fontFamily: {
      ...fontFamily,
      sans: ["Open Sans", "ui-sans-serif"],
      mitr: ["Mitr", "ui-sans-serif"],
    },
  },
} satisfies Config
