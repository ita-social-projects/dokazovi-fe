import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useTranslation } from 'react-i18next';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import { LoadingStatusEnum, LoadMoreButtonTextType } from '../../types';
import {
  LOAD_POSTS_BY_STATUS_LIMIT,
  LOAD_POSTS_LIMIT,
} from '../../constants/posts';
import { LOAD_EXPERTS_LIMIT } from '../../constants/experts';
import { useStyles } from './LoadMoreButton.styles';
import { langTokens } from '../../../../locales/localizationInit';

export interface ILoadMoreButtonProps {
  clicked: () => void;
  textType: LoadMoreButtonTextType;
  loading: LoadingStatusEnum;
  isLastPage: boolean;
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

function getLimit(textTypeLimit: LoadMoreButtonTextType): number {
  switch (textTypeLimit) {
    case LoadMoreButtonTextType.EXPERT:
      return LOAD_EXPERTS_LIMIT;
    case LoadMoreButtonTextType.POST:
      return LOAD_POSTS_LIMIT;
    case LoadMoreButtonTextType.POST_BY_STATUS:
      return LOAD_POSTS_BY_STATUS_LIMIT;
    default:
      return LOAD_POSTS_LIMIT;
  }
}

export const LoadMoreButton: React.FC<ILoadMoreButtonProps> = ({
  clicked,
  loading,
  textType,
  isLastPage,
  pageNumber,
  totalPages,
  totalElements,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();
  const { mobile } = useContext(ScreenContext);

  const getButtonText = (
    count: number,
    textTypeLimit: LoadMoreButtonTextType,
  ) => {
    if (textTypeLimit === LoadMoreButtonTextType.EXPERT) {
      return t(langTokens.experts.expertGenitiveCase, { count }).toLowerCase();
    }
    return t(langTokens.materials.material, { count }).toLowerCase();
  };

  const renderLoadControls = (): JSX.Element => {
    let control: JSX.Element = <></>;
    const limit = getLimit(textType);
    const isPreLastPage = pageNumber !== totalPages - 2;
    const remainder = totalElements % limit;
    const elementsInLastPage = remainder === 0 ? limit : remainder;
    const elementsInNextPage = isPreLastPage ? limit : elementsInLastPage;
    const buttonText = getButtonText(elementsInNextPage, textType);
    control = (
      <Box className={classes.root}>
        <Button
          data-testid="loadMore"
          className={classes.button}
          variant="outlined"
          onClick={() => {
            clicked();
          }}
        >
          <RefreshIcon
            fontSize="large"
            className={
              loading === LoadingStatusEnum.pending ? classes.spinning : ''
            }
          />
          {t(langTokens.common.showMore)} {elementsInNextPage}{' '}
          {!mobile && buttonText}
        </Button>
      </Box>
    );

    if (isLastPage) {
      control = <></>;
    }

    return control;
  };
  return renderLoadControls();
};
