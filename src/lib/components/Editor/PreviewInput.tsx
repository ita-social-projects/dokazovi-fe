import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount';

const MAX_LENGTH = 150;

const trunkLength = (str: string) => {
  if (str.length > MAX_LENGTH) {
    return str.slice(0, MAX_LENGTH);
  }
  return str;
};

export interface IPreviewInputProps {
  initialPreview: string;
  editorContent?: string;
  initialIsManuallyChanged: boolean;
  dispatchPreview: (value: string) => void;
  dispatchIsManuallyChanged?: () => void;
}

const PreviewInput: React.FC<IPreviewInputProps> = ({
  initialPreview,
  editorContent,
  initialIsManuallyChanged,
  dispatchPreview,
  dispatchIsManuallyChanged,
}) => {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialPreview);
  const [isTextFieldManuallyChanged, setIsTextFieldManuallyChanged] = useState(
    initialIsManuallyChanged,
  );
  const [isPreviewValid, setIsPreviewValid] = useState(
    textFieldValue.length <= MAX_LENGTH,
  );

  useEffectExceptOnMount(() => {
    const setPreviewFromEditor = () => {
      if (!initialIsManuallyChanged && editorContent) {
        setTextFieldValue(trunkLength(editorContent));
      }
    };
    setPreviewFromEditor();
  }, [editorContent]);

  useEffectExceptOnMount(() => {
    setIsPreviewValid(textFieldValue.length <= MAX_LENGTH);
    dispatchPreview(trunkLength(textFieldValue));
  }, [textFieldValue, dispatchPreview]);

  const onManualChange = (value: string) => {
    if (!isTextFieldManuallyChanged) {
      setIsTextFieldManuallyChanged(true);
      if (dispatchIsManuallyChanged) dispatchIsManuallyChanged();
    }
    setTextFieldValue(value);
  };

  return (
    <>
      <Grid item>
        <Typography variant="h4">Текст картки матеріалу:</Typography>
      </Grid>
      <Grid item>
        <TextField
          aria-label="minimum height"
          value={textFieldValue}
          multiline
          variant="outlined"
          onChange={(e) => {
            onManualChange(e.target.value);
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
              `Максимальна довжина тексту: ${MAX_LENGTH} символів!`) ||
            `Довжина тексту: ${textFieldValue.length} символів`
          }
        />
      </Grid>
    </>
  );
};

export default React.memo(PreviewInput);
