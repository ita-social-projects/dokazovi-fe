/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import { ExpandMore, StoreMallDirectory } from '@material-ui/icons';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { LoadingContainer } from '../../../old/lib/components/Loading/LoadingContainer';
import { PostsList } from './PostsList';
import { Notification } from '../../../components/Notifications/Notification';
import { LoadMoreButton } from '../../../old/lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../old/lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../old/lib/hooks/usePrevious';
import {
  IExpert,
  IPostType,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  IPost,
} from '../../../old/lib/types';
import { RequestParamsType } from '../../../old/lib/utilities/API/types';
import { mapQueryIdsStringToArray } from '../../../old/lib/utilities/filters';
import { useActions } from '../../../shared/hooks';
import { selectPostTypes } from '../../../models/properties';
import { defaultPlural, langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertMaterialsDraft,
  resetMaterialsDraft,
  selectExpertsDataDraft,
  selectExpertMaterialsLoadingDraft,
  selectExpertsStatusDraft,
} from '../../../models/expertMaterialsDraft';
import { deletePostById } from '../../../old/lib/utilities/API/api';
import { useStyles } from './styles/MaterialsByStatus.styles';

export interface IDraftMaterialsProps {
  expertId: number;
  expert: IExpert;
  onDelete;
}

const MaterialsDraft: React.FC<IDraftMaterialsProps> = ({
  expertId,
  onDelete,
  expert,
}) => {
  const [isTouched, setTouchStatus] = useState(false);

  const {
    posts,
    postIds,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsDataDraft);

  const allMaterials = Object.values(posts);

  const materials = [...allMaterials].filter((el) => {
    if (postIds.find((elem) => elem === el.id)) {
      return true;
    }
    return false;
  });
  const [materialsPostIds, setMaterialsPostIds] = useState(postIds);
  // const status = useSelector(selectExpertsStatusDraft);
  const { t } = useTranslation();

  const loading = useSelector(selectExpertMaterialsLoadingDraft);
  const classes = useStyles();
  const [page, setPage] = useState(pageNumber);
  const previous = usePrevious({ page });

  const [
    boundResetMaterialsPublished,
    boundFetchExpertMaterialsPublished,
  ] = useActions([resetMaterialsDraft, fetchExpertMaterialsDraft]);

  useEffect(() => {
    return function reseting() {
      boundResetMaterialsPublished();
    };
  }, []);

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
      status: 'DRAFT',
    });
  };

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [materialsPostIds.length, page]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [materialsPostIds.length]);

  // const handleDelete = useCallback(
  //   async (postId: number, postTitle: string) => {
  //     try {
  //       const response = await deletePostById(Number(postId));
  //       if (response.data.success) {
  //         toast.success(
  //           `${t(langTokens.materials.materialDeletedSuccess, {
  //             material: postTitle,
  //           })}!`,
  //         );
  //       }
  //     } catch (e) {
  //       toast.success(
  //         `${t(langTokens.materials.materialDeletedFail, {
  //           material: postTitle,
  //         })}.`,
  //       );
  //     }
  //   },
  //   [materialsPost.length],
  // );

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
      const materialsPostIdsUpdated = materialsPostIds.filter(
        (id) => id !== postId,
      );
      setMaterialsPostIds(materialsPostIdsUpdated);
    } catch (e) {
      toast.success(
        `${t(langTokens.materials.materialDeletedFail, {
          material: postTitle,
        })}.`,
      );
    }
  };

  console.log('postIds', postIds.length);
  console.log('posts', posts.length);
  console.log('materials', materials.length);

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
          <Grid container direction="row">
            <Grid item container direction="column" xs={2}>
              {propertiesLoaded && <div>Filter</div>}
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
                      status="DRAFT"
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

export default MaterialsDraft;
