import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { Logo } from './Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { navElements } from './navElements';
import { ArticleSearch } from './ArticleSearch';

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
        <ArticleSearch setVisibility={setIsSearchVisible} />
      ) : (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setIsSearchVisible((prev) => !prev)}
        >
          <SearchIcon className={classes.searchIcon} />
        </Button>
      )}
    </>
  );
};
