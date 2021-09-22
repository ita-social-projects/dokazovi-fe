/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Slide } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './NewestMobileStyle';
import { useActions } from '../../shared/hooks';
import {
  fetchNewestMobile,
  selectMobileMaterials,
} from '../../models/newestPostsMobile';
import { PostsList } from '../../old/lib/components/Posts/PostsList';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

interface IPageTopParameters {
  '0': number;
  '1': number;
  '2': number;
  '3': number;
}

export const NewestMobile: React.FC = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  const headerAndCarouselHeight = 722;
  const [value, setValue] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [oldPageOffsetY, setOldPageOffsetY] = useState<number>(0);
  const [type, setType] = useState<'click' | 'swipe' | ''>('');
  const [pageTop, setPageTop] = useState<IPageTopParameters>({
    '0': headerAndCarouselHeight,
    '1': headerAndCarouselHeight,
    '2': headerAndCarouselHeight,
    '3': headerAndCarouselHeight,
  });

  const history = useHistory();
  const [boundFetchMobileMaterials] = useActions([fetchNewestMobile]);
  const content = useSelector(selectMobileMaterials);

  useEffect(() => {
    boundFetchMobileMaterials();
  }, []);

  window.onscroll = () => {
    setOldPageOffsetY(visualViewport.pageTop);
    if (
      visualViewport.pageTop > oldPageOffsetY &&
      visualViewport.pageTop > headerAndCarouselHeight
    ) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const saveViewPort = () => {
    setPageTop((p) => {
      const temp = { ...p };
      temp[value] = visualViewport.pageTop;
      return temp;
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (visualViewport.pageTop >= headerAndCarouselHeight) {
      saveViewPort();
    }
    setValue(newValue);
    setType('click');
  };

  const handleChangeIndex = (index: number) => {
    if (visualViewport.pageTop >= headerAndCarouselHeight) {
      saveViewPort();
    }
    setValue(index);
    setType('swipe');
  };

  const selectType = (fieldName) => {
    switch (fieldName) {
      case 'expertOpinion':
        return t(langTokens.experts.expertOpinion_3);
      case 'translation':
        return t(langTokens.common.transition_3);
      case 'media':
        return t(langTokens.common.media_1);
      case 'video':
        return t(langTokens.common.video_1);
      default:
        return '';
    }
  };

  const redirect = (fieldName) => {
    switch (fieldName) {
      case 'expertOpinion':
        history.push('/materials?origins=1');
        break;
      case 'translation':
        history.push('/materials?origins=3');
        break;
      case 'media':
        history.push('/materials?origins=2');
        break;
      case 'video':
        history.push('/materials?origins=0&types=2');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (type === 'swipe' && visualViewport.pageTop >= headerAndCarouselHeight) {
      window.scrollTo({
        top: pageTop[value],
      });
    }
    if (type === 'click' && visualViewport.pageTop >= headerAndCarouselHeight) {
      window.scrollTo({
        top: headerAndCarouselHeight,
      });
    }
  }, [value]);

  const transitionDuration = {
    enter: 200,
    exit: 200,
  };

  return (
    <>
      <div>
        <Slide in={visible} timeout={transitionDuration}>
          <AppBar
            className={classes.sticky}
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
        </Slide>
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
                  <PostsList postsList={posts.postDTOS} />
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      onClick={() => redirect(posts.fieldName)}
                    >
                      {t(langTokens.materials.goToAll, {
                        material: selectType(posts.fieldName),
                      })}
                    </Button>
                  </div>
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
