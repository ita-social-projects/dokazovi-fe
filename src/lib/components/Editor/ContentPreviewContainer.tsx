import { Grid, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import { mockUser } from './mock/mockUser';

export interface IContentPreviewContainerProps {
  previewText: string;
}

const MAX_LENGTH = 146;

const trunkLength = (str: string) => {
  if (str.length > MAX_LENGTH) {
    return str.slice(0, MAX_LENGTH);
  }
  return str;
};

const ContentPreviewContainer: React.FC<IContentPreviewContainerProps> = ({
  previewText,
}) => {
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const [isTextAreaManualyChanged, setisTextAreaManualyChanged] = useState<
    boolean
  >(false);

  useEffect(() => {
    if (!isTextAreaManualyChanged) {
      setTextAreaValue(trunkLength(previewText));
    }
  }, [textAreaValue, previewText]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setisTextAreaManualyChanged(true);
    setTextAreaValue(e.target.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length === MAX_LENGTH) {
      alert('Максимальна довжина тексту 150 символів!');
    }
  };

  const mockData = { ...mockUser, preview: `${textAreaValue || ''} ...` };
  //  TODO trunc preview text in PostPreviewCard
  return (
    <>
      <Grid container spacing={2} direction="row" alignItems="flex-start">
        <Grid item xs={12} lg={8} md={6}>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={19}
            defaultValue={textAreaValue}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            onKeyPress={(e) => {
              onKeyPressHandler(e);
            }}
            maxLength={MAX_LENGTH}
            style={{ width: '100%', border: '1px solid #ccc' }}
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
