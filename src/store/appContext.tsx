import { createContext } from "react";

interface IAppContext {
  state: {
    root: string;
    preview: string;
    previewExt: string;
    previewName: string;
  };
  setRoot: (root: string) => void;
  setPreview: (url: string) => void;
  setPreviewExt: (ext: string) => void;
  setPreviewName: (ext: string) => void;
}

const defaultValue: IAppContext = {
  state: {
    root: "",
    preview: "",
    previewExt: "",
    previewName: "",
  },
  setRoot: (root: string) => {
    console.log("setRoot: ", root);
  },
  setPreview: (preview: string) => {
    console.log("setPreview: ", preview);
  },
  setPreviewExt: (ext: string): void => {
    console.log("setExtension: ", ext);
  },
  setPreviewName: (ext: string): void => {
    console.log("setName: ", ext);
  },
};

const AppContext = createContext(defaultValue);

export default AppContext;
