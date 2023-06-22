import { NextPage } from "next";
import { About, Featured, Landing, Navbar, Services } from "./components";
import { Provider } from "react-redux";
import { store } from "../redux/store";

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
