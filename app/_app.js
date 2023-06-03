import { ThemeProvider } from "@material-tailwind/react";
// import "./tailwind.globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
