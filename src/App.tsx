import { QueryClient, QueryClientProvider } from "react-query";
import AppContext from "./store/appContext";
import Tree from "./components/tree";
import { useState } from "react";
import PreviewPic from "./components/previewPic";
import PreviewFile from "./components/previewFile";

const queryClient = new QueryClient();

function App() {
  const [root, setRoot] = useState("");
  const [preview, setPreview] = useState("");
  const [previewExt, setPreviewExt] = useState("");
  const [previewName, setPreviewName] = useState("");

  const value = {
    state: {
      root: root,
      preview: preview,
      previewExt: previewExt,
      previewName: previewName,
    },
    setRoot: setRoot,
    setPreview: setPreview,
    setPreviewExt: setPreviewExt,
    setPreviewName: setPreviewName,
  };

  return (
    <AppContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <div className="p-6 min-h-screen min-w-fit bg-gray-100 sm:flex sm:gap-10 sm:justify-between">
          <div className="shrink-0">
            <Tree />
          </div>
          <div className="shrink pt-6 sm:p-6 sm:mt-10">
            <PreviewPic />
            <PreviewFile />
          </div>
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
