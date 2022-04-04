import React, { useContext, useEffect } from 'react';
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
import { IPost } from '../../../lib/types';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';

interface IImportantContainer {
  customPosts?: IPost[];
}

export const ImportantContainer: React.FC<IImportantContainer> = ({
  customPosts,
}) => {
  const classes = useStyles();
  const { importantPosts: posts, importantPostIds: postIds } = useSelector(
    selectImportantPosts,
  );
  const loading = useSelector(selectLoadingMain);
  const importantPosts = customPosts || postIds.map((id) => posts[id]);

  const [boundFetchImportantPosts] = useActions([fetchImportantPosts]);

  const { mobile } = useContext(ScreenContext);

  useEffect(() => {
    if (!customPosts) {
      boundFetchImportantPosts();
    }
  }, []);

  return (
    <div className={mobile ? classes.containerMobile : classes.container}>
      {loading === 'pending' ? (
        <LoadingContainer loading={loading} />
      ) : (
        <>
          <Carousel>
            {importantPosts.map((post) => (
              <ImportantPostPreviewCard
                post={post}
                key={post.title}
                forDeviceType={mobile ? 'mobile' : 'desktop'}
                size={mobile ? 'small' : 'large'}
              />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};
