import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './NewestContainer.style';
import { LoadingStatusEnum, LoadingStatusType } from '../../old/lib/types';
import { NewestPostsList } from './newestPostsList/NewestPostsList';
import {
  NewestPostResponseType,
  NewestTypeEnum,
} from '../../old/lib/utilities/API/types';
import { getNewestPosts } from '../../old/lib/utilities/API/api';
import { defaultPlural, langTokens } from '../../locales/localizationInit';

export const NewestContainer: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [postsSets, setPostsSets] = useState<NewestPostResponseType[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );

  useEffect(() => {
    getNewestPosts()
      .then((res): void => {
        setPostsSets(res.data.content);
        setLoadingStatus(LoadingStatusEnum.succeeded);
      })
      .catch((): void => {
        setLoadingStatus(LoadingStatusEnum.failed);
      });
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={t(langTokens.experts.expertOpinion, defaultPlural)}
          postsListPath="materials?origins=1"
          postsList={
            postsSets[NewestTypeEnum.EXPERT_OPINION] &&
            postsSets[NewestTypeEnum.EXPERT_OPINION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={t(langTokens.common.media)}
          postsListPath="materials?origins=2"
          postsList={
            postsSets[NewestTypeEnum.MEDIA] &&
            postsSets[NewestTypeEnum.MEDIA].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={t(langTokens.common.translation, defaultPlural)}
          postsListPath="materials?origins=3"
          postsList={
            postsSets[NewestTypeEnum.TRANSLATION] &&
            postsSets[NewestTypeEnum.TRANSLATION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={t(langTokens.common.video)}
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
