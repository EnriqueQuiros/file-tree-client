import { useContext, useEffect, useState } from "react";
import config from "../config.json";
import AppContext from "../store/appContext";
import { download, isImage } from "../utils/utils";

const PreviewFile = () => {
  const state = useContext(AppContext);
  const [previewFile, setPreviewFile] = useState("");

  useEffect(() => {
    setPreviewFile("");
    if (isImage(state.state.previewExt) || state.state.previewExt === "") {
      return;
    }

    if (state.state.previewExt === ".txt") {
      fetch(config.API_URL + "/file/" + state.state.preview + "/")
        .then((response) => response.text())
        .then((text) => {
          setPreviewFile(text);
        });

      setPreviewFile(state.state.preview);
    } else {
      fetch(config.API_URL + "/file/" + state.state.preview + "/")
        .then((response) => response.blob())
        .then((blob) => {
          download(blob, state.state.previewName);
        });
    }
  }, [state]);

  return (
    <>
      {previewFile !== "" && <div className="text-justify" data-testid="previewTxt">{previewFile}</div>}
    </>
  );
};
export default PreviewFile;
