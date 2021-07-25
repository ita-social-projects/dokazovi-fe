/* eslint-disable no-restricted-globals */
import React, { useRef, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
import {
  deletePostById,
  getActivePostTypes,
} from '../../../old/lib/utilities/API/api';
import { useActions } from '../../../shared/hooks';
import { langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertMaterialsDraft,
  resetMaterialsDraft,
  selectExpertsDataDraft,
  selectExpertMaterialsLoadingDraft,
  getAllMaterialsDraft,
  removePostDraft,
  setPageDraft,
} from '../../../models/expertMaterialsDraft';
import { useStyles } from './styles/MaterialsByStatus.styles';

export interface IDraftMaterialsProps {
  expertId: number;
  expert: IExpert;
  onDelete?: (arg0: number, arg1: string) => void;
}

export type CheckboxFormStateType = Record<string, boolean>;

const MaterialsDraft: React.FC<IDraftMaterialsProps> = ({
  expertId,
  expert,
}) => {
  const [isTouched, setTouchStatus] = useState(false);

  const {
    posts,
    postIds,
    filters,
    materialsDraft,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsDataDraft);

  const { t } = useTranslation();

  const loading = useSelector(selectExpertMaterialsLoadingDraft);
  const classes = useStyles();

  const [
    boundResetMaterialsDraft,
    boundFetchExpertMaterialsDraft,
    boundGetAllMaterialsDraft,
    boundRemovePostDraft,
    boundSetPageDraft,
  ] = useActions([
    resetMaterialsDraft,
    fetchExpertMaterialsDraft,
    getAllMaterialsDraft,
    removePostDraft,
    setPageDraft,
  ]);

  useLayoutEffect(() => {
    return function reseting() {
      boundResetMaterialsDraft();
    };
  }, []);

  const loadMore = () => {
    boundSetPageDraft(filters.page + 1);
    boundGetAllMaterialsDraft(true);
  };

  const fetchData = (appendPosts = false) => {
    boundFetchExpertMaterialsDraft({
      expertId,
      filters,
      page: filters.page,
      appendPosts,
      status: 'DRAFT',
      materialsDraft,
    });
  };

  useLayoutEffect(() => {
    fetchData(true);
  }, [filters.page]);

  useLayoutEffect(() => {
    const disableFilters = async () => {
      const { data } = await getActivePostTypes(expertId);
      const disabledFilters = filters.filterConfig
        .filter(({ id }) => {
          if (data.map((active) => active.id).includes(+id)) return false;
          return true;
        })
        .map(({ id, name }) => ({ id, name, checked: null }));
      disabledFilters.forEach((filter) => boundGetAllMaterialsDraft(filter));
    };
    if (posts) {
      boundGetAllMaterialsDraft(filters.isAllFiltersChecked);
      disableFilters();
    }
  }, [posts]);

  const gridRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (postId: number, postTitle: string) => {
    try {
      const response = await deletePostById(Number(postId));
      if (response.data.success) {
        toast.success(
          `${t(langTokens.materials.materialDeletedSuccess, {
            material: postTitle,
          })}!`,
        );
      }
      boundRemovePostDraft(postId);
    } catch (e) {
      toast.success(
        `${t(langTokens.materials.materialDeletedFail, {
          material: postTitle,
        })}.`,
      );
    }
  };

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
        <h2>Неопубліковані матеріали</h2>
      </AccordionSummary>
      <AccordionDetails className="sectionDetails">
        <>
          {loading === LoadingStatusEnum.succeeded &&
          materialsDraft?.length === 0 ? (
            <Notification
              message={`${t(langTokens.common.noItemsFoundForReques)}`}
            />
          ) : (
            <Grid container direction="row">
              <Grid item container direction="column" xs={2}>
                {postIds.length > 0 && (
                  <>
                    <FilterSection
                      onFormChange={boundGetAllMaterialsDraft}
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
                      status="DRAFT"
                      postsList={materialsDraft}
                      onDelete={handleDelete}
                    />
                  </Grid>
                  {materialsDraft?.length > 0 ? (
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

export default MaterialsDraft;
