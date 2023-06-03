import { ReactElement } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import "./tailwind.globals.css";

interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
