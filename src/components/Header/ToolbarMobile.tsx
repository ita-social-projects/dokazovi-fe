import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { Logo } from './Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { navElements } from './navElements';

export const ToolbarMobile: React.FC = () => {
  const classes = useStyles();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
              variant="standard"
              className={classes.searchInput}
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
