/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {},
      fontSize: {},
      colors: {
        black: "#111111",
        primary: "#9f1239",
        secondary: "#be123c",
        thinGray: "#f7f8f9",
        thickGray: "#efefef",
        skeleton: "#d1d5db",
      },
    },
  },
  plugins: [],
};
