/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { RootStateType } from '../../../store/rootReducer';
import { FilterTypeEnum, IPostTag } from '../../../lib/types';
import { setPostFilters } from '../store/directionSlice';
import { fetchPostsTags } from '../../../store/propertiesSlice';

export interface IPostTagsFilterProps {
  directionName: string;
}

export const PostTagsFilter: React.FC<IPostTagsFilterProps> = ({
  directionName,
}) => {
  const dispatch = useDispatch();
  const postTags = useSelector(
    (state: RootStateType) => state.properties.postTags,
  );

  const handlerFilters = useCallback(
    _.debounce((selectedTags: string[]) => {
      dispatch(
        setPostFilters({
          key: FilterTypeEnum.TAGS,
          filters: {
            value: selectedTags,
          },
          directionName,
        }),
      );
    }, 500),
    [],
  );

  const handlerTags = useCallback(
    _.debounce((inputValue) => {
      dispatch(fetchPostsTags(inputValue));
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
        onInputChange={(event, inputValue) => handleTagsFetch(event, inputValue)}
        noOptionsText="Тегів не знайдено"
        renderInput={(params) => (
          <TextField {...params} label="Введіть назву тега" variant="outlined" />
        )}
      />
    </form>
  );
};
