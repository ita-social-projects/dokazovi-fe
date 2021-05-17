import React, { useEffect, useState } from 'react';
import { useStyles } from './NewestContainer.style';
import { LoadingStatusEnum, LoadingStatusType } from '../../old/lib/types';
import { NewestPostsList } from './newestPostsList/NewestPostsList';
import {
  NewestPostResponseType,
  NewestTypeEnum,
} from '../../old/lib/utilities/API/types';
import { getNewestPosts } from '../../old/lib/utilities/API/api';

export const NewestContainer: React.FC = () => {
  const classes = useStyles();
  const [postsSets, setPostsSets] = useState<NewestPostResponseType[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );

  useEffect(() => {
    getNewestPosts().then((res): void => {
      setPostsSets(res.data.content);
      setLoadingStatus(LoadingStatusEnum.succeeded);
    });
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle="Думки експертів"
          postsListPath="materials?origins=1"
          postsList={
            postsSets[NewestTypeEnum.EXPERT_OPINION] &&
            postsSets[NewestTypeEnum.EXPERT_OPINION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle="Медитека"
          postsListPath="materials?origins=2"
          postsList={
            postsSets[NewestTypeEnum.MEDIA] &&
            postsSets[NewestTypeEnum.MEDIA].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle="Переклади"
          postsListPath="materials?origins=3"
          postsList={
            postsSets[NewestTypeEnum.TRANSLATION] &&
            postsSets[NewestTypeEnum.TRANSLATION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle="Відео"
          postsListPath="materials?types=2"
          postsList={
            postsSets[NewestTypeEnum.VIDEO] &&
            postsSets[NewestTypeEnum.VIDEO].postDTOS
          }
        />
      </div>
    </>
  );
};
