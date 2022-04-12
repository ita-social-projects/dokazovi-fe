import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { Logo } from './Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { navElements } from './navElements';
import { ArticleSearch } from './ArticleSearch';

import { IPostsOBJ } from '../../models/adminLab/types';
import { IPost } from '../../old/lib/types';

// interface IPostTitleId {
//   id: number;
//   title: string;
// }

// interface IToolbarMobile {
//   // setInput: React.Dispatch<React.SetStateAction<string>>;
//   setInput: (...params: any[]) => void;
//   posts?: IPostsOBJ;
//   postIds?: number[];
//   titles: IPostTitleId[];
// }

export const ToolbarMobile = () => {
  const classes = useStyles();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  // const loading = open && titles.length === 0;
  // const [value, setValue] = useState<string>('');

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setInput({
  //       field: 'title',
  //       text: value,
  //     });
  //     console.log(titles);
  //   }, 400);

  //   return () => clearTimeout(timer);
  // }, [value, setInput]);

  // // useEffect(() => {
  // //   if (!open) {
  // //     setOptions([]);
  // //   }
  // // }, [open]);

  // const theValue = value;

  // function handleChange(
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  // ) {
  //   if (event.target.value !== "" || event.target.value !== null) {
  //     console.log(event.target.value);
  //     setValue(event.target.value);
  //   }
  // }

  return (
    <>
      <BurgerMenu
        navigation={navElements}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
      />
      <Logo isOnMobile isSearchVisible={isSearchVisible} />
      {isSearchVisible ? (
        <>
          <ArticleSearch setVisibility={setIsSearchVisible} />
          {/* <ClickAwayListener onClickAway={() => setIsSearchVisible(false)}>
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
          </ClickAwayListener> */}
        </>
      ) : (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => setIsSearchVisible((prev) => !prev)}
          >
            <SearchIcon className={classes.searchIcon} />
          </Button>
        </>
      )}
    </>
  );
};
