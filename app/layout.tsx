import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import ReduxProvider from "./redux/reduxProvider";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { NextPage } from "next";
import Head from "next/head";
const inter = Rubik({ subsets: ["latin"], weight: "300" });

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  // title: "Jotaté Climatización",
  // description: "Climatización Ecológica",
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Agrega el código de Google Tag Manager después de la etiqueta <body> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KNWJJVW"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex flex-col">{children}</div>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
};
export default RootLayout;
