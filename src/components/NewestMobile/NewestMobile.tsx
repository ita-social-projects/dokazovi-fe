import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './NewestMobileStyle';
import { useActions } from '../../shared/hooks';
import {
  fetchNewestMobile,
  selectMobileMaterials,
} from '../../models/newestPostsMobile';
import { AutoPaginationPostList } from '../AutoPaginationPostList/AutoPaginationPostList';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

export const NewestMobile: React.FC = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  const [value, setValue] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [oldPageOffsetY, setOldPageOffsetY] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [type, setType] = useState('');
  const [pageTop, setPageTop] = useState({
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
  });

  const [boundFetchMobileMaterials] = useActions([fetchNewestMobile]);
  const content = useSelector(selectMobileMaterials);

  useEffect(() => {
    boundFetchMobileMaterials();
  }, []);

  window.onscroll = () => {
    setOldPageOffsetY(visualViewport.pageTop);
    if (visualViewport.pageTop < oldPageOffsetY) {
      setVisible(true);
    } else setVisible(false);
  };

  const saveViewPort = () => {
    setPageTop((p) => {
      const temp = { ...p };
      temp[lastIndex] = visualViewport.pageTop;
      return temp;
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    saveViewPort();
    setLastIndex(newValue);
    setValue(newValue);
    setType('click');
  };

  const handleChangeIndex = (index: number) => {
    saveViewPort();
    setLastIndex(index);
    setValue(index);
    setType('swipe');
  };

  useEffect(() => {
    if (type === 'swipe') window.scrollTo(0, pageTop[value]);
    if (type === 'click') window.scrollTo(0, 0);
  }, [value]);

  return (
    <>
      <div>
        <AppBar
          className={`${visible ? classes.sticky : null}`}
          classes={{ root: classes.appBarRoot }}
          position="static"
          color="default"
        >
          <Tabs
            classes={{
              root: classes.buttonsRoot,
              indicator: classes.indicator,
            }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              label={t(langTokens.experts.expertOpinion_1)}
              {...a11yProps(0)}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              label={t(langTokens.common.translation)}
              {...a11yProps(1)}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              label={t(langTokens.common.media)}
              {...a11yProps(2)}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              label={t(langTokens.common.video)}
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>
        {content.length ? (
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={handleChangeIndex}
            className={classes.content}
          >
            {content.map((posts, index) => {
              return (
                <div
                  key={posts.fieldName}
                  role="tabpanel"
                  id={`full-width-tabpanel-${index}`}
                  aria-labelledby={`full-width-tab-${index}`}
                >
                  <AutoPaginationPostList posts={posts.postDTOS} />
                </div>
              );
            })}
          </SwipeableViews>
        ) : (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};
