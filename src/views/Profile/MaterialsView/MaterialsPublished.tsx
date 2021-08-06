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
  PostStatus,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
} from '../../../old/lib/types';
import { getActivePostTypes } from '../../../old/lib/utilities/API/api';
import { useActions } from '../../../shared/hooks';
import { langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertMaterialsPublished,
  selectExpertsDataPublished,
  selectExpertMaterialsLoadingPublished,
  setPagePublished,
} from '../../../models/expertMaterialsPublished';
import {
  FilterConfigType,
  IFilterByStatus,
} from '../../../models/materials/types';
import {
  allCheckedFilterConfig,
  allUncheckedFilterConfig,
} from '../../../models/utilities/filterConfigTypes';
import { useStyles } from './styles/MaterialsByStatus.styles';

export interface IMaterialsPublishedProps {
  expertId: number;
  expert: IExpert;
  onDelete?: (arg0: number, arg1: string) => void;
}

const MaterialsPublished: React.FC<IMaterialsPublishedProps> = ({
  expertId,
  expert,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isTouched, setTouchStatus] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const loading = useSelector(selectExpertMaterialsLoadingPublished);
  const {
    posts,
    postIds,
    filters,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsDataPublished);
  const [
    boundFetchExpertMaterialsPublished,
    boundSetPagePublished,
  ] = useActions([fetchExpertMaterialsPublished, setPagePublished]);

  const materials = [...Object.values(posts)].filter((el) => {
    if (postIds.find((elem) => elem === el.id)) {
      return true;
    }
    return false;
  });

  useLayoutEffect(() => {
    fetchData(false, {
      page: 0,
      isAllFiltersChecked: true,
      filterConfig: allCheckedFilterConfig,
    });
  }, []);

  const fetchData = (appendPosts = false, newFilters: IFilterByStatus) => {
    getActivePostTypes(expertId, PostStatus.PUBLISHED).then((response) => {
      const { data } = response;
      const filtersIncludingDisables = newFilters.filterConfig.map(
        ({ id, name, checked }) => {
          if (data.map((active) => active.id).includes(+id))
            return { id, name, checked };
          return { id, name, checked: null };
        },
      );
      const filtersWithDisabled = {
        ...newFilters,
        filterConfig: filtersIncludingDisables,
      };
      boundFetchExpertMaterialsPublished({
        expertId,
        filters: filtersWithDisabled,
        appendPosts,
        status: PostStatus.PUBLISHED,
      });
    });
  };

  const onChange = (change: boolean | FilterConfigType) => {
    let newFilters = filters;
    boundSetPagePublished(0);
    if (typeof change === 'boolean') {
      if (change) {
        newFilters = {
          ...newFilters,
          filterConfig: allCheckedFilterConfig,
        };
      } else {
        newFilters = {
          ...newFilters,
          filterConfig: allUncheckedFilterConfig,
        };
      }
      newFilters = { ...newFilters, isAllFiltersChecked: change };
      fetchData(false, {
        ...newFilters,
        page: 0,
      });
      return;
    }
    const filter: FilterConfigType = change;
    newFilters = {
      ...newFilters,
      filterConfig: filters.filterConfig.map(({ id, name, checked }) =>
        id === filter.id
          ? { id, name, checked: filter.checked }
          : { id, name, checked },
      ),
    };
    fetchData(false, {
      ...newFilters,
      isAllFiltersChecked: newFilters.filterConfig
        .filter(({ checked }) => checked !== null)
        .every(({ checked }) => checked),
      page: 0,
    });
  };

  const loadMore = () => {
    fetchData(true, { ...filters, page: filters.page + 1 });
  };

  return (
    <Accordion
      classes={{ root: classes.addMaterialsSection }}
      defaultExpanded
      onChange={() => !isTouched && setTouchStatus(true)}
    >
      <AccordionSummary
        className={classes.addMaterialsHeader}
        expandIcon={<ExpandMore color="secondary" />}
      >
        <h2>{t(langTokens.common.publishedMaterials)}</h2>
      </AccordionSummary>
      <AccordionDetails className="sectionDetails">
        <>
          {loading === LoadingStatusEnum.succeeded && posts?.length === 0 ? (
            <Notification
              message={`${t(langTokens.common.noMaterialsFoundRequest)}`}
            />
          ) : (
            <Grid container direction="row">
              <Grid item container direction="column" xs={2}>
                {postIds.length > 0 && (
                  <>
                    <FilterSection
                      onFormChange={onChange}
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
                      status={PostStatus.PUBLISHED}
                      postsList={materials}
                    />
                  </Grid>
                  {posts?.length > 0 ? (
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
