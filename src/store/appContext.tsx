import { createContext } from "react";

interface IAppContext {
  state: {
    root: string;
  };
  setRoot: (root: string) => void;
}

const defaultValue: IAppContext = {
  state: {
    root: "en",
  },
  setRoot: (root: string) => {
    console.log("setRoot: ", root);
  },
};

const AppContext = createContext(defaultValue);

export default AppContext;