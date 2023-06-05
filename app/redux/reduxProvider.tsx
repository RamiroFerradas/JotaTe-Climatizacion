"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";

export type RootLayoutProps = {
  children: React.ReactNode;
};

const ReduxProvider: NextPage<RootLayoutProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
