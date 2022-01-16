/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { Logo } from './Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { navElements } from './navElements';

export const ToolbarMobile = () => {
  const classes = useStyles();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isOnMobile = true;

  return (
    <>
      <BurgerMenu
        navigation={navElements}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
      />
      <Logo mobile={isOnMobile} isSearchVisible={isSearchVisible} />
      {isSearchVisible ? (
        <>
          <div
            className={classes.backdrop}
            onClick={() => setIsSearchVisible(false)}
          />
          <TextField
            fullWidth
            variant="standard"
            className={classes.searchInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.searchInput} />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
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
