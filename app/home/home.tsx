import {
  About,
  Appbar,
  Featured,
  Installations,
  Landing,
  Services,
} from "./components";

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Appbar />
      <Landing />
      <About />
      <Services />
      <Installations />
      <Featured />
    </>
  );
};

export default Home;
