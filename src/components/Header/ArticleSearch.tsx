import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useActions } from '../../shared/hooks';

import { useStyles } from './Header.styles';
import {
  setField,
  selectAdminLab,
  getMaterialsAction,
  selectMeta,
} from '../../models/adminLab';
import { useEffectExceptOnMount } from '../../old/lib/hooks/useEffectExceptOnMount';

import { IPostsOBJ } from '../../models/adminLab/types';
import { IPost } from '../../old/lib/types';

interface IArticleSearch {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOptions {
  id: number;
  title: string;
}

export const ArticleSearch: React.FC<IArticleSearch> = ({ setVisibility }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const theValue = value;
  const initialOptions = [
    {
      id: 1,
      title: 'foo',
    },
    {
      id: 2,
      title: 'baz',
    },
    {
      id: 3,
      title: 'bar',
    },
  ];
  const [options, setOptions] = useState<IOptions[]>(initialOptions);
  const loading = open && options.length === 0;

  const [boundedSetField, boundedGetMaterialsAction] = useActions([
    setField,
    getMaterialsAction,
  ]);

  const meta = useSelector(selectMeta);
  useEffectExceptOnMount(boundedGetMaterialsAction, [meta]);

  const { postIds, posts } = useSelector(selectAdminLab);

  useEffect(() => {
    const titles = postIds.map((postId) => {
      const { id, title } = { ...posts[postId] };
      return { id, title };
    });
    setOptions(titles);
    console.log();
  }, [meta]);

  // setOptions(postIds.map((postId) => {
  //   return { id: posts[postId].id, title: posts[postId].title };
  // }));

  useEffect(() => {
    const timer = setTimeout(() => {
      boundedSetField({
        field: 'title',
        text: value,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, boundedSetField]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    if (event.target.value !== '' || event.target.value !== null) {
      setValue(event.target.value);
    }
  }

  return (
    // <ClickAwayListener onClickAway={() => setVisibility(false)}>
    <Autocomplete
      // filterOptions={(x) => x}
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      options={topFilms.map((option) => option.title)}
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
    // </ClickAwayListener>
  );
};
