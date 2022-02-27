import { useContext, useState } from "react";
import { lazyFetchChildren } from "../hooks/useLazyNode";

import AppContext from "../store/appContext";
import { getNoSlashPath, isImage } from "../utils/utils";
import TreeIcon from "./treeIcon";

export interface ILeaf {
  previous: string;
  name: string;
  path: string;
  type: string;
  extension: string;
  children: ILeaf[];
}

interface ILeafProps {
  props: ILeaf;
}

const Leaf = ({ props }: ILeafProps) => {
  const { previous, name, type } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState(props.children);
  const state = useContext(AppContext);
  const [isLoading, setIsloading] = useState(false);

  const toggleNode = async () => {
    if (props.type === "directory") {
      if (!isOpen) {
        setIsloading(true);
        setChildren(await lazyFetchChildren(state.state.root, previous, name));
        setIsloading(false);
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      if (type === "file") {
        const noSlash = getNoSlashPath(props.path);
        state.setPreview(noSlash);
        state.setPreviewExt(props.extension);
        state.setPreviewName(props.name);
      }
    }
  };

  if (isLoading) {
    return <strong>LOADING...</strong>;
  }

  return (
    <>
      <div
        className="flex p-0.5 hover:bg-white cursor-pointer select-none"
        onClick={() => toggleNode()}
      >
        <TreeIcon
          type={type}
          isOpen={isOpen}
          isImage={isImage(props.extension)}
        />
        {name}
      </div>

      {children && children.length > 0 && isOpen && (
        <div className="flex flex-col">
          {children.map((node: ILeaf, key: number) => {
            node.previous = `${previous || ""}${name}/`;
            return (
              <div className="ml-6" key={key}>
                <Leaf props={node} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Leaf;
