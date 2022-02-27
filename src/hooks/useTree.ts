import { useQuery } from "react-query";
import config from "../config.json";

const fetchTree = async (path: string) => {
  const response = await fetch(config.API_URL + "/tree/" + path);
  const json = await response.json();
  return json;
};

export default function useTree(path: string) {
  return useQuery("tree", () => fetchTree(path), {
    enabled: false,
    useErrorBoundary: true
  });
}
