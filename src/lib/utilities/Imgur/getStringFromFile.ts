export const getStringFromFile = (files: FileList | null): Promise<string> => {
  return new Promise((resolve) => {
    if (!files) {
      return;
    }
    const reader = new FileReader();
    const file = files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result as string;
      const result = image.slice(image.search(/[^,]*$/));
      resolve(result);
    };
  });
};
