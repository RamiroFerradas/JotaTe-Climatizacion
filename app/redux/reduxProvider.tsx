"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import Head from "next/head";

export type RootLayoutProps = {
  children: React.ReactNode;
};

const ReduxProvider: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
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
        <link rel="icon" href="../favicon.ico" />
        <link
          rel="canonical"
          href="https://www.jotateclimatizacion.com/productos"
        />
        <title>Jotaaaaaaaa</title>
      </Head>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
