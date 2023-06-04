import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
const inter = Rubik({ subsets: ["latin"], weight: "300" });

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  title: "Jota Te Climatizacion",
  description: "Generated by create next app",
};

import { NextPage } from "next";
type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
