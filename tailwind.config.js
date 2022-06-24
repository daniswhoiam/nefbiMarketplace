const { fontFamily, colors } = require("tailwindcss/defaultTheme")

module.exports = {
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
    },
    fontFamily: {
      ...fontFamily,
      sans: ["Open Sans", "ui-sans-serif"],
      "mitr": ["Mitr", "ui-sans-serif"],
    },
  },
  plugins: [],
}
