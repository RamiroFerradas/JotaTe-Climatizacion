type Props = {};
import { Footer } from "./components";
import Home from "./home/home";
import ReduxProvider from "./redux/reduxProvider";

export default function page({}: Props) {
  return (
    <>
      <ReduxProvider>
        <Home />
        <Footer />
      </ReduxProvider>
    </>
  );
}
