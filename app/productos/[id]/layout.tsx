"use client";
import { Card, Drawer } from "@mui/material";
import { NextPage } from "next";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

export const revalidate = 0;
export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  const router = useRouter();

  const backModal = () => () => {
    router.back();
  };

  return (
    <Drawer
      anchor={"right"}
      open={true}
      onClose={backModal()}
      className="min-h-screen z-50"
    >
      <Card className="flex flex-col md:w-[48rem] justify-between items-center px-0 h-full overflow-y-auto w-screen">
        {children}
      </Card>
    </Drawer>
  );
};
export default RootLayout;
