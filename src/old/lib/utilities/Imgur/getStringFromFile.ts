export const getStringFromFile = (files: FileList | null): Promise<string> => {
  return new Promise((resolve) => {
    if (!files || !files[0]) {
      return;
    }
    const reader = new FileReader();
    const file = files[0];
    reader.readAsDataURL(file);
    reader.onload = (theFile) => {
      // for getting dimensions of upload image:
      // let img = new Image();
      // img.onload = function () {
      //   // @ts-ignore
      //   console.log(this.width + ' ' + this.height);
      // }
      //   // @ts-ignore
      //   img.src = theFile?.target?.result;

      const image = reader.result as string;
      const result = image.slice(image.search(/[^,]*$/));
      resolve(result);
    };
  });
};
