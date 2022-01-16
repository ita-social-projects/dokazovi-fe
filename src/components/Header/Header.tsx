import React, { useContext, useState } from 'react';
import { Box, Container, Slide, Toolbar } from '@material-ui/core';
import { useStyles } from './Header.styles';
import i18n, { langTokens } from '../../locales/localizationInit';
import { IHeaderProps } from './types';
import { ScreenContext } from '../../old/provider/MobileProvider/ScreenContext';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { ToolbarMobile } from './ToolbarMobile';
// eslint-disable-next-line import/no-cycle
import { ToolbarDesktop } from './ToolbarDesktop';
import { useActions } from '../../shared/hooks';
import {
  makeHeaderInvisible,
  makeHeaderVisible,
} from '../../models/headerVisibility';

export const navElems: IHeaderProps[] = [
  {
    id: 'main',
    label: i18n.t(langTokens.common.main),
    url: '/',
  },
  {
    id: 'materials',
    label: i18n.t(langTokens.common.materials),
    url: '/materials',
  },
  {
    id: 'experts',
    label: i18n.t(langTokens.common.experts),
    url: '/experts',
  },
];

export const Header: React.FC = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState<boolean>(true);
  const [oldPageOffsetY, setOldPageOffsetY] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { mobile } = useContext(ScreenContext);
  const [boundMakeHeaderVisible, boundMakeHeaderInvisible] = useActions([
    makeHeaderVisible,
    makeHeaderInvisible,
  ]);

  const transitionDuration = {
    enter: 200,
    exit: 200,
  };
  if (mobile) {
    window.onscroll = () => {
      setOldPageOffsetY(visualViewport.pageTop);
      if (visualViewport.pageTop >= oldPageOffsetY) {
        setVisible(false);
        boundMakeHeaderInvisible();
      } else {
        setVisible(true);
        boundMakeHeaderVisible();
      }
    };
  }

  return (
    <Slide in={!mobile || visible} timeout={transitionDuration}>
      <div
        id="header"
        className={mobile ? classes.headerMobile : classes.header}
      >
        <Container className={classes.container}>
          <Toolbar className={classes.toolbarWrapper}>
            <Box
              display="flex"
              className={mobile ? classes.toolbarMobile : classes.toolbar}
            >
              {mobile && (
                <BurgerMenu
                  navigation={navElems}
                  mobileMenuOpen={mobileMenuOpen}
                  setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
                />
              )}
              {mobile ? <ToolbarMobile /> : <ToolbarDesktop />}
            </Box>
          </Toolbar>
        </Container>
      </div>
    </Slide>
  );
};
