import About from "@/app/home/components/About/About";
import "@testing-library/jest-dom-extend-expect";

import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const about = {
    content: "this is a test",
    important: true,
  };
  const component = render(<About />);
  console.log(component);
});
