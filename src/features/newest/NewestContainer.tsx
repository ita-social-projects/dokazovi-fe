import React from 'react';
import { useStyles } from './NewestContainer.style';
import { PostsPreviewCardStylesEnum } from '../../old/lib/types';
import { NewestPostsList } from './newestPostsList/NewestPostsList';

export const NewestContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <NewestPostsList
        postsListTypeName="Думки експертів"
        postsPreviewCardStylesType={PostsPreviewCardStylesEnum.EXPERT_OPINION}
      />
      <NewestPostsList
        postsListTypeName="Медитека"
        postsPreviewCardStylesType={PostsPreviewCardStylesEnum.MEDIA}
      />
      <NewestPostsList
        postsListTypeName="Переклади"
        postsPreviewCardStylesType={PostsPreviewCardStylesEnum.TRANSLATION}
      />
      <NewestPostsList
        postsListTypeName="Відео"
        postsPreviewCardStylesType={PostsPreviewCardStylesEnum.VIDEO}
      />
    </div>
  );
};
