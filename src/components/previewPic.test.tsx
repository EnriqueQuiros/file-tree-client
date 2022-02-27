import { render, screen } from "@testing-library/react";
import PreviewPic from "./previewPic";

describe("renders", () => {
  it("doesnt renders by default", () => {
    render(<PreviewPic />);
    expect(screen.queryByAltText("preview")).toBeNull();
  });
});
