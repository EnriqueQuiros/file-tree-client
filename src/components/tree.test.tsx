import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Tree from "./tree";

describe("renders", () => {
  it("renders input text", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Tree />
      </QueryClientProvider>
    );

    expect(screen.getByPlaceholderText("Enter root path")).toBeInTheDocument();
  });
});
