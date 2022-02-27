import { render, screen } from "@testing-library/react";
import Leaf from "./leaf";
import userEvent from "@testing-library/user-event";

describe("renders", () => {
  it("renders a closed folder by default", () => {
    render(<Leaf props={leaf} />);
    expect(screen.getByTestId("closedIcon")).toBeInTheDocument();
  });

  it("after clicking the folder it lazy loads the content", () => {
    render(<Leaf props={leaf} />);
    userEvent.click(screen.getByTestId("closedIcon"));
    expect(screen.getByText("LOADING...")).toBeInTheDocument();
  });

  it("after loading finishes, it shows its children", async () => {
    render(<Leaf props={leaf} />);
    userEvent.click(screen.getByTestId("closedIcon"));
    await screen.findByText("1272059036338135625.png");
  });
});



const leaf = {
  path: "/test-folder",
  previous: "",
  extension: "",
  name: "test-folder",
  children: [
    {
      path: "/test-folder/1272059036338135625.png",
      name: "1272059036338135625.png",
      type: "file",
      extension: ".png",
      previous: "",
      children: [],
    },
    {
      path: "/test-folder/bak.bak",
      name: "bak.bak",
      type: "file",
      extension: ".bak",
      previous: "",
      children: [],
    },
    {
      path: "/test-folder/test1.txt",
      name: "test1.txt",
      type: "file",
      extension: ".txt",
      previous: "",
      children: [],
    },
  ],
  type: "directory",
};
