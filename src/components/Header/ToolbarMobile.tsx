import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { Logo } from './Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { navElements } from './navElements';

interface IToolbarMobile {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const ToolbarMobile: React.FC<IToolbarMobile> = ({ setInput }) => {
  const classes = useStyles();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setInput(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, setInput]);

  const theValue = value;

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    setValue(event.target.value);
  }

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
          <ClickAwayListener onClickAway={() => setIsSearchVisible(false)}>
            <TextField
              fullWidth
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
          </ClickAwayListener>
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
