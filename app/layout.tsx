import { NextPage } from "next";
import "./tailwind.globals.css";
import { Inter, Nunito, Roboto, Rubik } from "next/font/google";
import Head from "next/head";
import localFont from "next/font/local";
import ReduxProvider from "./redux/reduxProvider";
import { Footer } from "./components";
const inter = Rubik({ subsets: ["latin"], weight: "300" });

const myFont = localFont({
  src: "../public/fonts/BNChester.otf",
});

export const metadata = {
  title: "Jotaté Climatización",
  description: "Climatización Ecológica",
  alternates: {
    canonical: `https://www.jotateclimatizacion.com/`,
  },
  icons: {
    icon: "./favicon.ico",
  },
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KNWJJVW');
            `,
          }}
        />
        <link rel="icon" href="./favicon.ico" />
        <link
          rel="canonical"
          href="https://www.jotateclimatizacion.com/productos"
        />
      </Head>
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
