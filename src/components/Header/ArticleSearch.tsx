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
import { RootStateType } from '../../models/rootReducer';

// import { IPostsOBJ } from '../../models/adminLab/types';
// import { IPost } from '../../old/lib/types';

interface IArticleSearch {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOptions {
  id: number;
  title: string;
}

const getOptions = (state: RootStateType) => {
  const { posts } = selectAdminLab(state);

  return Object.values(posts).map((post) => post.title);
};

export const ArticleSearch: React.FC<IArticleSearch> = ({ setVisibility }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const [boundedSetField, boundedGetMaterialsAction] = useActions([
    setField,
    getMaterialsAction,
  ]);

  const meta = useSelector(selectMeta);

  useEffectExceptOnMount(boundedGetMaterialsAction, [meta]);

  const options = useSelector(getOptions);

  useEffect(() => {
    const timer = setTimeout(() => {
      boundedSetField({
        field: 'title',
        text: value,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, boundedSetField]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (event.target.value !== '' || event.target.value !== null) {
      setValue(event.target.value);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setVisibility(false)}>
      <Autocomplete
        filterOptions={(x) => x}
        fullWidth
        disableClearable
        freeSolo
        options={options}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            value={meta.textFields.title}
            variant="standard"
            className={classes.searchInput}
            onChange={(event) => handleChange(event)}
            InputProps={{
              ...params.InputProps,
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
