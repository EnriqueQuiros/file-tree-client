import { useContext, useEffect, useState } from "react";
import config from "../config.json";
import AppContext from "../store/appContext";
import { isImage } from "../utils/utils";


const PreviewPic = () => {
  const state = useContext(AppContext);
  const [previewPic, setPreviewPic] = useState("");

  useEffect(() => {
    setPreviewPic("");
    if (!isImage(state.state.previewExt)) {
      return;
    }
    setPreviewPic(state.state.preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      {previewPic !== "" && (
        <img
          className="h-24 w-24 sm:h-52 sm:w-52 md:h-72 md:w-72 lg:h-96 lg:w-96 xl:h-144 xl:w-144 object-contain"
          crossOrigin="anonymous"
          src={`${config.API_URL}/file/${state.state.preview}/`}
          alt="preview"
        />
      )}
    </>
  );
};
export default PreviewPic;
