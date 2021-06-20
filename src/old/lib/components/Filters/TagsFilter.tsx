/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { RootStateType } from '../../../../models/rootReducer';
import { IPostTag } from '../../types';
import { fetchPostsTags } from '../../../../models/properties/asyncActions';
import { langTokens } from '../../../../locales/localizationInit';

export interface IPostTagsFilterProps {
  onTagsChange(tags: string[]): void;
}

export const PostTagsFilter: React.FC<IPostTagsFilterProps> = ({
  onTagsChange,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const postTags = useSelector(
    (state: RootStateType) => state.properties.postTags,
  );

  const handlerFilters = useCallback(
    _.debounce((selectedTags: string[]) => {
      dispatch(onTagsChange(selectedTags));
    }, 500),
    [],
  );

  const handlerTags = useCallback(
    _.debounce((inputValue) => {
      if (inputValue) {
        dispatch(fetchPostsTags(inputValue));
      }
    }, 500),
    [],
  );

  const handleSelectedFilters = (event, selectedTags: IPostTag[]) => {
    const postSelectedTags = selectedTags.reduce(
      (acc: string[], next: IPostTag) => [...acc, next.id.toString()],
      [],
    );
    handlerFilters(postSelectedTags);
  };

  const handleTagsFetch = (event, inputValue: string) => {
    handlerTags(inputValue);
  };

  return (
    <form>
      <Autocomplete
        multiple
        limitTags={5}
        id="multiple-limit-tags"
        options={postTags}
        getOptionLabel={(option: IPostTag) => option.tag}
        style={{ width: 400 }}
        onChange={(event, selectedTags) =>
          handleSelectedFilters(event, selectedTags)
        }
        onInputChange={(event, inputValue) =>
          handleTagsFetch(event, inputValue)
        }
        noOptionsText={t(langTokens.common.noTagsFound)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(langTokens.common.enterTagName)}
            variant="outlined"
          />
        )}
      />
    </form>
  );
};
