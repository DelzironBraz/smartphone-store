/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#054A91",
        secondary: "#DAE3ED",
        black: "#1D1D1D",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
