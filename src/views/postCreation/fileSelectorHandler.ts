import { DropEvent, FileRejection } from 'react-dropzone';
import { getStringFromFile } from '../../old/lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../old/lib/utilities/Imgur/uploadImageToImgur';

export const fileSelectorHandler = (
  dispatchFunc: (arg: string) => void,
): (<T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent,
) => void) => (files) => {
  getStringFromFile(files)
    .then((str) => uploadImageToImgur(str))
    .then((res) => {
      if (res.data.status === 200) {
        dispatchFunc(res.data.data.link);
      }
    });
};
