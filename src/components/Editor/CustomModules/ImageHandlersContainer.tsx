import { IconButton } from '@material-ui/core';
import React from 'react';
import Quill from 'quill';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { useTranslation } from 'react-i18next';
import { UrlInputModal } from './UrlInputModal';
import { langTokens } from '../../../locales/localizationInit';

export interface IImageHandlersContainerProps {
  editor?: Quill;
}

const ImageHandlersContainer: React.FC<IImageHandlersContainerProps> = ({
  editor,
}) => {
  const { t } = useTranslation();

  const handleToggle = () => {
    document.querySelector('.ImageHandlersContainer')?.classList.toggle('hide');
  };

  return (
    <>
      <span className="ql-formats">
        <IconButton
          onClick={handleToggle}
          title={t(langTokens.editor.addImage)}
        >
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
            title={t(langTokens.editor.byComputer)}
          />
          <UrlInputModal editor={editor} />
        </div>
      </span>
    </>
  );
};

export default ImageHandlersContainer;
