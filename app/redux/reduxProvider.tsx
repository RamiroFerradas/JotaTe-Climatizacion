"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { NextPage } from "next";

import { ThemeProvider } from "@material-tailwind/react";

export type RootLayoutProps = {
  children: any;
};

const ReduxProvider: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
