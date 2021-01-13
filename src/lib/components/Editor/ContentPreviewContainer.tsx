import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import { mockUser } from './mock/mockUser';

export interface IContentPreviewContainerProps {
  previewText: string;
}

const MAX_LENGTH = 150;

const trunkLength = (str: string) => {
  if (str.length > MAX_LENGTH) {
    return str.slice(0, MAX_LENGTH);
  }
  return str;
};

const ContentPreviewContainer: React.FC<IContentPreviewContainerProps> = ({
  previewText,
}) => {
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [isTextFieldManualyChanged, setisTextFieldManualyChanged] = useState<
    boolean
  >(false);
  const [isPreviewValid, setIsPreviewValid] = useState<boolean>(true);

  useEffect(() => {
    if (!isTextFieldManualyChanged) {
      setTextFieldValue(trunkLength(previewText));
    }
  }, [textFieldValue, previewText]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setisTextFieldManualyChanged(true);
    setTextFieldValue(e.target.value);
    setIsPreviewValid(true);
  };

  const onKeyPressHandler = () => {
    if (textFieldValue.length === MAX_LENGTH) {
      setIsPreviewValid(false);
    }
  };

  const mockData = { ...mockUser, preview: `${textFieldValue || ''} ...` };
  //  TODO trunc preview text in PostPreviewCard
  return (
    <>
      <Grid container spacing={2} direction="row" alignItems="flex-start">
        <Grid item xs={12} lg={8} md={6}>
          <TextField
            aria-label="minimum height"
            defaultValue={textFieldValue}
            multiline
            variant="outlined"
            onChange={(e) => {
              onChangeHandler(e);
            }}
            onKeyPress={() => {
              onKeyPressHandler();
            }}
            InputProps={{
              inputProps: {
                maxLength: MAX_LENGTH,
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
                `Максимальна довжина тексту ${MAX_LENGTH} символів!`) ||
              `Довжина тексту ${textFieldValue.length}`
            }
          />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <PostPreviewCard data={mockData} />
        </Grid>
      </Grid>
    </>
  );
};

export default ContentPreviewContainer;
