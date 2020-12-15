import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { RootStateType } from '../../../store/rootReducer';
import { FilterTypeEnum, IPostTag } from '../../../lib/types';
import { setPostFilters } from '../store/directionSlice';

export interface IPostTagsFilterProps {
  directionName: string;
}

export const PostTagsFilter: React.FC<IPostTagsFilterProps> = ({directionName}) => {
  const dispatch = useDispatch();
  const postTags = useSelector(
    (state: RootStateType) => state.properties.postTags,
  );

  const handler = useCallback(
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
    }, 2000),
    [],
  );

  const handleChange = (event, tags: IPostTag[]) => {
    const postSelectedTags = tags.reduce(
      (acc: string[], next: IPostTag) => [...acc, next.id.toString()],
      [],
    );
      handler(postSelectedTags);
  };
  return (
    <form>
      <Autocomplete
        multiple
        limitTags={5}
        id="multiple-limit-tags"
        options={postTags}
        getOptionLabel={(option: IPostTag) => option.tag}
        style={{ width: 300 }}
        onChange={(event, tags) => handleChange(event, tags)}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Теги" variant="outlined" />
        )}
      />
    </form>
  );
};
