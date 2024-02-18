"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";

import { ThemeProvider } from "@material-tailwind/react";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

export type RootLayoutProps = {
  children: any;
};

const ReduxProvider: NextPage<RootLayoutProps> = ({ children }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-KNWJJVW" });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
