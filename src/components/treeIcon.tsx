import { ReactComponent as FolderIcon } from "../assets/folder.svg";
import { ReactComponent as FolderOpenIcon } from "../assets/folder-open.svg";
import { ReactComponent as DocIcon } from "../assets/document.svg";
import { ReactComponent as PicIcon } from "../assets/picture.svg";

const TreeIcon = ({ type, isOpen, isImage }: { type: string; isOpen: boolean; isImage:boolean }) => {
  return (
    <>
      {type === "file" ? (
        isImage ? (<PicIcon className="h-6 w-6 mr-1"  data-testid="imgIcon"/>) : (<DocIcon className="h-6 w-6 mr-1" data-testid="docIcon"/>)
      ) : isOpen ? (
        <FolderOpenIcon className="h-6 w-6 mr-1"  data-testid="openIcon"  />
      ) : (
        <FolderIcon className="h-6 w-6 mr-1"  data-testid="closedIcon" />
      )}
    </>
  );
};
export default TreeIcon;
