type Props = {};
import FooterJT from "./components/FooterJT";
import {
  Appbar,
  Landing,
  About,
  Services,
  Installations,
  Featured,
} from "./home/components";
export const revalidate = 0;

export default function page({}: Props) {
  return (
    <>
      <Appbar />
      <Landing />
      <About />
      <Services />
      <Installations />
      <Featured />
      <FooterJT />
    </>
  );
}
