import { IconButton } from '@material-ui/core';
import React from 'react';
import { Quill } from 'react-quill';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ImageFromURLHandler from './ImageFromURLHandler';

export interface IImageHandlersContainerProps {
  editor?: Quill;
}

const ImageHandlersContainer: React.FC<IImageHandlersContainerProps> = ({
  editor,
}) => {
  const handleToggle = () => {
    document.querySelector('.ImageHandlersContainer')?.classList.toggle('hide');
  };

  return (
    <>
      <span className="ql-formats">
        <IconButton onClick={handleToggle} title="Додати зображення">
          <CropOriginalIcon
            fontSize="small"
            style={{ width: '18px', height: '18px' }}
          />
        </IconButton>

        <div className="ImageHandlersContainer hide">
          <button
            type="button"
            className="ql-image MuiButtonBase-root MuiIconButton-root"
            tabIndex={0}
            title="З комп'ютера"
          />
          <IconButton
            onClick={() => ImageFromURLHandler(editor)}
            title="За посиланням"
            disableRipple
          >
            <CropOriginalIcon
              className="customSVGIcon"
              fontSize="small"
              style={{ width: '18px', height: '18px' }}
            />
          </IconButton>
        </div>
      </span>
    </>
  );
};

export default ImageHandlersContainer;
