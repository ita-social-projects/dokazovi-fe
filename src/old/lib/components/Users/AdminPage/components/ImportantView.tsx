import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import AddImportantMaterial from './AddImportantMaterial';
import { useStyles } from '../styles/ImportantView.styles';
import {
  clearSetImportant,
  fetchImportantPosts,
  selectMain,
  setImportantPosts,
} from '../../../../../../models/main';
import PostPreviewWrapper from './PostPreviewWrapper';
import { ImportantContainer } from '../../../../../modules/main/components/ImportantContainer';
import { IPost, ViewModsType } from '../../../../types';
import { LoadingContainer } from '../../../Loading/LoadingContainer';
import { useActions } from '../../../../../../shared/hooks';

const ImportantView: React.FC = () => {
  const classes = useStyles();
  const [
    boundFetchImportantPosts,
    boundSetImportantPosts,
    boundClearSetImportant,
  ] = useActions([fetchImportantPosts, setImportantPosts, clearSetImportant]);

  const {
    loading,
    setImportant: { success },
    important: { importantPostIds, importantPosts },
  } = useSelector(selectMain);

  const mappedPosts = importantPostIds.map((id) => importantPosts[id]);

  useEffect(() => {
    boundFetchImportantPosts();
  }, []);

  const [isPreviewOpen, setPreviewStatus] = useState(false);
  const [initiallySelectedPosts, setInitiallySelected] = useState<
    IPost[] | null
  >(null);
  const [removedPosts, setRemovedPosts] = useState<IPost[]>([]);

  if (!initiallySelectedPosts && loading === 'succeeded') {
    setInitiallySelected(mappedPosts);
  }

  const publishImportantPosts = () => {
    boundSetImportantPosts({ posts: importantPostIds.join(',') });
  };

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

  const swalWithCustom = Swal.mixin({
    customClass: {
      container: classes.swalContainer,
      title: classes.congratulationTitleText,
      htmlContainer: classes.congratulationSubText,
      // confirmButton: classes.swalButton,
    },
    buttonsStyling: false,
  });

  const showSuccessModal = () => {
    swalWithCustom.fire({
      position: window.pageYOffset < 250 ? 'center' : 'top',
      icon: 'success',
      title: 'Вітаємо,',
      html: 'Ви успішно оновили карусель!',
      showConfirmButton: false,
      timer: 1000,
    });
    boundClearSetImportant();
  };

  useEffect(() => {
    /* @typescript-eslint/no-unused-expressions */
    success && showSuccessModal();
  }, [success]);

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
                postsAmount={mappedPosts.length}
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
          onClick={publishImportantPosts}
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
