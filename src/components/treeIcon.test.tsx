import { render, screen } from "@testing-library/react";
import TreeIcon from "./treeIcon";

describe("renders different icons depending on input", () => {
  it("renders img icon", () => {
    render(<TreeIcon type={"file"} isOpen={true} isImage={true} />);
    expect(screen.getByTestId("imgIcon")).toBeInTheDocument();
  });

  it("renders doc icon", () => {
    render(<TreeIcon type={"file"} isOpen={true} isImage={false} />);
    expect(screen.getByTestId("docIcon")).toBeInTheDocument();
  });

  it("renders open folder icon", () => {
    render(<TreeIcon type={"directory"} isOpen={true} isImage={true} />);
    expect(screen.getByTestId("openIcon")).toBeInTheDocument();
  });

  it("renders closed folder icon", () => {
    render(<TreeIcon type={"directory"} isOpen={false} isImage={true} />);
    expect(screen.getByTestId("closedIcon")).toBeInTheDocument();
  });
});
