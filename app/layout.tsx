import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import ReduxProvider from "./redux/reduxProvider";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { NextPage } from "next";
const inter = Rubik({ subsets: ["latin"], weight: "300" });

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  title: "Jotaté Climatización",
  description: "Climatización Ecológica",
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
