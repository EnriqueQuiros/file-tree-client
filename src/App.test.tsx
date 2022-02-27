import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders", () => {
  it("renders", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Enter root path")).toBeInTheDocument();
  });
});
