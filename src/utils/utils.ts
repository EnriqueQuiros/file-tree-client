// Downloads a blob as a file
export const download = (blob: Blob, name: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// Generates a path that can be passed as param
export const getPath = (root: string, previous: string, name: string) => {
  let stateRoot = root;
  if (stateRoot !== "") {
    stateRoot = stateRoot + "/";
  }

  const path = `${stateRoot}${previous || ""}${name}`;
  return path.replace(/\//g, "~") + "/";
};


// Checks if extension is from a image type
export const isImage = (ext: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  return imageExtensions.includes(ext);
}
