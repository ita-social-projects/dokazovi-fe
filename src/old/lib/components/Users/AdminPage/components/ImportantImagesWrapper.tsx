import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { selectMain } from '../../../../../../models/main';
import i18n, { langTokens } from '../../../../../../locales/localizationInit';
import { LoadingContainer } from '../../../Loading/LoadingContainer';
import AddImportantMaterial from './AddImportantMaterial';
import PostPreviewWrapper from './PostPreviewWrapper';
import { useStyles } from '../styles/ImportantImagesWrapper.styles';
import { IPost, ViewModsType } from '../../../../types';

interface IImportantImagesWrapper {
  updateRemovedPosts: (post: IPost, status: ViewModsType) => void;
  forDeviceType: 'desktop' | 'mobile' | 'tablet';
}

export const ImportantImagesWrapper: React.FunctionComponent<IImportantImagesWrapper> = ({
  updateRemovedPosts,
  forDeviceType,
}) => {
  const { t } = useTranslation();
  const {
    loading,
    important: { importantPostIds, importantPosts },
  } = useSelector(selectMain);
  const classes = useStyles();
  const [isTouched, setTouchStatus] = useState(false);
  const mappedPosts = importantPostIds.map((id) => importantPosts[id]);

  return (
    <div className={classes.desktopImagesContainer}>
      <Accordion
        className={classes.desktopImagesAccordion}
        onChange={() => !isTouched && setTouchStatus(true)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.desktopImagesHeader}
        >
          <Typography variant="h4">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.desktopImagesDetails}>
          {loading === 'pending' && (
            <LoadingContainer
              loading={loading}
              expand
              errorMsg={t(langTokens.admin.fetchError)}
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
                  forDeviceType={forDeviceType}
                />
              ))
            : null}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
