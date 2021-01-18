import { Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPostPreviewText,
  setPostPreviewManuallyChanged,
} from '../../../modules/postCreation/store/postCreationSlice';
import { PostTypeEnum } from '../../types';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import { mockUser } from './mock/mockUser';
import { RootStateType } from '../../../store/rootReducer';

export interface IContentPreviewContainerProps {
  previewText: string;
  previewType: PostTypeEnum;
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
  previewType,
}) => {
  const dispatch = useDispatch();
  const { title, preview } = useSelector(
    (state: RootStateType) => state.newPostDraft[previewType],
  );

  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [isTextFieldManualyChanged, setisTextFieldManualyChanged] = useState<
    boolean
  >(false);
  const [isPreviewValid, setIsPreviewValid] = useState<boolean>(true);

  useEffect(() => {
    setTextFieldValue(preview.value);
  }, []);

  useEffect(() => {
    if (!preview.isManuallyChanged) {
      setTextFieldValue(trunkLength(previewText));
    }
  }, [previewText]);

  useEffect(() => {
    setIsPreviewValid(textFieldValue.length <= MAX_LENGTH);
    dispatchPreview(trunkLength(textFieldValue));
  }, [textFieldValue]);

  useEffect(() => {
    if (isTextFieldManualyChanged) {
      dispatchPostPreviewManuallyChanged(true);
    }
  }, [isTextFieldManualyChanged]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const targetValue = e.target.value;

    setisTextFieldManualyChanged(true);
    setTextFieldValue(targetValue);
  };

  const dispatchPostPreviewManuallyChanged = (val: boolean) => {
    dispatch(
      setPostPreviewManuallyChanged({ postType: previewType, value: val }),
    );
  };

  const dispatchPreview = useCallback(
    _.debounce((storedPreview: string) => {
      dispatch(
        setPostPreviewText({
          postType: previewType,
          value: storedPreview,
        }),
      );
    }, 1000),
    [],
  );

  const mockData = {
    ...mockUser,
    title: title || '',
    preview: `${trunkLength(textFieldValue)} ...`,
  };

  //  TODO trunc preview text in PostPreviewCard
  return (
    <>
      <Grid container spacing={2} direction="row" alignItems="stretch">
        <Grid
          item
          container
          xs={12}
          lg={8}
          md={6}
          direction="column"
          alignItems="stretch"
        >
          <Grid item>
            <Typography variant="h4">Текст картки матеріалу:</Typography>
          </Grid>
          <Grid item>
            <TextField
              aria-label="minimum height"
              defaultValue={textFieldValue}
              multiline
              variant="outlined"
              onChange={(e) => {
                onChangeHandler(e);
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
                  `Максимальна довжина тексту ${MAX_LENGTH} символів!`) ||
                `Довжина тексту ${textFieldValue.length}`
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <PostPreviewCard data={mockData} />
        </Grid>
      </Grid>
    </>
  );
};

export default ContentPreviewContainer;
