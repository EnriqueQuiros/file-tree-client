import { useContext, useEffect, useState } from "react";
import useTree from "../hooks/useTree";
import Leaf, { ILeaf } from "./leaf";
import AppContext from "../store/appContext";
import { getNoSlashPath } from "../utils/utils";

const Tree = () => {
  const [rootPath, setRootPath] = useState("");
  const { data, isLoading, isError, refetch } = useTree(rootPath);
  const state = useContext(AppContext);

  useEffect(() => {
    state.setRoot(rootPath);
    refetch();
  }, [refetch, rootPath, state]);

  const updateRootPath = (path: string) => {
    setRootPath(getNoSlashPath(path));
  };

  if (isError) return <div>There was an error while loading the tree...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <input
        id="username"
        type="text"
        placeholder="folder/subfolder/..."
        onChange={(e) => {
          updateRootPath(e.target.value);
        }}
        className="w-full px-4 py-2 mt-2 mb-3 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
      />

      {data?.children?.map((node: ILeaf, key: number) => {
        return (
          <div key={key}>
            <Leaf props={node} />
          </div>
        );
      })}
    </div>
  );
};

export default Tree;
