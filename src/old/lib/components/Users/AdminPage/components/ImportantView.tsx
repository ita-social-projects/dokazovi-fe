import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddImportantMaterial from './AddImportantMaterial';
import { useStyles } from '../styles/ImportantView.styles';
import { fetchImportantPosts } from '../../../../../../models/main';
import { RootStateType } from '../../../../../../models/rootReducer';
import PostPreviewWrapper from './PostPreviewWrapper';
import { ImportantContainer } from '../../../../../modules/main/components/ImportantContainer';
import { IPost, ViewModsType } from '../../../../types';
import { LoadingContainer } from '../../../Loading/LoadingContainer';

const ImportantView: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    loading,
    important: { importantPostIds, importantPosts },
  } = useSelector((state: RootStateType) => state.main);

  const mappedPosts = importantPostIds.map((id) => importantPosts[id]);

  useEffect(() => {
    dispatch(fetchImportantPosts());
  }, []);

  const [isPreviewOpen, setPreviewStatus] = useState(false);
  const [initiallySelectedPosts, setInitiallySelected] = useState<
    IPost[] | null
  >(null);
  const [removedPosts, setRemovedPosts] = useState<IPost[]>([]);

  if (!initiallySelectedPosts && loading === 'succeeded') {
    setInitiallySelected(mappedPosts);
  }

  const updateRemovedPosts = (post: IPost, status: ViewModsType) => {
    if (status === 'preview' && removedPosts.includes(post)) {
      setRemovedPosts(
        removedPosts.filter((removedPost) => removedPost.id !== post.id),
      );
    } else if (
      status === 'selected' &&
      initiallySelectedPosts &&
      initiallySelectedPosts.includes(post)
    ) {
      setRemovedPosts([...removedPosts, post]);
    }
  };

  return (
    <>
      <div className={classes.adminImportantSection}>
        {loading === 'pending' && (
          <LoadingContainer
            loading={loading}
            expand
            errorMsg="Виникла помилка при завантаженні матеріалів"
          />
        )}
        {loading !== 'pending' && mappedPosts.length
          ? mappedPosts.map((post, index) => (
              <PostPreviewWrapper
                key={post.id}
                post={post}
                position={index + 1}
                viewMode="selected"
                sectionLength={mappedPosts.length}
                updateRemovedPosts={updateRemovedPosts}
              />
            ))
          : null}
        {loading === 'succeeded' && !mappedPosts.length && (
          <Typography className={classes.centeredElement}>
            Зараз секція &quot;Важливе&quot; порожня. Почніть додавати матеріали
            за допомогою меню знизу
          </Typography>
        )}
      </div>
      <div className={classes.primaryButtonsRow}>
        <Button
          className={classes.primaryButtons}
          color="primary"
          variant="contained"
          size="large"
          disabled={mappedPosts.length < 2}
          onClick={() => setPreviewStatus(true)}
        >
          Переглянути
        </Button>
        <Button
          className={classes.primaryButtons}
          color="primary"
          variant="contained"
          size="large"
          disabled={mappedPosts.length < 2}
        >
          Публікувати
        </Button>
      </div>
      <AddImportantMaterial
        selectedPosts={importantPostIds}
        updateRemovedPosts={updateRemovedPosts}
      />
      <Dialog
        classes={{ paperWidthLg: classes.importantPreviewModal }}
        maxWidth="lg"
        open={isPreviewOpen}
        onClose={() => setPreviewStatus(false)}
      >
        <ImportantContainer customPosts={mappedPosts} />
        <br />
        <Button
          className={`${classes.primaryButtons} ${classes.centeredElement}`}
          size="large"
          onClick={() => setPreviewStatus(false)}
        >
          Закрити
        </Button>
      </Dialog>
    </>
  );
};

export default ImportantView;
