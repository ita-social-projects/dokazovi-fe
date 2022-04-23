import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';
import { useActions } from 'shared/hooks';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { useEffectExceptOnMount } from '../../old/lib/hooks/useEffectExceptOnMount';
import { fetchPostsByTitle } from './fetchPostsByTitle';
import { searchTitle } from '../../models/materials/reducers';
import { selectMaterials } from '../../models/materials';

// import { IPostsOBJ } from '../../models/adminLab/types';
// import { IPost } from '../../old/lib/types';

interface IArticleSearch {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOption {
  id: number;
  title: string;
}

export const ArticleSearch: React.FC<IArticleSearch> = ({ setVisibility }) => {
  const classes = useStyles();
  const history = useHistory();
  const [boundedSearchTitle] = useActions([searchTitle]);
  const [postOptions, setPostOptions] = useState<IOption[]>([]);
  const [title, setTitle] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
  };

  useEffectExceptOnMount(() => {
    if (!title) {
      setPostOptions([]);
      return;
    }
    const getTitles = async () => {
      const posts = await fetchPostsByTitle(title);
      const titleOptions = posts.map((post) => {
        const { id, title: titleOption } = post;
        return { id, title: titleOption };
      });
      setPostOptions(titleOptions);
    };
    getTitles();
  }, [title]);

  const handlePickOption = (e, value) => {
    history.push(`/posts/${value.id}`);
    setVisibility(false);
    boundedSearchTitle({ title: '' });
  };

  const handleSearch = () => {
    if (!title) return;
    setVisibility(false);
    boundedSearchTitle({ title });
    history.push(`/materials/search`);
  };

  const handleClickAway = () => {
    boundedSearchTitle({ title: '' });
    setVisibility(false);
  };

  const PopperMy = (props) => {
    return (
      <Popper
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          marginTop: '22px',
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      />
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={classes.searchInputWrapper}>
        <Autocomplete
          filterOptions={(x) => x}
          fullWidth
          disableClearable
          freeSolo
          options={postOptions}
          PopperComponent={PopperMy}
          getOptionLabel={(option: IOption) => option.title}
          onChange={(e, value) => handlePickOption(e, value)}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              value={title}
              variant="standard"
              className={classes.searchInput}
              onChange={(event) => handleInputChange(event)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <SearchIcon
                      className={classes.searchInputIcon}
                      onClick={handleSearch}
                    />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          )}
        />
      </Box>
    </ClickAwayListener>
  );
};
