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

  const [value, setValue] = useState(0);

  const [boundFetchMobileMaterials] = useActions([fetchNewestMobile]);
  const content = useSelector(selectMobileMaterials);

  useEffect(() => {
    boundFetchMobileMaterials();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
