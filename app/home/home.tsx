import Head from "next/head";
import { About, Featured, Landing, Navbar, Services } from "./components";

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
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
