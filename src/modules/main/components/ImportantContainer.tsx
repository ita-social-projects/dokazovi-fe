import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import Carousel from '../../../lib/components/Carousel';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import { PostCard } from '../../../lib/components/PostCard';
import { RootStateType } from '../../../store/rootReducer';
import { styles } from '../../../lib/constants/carousel-config';
import {
  fetchImportantPosts,
  setImportantLoadingStatus,
} from '../store/mainSlice';

const ImportantContainer: React.FC = () => {
  const {
    importantPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.important);
  const { posts } = useSelector((state: RootStateType) => state.data);

  const dispatch = useDispatch();

  const dispatchFetchAction = () => {
    dispatch(setImportantLoadingStatus());
    dispatch(fetchImportantPosts());
  };

  useEffect(() => {
    dispatchFetchAction();
  }, []);

  return (
    <div style={styles.container}>
      {loading === 'pending' ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={styles.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>
      ) : (
        <>
          <Typography variant="h4" style={styles.title}>
            Важливе
          </Typography>
          <Carousel>
            {importantPostIds.map((id) => {
              const post = posts[id];
              return (
                <div key={post.title}>
                  <PostCard post={post} />
                </div>
              );
            })}
          </Carousel>
          <BorderBottom />
        </>
      )}
    </div>
  );
};

export default ImportantContainer;
