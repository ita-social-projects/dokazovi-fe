/* eslint-disable no-restricted-globals */
import React, { useRef, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { LoadingContainer } from '../../../old/lib/components/Loading/LoadingContainer';
import { PostsList } from './PostsList';
import { FilterSection } from './FilterSection';
import { Notification } from '../../../components/Notifications/Notification';
import { LoadMoreButton } from '../../../old/lib/components/LoadMoreButton/LoadMoreButton';
import {
  IExpert,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
} from '../../../old/lib/types';
import { getActivePostTypes } from '../../../old/lib/utilities/API/api';
import { useActions } from '../../../shared/hooks';
import { langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertMaterialsPublished,
  resetMaterialsPublished,
  selectExpertsDataPublished,
  selectExpertMaterialsLoadingPublished,
  getAllMaterialsPublished,
  setPagePublished,
  setFilters,
} from '../../../models/expertMaterialsPublished';
import { useStyles } from './styles/MaterialsByStatus.styles';
import { FilterConfigType } from '../../../models/materials/types';

export interface IPublishedMaterialsProps {
  expertId: number;
  expert: IExpert;
  onDelete?: (arg0: number, arg1: string) => void;
}

export type CheckboxFormStateType = Record<string, boolean>;

const MaterialsPublished: React.FC<IPublishedMaterialsProps> = ({
  expertId,
  expert,
}) => {
  const [isTouched, setTouchStatus] = useState(false);
  const [prevFilters, setPrevFilters] = useState<FilterConfigType[]>([]);

  const {
    posts,
    postIds,
    filters,
    materialsPublished,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsDataPublished);

  const { t } = useTranslation();

  const loading = useSelector(selectExpertMaterialsLoadingPublished);
  const classes = useStyles();

  const [
    boundResetMaterialsPublished,
    boundFetchExpertMaterialsPublished,
    boundGetAllMaterialsPublished,
    boundSetPagePublished,
    boundSetFilters,
  ] = useActions([
    resetMaterialsPublished,
    fetchExpertMaterialsPublished,
    getAllMaterialsPublished,
    setPagePublished,
    setFilters,
  ]);

  useLayoutEffect(() => {
    return function reseting() {
      boundResetMaterialsPublished();
    };
  }, []);

  const loadMore = () => {
    boundSetPagePublished(filters.page + 1);
    // boundGetAllMaterialsPublished(true);
  };

  const fetchData = (appendPosts = false) => {
    boundFetchExpertMaterialsPublished({
      expertId,
      filters,
      page: filters.page,
      appendPosts,
      status: 'PUBLISHED',
      materialsPublished,
    });
  };

  useLayoutEffect(() => {
    setPrevFilters(filters.filterConfig);
    fetchData(true);
  }, [filters.page]);

  useLayoutEffect(() => {
    const disableFilters = async () => {
      const { data } = await getActivePostTypes(expertId, 'PUBLISHED');
      const disabledFilters = filters.filterConfig
        .filter(({ id }) => {
          if (data.map((active) => active.id).includes(+id)) return false;
          return true;
        })
        .map(({ id, name }) => ({ id, name, checked: null }));
      disabledFilters.forEach((filter) =>
        boundGetAllMaterialsPublished(filter),
      );
    };
    if (posts) {
      boundGetAllMaterialsPublished(filters.isAllFiltersChecked);
      disableFilters();
      boundSetFilters(prevFilters);
    }
  }, [posts]);

  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <Accordion
      classes={{ root: classes.addMaterialsSection }}
      defaultExpanded
      onChange={() => !isTouched && setTouchStatus(true)}
    >
      <AccordionSummary
        className={classes.addMaterialsHeader}
        expandIcon={<ExpandMore />}
      >
        <h2>Опубліковані матеріали</h2>
      </AccordionSummary>
      <AccordionDetails className="sectionDetails">
        <>
          {loading === LoadingStatusEnum.succeeded &&
          materialsPublished?.length === 0 ? (
            <Notification
              message={`${t(langTokens.common.noItemsFoundForReques)}`}
            />
          ) : (
            <Grid container direction="row">
              <Grid item container direction="column" xs={2}>
                {postIds.length > 0 && (
                  <>
                    <FilterSection
                      onFormChange={boundGetAllMaterialsPublished}
                      title={t(langTokens.common.allTypes)}
                      isAllFiltersChecked={filters.isAllFiltersChecked}
                      filters={filters.filterConfig}
                    />
                  </>
                )}
              </Grid>
              {filters.page === 0 && loading === LoadingStatusEnum.pending ? (
                <LoadingContainer loading={LoadingStatusEnum.pending} expand />
              ) : (
                <>
                  <Grid
                    item
                    container
                    xs={9}
                    direction="column"
                    style={{ maxWidth: '100%' }}
                    alignItems="center"
                  >
                    <PostsList
                      status="PUBLISHED"
                      postsList={materialsPublished}
                    />
                  </Grid>
                  {materialsPublished?.length > 0 ? (
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      ref={gridRef}
                    >
                      <LoadMoreButton
                        clicked={loadMore}
                        isLastPage={isLastPage}
                        loading={loading}
                        totalPages={totalPages}
                        totalElements={totalElements}
                        pageNumber={pageNumber}
                        textType={LoadMoreButtonTextType.POST_BY_STATUS}
                      />
                    </Grid>
                  ) : null}
                </>
              )}
            </Grid>
          )}
        </>
      </AccordionDetails>
    </Accordion>
  );
};

export default MaterialsPublished;
