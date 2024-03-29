const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "green-principal": "#006d54",
        "orange-principal": "#F65B36",
      },
      colors: {
        "green-principal": "#006d54",
        "orange-principal": "#F65B36",
      },
      scrollbar: {
        custom: {
          // Estilos de la barra de desplazamiento
          width: "8px",
          trackColor: "#f1f1f1",
          thumbColor: "#888",
          thumbHoverColor: "#555",
        },
      },
    },
    screens: {
      xxs: "280px",
      xs: "410px",
    },
    carousel: {
      styles: {
        base: {
          carousel: {
            display: "flex",
          },
          arrow: {
            color: "red", // Cambia el color de las flechas aquí
          },
        },
      },
    },
  },
  plugins: [],
});
