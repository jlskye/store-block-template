import React from "react";
import { render } from "@vtex/test-tools/react";

import Title from "../Title";

test("should render the Hello!", () => {
  const { getByText } = render(<Title />);

  const element = getByText(/Countdown/);

  expect(element).toBeDefined();
});
