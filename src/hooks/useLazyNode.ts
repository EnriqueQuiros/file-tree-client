import { getPath } from "../utils/utils";
import config from "../config.json";

export const lazyFetchChildren = async (
  root: string,
  previous: string,
  name: string
) => {
  const res = await fetch(
    config.API_URL + "/tree/" + getPath(root, previous, name)
  );
  const data = await res.json();
  return data?.children;
};
