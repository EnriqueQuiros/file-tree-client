import { useQuery } from "react-query";
import configData from "../config.json";

const fetchTree = async (path: string) => {
  const response = await fetch(configData.API_URL + "/tree/" + path);
  // const response = await fetch("http://localhost:7000/tree/['foo','bar']");
  const json = await response.json();

  console.log(json);

  return json;
};

export default function useTree(path: string) {
  return useQuery("tree", () => fetchTree(path));
}
