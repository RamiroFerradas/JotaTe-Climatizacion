import { NextPage } from "next";
import { ReactNode } from "react";
import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import Head from "next/head";
import localFont from "next/font/local";
import ReduxProvider from "./redux/reduxProvider";
import { Footer } from "./components";
const inter = Rubik({ subsets: ["latin"], weight: "300" });
import Favicon from "../public/favicon.ico";

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  title: "Jotaté Climatización",
  description: "Climatización Ecológica",
  alternates: {
    canonical: `https://www.jotateclimatizacion.com/`,
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};

export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex flex-col">{children}</div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
};
export default RootLayout;
