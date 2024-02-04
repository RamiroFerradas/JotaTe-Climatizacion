import { NextPage } from "next";
import { ReactNode } from "react";
import "./tailwind.globals.css";
import { Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import ReduxProvider from "./redux/reduxProvider";
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
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  );
};
export default RootLayout;
