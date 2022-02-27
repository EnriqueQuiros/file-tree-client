import { useQuery } from "react-query";
import config from "../config.json";

const fetchTree = async (path: string) => {
  const response = await fetch(config.API_URL + "/tree/" + path);

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Error while loading tree");
  }
};

export default function useTree(path: string) {
  return useQuery("tree", () => fetchTree(path), {
    enabled: false,
    useErrorBoundary: true,
  });
}
