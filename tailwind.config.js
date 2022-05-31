module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleR: "#961e80",
        blackR: "#242435",
      },
      backgroundImage: (theme) => ({
        hero: "url('../src/assets/hero.jpg')",
        mint: "url('../src/assets/mintbg.jpg')",
      }),
    },
  },
  plugins: [],
};
