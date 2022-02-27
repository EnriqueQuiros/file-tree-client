import { useContext, useState } from "react";
import config from "../config.json";
import AppContext from "../store/appContext";
import { getPath, isImage } from "../utils/utils";
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

  const toggleNode = () => {
    if (props.type === "directory") {
      if (!isOpen) {
        setIsloading(true);
        fetch(
          config.API_URL + "/tree/" + getPath(state.state.root, previous, name)
        )
          .then((response) => response.json())
          .then((json) => {
            setChildren(json?.children);
            setIsOpen(true);
            setIsloading(false);
          });
      } else {
        setIsOpen(false);
      }
    } else {
      if (type === "file") {
        const noSlash = props.path.replace(/\//g, "~");
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
        <TreeIcon type={type} isOpen={isOpen} isImage={isImage(props.extension)} />
        {name}
      </div>

      {children && children.length > 0 && isOpen && (
        <div className="flex flex-col">
          {children.map((node: any, key: number) => {
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
