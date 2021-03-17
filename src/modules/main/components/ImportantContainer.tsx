import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import Carousel from '../../../lib/components/Carousel/Carousel';
import LoadingInfo from '../../../lib/components/Loading/LoadingInfo';
import { PostCard } from '../../../lib/components/Posts/Cards/PostCard';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from '../styles/ImportantContainer.style';
import {
  fetchImportantPosts,
  setImportantLoadingStatus,
} from '../store/mainSlice';
import { selectPostsByIds } from '../../../store/selectors';

const ImportantContainer: React.FC = () => {
  const classes = useStyles();
  const {
    importantPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.important);
  const importantPosts = selectPostsByIds(importantPostIds);

  const slidesToShow = 3;

  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchAction = () => {
      dispatch(setImportantLoadingStatus());
      dispatch(fetchImportantPosts());
    };
    dispatchFetchAction();
  }, []);

  return (
    <div className={classes.container}>
      {loading === 'pending' ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>
      ) : (
        <>
          <Carousel>
            {importantPosts.slice(0, slidesToShow).map((post) => (
              <PostCard post={post} key={post.title} />
            ))}
          </Carousel>
          <BorderBottom />
        </>
      )}
    </div>
  );
};

export default ImportantContainer;
