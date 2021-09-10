/* eslint-disable @typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-call */
import React, { useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './NewestMobileStyle';
import { PostsList } from '../../old/lib/components/Posts/PostsList';
import { useActions } from '../../shared/hooks';
import {
  fetchNewestMobile,
  selectMobileMaterials,
} from '../../models/newestPostsMobile';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

export const NewestMobile = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const [value, setValue] = useState(0);
  const [page, setPage] = useState(4);

  const [boundFetchMobileMaterials] = useActions([fetchNewestMobile]);
  const content = useSelector(selectMobileMaterials);

  useEffect(() => {
    boundFetchMobileMaterials();
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      });
      observer.current.observe(lastElement.current);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  if (content.length) {
    console.log(content[0].postDTOS.slice(0, page));
  }
  return (
    <>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              classes={classes}
              label={t(langTokens.experts.expertOpinion_1)}
              {...a11yProps(0)}
            />
            <Tab
              classes={classes}
              label={t(langTokens.common.translation)}
              {...a11yProps(1)}
            />
            <Tab
              classes={classes}
              label={t(langTokens.common.media)}
              {...a11yProps(2)}
            />
            <Tab
              classes={classes}
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
            <div
              role="tabpanel"
              id="full-width-tabpanel-0"
              aria-labelledby="full-width-tab-0"
            >
              <PostsList
                postsList={
                  content[0]?.postDTOS && content[0].postDTOS.slice(0, page)
                }
              />
              <div ref={lastElement} style={{ height: 1 }} />
            </div>
            <div
              role="tabpanel"
              id="full-width-tabpanel-1"
              aria-labelledby="full-width-tab-1"
            >
              <PostsList
                postsList={
                  content[1]?.postDTOS && content[1].postDTOS.slice(0, page)
                }
              />
              <div ref={lastElement} style={{ height: 1 }} />
            </div>
            <div
              role="tabpanel"
              id="full-width-tabpanel-2"
              aria-labelledby="full-width-tab-2"
            >
              <PostsList
                postsList={
                  content[2]?.postDTOS && content[2].postDTOS.slice(0, page)
                }
              />
              <div ref={lastElement} style={{ height: 1 }} />
            </div>
            <div
              role="tabpanel"
              id="full-width-tabpanel-3"
              aria-labelledby="full-width-tab-3"
            >
              <PostsList
                postsList={
                  content[3]?.postDTOS && content[3].postDTOS.slice(0, page)
                }
              />
              <div ref={lastElement} style={{ height: 1 }} />
            </div>
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
