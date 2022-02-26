import { useContext, useEffect, useState } from "react";
import useTree from "../hooks/useTree";
import Leaf from "./leaf";
import AppContext from "../store/appContext";

const Tree = () => {
  const [rootPath, setRootPath] = useState("");
  const { data, refetch } = useTree(rootPath);
  const state = useContext(AppContext);

  useEffect(() => {
    console.log("Root path: ", rootPath);
    state.setRoot(rootPath);
    refetch();
  }, [refetch, rootPath]);

  return (
    <div>
      <div className="mb-1">
        <div>
          <input
            id="username"
            type="text"
            placeholder="Enter root path"
            defaultValue={data?.path}
            onChange={(e) => {
              setRootPath(e.target.value);
            }}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
      </div>

      {data?.children?.map((node: any, key: number) => {
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
