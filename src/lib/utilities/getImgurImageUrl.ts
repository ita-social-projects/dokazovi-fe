import { postImage } from './API/imgurApi';

export const getImgurImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) {
    return;
  }
  const reader = new FileReader();
  const file = e.target?.files[0];
  reader.readAsText(file);
  reader.onload = () => {
    const image = reader.result as string;
    postImage(image).then((res) => res); // currently Imgur returns error 429
  };
};
