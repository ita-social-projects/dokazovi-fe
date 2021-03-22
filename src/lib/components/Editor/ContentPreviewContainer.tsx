import { Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPostPreviewText,
  setPostPreviewManuallyChanged,
} from '../../../modules/postCreation/store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../types';
import { RootStateType } from '../../../store/rootReducer';
import usePostPreviewData from '../../hooks/usePostPreviewData';
import PostPreviewCard from '../Posts/Cards/PostPreviewCard';

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

const ContentPreviewContainer: React.FC<IContentPreviewContainerProps> = ({
  previewText,
  previewType,
  previewCardType,
}) => {
  const dispatch = useDispatch();
  const { preview, directions: postDirections, title } = useSelector(
    (state: RootStateType) => state.newPostDraft[previewType],
  );

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const [textFieldValue, setTextFieldValue] = useState('');
  const [isTextFieldManualyChanged, setisTextFieldManualyChanged] = useState(
    false,
  );
  const [isPreviewValid, setIsPreviewValid] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<IDirection[]>([]);

  useEffect(() => {
    setTextFieldValue(preview.value);
  }, [preview]);

  useEffect(() => {
    setSelectedTopics(postDirections);
  }, [postDirections, allDirections]);

  useEffect(() => {
    if (!preview.isManuallyChanged) {
      setTextFieldValue(trunkLength(previewText));
    }
  }, [previewText, preview]);

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

  useEffect(() => {
    setIsPreviewValid(textFieldValue.length <= MAX_LENGTH);
    dispatchPreview(trunkLength(textFieldValue));
  }, [textFieldValue, dispatchPreview]);

  useEffect(() => {
    const dispatchPostPreviewManuallyChanged = (val: boolean) => {
      dispatch(
        setPostPreviewManuallyChanged({ postType: previewType, value: val }),
      );
    };
    if (isTextFieldManualyChanged) {
      dispatchPostPreviewManuallyChanged(true);
    }
  }, [isTextFieldManualyChanged, previewType]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const targetValue = e.target.value;

    setisTextFieldManualyChanged(true);
    setTextFieldValue(targetValue);
  };

  const getUserData = usePostPreviewData();

  const cardPreviewData: IPost = {
    ...getUserData,
    title: title || '',
    type: { id: 0, name: previewCardType },
    directions: selectedTopics,
    preview: `${trunkLength(textFieldValue)}`,
  };

  //  TODO trunc preview text in PostPreviewCard
  return (
    <>
      <Grid container direction="row" alignItems="stretch">
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
          <PostPreviewCard post={cardPreviewData} shouldNotUseLink />
        </Grid>
      </Grid>
    </>
  );
};

export default ContentPreviewContainer;
