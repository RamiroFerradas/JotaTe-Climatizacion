import {
  About,
  Featured,
  Installations,
  Landing,
  Navbar,
  Services,
} from "./components";

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <About />
      <Services />
      <Installations />
      <Featured />
    </>
  );
};

export default Home;
