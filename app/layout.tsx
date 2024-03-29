import { NextPage } from "next";
import { ReactNode } from "react";
import "./tailwind.globals.css";
import { Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
const inter = Rubik({ subsets: ["latin"], weight: "300" });
import Favicon from "../public/favicon.ico";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <GoogleAnalytics gaId="GTM-KNWJJVW" />{" "}
        <div className="min-h-screen flex flex-col">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};
export default RootLayout;
