"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

export type RootLayoutProps = {
  children: any;
};

const ReduxProvider: NextPage<RootLayoutProps> = ({ children }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-KNWJJVW" });
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
