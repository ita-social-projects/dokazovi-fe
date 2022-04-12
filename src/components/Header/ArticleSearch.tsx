import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { useActions } from '../../shared/hooks';

import { useStyles } from './Header.styles';
import {
  setField,
  selectAdminLab,
  getMaterialsAction,
  selectMeta,
} from '../../models/adminLab';
import { useEffectExceptOnMount } from '../../old/lib/hooks/useEffectExceptOnMount';

// import { IPostsOBJ } from '../../models/adminLab/types';
// import { IPost } from '../../old/lib/types';

interface IArticleSearch {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArticleSearch: React.FC<IArticleSearch> = ({ setVisibility }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const [
    // boundMakeHeaderVisible,
    // boundMakeHeaderInvisible,
    boundedSetField,
    boundedGetMaterialsAction,
  ] = useActions([
    // makeHeaderVisible,
    // makeHeaderInvisible,
    setField,
    getMaterialsAction,
  ]);

  const meta = useSelector(selectMeta);
  useEffectExceptOnMount(() => boundedGetMaterialsAction(), [meta]);

  const { postIds, posts } = useSelector(selectAdminLab);

  const titles = postIds.map((postId) => {
    return { id: posts[postId].id, title: posts[postId].title };
  });
  const loading = open && titles.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      boundedSetField({
        field: 'title',
        text: value,
      });
      console.log(titles);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, boundedSetField]);

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  const theValue = value;

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    if (event.target.value !== '' || event.target.value !== null) {
      console.log(event.target.value);
      setValue(event.target.value);
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setVisibility(false)}>
      <Autocomplete
        // filterOptions={(x) => x}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={titles.map((title) => title.title)}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            // fullWidth
            value={theValue}
            variant="standard"
            className={classes.searchInput}
            onChange={(event) => handleChange(event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.searchInputIcon} />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        )}
      />
    </ClickAwayListener>
  );
};
