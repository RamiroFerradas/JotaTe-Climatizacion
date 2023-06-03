"use client";

import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import { ThemeProvider } from "@material-tailwind/react";
import localFont from "next/font/local";
import Head from "next/head";

const inter = Rubik({ subsets: ["latin"], weight: "300" });

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  title: "Jota Te Climatizacion",
  description: "Generated by create next app",
};
import { NextPage } from "next";
import { Footer } from "./components/Footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
