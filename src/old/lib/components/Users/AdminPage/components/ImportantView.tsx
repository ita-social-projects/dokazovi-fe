import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import AddImportantMaterial from './AddImportantMaterial';
import { langTokens } from '../../../../../../locales/localizationInit';
import { useStyles } from '../styles/ImportantView.styles';
import {
  clearSetImportant,
  fetchImportantPosts,
  selectMain,
  setImportantPosts,
} from '../../../../../../models/main';
import { ImportantImagesWrapper } from './ImportantImagesWrapper';
import { ImportantContainer } from '../../../../../modules/main/components/ImportantContainer';
import { IPost, ViewModsType } from '../../../../types';
import { useActions } from '../../../../../../shared/hooks';

const ImportantView: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    success && showSuccessModal();
  }, [success]);

  return (
    <>
      <ImportantImagesWrapper
        updateRemovedPosts={updateRemovedPosts}
        forDeviceType="desktop"
        expanded
      />
      <ImportantImagesWrapper
        updateRemovedPosts={updateRemovedPosts}
        forDeviceType="mobile"
      />
      <div className={classes.adminImportantSection}>
        {loading === 'succeeded' && !mappedPosts.length && (
          <Typography className={classes.centeredElement}>
            {t(langTokens.admin.importantEmpty)}
          </Typography>
        )}
      </div>
      <div className={classes.primaryButtonsRow}>
        <Button
          className={classes.primaryButtons}
          color="primary"
          variant="contained"
          size="large"
          disabled={mappedPosts.length < 1}
          onClick={() => setPreviewStatus(true)}
        >
          {t(langTokens.admin.review)}
        </Button>
        <Button
          className={classes.primaryButtons}
          color="primary"
          variant="contained"
          size="large"
          disabled={mappedPosts.length < 1}
          onClick={publishImportantPosts}
        >
          {t(langTokens.admin.publish)}
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
          {t(langTokens.admin.close)}
        </Button>
      </Dialog>
    </>
  );
};

export default ImportantView;
