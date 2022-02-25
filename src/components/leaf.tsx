import { ReactComponent as FolderIcon } from "../assets/folder.svg";
import { ReactComponent as FolderOpenIcon } from "../assets/folder-open.svg";
import { ReactComponent as DocumentIcon } from "../assets/document.svg";
import { useEffect, useState } from "react";
import useTree from "../hooks/useTree";
import useFetch from "../hooks/useFetch";
import configData from "../config.json";

export interface ILeaf {
  previous: string;
  name: string;
  type: string;
  children: ILeaf[];
}

interface ILeafProps {
  props: ILeaf;
}

const Leaf = ({ props }: ILeafProps) => {
  //console.log(props.name);

  const { previous, name, type } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState(props.children);
  const [url, setUrl] = useState("");
  //  const { status, data } = useFetch(url);

  const toggleNode = () => {
    if (!isOpen) {
      const path = `${previous || ""}${name}`;
      const noSlash = path.replace(/\//g, "~");

      fetch(configData.API_URL + "/tree/" + noSlash + "/")
        .then((response) => response.json())
        .then((json) => {
          setChildren(json.children);
          setIsOpen(true);
        });
    } else {
      setChildren([]);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className="flex p-0.5 hover:bg-white cursor-pointer select-none"
        onClick={() => toggleNode()}
      >
        {type === "file" ? (
          <DocumentIcon className="h-6 w-6 mr-1" />
        ) : isOpen ? (
          <FolderOpenIcon className="h-6 w-6 mr-1" />
        ) : (
          <FolderIcon className="h-6 w-6 mr-1" />
        )}
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
