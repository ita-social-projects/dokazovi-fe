import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { selectMain } from '../../../../../../models/main';
import { langTokens } from '../../../../../../locales/localizationInit';
import { LoadingContainer } from '../../../Loading/LoadingContainer';
import PostPreviewWrapper from './PostPreviewWrapper';
import { useStyles } from '../styles/ImportantImagesWrapper.styles';
import { IPost, ViewModsType } from '../../../../types';

interface IImportantImagesWrapper {
  updateRemovedPosts: (post: IPost, status: ViewModsType) => void;
  forDeviceType: 'desktop' | 'mobile' | 'tablet';
  expanded?: boolean | false;
}

export const ImportantImagesWrapper: React.FunctionComponent<IImportantImagesWrapper> = ({
  updateRemovedPosts,
  forDeviceType,
  expanded,
}) => {
  const { t } = useTranslation();
  const {
    loading,
    important: { importantPostIds, importantPosts },
  } = useSelector(selectMain);
  const classes = useStyles();
  const [isTouched, setTouchStatus] = useState(false);
  const mappedPosts = importantPostIds.map((id) => importantPosts[id]);
  const accordionTitle = {
    desktop: t(langTokens.admin.imagesDesktop),
    mobile: t(langTokens.admin.imagesMobile),
    tablet: t(langTokens.admin.imagesTablet),
  };

  return (
    <div className={classes.imagesContainer}>
      <Accordion
        className={classes.imagesAccordion}
        onChange={() => !isTouched && setTouchStatus(true)}
        defaultExpanded={expanded}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.imagesHeader}
        >
          <Typography variant="h4">{accordionTitle[forDeviceType]}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.imagesDetails}>
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
