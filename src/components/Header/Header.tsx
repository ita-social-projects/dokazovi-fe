import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Slide } from '@material-ui/core';
import { useStyles } from './Header.styles';
import { ScreenContext } from '../../old/provider/MobileProvider/ScreenContext';
import { ToolbarMobile } from './ToolbarMobile';
import { ToolbarDesktop } from './ToolbarDesktop';
import { useActions } from '../../shared/hooks';
import {
  makeHeaderInvisible,
  makeHeaderVisible,
} from '../../models/headerVisibility';
import {
  setField,
  selectAdminLab,
  getMaterialsAction,
  selectMeta,
} from '../../models/adminLab';
import { useEffectExceptOnMount } from '../../old/lib/hooks/useEffectExceptOnMount';

export const Header: React.FC = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState<boolean>(true);
  const [oldPageOffsetY, setOldPageOffsetY] = useState<number>(0);
  const { mobile } = useContext(ScreenContext);
  const [
    boundMakeHeaderVisible,
    boundMakeHeaderInvisible,
    boundedSetField,
    boundedGetMaterialsAction,
  ] = useActions([
    makeHeaderVisible,
    makeHeaderInvisible,
    setField,
    getMaterialsAction,
  ]);
  const meta = useSelector(selectMeta);
  useEffectExceptOnMount(() => boundedGetMaterialsAction(), [meta]);

  const { postIds, posts } = useSelector(selectAdminLab);

  // const [searchInputValue, setSearchInputValue] = useState<string>('');

  if (mobile) {
    window.onscroll = () => {
      setOldPageOffsetY(visualViewport.pageTop);

      if (visualViewport.pageTop >= oldPageOffsetY && visible) {
        setVisible(false);
        boundMakeHeaderInvisible();
      }
      if (visualViewport.pageTop <= oldPageOffsetY && !visible) {
        setVisible(true);
        boundMakeHeaderVisible();
      }
    };
  }

  return (
    <Slide in={!mobile || visible} timeout={{ enter: 200, exit: 200 }}>
      <div
        id="header"
        className={mobile ? classes.headerMobile : classes.header}
      >
        <Container className={classes.container}>
          {mobile ? (
            <ToolbarMobile setInput={boundedSetField} />
          ) : (
            <ToolbarDesktop />
          )}
        </Container>
      </div>
    </Slide>
  );
};
