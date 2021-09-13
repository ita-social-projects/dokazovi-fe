import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useEffectExceptOnMount } from '../../old/lib/hooks/useEffectExceptOnMount';
import { MAX_PREVIEW_LENGTH } from '../../old/lib/constants/editors';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from '../../views/postCreation/RequiredFieldsStyle';

const truncText = (str: string) => {
  return str.slice(0, MAX_PREVIEW_LENGTH);
};

export interface IPreviewInputProps {
  initialPreview: string;
  editorTextContent?: string;
  initialWasManuallyChanged: boolean;
  onPreviewChange: (value: string) => void;
  onManuallyChanged?: () => void;
  disableAutoChanges?: () => void;
}

const PreviewInput: React.FC<IPreviewInputProps> = ({
  initialPreview,
  editorTextContent,
  initialWasManuallyChanged,
  onPreviewChange,
  onManuallyChanged,
  disableAutoChanges,
}) => {
  const { t } = useTranslation();

  const [textFieldValue, setTextFieldValue] = useState<string>(initialPreview);
  const [isTextFieldManuallyChanged, setIsTextFieldManuallyChanged] = useState(
    initialWasManuallyChanged,
  );
  const [isPreviewValid, setIsPreviewValid] = useState(
    textFieldValue.length <= MAX_PREVIEW_LENGTH,
  );

  useEffectExceptOnMount(() => {
    setIsPreviewValid(textFieldValue.length <= MAX_PREVIEW_LENGTH);
    onPreviewChange(truncText(textFieldValue));
  }, [textFieldValue]);

  const handleManualChange = (value: string) => {
    if (!isTextFieldManuallyChanged) {
      setIsTextFieldManuallyChanged(true);
      if (onManuallyChanged) onManuallyChanged();
    }
    if (disableAutoChanges) {
      disableAutoChanges();
    }
    setTextFieldValue(value);
  };

  const classes = useStyle();

  return (
    <TextField
      data-testid="preview-input"
      aria-label="minimum height"
      value={textFieldValue}
      multiline
      label={t(langTokens.editor.materialCardText)}
      variant="outlined"
      onChange={(e) => {
        handleManualChange(e.target.value);
      }}
      InputLabelProps={{
        classes: { formControl: classes.requiredAuthorField },
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
          `${t(langTokens.editor.maxTextlength, {
            count: MAX_PREVIEW_LENGTH,
          })}!`) ||
        t(langTokens.editor.textLength, { count: textFieldValue.length })
      }
    />
  );
};

export default React.memo(PreviewInput);
