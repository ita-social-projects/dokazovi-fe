import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import Carousel from '../../../lib/components/Carousel/Carousel';
import { PostCard } from '../../../lib/components/Posts/Cards/PostCard';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from '../styles/ImportantContainer.styles';
import {
  fetchImportantPosts,
  setImportantLoadingStatus,
} from '../store/mainSlice';
import { selectPostsByIds } from '../../../store/selectors';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';

const ImportantContainer: React.FC = () => {
  const classes = useStyles();
  const {
    importantPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.important);
  const importantPosts = selectPostsByIds(importantPostIds);

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
        <LoadingContainer loading={loading} />
      ) : (
        <>
          <Carousel>
            {importantPosts.map((post) => (
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
