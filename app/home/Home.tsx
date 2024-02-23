import { Footer } from "../components";
import {
  Appbar,
  Landing,
  About,
  Services,
  Installations,
  Featured,
} from "./components";

type Props = {};
function Home({}: Props) {
  return (
    <>
      <Appbar />
      <Landing />
      <About />
      <Services />
      <Installations />
      <Featured />
      <Footer />
    </>
  );
}
export default Home;
