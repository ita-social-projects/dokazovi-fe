import { Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPostPreviewText,
  setPostPreviewManuallyChanged,
} from '../../../modules/postCreation/store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../types';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import { RootStateType } from '../../../store/rootReducer';
import usePostPreviewData from '../../hooks/usePostPreviewData';

export interface IContentPreviewContainerProps {
  previewText: string;
  previewType: PostTypeEnum;
  previewCardType: string;
}

const MAX_LENGTH = 150;

const trunkLength = (str: string) => {
  if (str.length > MAX_LENGTH) {
    return str.slice(0, MAX_LENGTH);
  }
  return str;
};

const getSelectedTopics = (
  selectedTopicsIds: string[],
  directions: IDirection[],
) => {
  return selectedTopicsIds.reduce((acc, id) => {
    const direction = directions.find((d) => String(d.id) === id);
    if (direction) {
      return [...acc, direction];
    }
    return acc;
  }, [] as IDirection[]);
};

const ContentPreviewContainer: React.FC<IContentPreviewContainerProps> = ({
  previewText,
  previewType,
  previewCardType,
}) => {
  const dispatch = useDispatch();
  const { title, preview, topics } = useSelector(
    (state: RootStateType) => state.newPostDraft[previewType],
  );

  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );

  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [isTextFieldManualyChanged, setisTextFieldManualyChanged] = useState<
    boolean
  >(false);
  const [isPreviewValid, setIsPreviewValid] = useState<boolean>(true);
  const [selectedTopics, setSelectedTopics] = useState<IDirection[]>();

  useEffect(() => {
    setTextFieldValue(preview.value);
  }, []);

  useEffect(() => {
    setSelectedTopics(getSelectedTopics(topics, directions));
  }, [topics]);

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

  const getUserData = usePostPreviewData();

  const cardPreviewData: IPost = {
    ...getUserData,
    title: title || '',
    postType: { id: 0, name: previewCardType },
    directions: selectedTopics,
    preview: `${trunkLength(textFieldValue)}`,
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
          <PostPreviewCard data={cardPreviewData} />
        </Grid>
      </Grid>
    </>
  );
};

export default ContentPreviewContainer;
