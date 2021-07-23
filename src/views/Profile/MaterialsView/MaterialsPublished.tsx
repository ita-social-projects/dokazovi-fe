/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { isEmpty, uniq } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckboxFormStateType } from '../../../old/lib/components/Filters/CheckboxFilterForm';
import { LoadingContainer } from '../../../old/lib/components/Loading/LoadingContainer';
import { PostsList } from './PostsList';
import { Notification } from '../../../components/Notifications/Notification';
import { LoadMoreButton } from '../../../old/lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../old/lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../old/lib/hooks/usePrevious';
import {
  FilterTypeEnum,
  IExpert,
  IPostType,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  filtersStateEnum,
} from '../../../old/lib/types';
import {
  deletePostById,
  getActivePostTypes,
} from '../../../old/lib/utilities/API/api';
import {
  ActivePostType,
  RequestParamsType,
} from '../../../old/lib/utilities/API/types';
import { mapQueryIdsStringToArray } from '../../../old/lib/utilities/filters';
import { useActions } from '../../../shared/hooks';
import { CheckboxLeftsideFilterForm } from './CheckboxLeftsideFilterForm';
import { selectPostTypes } from '../../../models/properties';
import { defaultPlural, langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertMaterialsPublished,
  resetMaterialsPublished,
  selectExpertsDataPublished,
  selectExpertMaterialsLoadingPublished,
  selectExpertsStatusPublished,
} from '../../../models/expertMaterialsPublished';
import { updatePostTypes } from '../../../old/modules/utilities/utilityFunctions';
import { useStyles } from './styles/MaterialsByStatus.styles';

export interface IPublishedMaterialsProps {
  expertId: number;
  expert: IExpert;
  onDelete;
}

const MaterialsPublished: React.FC<IPublishedMaterialsProps> = ({
  expertId,
  expert,
  onDelete,
}) => {
  const [isTouched, setTouchStatus] = useState(false);

  const {
    posts,
    postIds,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsDataPublished);

  const status = useSelector(selectExpertsStatusPublished);
  const { t } = useTranslation();

  const [TheOnlyAvailablePostType, setTheOnlyAvailablePostType] = useState<
    string
  >();

  const [checkedFiltersPostTypes, setCheckedFiltersPostTypes] = useState<
    CheckboxFormStateType
  >();

  const [activePostTypes, setActivePostTypes] = useState<ActivePostType[]>();

  const loading = useSelector(selectExpertMaterialsLoadingPublished);
  const classes = useStyles();
  const [page, setPage] = useState(pageNumber);
  const previous = usePrevious({ page });

  const [
    boundResetMaterialsPublished,
    boundFetchExpertMaterialsPublished,
  ] = useActions([resetMaterialsPublished, fetchExpertMaterialsPublished]);

  useEffect(() => {
    return function reseting() {
      boundResetMaterialsPublished();
    };
  }, []);

  const allMaterials = Object.values(posts);

  const materials = [...allMaterials].filter((el) => {
    if (postIds.find((elem) => elem === el.id)) {
      return true;
    }
    return false;
  });

  const postTypes = useSelector(selectPostTypes);

  const postTypesInPlural: IPostType[] = [];

  if (postTypes.length) {
    const el1: IPostType = { ...postTypes[0] };
    const el2: IPostType = { ...postTypes[1] };
    const el3: IPostType = { ...postTypes[2] };

    Object.defineProperty(el1, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.article, defaultPlural)}`,
    });
    Object.defineProperty(el2, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.video)}`,
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.post, defaultPlural)}`,
    });

    postTypesInPlural.push(el1, el2, el3);
  }

  const propertiesLoaded = !isEmpty(postTypesInPlural);

  const setFilters = (
    checked: CheckboxFormStateType,
    filterType: FilterTypeEnum,
    disabled?: CheckboxFormStateType,
  ) => {
    if (filterType === 0) {
      if (disabled) {
        setCheckedFiltersPostTypes(disabled);
      } else {
        setCheckedFiltersPostTypes(checked);
      }
    }

    const checkedIds = Object.keys(checked).filter((key) => checked[key]);

    console.log(checkedIds);

    setPage(0);

    const fetchDataPost = (appendPosts = false) => {
      const filters: RequestParamsType = {
        page,
        type: mapQueryIdsStringToArray(QueryTypeEnum.POST_TYPES),
      };

      boundFetchExpertMaterialsPublished({
        expertId,
        filters: { page, type: checkedIds },
        page,
        appendPosts,
        status: 'PUBLISHED',
      });
    };

    fetchDataPost();
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchData = (appendPosts = false) => {
    const filters: RequestParamsType = {
      page,
      type: mapQueryIdsStringToArray(QueryTypeEnum.POST_TYPES),
    };

    boundFetchExpertMaterialsPublished({
      expertId,
      filters,
      page,
      appendPosts,
      status: 'PUBLISHED',
    });
  };

  async function fetchActivePostTypes() {
    const response = await getActivePostTypes(expertId);
    const arr: ActivePostType[] = response.data;
    setActivePostTypes(arr);
  }

  useEffect(() => {
    fetchActivePostTypes();
  }, []);

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [page]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [postIds]);

  const selectedPostTypesString = QueryTypeEnum.POST_TYPES?.split(',');
  let selectedPostTypes:
    | IPostType[]
    | filtersStateEnum = postTypesInPlural?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );

  if (isEmpty(selectedPostTypes)) {
    if (
      selectedPostTypesString?.length === 1 &&
      selectedPostTypesString?.[0] === '0'
    ) {
      selectedPostTypes = filtersStateEnum.empty;
    } else {
      selectedPostTypes = filtersStateEnum.notEmpty;
    }
  }

  useEffect(() => {
    setCheckedFiltersPostTypes(updatePostTypes(selectedPostTypes, postTypes));
  }, [postTypesInPlural.length]);

  const disabledPostTypes = postTypes.filter((post) => {
    if (activePostTypes?.length) {
      if (activePostTypes?.find((el) => el.id === post.id)) {
        return false;
      }
      return true;
    }
    return false;
  });

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
        <h2>Опубліковані матеріали</h2>
      </AccordionSummary>
      <AccordionDetails className="sectionDetails">
        <>
          <Grid container direction="row">
            <Grid item container direction="column" xs={2}>
              {propertiesLoaded && (
                <>
                  <CheckboxLeftsideFilterForm
                    disabledPostTypes={disabledPostTypes}
                    expertId={expertId}
                    onFormChange={(checked, disabled) =>
                      setFilters(checked, FilterTypeEnum.POST_TYPES, disabled)
                    }
                    possibleFilters={postTypesInPlural}
                    selectedFilters={selectedPostTypes}
                    filterTitle={t(langTokens.common.byType).toLowerCase()}
                    allTitle={t(langTokens.common.allTypes)}
                    filterType={QueryTypeEnum.POST_TYPES}
                  />
                </>
              )}
            </Grid>
            <Grid
              item
              container
              xs={9}
              direction="column"
              style={{ maxWidth: '100%' }}
              alignItems="center"
            >
              {page === 0 && loading === LoadingStatusEnum.pending ? (
                <LoadingContainer loading={LoadingStatusEnum.pending} expand />
              ) : (
                <>
                  {loading === LoadingStatusEnum.succeeded &&
                  materials.length === 0 ? (
                    <Notification
                      message={`${t(langTokens.common.noItemsFoundForReques)}`}
                    />
                  ) : (
                    <PostsList
                      onDelete={handleDelete}
                      status="PUBLISHED"
                      postsList={materials}
                    />
                  )}
                  {materials.length > 0 ? (
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
                        textType={LoadMoreButtonTextType.POST}
                      />
                    </Grid>
                  ) : null}
                </>
              )}
            </Grid>
          </Grid>
        </>
      </AccordionDetails>
    </Accordion>
  );
};

export default MaterialsPublished;
