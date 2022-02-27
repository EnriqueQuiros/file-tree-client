import { render, screen } from "@testing-library/react";
import PreviewFile from "./previewFile";

describe("renders", () => {
  it("doesnt renders by default", () => {
    render(<PreviewFile />);
    expect(screen.queryByTestId("previewTxt")).toBeNull();
  });
});
