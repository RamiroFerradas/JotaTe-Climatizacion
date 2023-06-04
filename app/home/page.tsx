import { NextPage } from "next";
import { About, Featured, Landing, Navbar, Services } from "./components";

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
