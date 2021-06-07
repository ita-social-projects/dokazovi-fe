import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../../../lib/components/Carousel/Carousel';
import { useStyles } from '../styles/ImportantContainer.styles';
import { ImportantPostPreviewCard } from '../../../../components/Posts/Cards/ImportantPostPreviewCard/ImportantPostPreviewCard';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import {
  fetchImportantPosts,
  selectImportantPosts,
  selectLoadingMain,
} from '../../../../models/main';
import { useActions } from '../../../../shared/hooks';

export const ImportantContainer: React.FC = () => {
  const classes = useStyles();
  const { importantPosts: posts } = useSelector(selectImportantPosts);
  const loading = useSelector(selectLoadingMain);
  const importantPosts = Object.values(posts);

  const [boundFetchImportantPosts] = useActions([fetchImportantPosts]);

  useEffect(() => {
    boundFetchImportantPosts();
  }, []);

  return (
    <div className={classes.container}>
      {loading === 'pending' ? (
        <LoadingContainer loading={loading} />
      ) : (
        <>
          <Carousel>
            {importantPosts.map((post) => (
              <ImportantPostPreviewCard post={post} key={post.title} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};
