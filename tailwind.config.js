/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const darkMode = ["class", '[data-mode="dark"]'];
// enabling it for storybook
export const safelist = [
  {
    pattern: /^(.*?)/,
  },
];
export const theme = {
  fontFamily: {
    poppins: ["Poppins", "sans-serif"],
    roboto: ["Roboto", "sans-serif"],
    inter: ["Inter", "sans-serif"],
    urbanist: ["Urbanist", "sans-serif"],
    nunito: ["Nunito Sans", "sans-serif"],
  },
  colors: {
    "Neutral-n100": "#F1F5F9",
    "Neutral-n200": "#E2E8F0",
    "Neutral-n400": "#94A3B8",
    "Neutral-n500": "#64748B",
    "Neutral-n600": "#475569",
    "Neutral-n700": "#334155",
    "Neutral-n800": "#1E293B",
    "Shade-White": "#FFF",
    "Supporting-color-Error": "#D12E34",
    "light-sky-blue": "#3C9AFB",
    "dark-sky-blue": "#078DEE",
    "midnight-blue": "#1F2937",
    "cloudy-grey": "#A1AFC1",
    "medium-green": "#1BAC4B",
    "cotton-white": "#FEFEFE",
    "milk-white": "#FBFBFB",
    //
    "snow-white": "#FAFAFA",
    "dark-grey": "#334155",
    "storm-grey": "#6C757D",
    "light-grey": "#D9D9D9",
    black: "#000",
    "soft-peach": "#EEE",
  },
  extend: {
    fontSize: {
      "2.5xl": "26px",
    },
    lineHeight: {
      8.5: "34px",
      5.5: "22px",
      4.5: "18px",
    },
    spacing: {
      5.5: "22px",
      7.5: "30px",
      10.5: "42px",
      12.5: "50px",
      13.5: "54px",
      19: "76px",
    },
    borderWidth: {
      1.5: "1.5px",
    },
    boxShadow: {
      card: "0px 3px 39px 0px rgba(138, 149, 158, 0.25)",
      "network-card": "0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
    },
    backgroundImage: {
      "blue-gradient": "linear-gradient(180deg, #250058 0%, #078DEE 100%)",
      "nav-blue-gradient":
        "linear-gradient(135deg, #078DEE 5.16%, #5B20AD 95.75%)",
      "dark-blue-gradient":
        "linear-gradient(192deg, #078DEE -6.79%, #250058 103.35%)",
      "qr-bg": "url('/assets/images/qr/qr-bg.png')",
    },
  },
};
export const plugins = [];
