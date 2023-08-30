/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["poppins", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#000032",
        secoundry: "#FF0066",
        inputBg: "#181E4599",
        border: "#919EAB52",
        appgray: "#919EAB",
        ttt: "rgba(33, 43, 54, 1)",
        selectedTab: "rgba(255, 255, 255, 0.08)",
        diselectTab: " rgba(145, 158, 171, 1)",
      },
      boxShadow: {
        dropDownBox: "0px 0px 30px 7px rgba(0,0,0,0.1)",
        tableShadow: "3px 6px 30px 4px rgba(0,0,0,0.1)",
      },
      blur: {
        "blur-background": "10px",
      },
    },
  },
  plugins: [],
};
