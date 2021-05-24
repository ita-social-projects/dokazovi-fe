export const parseVideoIdFromUrl = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = regExp.exec(url);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return null;
};
