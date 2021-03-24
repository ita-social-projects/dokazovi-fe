import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount';
import { MAX_PREVIEW_LENGTH } from '../../constants/editors';

const truncText = (str: string) => {
  return str.slice(0, MAX_PREVIEW_LENGTH);
};

export interface IPreviewInputProps {
  initialPreview: string;
  editorTextContent?: string;
  initialIsManuallyChanged: boolean;
  onPreviewChange: (value: string) => void;
  onManuallyChanged?: () => void;
}

const PreviewInput: React.FC<IPreviewInputProps> = ({
  initialPreview,
  editorTextContent,
  initialIsManuallyChanged,
  onPreviewChange,
  onManuallyChanged,
}) => {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialPreview);
  const [isTextFieldManuallyChanged, setIsTextFieldManuallyChanged] = useState(
    initialIsManuallyChanged,
  );
  const [isPreviewValid, setIsPreviewValid] = useState(
    textFieldValue.length <= MAX_PREVIEW_LENGTH,
  );

  useEffectExceptOnMount(() => {
    const setPreviewFromEditor = () => {
      if (!initialIsManuallyChanged && editorTextContent) {
        setTextFieldValue(truncText(editorTextContent));
      }
    };
    setPreviewFromEditor();
  }, [editorTextContent]);

  useEffectExceptOnMount(() => {
    setIsPreviewValid(textFieldValue.length <= MAX_PREVIEW_LENGTH);
    onPreviewChange(truncText(textFieldValue));
  }, [textFieldValue]);

  const handleManualChange = (value: string) => {
    if (!isTextFieldManuallyChanged) {
      setIsTextFieldManuallyChanged(true);
      if (onManuallyChanged) onManuallyChanged();
    }
    setTextFieldValue(value);
  };

  return (
    <TextField
      aria-label="minimum height"
      value={textFieldValue}
      multiline
      label="Текст картки матеріалу"
      variant="outlined"
      onChange={(e) => {
        handleManualChange(e.target.value);
      }}
      InputProps={{
        inputProps: {
          style: {
            height: '165px',
          },
        },
      }}
      style={{
        width: '100%',
      }}
      error={!isPreviewValid}
      helperText={
        (!isPreviewValid &&
          `Максимальна довжина тексту: ${MAX_PREVIEW_LENGTH} символів!`) ||
        `Довжина тексту: ${textFieldValue.length} символів`
      }
    />
  );
};

export default React.memo(PreviewInput);
