import { ReactComponent as FolderIcon } from "../assets/folder.svg";
import { ReactComponent as FolderOpenIcon } from "../assets/folder-open.svg";
import { ReactComponent as DocumentIcon } from "../assets/document.svg";
import { useContext, useState } from "react";
import configData from "../config.json";
import AppContext from "../store/appContext";

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
  const [previewPic, setPreviewPic] = useState("");
  const [previewTxt, setPreviewTxt] = useState("");

  const state = useContext(AppContext);

  const toggleNode = () => {
    if (props.type === "directory") {
      if (!isOpen) {
        let stateRoot = state.state.root;
        if (stateRoot !== "") {
          stateRoot = stateRoot + "/";
        }

        const path = `${stateRoot}${previous || ""}${name}`;

        const noSlash = path.replace(/\//g, "~");
        console.log(
          "loading children",
          configData.API_URL + "/tree/" + noSlash + "/"
        );
        fetch(configData.API_URL + "/tree/" + noSlash + "/")
          .then((response) => response.json())
          .then((json) => {
            setChildren(json?.children);
            setIsOpen(true);
          });
      } else {
        setChildren([]);
        setIsOpen(false);
      }
    } else {
      if (type === "file") {
        const imageExtensions = [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".bmp",
          ".svg",
          ".webp",
          ".ico",
        ];

        const noSlash = props.path.replace(/\//g, "~");
        if (imageExtensions.includes(props.extension)) {
          setPreviewPic(noSlash);
        }

        if (props.extension === ".txt") {
          fetch(configData.API_URL + "/file/" + noSlash + "/")
            .then((response) => response.text())
            .then((text) => {
              setPreviewTxt(text);
            });
        }

        if (props.extension === ".bak") {
          fetch(configData.API_URL + "/file/" + noSlash + "/")
            .then((response) => response.blob())
            .then((blob) => {
              // download blob
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;
              a.download = props.name;
              document.body.appendChild(a);
              a.click();
              setPreviewTxt("");
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            });
        }
      }
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

        {previewPic !== "" && (
          <img
            className="h-24 w-24"
            crossOrigin="anonymous"
            src={`${configData.API_URL}/file/${previewPic}/`}
            alt=""
          />
        )}
        {previewTxt !== "" && <div>{previewTxt}</div>}
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
