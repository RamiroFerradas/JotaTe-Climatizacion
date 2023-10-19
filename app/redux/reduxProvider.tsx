"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

export type RootLayoutProps = {
  children: React.ReactNode;
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
