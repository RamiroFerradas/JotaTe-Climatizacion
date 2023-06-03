import { NextPage } from "next";
import { About, Featured, Landing, Navbar, Services } from "./components";
import { ThemeProvider } from "@material-tailwind/react";

export type HomeProps = {};

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <About />
      <Services />
      <Featured />
    </>
  );
};

export default Home;
