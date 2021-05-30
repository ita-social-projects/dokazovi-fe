import { Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import { useQuery } from '../../../lib/hooks/useQuery';
import { store } from '../../../store/store';
import {
  FilterTypeEnum,
  IPostType,
  IDirection,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
} from '../../../lib/types';
import { RequestParamsType } from '../../../lib/utilities/API/types';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { RootStateType } from '../../../store/rootReducer';
import {
  fetchExpertMaterials,
  resetMaterials,
} from '../../../../models/experts';
import { useActions } from '../../../../shared/hooks';
import {
  selectExpertsData,
  selectLoadingExpertsPosts,
  selectExperts,
} from '../../../../models/experts/selectors';
import { CheckboxLeftsideFilterForm } from '../../../lib/components/Filters/CheckboxLeftsideFilterForm';

export interface IExpertMaterialsContainerProps {
  expertId: number;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
}) => {
  const {
    posts,
    postIds,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsData);

  const {
    data: { experts },
  } = useSelector(selectExperts);
  // const currentExpertData = experts.data.experts[expertId];
  const expertNani = experts[expertId];
  console.log(expertNani);

  const loading = useSelector(selectLoadingExpertsPosts);

  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(pageNumber);
  const previous = usePrevious({ page });

  // const [boundResetMaterials] = useActions([resetMaterials]);

  // useEffect(() => {
  //   boundResetMaterials();
  // }, [expertId]);

  const materials = Object.values(posts);

  console.log(materials);

  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

  const postTypesInPlural: IPostType[] = [];

  if (postTypes.length) {
    const el1: IPostType = { ...postTypes[0] };
    const el2: IPostType = { ...postTypes[1] };
    const el3: IPostType = { ...postTypes[2] };

    Object.defineProperty(el1, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'Статті',
    });
    Object.defineProperty(el2, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'Відео',
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'Дописи',
    });

    postTypesInPlural.push(el1, el2, el3);
  }

  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const propertiesLoaded = !isEmpty(postTypes) && !isEmpty(directions);

  const setFilters = (
    checked: CheckboxFormStateType,
    filterType: FilterTypeEnum,
  ) => {
    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    setPage(0);

    history.push({
      search: query.toString(),
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const [boundFetchExpertMaterials] = useActions([fetchExpertMaterials]);

  const fetchData = (appendPosts = false) => {
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);

    const filters: RequestParamsType = {
      page,
      type: mapQueryIdsStringToArray(postTypesQuery),
      directions: mapQueryIdsStringToArray(directionsQuery),
    };

    boundFetchExpertMaterials({ expertId, filters, page, appendPosts });
  };

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [query.get(QueryTypeEnum.POST_TYPES), page]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [postIds]);

  const selectedPostTypesString = query
    .get(QueryTypeEnum.POST_TYPES)
    ?.split(',');
  let selectedPostTypes:
    | IPostType[]
    | undefined = postTypesInPlural?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );
  selectedPostTypes = !isEmpty(selectedPostTypes)
    ? selectedPostTypes
    : undefined;

  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');
  let selectedDirections:
    | IDirection[]
    | undefined = directions?.filter((post) =>
    selectedDirectionsString?.includes(post.id.toString()),
  );
  selectedDirections = !isEmpty(selectedDirections)
    ? selectedDirections
    : undefined;

  // const authorsDisabledDirections = () => {
  //   const authorsDirections = currentExpertData.directions;
  //   const result = authorsDirections?.filter((dir) => !dir.hasPosts);

  //   return result;
  // };

  return (
    <>
      <Typography variant="h4">Вибрати матеріали автора</Typography>
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          {propertiesLoaded && (
            <>
              <CheckboxLeftsideFilterForm
                expertId={expertId}
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.POST_TYPES)
                }
                possibleFilters={postTypesInPlural}
                selectedFilters={selectedPostTypes}
                filterTitle="за типом"
                allTitle="Всі типи"
              />
              <CheckboxLeftsideFilterForm
                // disabledDirections={authorsDisabledDirections()}
                expertId={expertId}
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.DIRECTIONS)
                }
                possibleFilters={directions}
                selectedFilters={selectedDirections}
                filterTitle="за темою"
                allTitle="Всі теми"
              />
            </>
          )}
        </Grid>
        <Grid item container xs={9} direction="column">
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={loading} expand />
          ) : (
            <>
              <Grid container>
                <PostsList postsList={materials} />
              </Grid>
              <LoadingContainer loading={loading} />
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertMaterialsContainer;
