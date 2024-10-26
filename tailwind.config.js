/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {},
      fontSize: {},
      colors: {
        black: "#111111",
        primary: "#9f1239", // 주색상
        secondary: "#be123c", // 부색상
        thinGray: "#f7f8f9",
        thickGray: "#efefef",
        skeleton: "#d1d5db", // 로딩 스켈레톤 색상
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "0.75" },
          "100%": { opacity: "1" },
        },
        swapdown: {
          "0%": { opacity: "0", transform: "translate(0, -20%)" },
          "50%": { opacity: "0.5", transform: "translate(0, -10%)" },
          "100%": { opacity: "1", transform: "translate(0)" },
        },
        // 무한 슬라이드 효과
        infiniteslide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      // 위에서 정의한 keyframe에 대한 애니메이션 상수 정의
      animation: {
        fadein: "fadein 0.2s linear forwards",
        swapdown: "swapdown 0.5s linear forwards",
        infiniteslide: "infiniteslide 60s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
